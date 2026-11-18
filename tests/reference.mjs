import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
const directory = new URL('../reference/', import.meta.url);
await mkdir(directory, {recursive:true});
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  for (const [name,url] of [['home','https://www.codedex.io/'],['python','https://www.codedex.io/python'],['lesson','https://www.codedex.io/python/01-setting-up'],['courses','https://www.codedex.io/courses'],['challenges','https://www.codedex.io/challenges']]) {
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
    await page.locator('body').waitFor();
    await page.screenshot({path:new URL(`${name}.png`,directory).pathname.replace(/^\/(\w:)/,'$1'),timeout:30000});
    console.log(name,await page.title());
  }
} finally { await browser.close(); }
