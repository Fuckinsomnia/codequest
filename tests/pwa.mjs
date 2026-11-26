import {chromium} from 'playwright-core';
import {createServer} from 'node:http';
import {readFile, mkdir, mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {resolve, relative, extname} from 'node:path';
import assert from 'node:assert/strict';
import python from '../src/data/python.js';
import {courses} from '../src/data/index.js';

const base = process.env.PWA_BASE || '/';
const dist = fileURLToPath(new URL(`../${process.env.PWA_DIST || 'dist'}/`, import.meta.url));
const shots = fileURLToPath(new URL('./screenshots/', import.meta.url));
assert.ok(base.startsWith('/') && base.endsWith('/'));
const outsideScope = [];
await mkdir(shots, {recursive:true});
let revision = 1;
const mime = {'.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.webmanifest':'application/manifest+json', '.wasm':'application/wasm', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.woff':'font/woff', '.woff2':'font/woff2', '.zip':'application/zip'};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith(base)) {outsideScope.push(pathname);response.writeHead(404).end();return;}
    const asset = pathname.slice(base.length) || 'index.html';
    const file = resolve(dist, asset);
    if (relative(dist, file).startsWith('..')) {response.writeHead(403).end();return;}
    let data = await readFile(file);
    if (asset === 'sw.js' && revision > 1) data = Buffer.from(data.toString().replace(/(const CACHE_NAME = CACHE_PREFIX \+ )([^;]+);/, `$1$2 + "-test${revision}";`));
    response.writeHead(200, {'Content-Type':mime[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store'}).end(data);
  } catch {response.writeHead(404).end('Not found');}
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(resolve(tmpdir(), 'codequest-pwa-'));
const errors=[];
async function launch() {
  const context = await chromium.launchPersistentContext(profile,{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
  return context;
}
let context = await launch();
let page = await context.newPage();
const note = message => console.log('PASS', message);
const dbRecord = page => page.evaluate(() => new Promise((resolve,reject) => {
  const request=indexedDB.open('codequest',1);
  request.onsuccess=()=>{const db=request.result;const get=db.transaction('progress').objectStore('progress').get('current');get.onsuccess=()=>{db.close();resolve(get.result);};get.onerror=()=>reject(get.error);};
  request.onerror=()=>reject(request.error);
}));
async function waitSaved(test) {
  for(let i=0;i<100;i++) {if(test(await dbRecord(page))) return;await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(resolve)));}
  throw new Error('IndexedDB save did not finish');
}
async function modal() {await page.getByRole('button',{name:'Aplikasi HP dan offline',exact:true}).click();await page.getByRole('dialog',{name:'CodeQuest di HP'}).waitFor();}
async function closeModal() {await page.getByRole('button',{name:'Tutup aplikasi HP',exact:true}).click();}
async function solve(course, lesson=course.lessons[0]) {
  await page.goto(`${origin}${base}#/lesson/${course.id}/${lesson.id}`);
  await page.getByRole('button',{name:'Code',exact:true}).click();
  await page.locator('.cm-content').fill(lesson.solution);
  await page.getByRole('button',{name:'Submit answer',exact:true}).click();
  await page.getByRole('dialog').waitFor({timeout:60000});
  await page.getByRole('button',{name:'Tutup',exact:true}).click();
}
try {
  await page.addInitScript(() => {
    if(window.top !== window) return;
    if(!localStorage.getItem('legacy-seeded')) {
      localStorage.setItem('codequest-v1',JSON.stringify({completed:['python-01'],name:'Petualang HP',drafts:{'python-01':'print("warisan")'},notes:{'python-01':'Catatan lama'},bookmarks:['python-01']}));
      localStorage.setItem('legacy-seeded','yes');
    }
  });
  await page.goto(`${origin}${base}`);
  await page.getByRole('heading',{name:'Coding Adventure',exact:true}).waitFor();
  await modal();
  await page.getByText('Siap digunakan offline',{exact:true}).waitFor({timeout:60000});
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  const cache=await page.evaluate(async()=>{const names=(await caches.keys()).filter(name=>name.startsWith('codequest-offline-'));const cache=await caches.open(names[0]);return {names,urls:(await cache.keys()).map(request=>new URL(request.url).pathname)};});
  assert.equal(cache.names.length,1);
  for(const asset of ['index.html','manifest.webmanifest','icon-512.png','python-face-v2.jpg','hero-ascii-user.jpg','runner.js','runtime/python/pyodide.asm.wasm','runtime/python/python_stdlib.zip','runtime/sql/sql-wasm.wasm']) assert.ok(cache.urls.includes(`${base}${asset}`),asset);
  assert.ok(cache.urls.every(url=>url.startsWith(base)));
  assert.equal(await page.evaluate(async()=>(await navigator.serviceWorker.getRegistration()).scope),`${origin}${base}`);
  await page.evaluate(async()=>{await caches.open('codequest-offline-unrelated-project');});
  await page.screenshot({path:resolve(shots,base==='/'?'pwa-mobile.png':'pwa-pages-mobile.png')});
  const cdp=await context.newCDPSession(page);
  const manifest=await cdp.send('Page.getAppManifest');assert.deepEqual(manifest.errors,[]);
  assert.equal(new URL(JSON.parse(manifest.data).start_url,manifest.url).href,`${origin}${base}#/`);
  const installability=await cdp.send('Page.getInstallabilityErrors');assert.deepEqual(installability.installabilityErrors,[]);
  note('Manifest, icons and browser installability pass; complete offline cache contains all runtimes');
  await waitSaved(record=>record?.state.completed.includes('python-01'));
  assert.equal((await dbRecord(page)).state.notes['python-01'],'Catatan lama');
  note('Existing localStorage progress migrates to IndexedDB');
  assert.equal(await page.getByRole('button',{name:/Perbarui/}).count(),0);
  revision=2;
  await page.evaluate(async()=>{const registration=await navigator.serviceWorker.getRegistration();await registration.update();});
  await page.getByRole('button',{name:/Perbarui/}).waitFor({timeout:60000});
  page.once('dialog',dialog=>dialog.accept());
  const firstReload=page.waitForEvent('load');
  await page.getByRole('button',{name:/Perbarui/}).click();await firstReload;
  await page.getByRole('heading',{name:'Coding Adventure',exact:true}).waitFor();
  note('First-install session receives updates without showing a false initial update');
  await solve(python,python.lessons[1]);
  await page.getByRole('button',{name:'Learn',exact:true}).click();
  await page.getByRole('button',{name:'Catatan pribadi',exact:true}).click();
  await page.getByRole('textbox',{name:'Catatan pribadi',exact:true}).fill('Tetap tersimpan setelah HP ditutup.');
  await waitSaved(record=>record?.state.notes['python-02']==='Tetap tersimpan setelah HP ditutup.');
  await context.setOffline(true);
  await page.goto(`${origin}${base}#/progress`);
  await page.getByRole('heading',{name:'Petualanganmu',exact:true}).waitFor();
  await modal();await page.getByText(/Sedang offline/).waitFor();await closeModal();
  for(const course of courses.filter(course=>course.lessons.every(lesson=>lesson.type==='code'))) {
    await solve(course,course.id==='css'?course.lessons.at(-1):course.lessons[0]);
    note(`Offline editor and submission work: ${course.id}`);
  }
  const expert=courses.find(course=>course.id==='expert-react');
  await page.goto(`${origin}${base}#/lesson/${expert.id}/${expert.lessons[0].id}`);
  await page.getByRole('button',{name:'Quiz',exact:true}).click();
  await page.locator('.quiz-option').nth(expert.lessons[0].answer).click();
  await page.getByRole('button',{name:'Periksa jawaban'}).click();
  await page.getByRole('dialog').waitFor();await page.getByRole('button',{name:'Tutup',exact:true}).click();
  await waitSaved(record=>record?.state.completed.includes(expert.lessons[0].id));
  note('New expert quiz completion persists offline');
  await page.goto(`${origin}${base}#/builds/new`);
  await page.getByRole('textbox',{name:'Nama proyek'}).fill('Karya offline HP');
  for(let attempt=0;attempt<20;attempt++) {
    const previous=await page.locator('iframe').getAttribute('srcdoc');
    await page.getByRole('button',{name:'Run preview'}).click();
    await page.waitForFunction(previous=>document.querySelector('iframe')?.getAttribute('srcdoc')!==previous,previous);
    await page.locator('iframe').scrollIntoViewIfNeeded();
    await page.frameLocator('iframe').getByRole('button',{name:'Katakan halo'}).click();
    await page.frameLocator('iframe').getByText('Halo, petualang! Teruslah membuat sesuatu.').waitFor();
  }
  await page.getByRole('button',{name:'Simpan',exact:true}).click();
  await waitSaved(record=>record?.state.builds.some(build=>build.title==='Karya offline HP'));
  note('Builds preview and save work offline');
  await page.close();
  page=await context.newPage();
  await page.addInitScript(()=>{if(window.top !== window) return;localStorage.removeItem('codequest-v1');localStorage.removeItem('codequest-v1-saved-at');});
  await page.goto(`${origin}${base}#/progress`);
  await page.getByRole('heading',{name:'Petualanganmu',exact:true}).waitFor();
  assert.equal(await page.getByRole('textbox',{name:'Nama petualang'}).inputValue(),'Petualang HP');
  const restored=(await dbRecord(page)).state;
  assert.ok(restored.completed.includes('python-02'));assert.equal(restored.notes['python-02'],'Tetap tersimpan setelah HP ditutup.');assert.equal(restored.builds[0].title,'Karya offline HP');
  note('Offline reopen restores completed lessons, drafts, notes and Builds from IndexedDB without localStorage mirror');
  await page.close();page=await context.newPage();
  await page.addInitScript(()=>{if(window.top !== window) return;Storage.prototype.setItem=function(){throw new DOMException('Storage quota reached','QuotaExceededError');};});
  await page.goto(`${origin}${base}#/progress`);
  await page.getByRole('textbox',{name:'Nama petualang'}).fill('Tersimpan di IndexedDB');
  await waitSaved(record=>record?.state.name==='Tersimpan di IndexedDB');
  await page.close();page=await context.newPage();
  await page.goto(`${origin}${base}#/progress`);await page.getByRole('textbox',{name:'Nama petualang'}).waitFor();
  assert.equal(await page.getByRole('textbox',{name:'Nama petualang'}).inputValue(),'Tersimpan di IndexedDB');
  note('Progress survives localStorage quota failure and another reopen');
  await context.setOffline(false);revision=3;
  await modal();
  await page.evaluate(async()=>{const registration=await navigator.serviceWorker.getRegistration();await registration.update();});
  await page.getByRole('button',{name:/Perbarui/}).waitFor({timeout:60000});
  const beforeUpdate=(await dbRecord(page)).state;
  page.once('dialog',dialog=>dialog.accept());
  const reload=page.waitForEvent('load');await page.getByRole('button',{name:/Perbarui/}).click();await reload;
  await page.getByRole('heading',{name:'Petualanganmu',exact:true}).waitFor();
  assert.deepEqual((await dbRecord(page)).state,beforeUpdate);
  const updatedCaches=await page.evaluate(async()=>await caches.keys());
  assert.equal(updatedCaches.filter(name=>name.startsWith(`codequest-offline-${encodeURIComponent(base)}-`)).length,1);
  assert.ok(updatedCaches.includes('codequest-offline-unrelated-project'));
  await context.setOffline(true);await page.reload();await page.getByRole('heading',{name:'Petualanganmu',exact:true}).waitFor();
  note('Service worker update preserves progress, replaces old cache and still works offline');
  await page.goto(`${origin}${base}#/practice`);await page.locator('.practice-pack').first().waitFor();assert.equal(await page.locator('.practice-pack').count(),20);
  await page.locator('.practice-language-filters').getByRole('button',{name:'Python',exact:true}).click();assert.equal(await page.locator('.practice-pack').count(),8);
  await page.locator('.practice-pack').first().click();await page.locator('.practice-lesson').first().waitFor();
  await page.getByRole('link',{name:'Semua paket tantangan',exact:true}).click();await page.locator('.practice-pack').first().waitFor();assert.equal(await page.locator('.practice-pack').count(),20);
  await page.getByRole('searchbox',{name:'Cari tantangan'}).fill('nonexistent-xyz');await page.getByRole('heading',{name:'Tidak ada tantangan yang cocok'}).waitFor();
  await page.getByRole('button',{name:'Hapus filter',exact:true}).first().click();
  await page.screenshot({path:resolve(shots,'practice-mobile.png')});
  const width=await page.evaluate(()=>({viewport:innerWidth,content:document.documentElement.scrollWidth}));assert.ok(width.content<=width.viewport+1);
  note('Visual challenge packs, drilldown, filters and empty state work offline on mobile');
  const beforeRestart=(await dbRecord(page)).state;
  await context.close();
  context=await launch();
  await context.setOffline(true);
  page=await context.newPage();
  await page.goto(`${origin}${base}#/progress`);
  await page.getByRole('heading',{name:'Petualanganmu',exact:true}).waitFor();
  assert.deepEqual((await dbRecord(page)).state,beforeRestart);
  await solve(python,python.lessons[1]);
  note('Closing and restarting the entire browser preserves progress and offline execution');
  assert.deepEqual(errors,[]);note('No uncaught browser errors');
  assert.deepEqual(outsideScope.filter(path=>path!=='/favicon.ico'),[]);
  console.log(`PWA checks completed for ${base}. Physical phone installation still requires a reachable trusted HTTPS address.`);
} catch(error) {
  console.error('Failure context', {url:page.url(),errors});
  await page.screenshot({path:resolve(shots,'pwa-failure.png')}).catch(()=>{});
  console.error(await Promise.all(page.frames().map(async frame=>({url:frame.url(),text:await frame.locator('body').innerText().catch(()=>''),srcdoc:await frame.locator('iframe').first().getAttribute('srcdoc',{timeout:1000}).catch(()=>null)}))));
  throw error;
} finally {
  await context.close();
  server.closeAllConnections();
  await new Promise(resolve=>server.close(resolve));
  await rm(profile,{recursive:true,force:true});
}
