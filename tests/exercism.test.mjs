import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { courses, lessons } from '../src/data/index.js';

const file = new URL('../src/data/exercism-library.json', import.meta.url);
const library = JSON.parse(await readFile(file, 'utf8'));
const localTracks = new Set(['python', 'javascript', 'sqlite']);
const variants = library.exercises.flatMap(exercise => Object.keys(exercise.tracks).map(language => ({ exercise, language })));

test('Exercism import keeps every active unique problem except documented overlaps', () => {
  assert.equal(library.sourceCount, 152);
  assert.equal(library.exercises.length, 132);
  assert.equal(library.excluded.length, 20);
  assert.equal(new Set(library.exercises.map(exercise => exercise.slug)).size, library.exercises.length);
  const excluded = new Set(library.excluded.map(item => item.slug));
  assert.equal(library.exercises.filter(exercise => excluded.has(exercise.slug)).length, 0);
  for (const slug of ['hello-world', 'high-scores', 'list-ops', 'linked-list', 'simple-linked-list', 'binary-search-tree', 'grep']) {
    assert.ok(excluded.has(slug), `${slug} should be filtered as overlapping course material`);
  }
  assert.equal(library.exercises.filter(exercise => !Object.keys(exercise.tracks).length).length, 5);
});

test('all imported exercises have instructions, attribution, and valid source links', () => {
  for (const exercise of library.exercises) {
    assert.ok(exercise.title.length > 0);
    assert.ok(exercise.blurb.length > 0);
    assert.ok(exercise.instructions.length > 0, `${exercise.slug} has no instructions`);
    assert.equal(new URL(exercise.url).origin, 'https://exercism.org');
    assert.ok(['http:', 'https:'].includes(new URL(exercise.sourceUrl).protocol));
    assert.ok(Object.keys(exercise.tracks).every(language => localTracks.has(language)));
  }
});

test('local Exercism variants include runnable starters and SQL fixtures', () => {
  assert.deepEqual(Object.fromEntries(['python', 'javascript', 'sqlite'].map(language => [language, variants.filter(variant => variant.language === language).length])), {
    python: 119,
    javascript: 122,
    sqlite: 79,
  });
  for (const { exercise, language } of variants) {
    const track = exercise.tracks[language];
    assert.ok(track.starter.trim().length > 0, `${language}/${exercise.slug} has no starter`);
    assert.equal(new URL(track.url).origin, 'https://exercism.org');
    if (language === 'sqlite') {
      assert.ok(track.setup.trim().length > 0, `${exercise.slug} has no SQL setup`);
      assert.doesNotMatch(track.setup, /^\s*\./m, `${exercise.slug} contains unsupported sqlite dot commands`);
    }
  }
  const acronym = library.exercises.find(exercise => exercise.slug === 'acronym').tracks.sqlite;
  assert.match(acronym.setup, /CREATE TABLE/i);
  assert.match(acronym.setup, /INSERT INTO/i);
  const lens = library.exercises.find(exercise => exercise.slug === 'lens-person').tracks.javascript;
  assert.match(lens.prelude, /class Person/);
  assert.match(lens.prelude, /class Lens/);
  assert.doesNotMatch(lens.prelude, /^export\s/m);
});

test('Exercism progress identifiers remain unique and fit existing export limits', () => {
  const ids = [...lessons.map(lesson => lesson.id), ...variants.map(({ exercise, language }) => `exercism-${language}-${exercise.slug}`)];
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.length <= 1000);
  assert.ok(ids.every(id => /^[a-z0-9-]+$/.test(id)));
});

test('import metadata is reproducible and the offline payload stays bounded', async () => {
  assert.equal(library.license, 'MIT');
  assert.match(library.generatedAt, /^\d{4}-\d{2}-\d{2}$/);
  for (const commit of Object.values(library.repositories)) assert.match(commit, /^[a-f0-9]{40}$/);
  const info = await stat(file);
  assert.ok(info.size < 2 * 1024 * 1024);
});
