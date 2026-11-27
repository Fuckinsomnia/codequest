import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { courses } from '../src/data/index.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositories = [
  { name: 'problem-specifications', language: null },
  { name: 'python', language: 'python' },
  { name: 'javascript', language: 'javascript' },
  { name: 'sqlite', language: 'sqlite' },
];
const overlapRules = {
  'hello-world': 'Materi sapaan dasar sudah tersedia di Python dan JavaScript.',
  'high-scores': 'Papan peringkan sudah dipraktikkan di JavaScript.',
  'list-ops': 'Operasi daftar sudah dipraktikkan di Python.',
  'linked-list': 'Linked list sudah menjadi bagian materi struktur data dan algoritma.',
  'simple-linked-list': 'Linked list sudah menjadi bagian materi struktur data dan algoritma.',
  'binary-search-tree': 'Binary search tree sudah menjadi bagian materi struktur data dan algoritma.',
  grep: 'Pencarian pola sudah menjadi bagian materi Command Line.',
};
const normalize = value => String(value || '').toLocaleLowerCase().replaceAll(/[^a-z0-9]+/g, ' ').trim();
const lessonTitles = courses.flatMap(course => course.lessons.map(lesson => ({ title: lesson.title, course: course.title })));

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function readOptional(file) {
  try {
    return await readFile(file, 'utf8');
  } catch {
    return null;
  }
}

function parseToml(text) {
  const values = {};
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([a-z_]+)\s*=\s*"((?:\\.|[^"\\])*)"/i);
    if (match) {
      try {
        values[match[1]] = JSON.parse(`"${match[2]}"`);
      } catch {
        values[match[1]] = match[2];
      }
    }
  }
  return values;
}

function parseMarkdown(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = null;
  let code = null;

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
    paragraph = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };
  const flush = () => {
    flushParagraph();
    flushList();
  };

  for (const line of lines) {
    if (code) {
      if (/^```/.test(line.trim())) {
        blocks.push(code);
        code = null;
      } else {
        code.text += `${line}\n`;
      }
      continue;
    }
    const fence = line.trim().match(/^```([\w-]*)/);
    if (fence) {
      flush();
      code = { type: 'code', language: fence[1] || '', text: '' };
      continue;
    }
    if (!line.trim()) {
      flush();
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flush();
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2].trim() });
      continue;
    }
    const bullet = line.match(/^\s*[-*+]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (bullet || ordered) {
      flushParagraph();
      const type = ordered ? 'ordered' : 'bullet';
      if (!list || list.type !== type) {
        flushList();
        list = { type: 'list', ordered: Boolean(ordered), items: [] };
      }
      list.items.push((ordered || bullet)[1].trim());
      continue;
    }
    const quote = line.match(/^>\s?(.+)$/);
    if (quote) {
      flush();
      blocks.push({ type: 'quote', text: quote[1].trim() });
      continue;
    }
    if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
      flush();
      continue;
    }
    if (list && /^\s{2,}\S/.test(line)) {
      list.items[list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }
    flushList();
    paragraph.push(line.trim());
  }
  if (code) blocks.push(code);
  flush();
  return blocks;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"' && field === '') {
      quoted = true;
    } else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field);
      if (row.some(value => value !== '')) rows.push(row);
      row = [];
      field = '';
    } else if (character !== '\r') {
      field += character;
    }
  }
  row.push(field);
  if (row.some(value => value !== '')) rows.push(row);
  return rows;
}

const sqlLiteral = value => `'${String(value ?? '').replaceAll("'", "''")}'`;

