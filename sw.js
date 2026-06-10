/* Atlas service worker — cache-first with on-the-fly population.
 * Bump CACHE_VERSION to force a refresh after deploying changes.
 */
const CACHE_VERSION = 'atlas-v79';
const ASSETS = [
  './',
  './index.html',
  './skills.html',
  './schedule.html',
  './markets.html',
  './macro-map.html',
  './japanese.html',
  './overview.html',
  './economy.html',
  './flock.html',
  './luck.html',
  './trader.html',
  './graphify/graph.html',
  './graphify/vis-network.min.js',
  './graphify/GRAPH_REPORT.md',
  './spotlight.html',
  './entegris.html',
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
  './learn/06-volatility.html',
  './learn/07-alt-data.html',
  './learn/08-neural-nets.html',
  './learn/09-costs.html',
  './learn/10-diversification.html',
  './learn/11-regimes.html',
  './learn/12-putting-it-together.html',
  './demos/',
  './demos/index.html',
  './demos/start-here.html',
  './demos/handshake.html',
  './demos/handshake-live.html',
  './demos/study-flow.html',
  './demos/showcase.html',
  './fineng/',
  './fineng/index.html',
  './fineng/portfolio.html',
  './fineng/valuation.html',
  './fineng/stochastic.html',
  './fineng/datascience.html',
  './fineng/markets.html',
  './fineng/options.html',
  './lib/atlas-fx.js',
  './lib/tour.js',
  './lib/loot.js',
  './lib/blackscholes.js',
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

// Cache a fresh same-origin response (fire-and-forget).
function cachePut(req, resp) {
  if (resp && resp.ok && new URL(req.url).origin === self.location.origin) {
    const clone = resp.clone();
    caches.open(CACHE_VERSION).then((c) => c.put(req, clone));
  }
  return resp;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Is this a PAGE navigation (an HTML document)?
  const isPage =
    req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isPage) {
    // NETWORK-FIRST for pages: when online you ALWAYS get the latest version
    // (no more stale-PWA / "still the old one" problem). Fall back to the cached
    // page, then to the cached home, only when the network fails (offline).
    event.respondWith(
      fetch(req)
        .then((resp) => cachePut(req, resp))
        .catch(() =>
          caches.match(req).then((c) => c || caches.match('./index.html'))
        )
    );
    return;
  }

  // STALE-WHILE-REVALIDATE for static assets (fonts, icons, libs): serve cached
  // instantly for speed, refresh the cache in the background. Assets are
  // effectively versioned, so a one-load delay on changes is fine.
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((resp) => cachePut(req, resp))
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
