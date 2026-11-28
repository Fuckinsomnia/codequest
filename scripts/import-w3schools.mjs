import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceUrl = 'https://www.w3schools.com/';
const topics = [
  { slug: 'html', name: 'HTML', category: 'Web Development' },
  { slug: 'css', name: 'CSS', category: 'Web Development' },
  { slug: 'js', name: 'JavaScript', category: 'Web Development' },
  { slug: 'sql', name: 'SQL', category: 'Data Science' },
  { slug: 'python', name: 'Python', category: 'Data Science' },
  { slug: 'java', name: 'Java', category: 'Computer Science' },
  { slug: 'cpp', name: 'C++', category: 'Computer Science' },
  { slug: 'cs', name: 'C#', category: 'Computer Science' },
  { slug: 'react', name: 'React', category: 'Web Development' },
  { slug: 'nodejs', name: 'Node.js', category: 'Web Development' },
  { slug: 'typescript', name: 'TypeScript', category: 'Web Development' },
  { slug: 'jquery', name: 'jQuery', category: 'Web Development' },
  { slug: 'bootstrap5', name: 'Bootstrap 5', category: 'Web Development' },
  { slug: 'sass', name: 'Sass', category: 'Web Development' },
  { slug: 'php', name: 'PHP', category: 'Web Development' },
  { slug: 'go', name: 'Go', category: 'Computer Science' },
  { slug: 'rust', name: 'Rust', category: 'Computer Science' },
  { slug: 'git', name: 'Git', category: 'Computer Science' },
  { slug: 'bash', name: 'Bash', category: 'Computer Science' },
  { slug: 'dsa', name: 'Struktur Data & Algoritma', category: 'Computer Science' },
  { slug: 'python-numpy', name: 'NumPy', category: 'Data Science' },
  { slug: 'python-pandas', name: 'Pandas', category: 'Data Science' },
  { slug: 'python-scipy', name: 'SciPy', category: 'Data Science' },
  { slug: 'r', name: 'R', category: 'Data Science' },
  { slug: 'django', name: 'Django', category: 'Web Development' },
  { slug: 'mongodb', name: 'MongoDB', category: 'Data Science' },
  { slug: 'mysql', name: 'MySQL', category: 'Data Science' },
  { slug: 'postgresql', name: 'PostgreSQL', category: 'Data Science' },
  { slug: 'sqlite', name: 'SQLite', category: 'Data Science' },
  { slug: 'cybersecurity', name: 'Cybersecurity', category: 'Computer Science' },
  { slug: 'ai', name: 'Artificial Intelligence', category: 'AI' },
  { slug: 'gen_ai', name: 'Generative AI', category: 'AI' },
  { slug: 'datascience', name: 'Data Science', category: 'Data Science' },
  { slug: 'accessibility', name: 'Accessibility', category: 'Web Development' },
  { slug: 'xml', name: 'XML', category: 'Web Development' },
];
const descriptions = {
  'Web Development': 'Pelajari konsep, pola, dan contoh penerapan untuk membangun antarmuka web yang lebih terstruktur.',
  'Data Science': 'Pelajari teknik kerja dengan data, query, dan komputasi melalui contoh yang dapat dipraktikkan.',
  'Computer Science': 'Pelajari dasar pemrograman, algoritma, alat, dan praktik rekayasa perangkat lunak.',
  AI: 'Pelajari konsep inti AI dan penerapannya melalui materi bertahap serta studi kasus.',
};
const excluded = /(?:^|\/)(?:default|search|about|privacy|terms|forum|quiztest|tryit|exercises?)\.(?:asp|php)$/i;
const excludedPrefix = /^(?:gloss_|ref_|func_|api_|tryit_|quiztest_)/i;

async function fetchText(url) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return { text: await response.text(), status: response.status };
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise(resolve => setTimeout(resolve, 300 * (attempt + 1)));
  }
  throw lastError;
}

