import React, {useEffect, useState} from 'react';
import {Download, WifiOff, ShieldCheck, RefreshCw, X, CheckCircle2} from 'lucide-react';
import './pwa.css';

export default function Pwa({open, close, notify}) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true);
  const [online, setOnline] = useState(navigator.onLine);
  const [offline, setOffline] = useState('starting');
  const [waiting, setWaiting] = useState(null);
  const [persistent, setPersistent] = useState(false);
  const secure = window.isSecureContext;
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  useEffect(() => {
    const onPrompt = event => { event.preventDefault(); setInstallPrompt(event); };
    const onInstalled = () => { setInstalled(true); setInstallPrompt(null); };
    const onOnline = () => setOnline(navigator.onLine);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOnline);
    navigator.storage?.persisted?.().then(setPersistent).catch(() => {});
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOnline);
    };
  }, []);

  useEffect(() => {
    if (!secure || !('serviceWorker' in navigator)) { setOffline('unsupported'); return; }
    if (!import.meta.env.PROD) { setOffline('development'); return; }
    let disposed = false;
    let registration;
    let controller = navigator.serviceWorker.controller;
    const onController = () => {
      const previous = controller;
      controller = navigator.serviceWorker.controller;
      setWaiting(null);
      if (previous && controller !== previous) window.location.reload();
    };
    const updateFound = () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (disposed) return;
        if (worker.state === 'installed' && registration.active && registration.waiting) setWaiting(registration.waiting);
        if (worker.state === 'redundant' && !registration.active) setOffline('error');
      });
    };
    navigator.serviceWorker.addEventListener('controllerchange', onController);
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {scope: import.meta.env.BASE_URL, updateViaCache: 'none'}).then(async reg => {
      registration = reg;
      if (disposed) return;
      if (reg.waiting) setWaiting(reg.waiting);
      reg.addEventListener('updatefound', updateFound);
      updateFound();
      await navigator.serviceWorker.ready;
      if (!disposed) setOffline('ready');
    }).catch(() => { if (!disposed) setOffline('error'); });
    return () => {
      disposed = true;
      registration?.removeEventListener('updatefound', updateFound);
      navigator.serviceWorker.removeEventListener('controllerchange', onController);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const dialog = document.querySelector('.pwa-modal');
    const closeButton = dialog?.querySelector('.close-modal');
    closeButton?.focus();
    const trap = event => {
      if (event.key !== 'Tab' || !dialog) return;
      const elements = [...dialog.querySelectorAll('a[href],button:not(:disabled)')];
      const first = elements[0], last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', trap);
    return () => { document.removeEventListener('keydown', trap); previous?.focus(); };
  }, [open]);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const result = await installPrompt.userChoice;
    setInstallPrompt(null);
    if (result.outcome === 'accepted') notify('Ikuti konfirmasi browser untuk memasang CodeQuest.');
  }
  async function protectProgress() {
    try {
      const allowed = await navigator.storage.persist();
      setPersistent(allowed);
      notify(allowed ? 'Penyimpanan persisten diizinkan. Tetap buat cadangan progres.' : 'Browser belum memberi penyimpanan persisten. Gunakan ekspor progres sebagai cadangan.');
    } catch { notify('Browser ini tidak mendukung permintaan penyimpanan persisten. Gunakan ekspor progres.'); }
  }
  function update() {
    if (window.confirm('Simpan proyek Builds yang sedang diedit sebelum memperbarui. Muat ulang sekarang? Progres tersimpan tetap dipertahankan.')) waiting?.postMessage({type: 'ACTIVATE_UPDATE'});
  }
  if (!open) return null;
  return <div className="modal-backdrop" onClick={close}><section className="modal pwa-modal" role="dialog" aria-modal="true" aria-labelledby="pwa-title" onClick={event => event.stopPropagation()}>
    <button className="close-modal icon-btn" aria-label="Tutup aplikasi HP" onClick={close}><X/></button>
    <div className="pwa-symbol"><pre className="ascii-phone" aria-hidden="true">{`  .-------.\n  | >   _ |\n  |_______|`}</pre></div><p className="eyebrow accent">BELAJAR DI MANA SAJA</p><h2 id="pwa-title">CodeQuest di HP</h2>
    <p>Buka langsung di browser, atau tambahkan ke layar utama seperti aplikasi. Tanpa APK, Play Store, atau Android Studio.</p>
    <div className={`pwa-status ${offline === 'ready' ? 'ready' : ''}`} role="status">{offline === 'ready' ? <CheckCircle2 size={21}/> : <WifiOff size={21}/>}<div><strong>{offline === 'ready' ? 'Siap digunakan offline' : offline === 'development' ? 'Mode pengembangan' : offline === 'unsupported' ? 'PWA memerlukan HTTPS' : offline === 'error' ? 'Persiapan offline belum berhasil' : 'Menyiapkan materi offline…'}</strong><span>{offline === 'ready' ? `${online ? 'Terhubung' : 'Sedang offline'} · Materi dan lima editor kode tersedia di perangkat ini.` : offline === 'development' ? 'Buka versi produksi untuk memasang aplikasi dan mengunduh materi offline.' : offline === 'unsupported' ? 'Alamat HTTP jaringan lokal bisa dibuka, tetapi pemasangan dan offline memerlukan alamat HTTPS yang dipercaya browser.' : offline === 'error' ? 'Periksa ruang penyimpanan dan koneksi, lalu muat ulang. Progres yang sudah tersimpan tidak dihapus.' : 'Pertama kali: sekitar 18 MB. Biarkan halaman terbuka sampai persiapan selesai.'}</span></div></div>
    {installed ? <p className="pwa-installed"><CheckCircle2 size={18}/>Dibuka sebagai aplikasi mandiri</p> : installPrompt ? <button className="button yellow full-width" onClick={install}><Download size={18}/>Pasang di HP / perangkat ini</button> : <div className="pwa-instructions"><h3>Cara menambahkan ke layar utama</h3>{ios ? <ol><li>Buka alamat HTTPS CodeQuest di Safari.</li><li>Ketuk Bagikan, lalu Tambahkan ke Layar Utama.</li><li>Buka ikonnya dan tunggu status siap offline.</li></ol> : <ol><li>Buka alamat HTTPS CodeQuest di Chrome atau Edge.</li><li>Pilih menu browser, lalu Pasang aplikasi atau Tambahkan ke layar utama jika tersedia.</li><li>Kamu juga boleh terus belajar tanpa memasangnya.</li></ol>}</div>}
    <div className="pwa-storage"><h3><ShieldCheck size={19}/>Progres tetap di perangkatmu</h3><p>Progres, kode, catatan, dan Builds disimpan di IndexedDB, dengan cadangan lokal bila tersedia. Saat aplikasi dibuka online, rilis materi baru diperiksa dan dapat diterapkan lewat tombol pembaruan. Progres lama tetap disimpan.</p>{persistent ? <span className="pwa-persistent">Penyimpanan persisten diizinkan browser.</span> : navigator.storage?.persist && <button className="button small" onClick={protectProgress}>Lindungi penyimpanan progres</button>}<p className="pwa-warning">Tidak tersinkron otomatis antar-HP atau browser. Mode privat, menghapus data situs, atau menghapus aplikasi dapat menghilangkan data; ekspor cadangan secara berkala.</p><a className="text-link" href="#/progress" onClick={close}><Download size={16}/>Ekspor / impor progres</a></div>
    {waiting && <button className="button blue full-width pwa-update" onClick={update}><RefreshCw size={17}/>Pembaruan tersedia · Muat ulang</button>}
  </section></div>;
}
