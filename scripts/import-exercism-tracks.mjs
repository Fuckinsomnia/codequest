import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceUrl = 'https://exercism.org/tracks';
const decode = value => value
  .replaceAll('&amp;', '&')
  .replaceAll('&#39;', "'")
  .replaceAll('&quot;', '"')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

async function fetchText(url) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.text();
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise(resolve => setTimeout(resolve, 350 * (attempt + 1)));
  }
  throw lastError;
}

const page = await fetchText(sourceUrl);
const links = new Map();
for (const match of page.matchAll(/<a[^>]+href=["']\/tracks\/([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
  const slug = match[1];
  const name = decode(match[2]);
  if (name && !links.has(slug)) links.set(slug, name);
}
if (links.size < 80) throw new Error(`Only found ${links.size} Exercism tracks; expected at least 80.`);

const queue = [...links.entries()].sort((a, b) => a[1].localeCompare(b[1]));
const tracks = [];
const exercises = [];
const failures = [];

async function worker() {
  while (queue.length) {
    const [slug, pageName] = queue.shift();
    try {
      const config = JSON.parse(await fetchText(`https://raw.githubusercontent.com/exercism/${slug}/main/config.json`));
      const conceptNames = new Map((config.concepts || []).map(concept => [concept.slug, concept.name]));
      const entries = Object.values(config.exercises || {}).flat().filter(exercise => exercise.slug && exercise.name);
      const track = {
        slug,
        name: config.language || pageName,
        repo: `https://github.com/exercism/${slug}`,
        url: `https://exercism.org/tracks/${slug}`,
        exerciseCount: entries.length,
      };
      tracks.push(track);
      for (const exercise of entries) {
        const status = exercise.status || 'active';
        const concepts = (exercise.concepts || []).map(concept => conceptNames.get(concept) || concept);
        exercises.push({
          track: slug,
          trackName: track.name,
          slug: exercise.slug,
          name: exercise.name,
          status,
          difficulty: Number.isFinite(exercise.difficulty) ? exercise.difficulty : null,
          concepts,
          prerequisites: exercise.prerequisites || [],
          url: `https://exercism.org/tracks/${slug}/exercises/${exercise.slug}`,
        });
      }
    } catch (error) {
      failures.push({ slug, name: pageName, error: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 8 }, worker));
tracks.sort((a, b) => a.name.localeCompare(b.name));
exercises.sort((a, b) => a.trackName.localeCompare(b.trackName) || a.name.localeCompare(b.name));

const output = {
  generatedAt: new Date().toISOString().slice(0, 10),
  sourceUrl,
  trackCount: tracks.length,
  exerciseCount: exercises.length,
  tracks,
  exercises,
  failures,
};
const destination = path.join(root, 'src', 'data', 'exercism-tracks.json');
const json = JSON.stringify(output);
await writeFile(destination, `${json}\n`);
console.log(`Imported ${tracks.length} language tracks and ${exercises.length} exercise variants.`);
if (failures.length) console.log(`Failed tracks: ${failures.map(item => item.slug).join(', ')}`);
console.log(`Wrote ${destination} (${(Buffer.byteLength(json) / 1024).toFixed(1)} KiB).`);
