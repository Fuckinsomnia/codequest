import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const file = new URL('../src/data/w3schools-materials.json', import.meta.url);
const catalog = JSON.parse(await readFile(file, 'utf8'));
const categories = new Set(['Web Development', 'Data Science', 'Computer Science', 'AI']);

test('W3Schools catalog includes all selected topics without import failures', () => {
  assert.equal(catalog.topicCount, 35);
  assert.equal(catalog.topics.length, 35);
  assert.deepEqual(catalog.failures, []);
  assert.equal(new Set(catalog.topics.map(topic => topic.slug)).size, catalog.topics.length);
  for (const slug of ['html', 'css', 'js', 'sql', 'python', 'java', 'cpp', 'react', 'nodejs', 'git']) {
    assert.ok(catalog.topics.some(topic => topic.slug === slug), `${slug} is missing`);
  }
});

test('every W3Schools material has a unique identity and official source link', () => {
  assert.ok(catalog.materialCount > 3000);
  assert.equal(catalog.materials.length, catalog.materialCount);
  const ids = catalog.materials.map(material => material.id);
  assert.equal(new Set(ids).size, ids.length);
  const topicSlugs = new Set(catalog.topics.map(topic => topic.slug));
  assert.ok(catalog.materials.filter(material => material.type === 'Tutorial').length > 3000);
  assert.ok(catalog.materials.filter(material => material.type === 'Latihan').length > 0);
  for (const material of catalog.materials) {
    assert.ok(material.title.length > 0);
    assert.ok(material.description.length > 20);
    assert.ok(topicSlugs.has(material.topic));
    assert.ok(categories.has(material.category));
    assert.ok(['Tutorial', 'Latihan'].includes(material.type));
    assert.equal(new URL(material.url).origin, 'https://www.w3schools.com');
  }
});

test('catalog payload stays bounded for lazy offline loading', async () => {
  assert.equal(catalog.sourceUrl, 'https://www.w3schools.com/');
  assert.match(catalog.generatedAt, /^\d{4}-\d{2}-\d{2}$/);
  const info = await stat(file);
  assert.ok(info.size < 2 * 1024 * 1024);
});