async function sqlSetup(exerciseDir) {
  const fixture = await readOptional(path.join(exerciseDir, 'create_fixture.sql'));
  if (!fixture) return '';
  const table = fixture.match(/\.import\s+\S+\s+["']?([a-z_][\w]*)["']?/i)?.[1];
  const statements = fixture.split(/\r?\n/).filter(line => !line.trim().startsWith('.')).join('\n').trim();
  const csv = await readOptional(path.join(exerciseDir, 'data.csv'));
  if (!table || !csv) return statements;
  const inserts = parseCsv(csv).map(values => `INSERT INTO "${table}" VALUES (${values.map(sqlLiteral).join(',')});`);
  return `${statements}${statements ? '\n' : ''}${inserts.join('\n')}`.trim();
}

function resolveFile(template, slug) {
  return template.replaceAll('%{snake_slug}', slug.replaceAll('-', '_')).replaceAll('%{kebab_slug}', slug);
}

async function cloneRepositories(temp) {
  const cloned = new Map();
  for (const repository of repositories) {
    const directory = path.join(temp, repository.name);
    execFileSync('git', ['clone', '--depth', '1', '--quiet', `https://github.com/exercism/${repository.name}.git`, directory], { stdio: 'ignore' });
    const commit = execFileSync('git', ['-C', directory, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    const license = await readFile(path.join(directory, 'LICENSE'), 'utf8');
    if (!license.includes('Permission is hereby granted, free of charge')) throw new Error(`Lisensi ${repository.name} bukan MIT yang diharapkan.`);
    cloned.set(repository.name, { directory, commit, license, language: repository.language });
  }
  return cloned;
}

function exerciseMap(config) {
  return new Map(Object.values(config.exercises || {}).flat().map(exercise => [exercise.slug, exercise]));
}

async function javascriptPrelude(exerciseDir, starter) {
  const imports = [...starter.matchAll(/^import\s+.*?\s+from\s+['"](.+?)['"];?/gm)].map(match => match[1]);
  const modules = [];
  for (const specifier of imports) {
    const file = path.resolve(exerciseDir, specifier);
    if (!file.startsWith(`${exerciseDir}${path.sep}`)) throw new Error(`Import di luar direktori latihan: ${specifier}`);
    const source = await readOptional(file);
    if (source) modules.push(source.replace(/^export\s+(default\s+)?/gm, '').trimEnd());
  }
  return modules.join('\n\n');
}

async function trackData(repository, slug, shared) {
  const config = JSON.parse(await readFile(path.join(repository.directory, 'config.json'), 'utf8'));
  const exercise = exerciseMap(config).get(slug);
  if (!exercise || ['deprecated', 'wip'].includes(exercise.status)) return null;
  const practiceDir = path.join(repository.directory, 'exercises', 'practice', slug);
  const conceptDir = path.join(repository.directory, 'exercises', 'concept', slug);
  const exerciseDir = await exists(practiceDir) ? practiceDir : conceptDir;
  const solutionTemplate = config.files?.solution?.[0];
  if (!solutionTemplate || !(await exists(exerciseDir))) return null;
  const starter = await readOptional(path.join(exerciseDir, resolveFile(solutionTemplate, slug)));
  if (!starter) return null;
  const introduction = await readOptional(path.join(exerciseDir, '.docs', 'introduction.md'));
  const instructions = await readOptional(path.join(exerciseDir, '.docs', 'instructions.md'));
  return {
    slug,
    name: exercise.name,
    status: exercise.status || 'active',
    difficulty: Number.isFinite(exercise.difficulty) ? exercise.difficulty : null,
    starter: starter.trimEnd(),
    prelude: repository.language === 'javascript' ? await javascriptPrelude(exerciseDir, starter) : '',
    introduction: introduction && introduction !== shared.introduction ? parseMarkdown(introduction) : null,
    instructions: instructions && instructions !== shared.instructions ? parseMarkdown(instructions) : null,
    setup: repository.language === 'sqlite' ? await sqlSetup(exerciseDir) : '',
    url: `https://exercism.org/tracks/${repository.language}/exercises/${slug}`,
  };
}

const temp = await mkdtemp(path.join(tmpdir(), 'codequest-exercism-'));
try {
  const repositoriesByName = await cloneRepositories(temp);
  const specs = repositoriesByName.get('problem-specifications');
  const configs = new Map();
  for (const language of ['python', 'javascript', 'sqlite']) {
    const repository = repositoriesByName.get(language);
    configs.set(language, { repository, config: JSON.parse(await readFile(path.join(repository.directory, 'config.json'), 'utf8')) });
  }

  const exerciseRoot = path.join(specs.directory, 'exercises');
  const slugs = (await readdir(exerciseRoot, { withFileTypes: true })).filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  const exercises = [];
  const excluded = [];

  for (const slug of slugs) {
    const directory = path.join(exerciseRoot, slug);
    if (await exists(path.join(directory, '.deprecated'))) {
      excluded.push({ slug, reason: 'Deprecated di Exercism.' });
      continue;
    }
    const metadata = parseToml(await readFile(path.join(directory, 'metadata.toml'), 'utf8'));
    const title = metadata.title || slug;
    const exactOverlap = lessonTitles.find(lesson => normalize(lesson.title) === normalize(title));
    const overlapReason = overlapRules[slug] || (exactOverlap ? `Judul sudah dipakai oleh ${exactOverlap.course}: ${exactOverlap.title}.` : null);
    if (overlapReason) {
      excluded.push({ slug, reason: overlapReason });
      continue;
    }

    const introductionFile = await readOptional(path.join(directory, 'introduction.md'));
    const instructionsFile = await readOptional(path.join(directory, 'instructions.md'));
    const descriptionFile = await readOptional(path.join(directory, 'description.md'));
    const shared = {
      introduction: introductionFile || '',
      instructions: instructionsFile || descriptionFile || '',
    };
    const tracks = {};
    for (const [language, entry] of configs) {
      const data = await trackData(entry.repository, slug, shared);
      if (data) tracks[language] = data;
    }
    const difficulties = Object.values(tracks).map(track => track.difficulty).filter(Number.isFinite);
    exercises.push({
      slug,
      title,
      blurb: metadata.blurb || '',
      source: metadata.source || 'Exercism',
      sourceUrl: metadata.source_url || `https://exercism.org/exercises/${slug}`,
      url: `https://exercism.org/exercises/${slug}`,
      difficulty: difficulties.length ? Math.min(...difficulties) : null,
      introduction: parseMarkdown(shared.introduction),
      instructions: parseMarkdown(shared.instructions),
      tracks,
    });
  }

  const output = {
    generatedAt: new Date().toISOString().slice(0, 10),
    source: 'Exercism',
    license: 'MIT',
    sourceCount: slugs.length,
    repositories: Object.fromEntries([...repositoriesByName].map(([name, repository]) => [name, repository.commit])),
    excluded,
    exercises,
  };
  const destination = path.join(root, 'src', 'data', 'exercism-library.json');
  const json = JSON.stringify(output);
  await writeFile(destination, `${json}\n`);
  const localTracks = exercises.reduce((total, exercise) => total + Object.keys(exercise.tracks).length, 0);
  console.log(`Imported ${exercises.length} active Exercism problems (${localTracks} local track variants).`);
  console.log(`Excluded ${excluded.length} deprecated or overlapping problems.`);
  console.log(`Wrote ${destination} (${(Buffer.byteLength(json) / 1024).toFixed(1)} KiB).`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
