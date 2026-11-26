const SCOPE_PATH = new URL(self.registration.scope).pathname;
const CACHE_PREFIX = `codequest-offline-${encodeURIComponent(SCOPE_PATH)}-`;
const CACHE_NAME = CACHE_PREFIX + __CACHE_VERSION__;
const PRECACHE = __PRECACHE_ASSETS__;
const paths = new Set(PRECACHE);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      await cache.addAll(PRECACHE.map(url => new Request(url, { cache: 'reload' })));
    } catch (error) {
      await caches.delete(CACHE_NAME);
      throw error;
    }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(`${SCOPE_PATH}index.html`, response.clone());
        return response;
      } catch {
        return (await cache.match(`${SCOPE_PATH}index.html`)) || Response.error();
      }
    })());
  } else if (paths.has(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url.pathname);
      const network = fetch(request).then(async response => {
        if (response.ok) await cache.put(url.pathname, response.clone());
        return response;
      }).catch(() => cached || Response.error());
      return cached || network;
    })());
  }
});
