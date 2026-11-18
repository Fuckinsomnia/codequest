import { mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('./', import.meta.url);
for (const [pkg, files] of [['pyodide', ['pyodide.js', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json']], ['sql.js/dist', ['sql-wasm.js', 'sql-wasm.wasm']]]) {
  const target = new URL(pkg.startsWith('pyodide') ? 'public/runtime/python/' : 'public/runtime/sql/', root);
  await mkdir(target, { recursive: true });
  for (const file of files) await copyFile(new URL(`node_modules/${pkg}/${file}`, root), new URL(file, target));
}
console.log('Python and SQLite runtimes copied locally. No API key or runtime CDN required.');