function titleFromUrl(url, topic) {
  const parsed = new URL(url);
  const file = parsed.pathname.split('/').filter(Boolean).at(-1) || '';
  if (!/\.(?:asp|php)$/i.test(file)) return `Tutorial ${topic.name}`;
  let value = file.replace(/\.(?:asp|php)$/i, '').replaceAll('-', ' ');
  const prefixes = [...new Set([topic.slug, ...topic.slug.split('-'), topic.name].map(value => value.toLocaleLowerCase().replace(/[^a-z0-9]/g, '')))];
  for (const prefix of prefixes) {
    if (value.toLocaleLowerCase().startsWith(`${prefix}_`)) value = value.slice(prefix.length + 1);
  }
  value = value.replace(/^css3_/i, '').replace(/^html5_/i, '').replace(/^js_/i, '').replace(/^sql_/i, '').replace(/^python_/i, '').replaceAll('_', ' ');
  return value.replace(/\b\w/g, character => character.toUpperCase());
}

const materials = [];
const seenUrls = new Set();
const failures = [];
const queue = [...topics];

async function worker() {
  while (queue.length) {
    const topic = queue.shift();
    try {
      const { text } = await fetchText(`https://www.w3schools.com/sitemaps/${topic.slug}.xml`);
      const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
      const rootPage = urls.find(url => new URL(url).pathname.endsWith('/'));
      for (const url of urls) {
        if (seenUrls.has(url)) continue;
        const parsed = new URL(url);
        const file = parsed.pathname.split('/').filter(Boolean).at(-1) || '';
        if (excluded.test(parsed.pathname) || excludedPrefix.test(file)) continue;
        if (file && !/\.(?:asp|php)$/i.test(file)) continue;
        seenUrls.add(url);
        const isExercise = /exercise/i.test(file);
        const exerciseTopic = parsed.searchParams.get('topic');
        const baseTitle = titleFromUrl(url, topic);
        const title = isExercise ? `Latihan ${topic.name}${exerciseTopic ? `: ${exerciseTopic.replaceAll('_', ' ')}` : ''}` : baseTitle;
        const suffix = exerciseTopic ? `${file.replace(/\.(?:asp|php)$/i, '')}-${exerciseTopic}` : file.replace(/\.(?:asp|php)$/i, '') || 'index';
        materials.push({
          id: `${topic.slug}-${suffix}`,
          topic: topic.slug,
          topicName: topic.name,
          category: topic.category,
          type: isExercise ? 'Latihan' : 'Tutorial',
          title,
          description: isExercise ? `Latihan interaktif W3Schools untuk menguji pemahaman ${topic.name} melalui soal dan jawaban.` : `${descriptions[topic.category]} Materi ini membahas ${title} dalam ${topic.name}.`,
          url,
        });
      }
      if (rootPage) {
        const exerciseUrl = new URL('exercises.asp', rootPage).href;
        try {
          const { status } = await fetchText(exerciseUrl);
          if (status === 200) materials.push({
            id: `${topic.slug}-exercises`,
            topic: topic.slug,
            topicName: topic.name,
            category: topic.category,
            type: 'Latihan',
            title: `Latihan ${topic.name}`,
            description: `Kumpulan latihan W3Schools untuk menguji pemahaman ${topic.name} melalui soal dan jawaban interaktif.`,
            url: exerciseUrl,
          });
        } catch {}
      }
    } catch (error) {
      failures.push({ topic: topic.slug, name: topic.name, error: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 6 }, worker));
materials.sort((a, b) => a.topicName.localeCompare(b.topicName) || a.title.localeCompare(b.title));
const output = {
  generatedAt: new Date().toISOString().slice(0, 10),
  sourceUrl,
  topicCount: topics.length - failures.length,
  materialCount: materials.length,
  topics: topics.filter(topic => !failures.some(failure => failure.topic === topic.slug)),
  materials,
  failures,
};
const destination = path.join(root, 'src', 'data', 'w3schools-materials.json');
const json = JSON.stringify(output);
await writeFile(destination, `${json}\n`);
console.log(`Imported ${output.topicCount} W3Schools topics and ${materials.length} materials.`);
if (failures.length) console.log(`Failed topics: ${failures.map(item => item.topic).join(', ')}`);
console.log(`Wrote ${destination} (${(Buffer.byteLength(json) / 1024).toFixed(1)} KiB).`);
