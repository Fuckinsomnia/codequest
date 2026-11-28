import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const root='http://127.0.0.1:5173';
const screenshots=new URL('./screenshots/',import.meta.url);
await mkdir(screenshots,{recursive:true});
const path=name=>new URL(name,screenshots).pathname.replace(/^\/(\w:)/,'$1');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const report=[];
const note=message=>{report.push(message);console.log('PASS',message);};
async function navigate(hash){await page.goto(root+hash);await page.locator('#root').waitFor();}
async function fillCode(code){const editor=page.locator('.cm-content').first();await editor.click();await editor.fill(code);}
async function closeSuccess(){await page.getByRole('dialog').waitFor({timeout:60000});await page.getByRole('button',{name:'Tutup',exact:true}).click();}
try{
  await navigate('/');await page.getByRole('heading',{name:/Coding.*Adventure/}).waitFor();await page.screenshot({path:path('home-desktop.png')});const graphics=await page.evaluate(()=>({images:document.images.length,ascii:document.querySelectorAll('.ascii-scene,.ascii-character,.ascii-mark,.realistic-ascii').length,rasterBackgrounds:[...document.querySelectorAll('.home-hero,.course-art')].filter(el=>getComputedStyle(el).backgroundImage.includes('url(')).length}));assert.equal(graphics.images,0);assert.ok(graphics.ascii>0);assert.equal(graphics.rasterBackgrounds,0);const asciiUi=await page.evaluate(()=>({font:getComputedStyle(document.body).fontFamily,heading:getComputedStyle(document.querySelector('h1')).fontFamily,radius:getComputedStyle(document.querySelector('.button')).borderRadius}));assert.match(asciiUi.font,/Consolas|Courier|monospace/);assert.match(asciiUi.heading,/Consolas|Courier|monospace/);assert.equal(asciiUi.radius,'0px');assert.ok(await page.getByRole('img',{name:'Karakter ladybug petualang'}).count()>0);assert.equal(await page.locator('.home-hero .hero-ascii').count(),1);const heroBounds=await page.locator('.home-hero').evaluate(hero=>{const art=hero.querySelector('.hero-ascii').getBoundingClientRect();const frame=hero.getBoundingClientRect();return {width:Math.round(art.width),height:Math.round(art.height),frameWidth:Math.round(frame.width),frameHeight:Math.round(frame.height)};});assert.equal(heroBounds.width,heroBounds.frameWidth);assert.equal(heroBounds.height,heroBounds.frameHeight);await page.locator('.nav-dropdown').first().hover();await page.locator('.dropdown-menu').first().getByRole('link',{name:'Python',exact:true}).waitFor();note('Full-frame Seychelles ASCII fills the home hero and Learn opens on hover');
  const allCourses=await page.evaluate(async()=>{const m=await import('/src/data/index.js');return m.courses;});
  await navigate('/#/courses');await page.getByRole('textbox',{name:'Cari kursus',exact:true}).fill('Python');assert.equal(await page.locator('.catalog-all .course-card').count(),allCourses.filter(c=>`${c.title} ${c.description}`.toLowerCase().includes('python')).length);await page.getByRole('textbox',{name:'Cari kursus',exact:true}).fill('xyz-nonexistent');assert.equal(await page.locator('.catalog-all .course-card').count(),0);await page.getByRole('button',{name:'Hapus filter',exact:true}).click();assert.equal(await page.locator('.catalog-all .course-card').count(),allCourses.length);const uniqueArt=await page.locator('.catalog-all .course-card .course-art').evaluateAll(nodes=>new Set(nodes.map(node=>node.querySelector('.realistic-ascii')?`photo:${node.dataset.courseId}`:node.textContent)).size);assert.equal(uniqueArt,allCourses.length);assert.equal(await page.locator('.catalog-all .course-card .photo-ascii .realistic-ascii').count(),allCourses.length);const palette=await page.locator('[data-art="python-photo"] canvas').first().evaluate(canvas=>{const data=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;let green=0,magenta=0,cyan=0;for(let i=0;i<data.length;i+=4){const r=data[i],g=data[i+1],b=data[i+2];if(g>r*1.2&&g>b*1.1)green++;if(r>150&&b>120&&g<r*.7)magenta++;if(b>150&&g>120&&r<b*.7)cyan++;}return {green,magenta,cyan};});assert.ok(palette.green>palette.magenta+palette.cyan);note('Catalog search, 61 photo-based ASCII illustrations, and source-color dominance');
  await navigate('/#/course/python');await page.getByRole('heading',{name:'Python',exact:true}).waitFor();assert.equal(await page.locator('.lesson-row').count(),43);await page.screenshot({path:path('python-course.png')});note('43 Python lessons open without login');
  await navigate('/#/lesson/python/python-01');await page.locator('.cm-content').waitFor();await fillCode('print("salah")');await page.getByRole('button',{name:'Submit answer',exact:true}).click();await page.locator('.result-box.failure').waitFor({timeout:60000});assert.equal(await page.locator('.success-modal').count(),0);note('Wrong Python answer rejected');
  const py=allCourses.find(c=>c.id==='python').lessons[0];await fillCode(py.solution);await page.getByRole('button',{name:'Submit answer',exact:true}).click();await closeSuccess();await page.getByRole('button',{name:'Submit answer',exact:true}).click();await closeSuccess();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('codequest-v1')).completed.length===1);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('codequest-v1')).completed.length),1);note('Real Python execution, completion, no duplicate XP');
  await page.getByRole('button',{name:'Simpan pelajaran',exact:true}).click();await page.getByRole('button',{name:'Catatan pribadi',exact:true}).click();await page.getByRole('textbox',{name:'Catatan pribadi',exact:true}).fill('Belajar print dan string.');await page.waitForFunction(()=>JSON.parse(localStorage.getItem('codequest-v1')).notes['python-01']);await page.reload();await page.getByRole('button',{name:'Catatan pribadi',exact:true}).click();assert.equal(await page.getByRole('textbox',{name:'Catatan pribadi',exact:true}).inputValue(),'Belajar print dan string.');await page.getByRole('button',{name:'Exercise',exact:true}).click();note('Notes, bookmarks and draft survive reload');
  await fillCode('while True:\n    pass');await page.getByRole('button',{name:'Run',exact:true}).click();await page.getByText(/Batas waktu 5 detik/).waitFor({timeout:60000});await fillCode(py.solution);await page.getByRole('button',{name:'Run',exact:true}).click();await page.locator('.terminal-output pre').filter({hasText:py.expected}).waitFor({timeout:60000});note('Infinite loop stopped; runtime recovers');await page.screenshot({path:path('lesson-desktop.png')});
  const quiz=allCourses.find(c=>c.id==='react').lessons[0];await navigate(`/#/lesson/react/${quiz.id}`);await page.locator('.quiz-option').nth((quiz.answer+1)%4).click();await page.getByRole('button',{name:'Periksa jawaban'}).click();await page.locator('.result-box.failure').waitFor();await page.locator('.quiz-option').nth(quiz.answer).click();await page.getByRole('button',{name:'Periksa jawaban'}).click();await closeSuccess();note('Quiz validates answers and awards progress');
  await navigate('/#/courses');
  for(const level of ['Menengah','Expert']){
    await page.getByRole('combobox',{name:'Tingkat kesulitan'}).selectOption(level);
    assert.equal(await page.locator('.catalog-all .course-card').count(),allCourses.filter(c=>c.level===level).length);
  }
  await page.locator('.catalog-tools').scrollIntoViewIfNeeded();
  await page.screenshot({path:path('expert-catalog.png')});
  await navigate('/#/course/python');
  await page.getByRole('navigation',{name:'Level kursus',exact:true}).getByRole('link',{name:'Intermediate',exact:true}).click();
  await page.waitForURL('**/#/course/intermediate-python');
  await page.getByRole('navigation',{name:'Level kursus',exact:true}).getByRole('link',{name:'Expert',exact:true}).click();
  await page.waitForURL('**/#/course/expert-python');
  await page.locator('.course-level-note').getByRole('link',{name:'Intermediate Python',exact:true}).waitFor();
  const training=page.getByRole('link',{name:'Latihan (Training)',exact:true});assert.equal(await training.getAttribute('href'),'#/practice/exercism?track=python');await training.click();await page.getByRole('heading',{name:'Materi Exercism',exact:true}).waitFor();assert.equal(await page.locator('[data-exercism-card]').count(),119);
  note('Intermediate and Expert links work; Training opens filtered Python exercises');
  for(const course of allCourses.slice(26).filter(c=>c.lessons.every(l=>l.type==='quiz'))){
    const lesson=course.lessons[0];
    await navigate(`/#/lesson/${course.id}/${lesson.id}`);
    await page.locator('.quiz-option').nth((lesson.answer+1)%4).click();await page.getByRole('button',{name:'Periksa jawaban'}).click();await page.locator('.result-box.failure').waitFor();
    await page.locator('.quiz-option').nth(lesson.answer).click();await page.getByRole('button',{name:'Periksa jawaban'}).click();await closeSuccess();
  }
  note('Every new conceptual course rejects a wrong answer and saves a correct answer');
  await navigate('/#/practice/exercism');await page.getByRole('heading',{name:'Materi Exercism',exact:true}).waitFor();assert.equal(await page.locator('[data-exercism-card]').count(),132);await page.getByRole('searchbox',{name:'Cari materi Exercism'}).fill('Two-Fer');assert.equal(await page.locator('[data-exercism-card]').count(),1);await page.getByRole('searchbox',{name:'Cari materi Exercism'}).fill('');await page.getByRole('combobox',{name:'Tingkat kesulitan Exercism'}).selectOption('1-2');assert.ok(await page.locator('[data-exercism-card]').count()>0);await page.getByRole('button',{name:'Hapus filter',exact:true}).click();await page.getByRole('button',{name:'SQLite',exact:true}).click();assert.equal(await page.locator('[data-exercism-card]').count(),79);note('Exercism library exposes 132 filtered problems with working search and track filters');
  await navigate('/#/practice/exercism/two-fer?lang=python');await page.getByRole('heading',{name:'Two-Fer',exact:true}).waitFor();await fillCode('def two_fer(name):\n    return f"One for {name}, one for me."\n\nprint(two_fer("Ayu"))');await page.getByRole('button',{name:'Run',exact:true}).click();await page.locator('.exercism-output pre').filter({hasText:'One for Ayu, one for me.'}).waitFor({timeout:60000});await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Tandai selesai',exact:true}).click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('codequest-v1')).completed.includes('exercism-python-two-fer'));await page.reload();await page.getByRole('button',{name:'Sudah selesai',exact:true}).waitFor();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('codequest-v1')).drafts['exercism-python-two-fer']),'def two_fer(name):\n    return f"One for {name}, one for me."\n\nprint(two_fer("Ayu"))');note('Exercism Python editor runs code and persists draft and completion locally');
  await navigate('/#/practice/exercism/two-fer?lang=javascript');await page.locator('.file-tab').filter({hasText:'latihan.js'}).waitFor();await fillCode('export const twoFer = name => `One for ${name}, one for me.`;\nconsole.log(twoFer("Bima"));');await page.getByRole('button',{name:'Run',exact:true}).click();await page.locator('.exercism-output pre').filter({hasText:'One for Bima, one for me.'}).waitFor({timeout:60000});note('Exercism JavaScript editor handles module-style starters in the local runner');
  await navigate('/#/practice/exercism/lens-person?lang=javascript');await page.locator('.file-tab').filter({hasText:'latihan.js'}).waitFor();await page.getByRole('button',{name:'Run',exact:true}).click();await page.locator('.exercism-output').filter({hasText:'(Tidak ada output)'}).waitFor({timeout:60000});assert.equal(await page.locator('.exercism-output .error-text').count(),0);note('Exercism JavaScript support modules load before multi-file exercise starters');
  await navigate('/#/practice/exercism/acronym?lang=sqlite');await page.locator('.file-tab').filter({hasText:'latihan.sql'}).waitFor();await fillCode('SELECT COUNT(*) AS total FROM acronym;');await page.getByRole('button',{name:'Run',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.exercism-output pre')?.textContent.trim()==='total\n9',{},{timeout:60000});note('Exercism SQLite editor creates the imported fixture before running queries');
  const coreResults=await page.evaluate(async(courses)=>{
    const records=[];
    for(const lang of ['python','javascript','sql']){
      const worker=new Worker('/runner.js');
      const call=data=>new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error('timeout '+lang)),60000);worker.onmessage=e=>{if(e.data.status==='ready'||e.data.status==='result'||e.data.status==='error'){clearTimeout(t);resolve(e.data);}};worker.onerror=e=>{clearTimeout(t);reject(new Error(e.message));};worker.postMessage(data);});
      const ready=await call({command:'init',language:lang});if(ready.status!=='ready')throw new Error(JSON.stringify(ready));
      for(const lesson of courses.flatMap(c=>c.lessons).filter(l=>l.type==='code'&&l.language===lang)){
        for(const kind of /^(expert|intermediate)-/.test(lesson.id)?['solution','starter']:['solution']){
          const result=await call({command:'run',language:lang,code:lesson[kind],stdin:lesson.stdin||''});
          const passes=!result.error&&String(result.output||'').trim()===lesson.expected.trim();
          records.push({id:lesson.id,kind,ok:kind==='solution'?passes:!passes,actual:result.output,error:result.error,expected:lesson.expected});
        }
      }
      worker.terminate();
    }
    return records;
  },allCourses);
  assert.deepEqual(coreResults.filter(r=>!r.ok),[]);note(`${coreResults.filter(r=>r.kind==='solution').length} Python, JavaScript and SQLite solutions run correctly; intermediate/expert starters fail`);
  const webResults=await page.evaluate(async(courses)=>{
    const {makePreview}=await import('/src/engine.js');const records=[];
    for(const lesson of courses.flatMap(c=>c.lessons).filter(l=>l.type==='code'&&['html','css'].includes(l.language))){
      for(const kind of lesson.id==='css-08'?[...Array(50).fill('solution'),'starter']:lesson.id==='css-12'?['solution','starter','flex-end','stretch']:['solution','starter']){
        const source=['flex-end','stretch'].includes(kind)?lesson.solution.replace('align-self: flex-start',`align-self: ${kind}`):lesson[kind];
        const token=crypto.randomUUID();const frame=document.createElement('iframe');frame.setAttribute('sandbox','allow-scripts');frame.style='position:fixed;width:900px;height:600px;left:0;top:0;z-index:999';document.body.append(frame);
        const result=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{window.removeEventListener('message',handler);reject(new Error('Preview timeout '+lesson.id));},10000);const handler=e=>{if(e.source===frame.contentWindow&&e.data?.token===token){clearTimeout(timer);window.removeEventListener('message',handler);resolve(e.data.failures);}};window.addEventListener('message',handler);frame.srcdoc=makePreview(source,lesson.assertions,token);});
        records.push({id:lesson.id,kind,ok:kind==='solution'?result.length===0:result.length>0,failures:result});frame.remove();
      }
    }return records;
  },allCourses);
  assert.deepEqual(webResults.filter(r=>!r.ok),[]);note(`${new Set(webResults.map(r=>r.id)).size} HTML/CSS solutions pass; all starters fail validation`);
  const html=allCourses.find(c=>c.id==='html').lessons[0];await navigate(`/#/lesson/html/${html.id}`);await fillCode(html.solution);await page.getByRole('button',{name:'Submit answer',exact:true}).click();await closeSuccess();note('HTML sandbox checks integrate with real completion UI');
  await navigate('/#/builds/new');await page.getByRole('textbox',{name:'Nama proyek'}).fill('Uji website');await page.getByRole('button',{name:'Run preview'}).click();await page.frameLocator('iframe[title="Preview proyek"]').getByRole('button',{name:'Katakan halo'}).click();await page.frameLocator('iframe[title="Preview proyek"]').getByText('Halo, petualang! Teruslah membuat sesuatu.').waitFor();await page.getByRole('button',{name:'Simpan',exact:true}).click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('codequest-v1')).builds.length===1);await navigate('/#/builds');await page.getByRole('link',{name:/Uji website/}).click();await page.getByRole('textbox',{name:'Nama proyek'}).waitFor();assert.equal(await page.getByRole('textbox',{name:'Nama proyek'}).inputValue(),'Uji website');note('Build preview JavaScript, save, reopen');
  await navigate('/#/projects');const uniqueProjectArt=await page.locator('.project-card .course-art').evaluateAll(nodes=>new Set(nodes.map(node=>node.dataset.art)).size);assert.equal(uniqueProjectArt,6);assert.equal(await page.locator('.project-card .realistic-ascii').count(),6);await navigate('/#/projects/personal-page');await page.getByRole('checkbox').first().check();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('codequest-v1')).projectSteps['personal-page']?.includes(0));await page.reload();assert.equal(await page.getByRole('checkbox').first().isChecked(),true);note('Six photo-based ASCII project illustrations and guided-project checklist persist');
  await navigate('/#/progress');const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Ekspor progres'}).click();const download=await downloadPromise;assert.ok(download.suggestedFilename().endsWith('.json'));note('Progress JSON export');await page.screenshot({path:path('progress-desktop.png')});
  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/#/courses','/#/course/python','/#/practice','/#/practice/exercism','/#/practice/exercism/two-fer?lang=python','/#/projects','/#/30-days','/#/progress']){await mobile.goto(root+route);await mobile.locator('#root').waitFor();const widths=await mobile.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(widths.scroll<=widths.viewport+1,`${route}: horizontal overflow ${JSON.stringify(widths)}`);}
  await mobile.setViewportSize({width:320,height:720});
  for(const route of ['/','/#/courses','/#/course/python','/#/practice','/#/practice/exercism','/#/practice/exercism/two-fer?lang=python','/#/projects','/#/30-days','/#/progress']){await mobile.goto(root+route);await mobile.getByRole('heading').first().waitFor();const widths=await mobile.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(widths.scroll<=widths.viewport+1,`${route} at 320px: horizontal overflow ${JSON.stringify(widths)}`);}
  await mobile.setViewportSize({width:390,height:844});
  await mobile.goto(root);await mobile.screenshot({path:path('home-mobile.png')});await mobile.getByRole('button',{name:'Buka menu',exact:true}).click();await mobile.getByRole('link',{name:'Coding Challenges',exact:true}).first().click();await mobile.getByRole('heading',{name:'Coding Challenges',exact:true}).waitFor();note('Mobile pages fit screen and menu navigation works');
  await mobile.goto(root+'/#/lesson/python/python-01');await mobile.getByRole('button',{name:'Code',exact:true}).click();await mobile.locator('.cm-content').click();await mobile.locator('.cm-content').fill(py.solution);await mobile.getByRole('button',{name:'Submit answer',exact:true}).click();await mobile.getByRole('dialog').waitFor({timeout:60000});await mobile.getByRole('button',{name:'Tutup',exact:true}).click();await mobile.screenshot({path:path('lesson-mobile.png')});note('Mobile coding exercise works');
  const layoutIssues=[];
  for(const course of allCourses){
    for(const url of [`/#/course/${course.id}`,`/#/lesson/${course.id}/${course.lessons[0].id}`]){
      await mobile.goto(root+url);
      await mobile.getByRole('heading',{name:url.includes('/lesson/')?`01. ${course.lessons[0].title}`:course.title,exact:true}).waitFor();
      const widths=await mobile.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
      if(widths.scroll>widths.viewport+1)layoutIssues.push({url,...widths});
    }
  }
  assert.deepEqual(layoutIssues,[]);note(`All ${allCourses.length} course and lesson layouts fit mobile screens`);
  await mobile.goto(root+'/#/course/expert-python');await mobile.getByRole('navigation',{name:'Level kursus',exact:true}).waitFor();await mobile.screenshot({path:path('expert-mobile.png')});
  await navigate('/#/progress');
  const backup=await page.evaluate(()=>JSON.parse(localStorage.getItem('codequest-v1')));
  await page.locator('input[type="file"]').setInputFiles({name:'broken.json',mimeType:'application/json',buffer:Buffer.from('{broken')});
  await page.locator('.toast').waitFor();assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('codequest-v1'))),backup);
  page.once('dialog',dialog=>dialog.dismiss());await page.getByRole('button',{name:'Hapus semua progres'}).click();
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('codequest-v1'))),backup);
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('input[type="file"]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...backup,name:'Penguji cadangan'}))});
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('codequest-v1')).name==='Penguji cadangan');
  note('Malformed import rejected, reset cancellation and valid backup import work');
  for(const lesson of allCourses.find(c=>c.id==='react').lessons){
    await navigate(`/#/lesson/react/${lesson.id}`);await page.locator('.quiz-option').nth(lesson.answer).click();await page.getByRole('button',{name:'Periksa jawaban'}).click();await closeSuccess();
  }
  await navigate('/#/course/react');await page.getByRole('button',{name:'Lihat sertifikat'}).click();
  await page.getByRole('dialog',{name:'Sertifikat belajar mandiri'}).waitFor();
  assert.equal(await page.locator('.certificate h1').innerText(),'Penguji cadangan');
  await page.getByRole('button',{name:'Tutup sertifikat'}).click();note('Completing a course unlocks the independent certificate');
  await navigate('/#/progress');await page.getByRole('button',{name:'Aktifkan mode terang'}).click();await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');
  const lightColors=await page.evaluate(()=>{const color=selector=>getComputedStyle(document.querySelector(selector));return {header:color('.site-header').backgroundColor,footer:color('.site-footer').backgroundColor,nav:color('.site-header nav>a,.nav-dropdown>a').color,menu:color('.dropdown-menu').backgroundColor,menuText:color('.dropdown-menu a').color,footerText:color('.footer-grid>div').color};});assert.equal(lightColors.header,'rgb(255, 255, 255)');assert.equal(lightColors.footer,'rgb(255, 255, 255)');assert.equal(lightColors.nav,'rgb(28, 41, 68)');assert.equal(lightColors.menu,'rgb(255, 255, 255)');assert.equal(lightColors.menuText,'rgb(28, 41, 68)');assert.equal(lightColors.footerText,'rgb(76, 97, 126)');
  await page.screenshot({path:path('progress-light.png')});await page.getByRole('button',{name:'Aktifkan mode gelap'}).click();note('Theme persists; light header footer and dropdowns have readable contrast');
  assert.deepEqual(errors,[]);note('No browser JavaScript errors');console.log(`\n${report.length} groups passed.`);
}finally{await browser.close();}
