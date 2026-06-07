// lib/loot.js — generic rarity-loot + progress engine (ES module, no build step).
//
// Pure game logic, deliberately knowing NOTHING about Japanese, kana, or the DOM.
// You configure it with a storage key, then call its methods. This is what makes
// it reusable: japanese.html collects kana, but schedule.html could collect tasks
// with the exact same engine. To change the game's rules, edit THIS file once and
// every page using it upgrades.
//
// Design contract (so tests + callers can rely on it):
//   - RARITY weights sum to 100; rollRarity() returns one tier by those odds.
//   - Engine never throws on bad/absent localStorage (it degrades to in-memory).
//   - All persisted state lives under one key as a single JSON object.

// ── rarity tiers ──────────────────────────────────────────────────────────
// Ordered common→legendary. `w` = percent weight (must total 100).
// `spirit` = currency awarded. col/glow = display hints (the engine stays
// view-agnostic, but shipping the palette here keeps one source of truth).
export const RARITY = [
  { key: 'common', name: 'Common',    w: 60, spirit: 5,   col: '#9a9ab8', glow: 'rgba(154,154,184,0.5)' },
  { key: 'rare',   name: 'Rare',      w: 30, spirit: 15,  col: '#5fd39a', glow: 'rgba(95,211,154,0.6)' },
  { key: 'epic',   name: 'Epic',      w: 9,  spirit: 40,  col: '#b8a0ff', glow: 'rgba(184,160,255,0.7)' },
  { key: 'legend', name: 'Legendary', w: 1,  spirit: 120, col: '#f3d59a', glow: 'rgba(243,213,154,0.85)' }
];

// Fast lookup by key, and the index (rarity strength) for upgrade comparisons.
export const RMAP = {};
RARITY.forEach((r, i) => { RMAP[r.key] = r; r.rank = i; });

/**
 * Roll one rarity tier by weighted chance.
 * @param {() => number} [rng] injectable RNG (defaults to Math.random) — lets
 *   tests force a specific outcome instead of flaking on randomness.
 * @returns {object} a RARITY entry.
 */
export function rollRarity(rng = Math.random) {
  const roll = rng() * 100;
  let acc = 0;
  for (const r of RARITY) { acc += r.w; if (roll < acc) return r; }
  return RARITY[0];
}

// ── the engine ────────────────────────────────────────────────────────────
export class LootEngine {
  /**
   * @param {object}  opts
   * @param {string}  opts.storageKey      localStorage key for all state.
   * @param {Storage} [opts.storage]       storage backend (defaults to localStorage;
   *                                        tests pass a fake or it falls back to memory).
   * @param {() => number} [opts.rng]      injectable RNG for deterministic tests.
   */
  constructor({ storageKey, storage, rng } = {}) {
    this.key = storageKey || 'loot_state';
    this.rng = rng || Math.random;
    // Resolve a storage backend; if none works, keep an in-memory shim so the
    // engine never crashes (e.g. private-mode browsers that block localStorage).
    this.storage = storage || safeLocalStorage();
    this.state = this._load();
  }

  _load() {
    let s = {};
    try { s = JSON.parse(this.storage.getItem(this.key)) || {}; } catch { s = {}; }
    if (typeof s.spirit !== 'number') s.spirit = 0;
    if (!s.col || typeof s.col !== 'object') s.col = {}; // collection: {id: {rarity, lv}}
    return s;
  }

  // Re-read first, then write — so we PRESERVE fields other code stores under the
  // same key (e.g. japanese.html keeps lesson/streak there). The engine owns only
  // `spirit` and `col`; everything else passes through untouched.
  _save() {
    let disk = {};
    try { disk = JSON.parse(this.storage.getItem(this.key)) || {}; } catch { disk = {}; }
    disk.spirit = this.state.spirit;
    disk.col = this.state.col;
    try { this.storage.setItem(this.key, JSON.stringify(disk)); } catch { /* ignore */ }
  }

  /** Re-sync the in-memory copy from storage (call if another writer may have changed it). */
  refresh() { this.state = this._load(); return this; }

  /** Total Spirit currency earned. */
  get spirit() { return this.state.spirit || 0; }

  /** How many distinct items have been collected. */
  count() { return Object.keys(this.state.col).length; }

  /** Has this id been caught yet? */
  has(id) { return !!this.state.col[id]; }

  /** Raw collection entry for an id, or null. */
  entry(id) { return this.state.col[id] || null; }

  /**
   * "Catch" an item: roll a rarity if new; if owned, level it up and keep the
   * better rarity (a fresh roll can upgrade it, never downgrade). Awards Spirit.
   * @param {string} id stable identifier for the collectible (e.g. the kana char).
   * @returns {{id, rarity, lv, isNew, spirit}} drop info for the reveal UI.
   */
  catch(id) {
    const have = this.state.col[id];
    let r;
    if (!have) {
      r = rollRarity(this.rng);
      this.state.col[id] = { rarity: r.key, lv: 1 };
    } else {
      const fresh = rollRarity(this.rng);
      const cur = RMAP[have.rarity] || RARITY[0];
      r = fresh.rank > cur.rank ? fresh : cur;     // upgrade-only
      this.state.col[id] = { rarity: r.key, lv: (have.lv || 1) + 1 };
    }
    this.state.spirit = (this.state.spirit || 0) + r.spirit;
    this._save();
    return { id, rarity: r, lv: this.state.col[id].lv, isNew: !have, spirit: r.spirit };
  }
}

// localStorage that never throws; falls back to an in-memory Map shim.
function safeLocalStorage() {
  try {
    const t = '__loot_probe__';
    localStorage.setItem(t, '1'); localStorage.removeItem(t);
    return localStorage;
  } catch {
    const m = new Map();
    return {
      getItem: k => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: k => m.delete(k)
    };
  }
}
