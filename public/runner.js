let engine;
let output = [];
let outputSize = 0;
function emit(...args) {
  const line = args.map(v => typeof v === 'string' ? v : JSON.stringify(v) ?? String(v)).join(' ');
  outputSize += line.length + 1;
  if (outputSize > 20000) throw new Error('Output melebihi 20.000 karakter. Periksa perulanganmu.');
  output.push(line);
}
self.onmessage = async ({ data }) => {
  try {
    if (data.command === 'init') {
      if (data.language === 'python') {
        const runtime = new URL('runtime/python/', self.location.href).href;
        importScripts(`${runtime}pyodide.js`);
        engine = await loadPyodide({ indexURL: runtime });
      } else if (data.language === 'sql') {
        const runtime = new URL('runtime/sql/', self.location.href).href;
        importScripts(`${runtime}sql-wasm.js`);
        engine = await initSqlJs({ locateFile: f => `${runtime}${f}` });
      }
      self.postMessage({ status: 'ready' });
      return;
    }
    output = [];
    outputSize = 0;
    if (data.language === 'python') {
      const lines = (data.stdin || '').split('\n');
      engine.setStdin({ stdin: () => lines.length ? lines.shift() : null });
      engine.setStdout({ batched: emit });
      engine.setStderr({ batched: emit });
      const globals = engine.toPy({ __name__: '__main__' });
      try { await engine.runPythonAsync(data.code, { globals }); }
      finally { globals.destroy(); }
    } else if (data.language === 'sql') {
      const db = new engine.Database();
      try {
        db.run("CREATE TABLE learners (id INTEGER PRIMARY KEY, name TEXT, xp INTEGER, track TEXT); INSERT INTO learners VALUES (1,'Ayu',120,'Python'),(2,'Bima',80,'HTML'),(3,'Citra',200,'Python'),(4,'Danu',50,'SQL'),(5,'Eka',150,'HTML');");
        const results = db.exec(data.code);
        for (const result of results) {
          emit(result.columns.join(' | '));
          for (const row of result.values) emit(row.map(v => v === null ? 'NULL' : String(v)).join(' | '));
        }
        if (!results.length) emit('Query berhasil.');
      } finally { db.close(); }
    } else {
      const capturedConsole = { log: emit, info: emit, warn: emit, error: emit, table: emit };
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      await new AsyncFunction('console', 'fetch', 'XMLHttpRequest', 'WebSocket', 'importScripts', data.code)(capturedConsole, undefined, undefined, undefined, undefined);
    }
    self.postMessage({ status: 'result', output: output.join('\n') });
  } catch (error) {
    self.postMessage({ status: 'error', output: output.join('\n'), error: String(error.message || error).slice(-3000) });
  }
};
