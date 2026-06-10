/* tickers.js — shared live-quote layer for the Atlas economy pages.
 *
 * Design contract (the schedule.html lesson, applied):
 *  - The page must work with NO live data. Every consumer renders its static
 *    text first, then THIS module upgrades it if quotes arrive. A failure here
 *    can never blank a tile — worst case, the static fallback stays.
 *  - Stocks come from Yahoo's chart API via a public CORS proxy (corsproxy.io).
 *    A public proxy is a real, fragile dependency: it can rate-limit, go down,
 *    or vanish. We treat any failure as "no data" and move on. Quotes are
 *    cached in localStorage for 10 min so we don't hammer it on every page load.
 *  - Crypto/commodity-token quotes come from CoinGecko (CORS-open, no proxy).
 *
 * Exported: getQuotes(symbols) -> Promise<{ [symbol]: Quote | null }>
 *   Quote = { price, changePct, spark: number[], stale, source }
 */
const PROXY = 'https://corsproxy.io/?url=';
const CACHE_PREFIX = 'atlas_tick_';
const TTL_MS = 10 * 60 * 1000;

// Map a friendly symbol to a CoinGecko id when it's a crypto/commodity token.
// Everything else is treated as a Yahoo equity ticker.
const COINGECKO = {
  'BTC': 'bitcoin', 'ETH': 'ethereum', 'PAXG': 'pax-gold', 'GOLD-TOKEN': 'pax-gold',
};

function cacheGet(sym) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + sym);
    if (!raw) return null;
    const o = JSON.parse(raw);
    o.q.stale = (Date.now() - o.t) > TTL_MS;
    return o;
  } catch { return null; }
}
function cacheSet(sym, q) {
  try { localStorage.setItem(CACHE_PREFIX + sym, JSON.stringify({ t: Date.now(), q })); } catch {}
}

async function fetchYahoo(sym) {
  const url = PROXY + encodeURIComponent(
    `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?range=1mo&interval=1d`);
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error('http ' + r.status);
  const j = await r.json();
  const res = j.chart && j.chart.result && j.chart.result[0];
  if (!res) throw new Error('no result');
  const meta = res.meta;
  const closes = (res.indicators.quote[0].close || []).filter(x => x != null);
  const price = meta.regularMarketPrice;
  const prev = meta.chartPreviousClose || meta.previousClose || closes[0];
  const changePct = prev ? ((price - prev) / prev) * 100 : 0;
  return {
    price, changePct,
    spark: closes.slice(-20),
    stale: false, source: 'yahoo',
  };
}

async function fetchCoinGecko(ids) {
  // one call for all requested coins
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}&sparkline=true&price_change_percentage=24h`;
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error('http ' + r.status);
  const arr = await r.json();
  const out = {};
  arr.forEach(c => {
    out[c.id] = {
      price: c.current_price,
      changePct: c.price_change_percentage_24h || 0,
      spark: (c.sparkline_in_7d && c.sparkline_in_7d.price || []).filter((_, i) => i % 8 === 0).slice(-20),
      stale: false, source: 'coingecko',
    };
  });
  return out;
}

/**
 * Fetch quotes for a list of friendly symbols. Never rejects — returns a map
 * of symbol -> Quote|null. Consumers treat null as "keep the static fallback".
 */
export async function getQuotes(symbols) {
  const result = {};
  const cgWanted = [];   // [{sym, id}]
  const yfWanted = [];   // [sym]

  // serve fresh cache immediately; queue the rest
  for (const sym of symbols) {
    const c = cacheGet(sym);
    if (c && !c.q.stale) { result[sym] = c.q; continue; }
    result[sym] = c ? c.q : null;  // stale-but-present shows while we refresh
    if (COINGECKO[sym]) cgWanted.push({ sym, id: COINGECKO[sym] });
    else yfWanted.push(sym);
  }

  const jobs = [];

  if (cgWanted.length) {
    jobs.push(fetchCoinGecko(cgWanted.map(x => x.id)).then(map => {
      cgWanted.forEach(({ sym, id }) => {
        if (map[id]) { result[sym] = map[id]; cacheSet(sym, map[id]); }
      });
    }).catch(() => {/* leave cached/null */}));
  }

  // Yahoo: one request per symbol (the chart API is per-ticker). Limit
  // concurrency implicitly by just firing them; failures are swallowed.
  for (const sym of yfWanted) {
    jobs.push(fetchYahoo(sym).then(q => {
      result[sym] = q; cacheSet(sym, q);
    }).catch(() => {/* leave cached/null — static fallback stays */}));
  }

  await Promise.allSettled(jobs);
  return result;
}

/** Tiny inline sparkline as an SVG path string (viewBox 0 0 100 30). */
export function sparkPath(values, w = 100, h = 30) {
  if (!values || values.length < 2) return '';
  const lo = Math.min(...values), hi = Math.max(...values), span = (hi - lo) || 1;
  return values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - lo) / span) * (h - 4) - 2;
    return (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }).join(' ');
}
