// Событие install запускается при первом запуске сервис-воркера
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                // Добавьте другие ресурсы, которые нужно кэшировать
            ]);
        })
    );
});
// Событие fetch перехватывает запросы и возвращает кэшированные ресурсы
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
// Событие activate запускается после установки сервис-воркера
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => cacheName !== 'my-cache').map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});