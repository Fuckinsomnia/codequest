import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import python from '../src/data/python.js';
import {coreCourses} from '../src/data/core-courses.js';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 const page=await browser.newPage();
 await page.goto('http://127.0.0.1:5173/favicon.svg');
 const results=await page.evaluate(async courses=>{
  const results=[];
  for(const course of courses.filter(c=>['python','javascript','sql'].includes(c.id))){
   const worker=new Worker('/runner.js');
   const send=data=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>{worker.terminate();reject(new Error('Timeout '+course.id));},60000);worker.onmessage=e=>{if(['ready','result','error'].includes(e.data.status)){clearTimeout(timer);resolve(e.data);}};worker.onerror=e=>{clearTimeout(timer);reject(new Error(e.message));};worker.postMessage(data);});
   const ready=await send({command:'init',language:course.id});
   if(ready.status!=='ready')throw new Error(JSON.stringify(ready));
   for(const lesson of course.lessons){const r=await send({command:'run',language:course.id,code:lesson.solution,stdin:lesson.stdin||''});results.push({id:lesson.id,ok:!r.error&&String(r.output||'').trim()===lesson.expected.trim(),error:r.error,actual:r.output,expected:lesson.expected});}
   worker.terminate();
  }
  return results;
 },[python,...coreCourses]);
 assert.deepEqual(results.filter(r=>!r.ok),[]);
 console.log(`${results.length} real Python/JavaScript/SQLite lesson solutions passed.`);
}finally{await browser.close();}
