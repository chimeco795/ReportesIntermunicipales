const PREFIX = 'reportes-intermunicipales-';
const CACHE = PREFIX + 'v2';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const HOME = new URL('./index.html', self.registration.scope).href;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (event.request.mode === 'navigate') {
      try {
        const response = await fetch(event.request);
        if (response.ok && (url.pathname === new URL(HOME).pathname || url.pathname === new URL(self.registration.scope).pathname)) {
          await cache.put(HOME, response.clone());
        }
        return response;
      } catch {
        return (await cache.match(HOME)) || Response.error();
      }
    }
    const cached = await cache.match(event.request, {ignoreSearch: true});
    return cached || fetch(event.request);
  })());
});
