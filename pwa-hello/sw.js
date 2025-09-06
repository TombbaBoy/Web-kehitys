const CACHE_NAME = 'hello-pwa';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './css/style.css',
  './images/icon.png',
  './images/background.jpg',
  './fonts/static/EpundaSlab-VariableFont_wght.tff',
  './fonts/static/EpundaSlab-VariableFont_wght.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        return response;
      } catch (error) {
        return caches.match(event.request);
      }
    })()
  );
});
