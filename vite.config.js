import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';

function offlineBundle() {
  let base = '/';
  return {
    name: 'codequest-offline',
    apply: 'build',
    configResolved(config) { base = config.base; },
    generateBundle: {
      order: 'post',
      async handler(_, bundle) {
        const files = [];
        async function collect(directory, prefix = '') {
          for (const entry of await readdir(directory, { withFileTypes: true })) {
            const path = `${prefix}${entry.name}`;
            if (entry.isDirectory()) await collect(new URL(`${entry.name}/`, directory), `${path}/`);
            else if (entry.isFile() && path !== 'meadow.png') files.push([`${base}${path}`, await readFile(new URL(entry.name, directory))]);
          }
        }
        await collect(new URL('./public/', import.meta.url));
        for (const [name, item] of Object.entries(bundle)) files.push([`${base}${name}`, item.type === 'chunk' ? item.code : item.source]);
        const template = await readFile(new URL('./service-worker.js', import.meta.url), 'utf8');
        const hash = createHash('sha256').update(template);
        files.sort(([a], [b]) => a.localeCompare(b));
        for (const [name, contents] of files) hash.update(name).update(contents);
        this.emitFile({
          type: 'asset', fileName: 'sw.js',
          source: template.replace('__CACHE_VERSION__', JSON.stringify(hash.digest('hex').slice(0, 16))).replace('__PRECACHE_ASSETS__', JSON.stringify(files.map(([name]) => name)))
        });
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), offlineBundle()],
  server: { port: 5173, strictPort: true },
  preview: { port: 5174, strictPort: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules') && /codemirror|@lezer/.test(id)) return 'editor';
        }
      }
    }
  }
});
