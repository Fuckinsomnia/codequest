import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const file = new URL('../src/data/exercism-tracks.json', import.meta.url);
const catalog = JSON.parse(await readFile(file, 'utf8'));
const knownStatuses = new Set(['active', 'beta', 'deprecated', 'wip']);

test('catalog includes every Exercism language track without import failures', () => {
  assert.equal(catalog.trackCount, 85);
  assert.equal(catalog.tracks.length, 85);
  assert.deepEqual(catalog.failures, []);
  assert.equal(new Set(catalog.tracks.map(track => track.slug)).size, catalog.tracks.length);
  assert.ok(catalog.tracks.every(track => track.exerciseCount > 0));
  for (const slug of ['python', 'javascript', 'sqlite', 'java', 'cpp', 'rust', 'go']) {
    assert.ok(catalog.tracks.some(track => track.slug === slug), `${slug} track is missing`);
  }
});

test('all language exercise variants have unique identities and valid source links', () => {
  assert.ok(catalog.exerciseCount > 8000);
  assert.equal(catalog.exercises.length, catalog.exerciseCount);
  const ids = catalog.exercises.map(exercise => `${exercise.track}-${exercise.slug}`);
  assert.equal(new Set(ids).size, ids.length);
  for (const exercise of catalog.exercises) {
    assert.ok(exercise.name.length > 0);
    assert.ok(exercise.trackName.length > 0);
    assert.ok(knownStatuses.has(exercise.status));
    assert.equal(new URL(exercise.url).origin, 'https://exercism.org');
    assert.ok(Array.isArray(exercise.concepts));
    assert.ok(Array.isArray(exercise.prerequisites));
  }
});

test('available deprecated and work-in-progress counts are explicit', () => {
  const counts = Object.fromEntries([...knownStatuses].map(status => [status, catalog.exercises.filter(exercise => exercise.status === status).length]));
  assert.ok(counts.active > 7000);
  assert.ok(counts.beta > 0);
  assert.ok(counts.deprecated > 0);
  assert.ok(counts.wip > 0);
  assert.equal(counts.active + counts.beta + counts.deprecated + counts.wip, catalog.exerciseCount);
});

test('catalog payload stays bounded for offline lazy loading', async () => {
  assert.match(catalog.generatedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(catalog.sourceUrl, 'https://exercism.org/tracks');
  const info = await stat(file);
  assert.ok(info.size < 3 * 1024 * 1024);
});
