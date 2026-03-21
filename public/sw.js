// Service Worker - czyszczenie cache przy każdym update
const CACHE_NAME = 'eduswipe-v' + Date.now();

self.addEventListener('install', (event) => {
  // Wymusić aktywację nowego service workera
  self.skipWaiting();
  console.log('🔄 Service Worker: zainstalowany z nową wersją');
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
  // Przejąć kontrolę od razu
  self.clients.claim();
  console.log('✅ Service Worker: aktywny');
});

self.addEventListener('fetch', (event) => {
  // Dla ikon - zawsze pobieraj z sieci
  if (event.request.url.includes('logo-') || event.request.url.includes('mipmap')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Dla pozostałych - cache first
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((res) => {
        const cache = caches.open(CACHE_NAME);
        cache.then((c) => c.put(event.request, res.clone()));
        return res;
      });
    })
  );
});
