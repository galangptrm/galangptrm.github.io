importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log('Workbox available');
} else {
    console.log('Workbox not available');
}

const CACHE_LAYOUT = "layout_cache";
const CACHE_COMPETITION = "api_cache";

workbox.precaching.precacheAndRoute([
    { url: './index.html', revision: '1' },
    { url: './nav.html', revision: '1' },
    { url: './manifest.json', revision: '1' },
    { url: './css/materialize.min.css', revision: '1' },
    { url: './css/font.css', revision: '1' },
    { url: './font/material-icon.woff2', revision: '1' },
    { url: './js/materialize.min.js', revision: '1' },
    { url: './js/nav.js', revision: '1' },
    { url: './js/api_football.js', revision: '1' },
    { url: './js/db.js', revision: '1' },
    { url: './js/idb.js', revision: '1' },
    { url: './ball-192.png', revision: '1' },
    { url: './ball-500.png', revision: '1' },
    { url: './pages/favorit.html', revision: '1' },
    { url: './pages/liga.html', revision: '1' },
    { url: './tim.html', revision: '1' },
    { url: './main.js', revision: '1' }
    ],

    workbox.strategies.cacheFirst({
        cacheName : CACHE_LAYOUT
    })
);

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName : 'images'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('./pages/'),
    workbox.strategies.cacheFirst({
        cacheName: 'pages'
    })
  );
  workbox.routing.registerRoute(
    new RegExp('./font/'),
    workbox.strategies.cacheFirst({
        cacheName: 'fonts'
    })
  );
  workbox.routing.registerRoute(
    new RegExp('./js/'),
    workbox.strategies.cacheFirst({
        cacheName: 'scripts'
    })
  );
  workbox.routing.registerRoute(
    new RegExp('./css/'),
    workbox.strategies.cacheFirst({
        cacheName: 'styles'
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: CACHE_COMPETITION,
        plugins : [
                new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
                new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24, //1 hari
                maxEntries: 30,
            }),
        ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp('./tim.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'tim'
    })
  );

  // Menyimpan cache untuk file font selama 1 tahun
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: CACHE_COMPETITION,
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

// Push Listener
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/ball-144.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});