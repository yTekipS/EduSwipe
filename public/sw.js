// Service Worker - Advanced caching strategy with performance optimization
const CACHE_NAME = 'eduswipe-v' + Date.now();
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-min.png',
  '/logo-full.png'
];

self.addEventListener('install', (event) => {
  // Pre-cache static assets
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
  console.log('🔄 Service Worker: zainstalowany z cache');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: usunięto stary cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
  console.log('✅ Service Worker: aktywny');
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Network-first dla API requests
  if (url.pathname.includes('/api/') || url.hostname !== 'localhost') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Dla ikon - zawsze pobieraj z sieci
  if (request.url.includes('logo-') || request.url.includes('mipmap')) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  // Cache-first dla statycznych assets
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) return response;

      return fetch(request).then((res) => {
        // Nie cachuj non-successful responses
        if (!res || res.status !== 200 || res.type === 'error') {
          return res;
        }

        const responseClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });

        return res;
      });
    })
  );
});
