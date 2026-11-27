export function runCode(language, code, stdin, onStatus = () => {}, setupSql = null) {
  let worker;
  let timer;
  let settle;
  const promise = new Promise(resolve => {
    settle = result => { clearTimeout(timer); worker?.terminate(); resolve(result); };
    worker = new Worker(`${import.meta.env.BASE_URL}runner.js`);
    timer = setTimeout(() => settle({ error: 'Runtime belum siap. Muat ulang lalu coba lagi.' }), 60000);
    onStatus('Menyiapkan runtime lokal…');
    worker.onerror = e => settle({ error: e.message || 'Runtime tidak dapat dimuat.' });
    worker.onmessage = ({ data }) => {
      if (data.status === 'ready') {
        clearTimeout(timer);
        onStatus('Menjalankan kode…');
        timer = setTimeout(() => settle({ error: 'Batas waktu 5 detik terlampaui. Periksa loop atau tekan Run untuk mencoba lagi.' }), 5000);
        worker.postMessage({ command: 'run', language, code, stdin, setupSql });
      } else if (data.status === 'result' || data.status === 'error') settle(data);
    };
    worker.postMessage({ command: 'init', language });
  });
  return { promise, cancel: () => settle({ error: 'Eksekusi dihentikan.' }) };
}

export function makePreview(html, assertions = [], token = '', scripts = '') {
  const harness = function (rules, key, userScript) {
    const start = () => {
      if (userScript) { const script = document.createElement('script'); script.textContent = userScript; document.body.append(script); }
      requestAnimationFrame(() => {
        const failures = [];
        for (const rule of rules) {
          try {
            const nodes = document.querySelectorAll(rule.selector);
            const el = nodes[0];
            if (!el) { failures.push(`Elemen ${rule.selector} belum ditemukan.`); continue; }
            if (rule.count !== undefined && nodes.length !== rule.count) failures.push(`${rule.selector}: perlu ${rule.count} elemen, ditemukan ${nodes.length}.`);
            if (rule.text !== undefined && !el.textContent.includes(rule.text)) failures.push(`${rule.selector}: teks perlu memuat “${rule.text}”.`);
            if (rule.attribute && el.getAttribute(rule.attribute) !== rule.value) failures.push(`${rule.selector}: atribut ${rule.attribute} belum sesuai.`);
            if (rule.property) {
              // Grid tracks need layout before Chrome exposes their resolved sizes.
              el.getBoundingClientRect();
              const actual = getComputedStyle(el).getPropertyValue(rule.property).trim();
              let expected = rule.equals;
              if (rule.property === 'align-self' && actual !== expected) {
                // Browsers can serialize flex-start as flow-start; compare both through the same CSS engine.
                const probe = el.cloneNode(false);
                probe.style.setProperty(rule.property, expected, 'important');
                el.after(probe);
                expected = getComputedStyle(probe).getPropertyValue(rule.property).trim();
                probe.remove();
              }
              if (actual !== expected) failures.push(`${rule.selector}: properti ${rule.property} perlu bernilai ${rule.equals}, ditemukan ${actual}.`);
            }
          } catch { failures.push('Selector pada pemeriksaan tidak valid.'); }
        }
        parent.postMessage({ kind: 'preview-result', token: key, failures }, '*');
      });
    };
    if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
  };
  const safe = value => JSON.stringify(value).replace(/</g, '\\u003c');
  const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'">`;
  return `<!doctype html><html><head><meta charset="utf-8">${csp}<script>(${harness.toString()})(${safe(assertions)},${safe(token)},${safe(scripts)})<\/script></head><body>${html}</body></html>`;
}

export const normalizedOutput = value => String(value ?? '').replace(/\r\n/g, '\n').trim();
