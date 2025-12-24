const CACHE_NAME = 'sis-so-v4';
const urlsToCache = [
  './',
  './index.html',
  './dashboard_master.html',
  './dashboard_user.html',
  './list_plu.html',
  './kk_so.html',
  './general.html',
  './input_produk.html'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});