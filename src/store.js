export const STORAGE_KEY = 'codequest-v1';
export const freshState = () => ({ completed: [], drafts: {}, lastLesson: null, daily: {}, bookmarks: [], notes: {}, projectSteps: {}, builds: [], name: 'Petualang', avatar: 0 });
export const createId = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
const textMap = (value, maxLength = 100000) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key, item]) => key.length <= 100 && typeof item === 'string' && item.length <= maxLength).slice(0, 1000));
};
export function validateState(value) {
  if (!value || typeof value !== 'object' || !Array.isArray(value.completed)) throw new Error('Berkas progres CodeQuest tidak valid.');
  const strings = list => Array.isArray(list) ? [...new Set(list.filter(x => typeof x === 'string' && /^[a-z0-9-]+$/.test(x)).slice(0, 1000))] : [];
  return {
    completed: strings(value.completed),
    drafts: textMap(value.drafts),
    lastLesson: typeof value.lastLesson === 'string' && /^[a-z0-9/-]+$/.test(value.lastLesson) ? value.lastLesson : null,
    daily: Object.fromEntries(Object.entries(value.daily || {}).filter(([k, v]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && Number.isInteger(v) && v >= 0 && v <= 10000).slice(-1000)),
    bookmarks: strings(value.bookmarks), notes: textMap(value.notes, 10000),
    projectSteps: Object.fromEntries(Object.entries(value.projectSteps || {}).filter(([k, v]) => /^[a-z0-9-]+$/.test(k) && Array.isArray(v)).map(([k, v]) => [k, [...new Set(v.filter(n => Number.isInteger(n) && n >= 0 && n < 30))]])),
    builds: Array.isArray(value.builds) ? value.builds.filter(b => b && typeof b.id === 'string' && typeof b.title === 'string' && typeof b.html === 'string' && typeof b.css === 'string' && typeof b.js === 'string').slice(0, 30).map(b => ({ id: b.id.slice(0, 80), title: b.title.slice(0, 80), html: b.html.slice(0, 100000), css: b.css.slice(0, 100000), js: b.js.slice(0, 100000), updated: typeof b.updated === 'string' ? b.updated : '' })) : [],
    name: typeof value.name === 'string' ? value.name.slice(0, 40) : 'Petualang',
    avatar: Number.isInteger(value.avatar) && value.avatar >= 0 && value.avatar <= 3 ? value.avatar : 0
  };
}
export function loadState() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? validateState(JSON.parse(raw)) : freshState(); }
  catch { return freshState(); }
}
let database;
let lastSavedAt = 0;
function progressDatabase() {
  if (!database) database = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') { reject(new Error('IndexedDB tidak tersedia.')); return; }
    const request = indexedDB.open('codequest', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('progress');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('Tutup tab CodeQuest lain lalu muat ulang.'));
  });
  return database;
}
export async function loadPersistedState() {
  let localSavedAt = 0;
  try { localSavedAt = Number(localStorage.getItem(`${STORAGE_KEY}-saved-at`)) || 0; } catch {}
  try {
    const db = await progressDatabase();
    const record = await new Promise((resolve, reject) => {
      const request = db.transaction('progress').objectStore('progress').get('current');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    if (record && record.savedAt >= localSavedAt) {
      lastSavedAt = record.savedAt;
      return validateState(record.state);
    }
  } catch {}
  lastSavedAt = localSavedAt;
  return loadState();
}
export async function saveProgress(state) {
  const savedAt = Math.max(Date.now(), lastSavedAt + 1);
  lastSavedAt = savedAt;
  let localSaved = false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(`${STORAGE_KEY}-saved-at`, String(savedAt));
    localSaved = true;
  } catch {}
  try {
    const db = await progressDatabase();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction('progress', 'readwrite');
      transaction.objectStore('progress').put({ savedAt, state }, 'current');
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } catch {
    if (!localSaved) throw new Error('Penyimpanan perangkat penuh atau diblokir. Ekspor progres sebelum menutup aplikasi.');
  }
}
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function streak(daily, today = new Date()) {
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!daily[localDate(cursor)]) cursor.setDate(cursor.getDate() - 1);
  let count = 0;
  while (daily[localDate(cursor)]) { count++; cursor.setDate(cursor.getDate() - 1); }
  return count;
}
export function completeLesson(state, id) {
  if (state.completed.includes(id)) return state;
  const date = localDate();
  return { ...state, completed: [...state.completed, id], daily: { ...state.daily, [date]: (state.daily[date] || 0) + 1 } };
}
export function downloadFile(name, content, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
