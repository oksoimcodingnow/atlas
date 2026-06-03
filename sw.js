/* Atlas service worker — cache-first with on-the-fly population.
 * Bump CACHE_VERSION to force a refresh after deploying changes.
 */
const CACHE_VERSION = 'atlas-v34';
const ASSETS = [
  './',
  './index.html',
  './skills.html',
  './schedule.html',
  './markets.html',
  './macro-map.html',
  './overview.html',
  './semiconductors.html',
  './ai-ripple.html',
  './library/',
  './library/index.html',
  './library/commands.html',
  './library/formulas.html',
  './library/coding.html',
  './library/valuation.html',
  './learn/',
  './learn/index.html',
  './learn/01-edge-not-prediction.html',
  './learn/02-risk.html',
  './learn/03-backtests-lie.html',
  './learn/04-sizing.html',
  './learn/05-ml-honestly.html',
  './demos/',
  './demos/index.html',
  './demos/start-here.html',
  './demos/handshake.html',
  './demos/handshake-live.html',
  './demos/study-flow.html',
  './demos/showcase.html',
  './lib/atlas-fx.js',
  './manifest.json',
  './icons/atlas-192.png',
  './icons/atlas-512.png',
  './icons/atlas-favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      // Use addAll best-effort; if one asset fails, others should still cache
      Promise.allSettled(ASSETS.map((a) => cache.add(a)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((resp) => {
          if (resp.ok && new URL(req.url).origin === self.location.origin) {
            const clone = resp.clone();
            caches.open(CACHE_VERSION).then((c) => c.put(req, clone));
          }
          return resp;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
