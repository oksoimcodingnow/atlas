// test/loot.test.mjs — tests for the loot engine. Run with: npm test  (or: node test/loot.test.mjs)
//
// No test framework on purpose — Atlas has no build step and no dependencies,
// and we keep it that way. This file is its own tiny runner: a few helpers,
// then plain assertions. Exit code is non-zero if anything fails, so CI or a
// pre-commit hook can rely on it.

import { RARITY, RMAP, rollRarity, LootEngine } from '../lib/loot.js';

let pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log('  ✓', name); }
  else { fail++; console.log('  ✗', name); }
}
function eq(name, got, want) { ok(name + ` (got ${JSON.stringify(got)})`, got === want); }

// An in-memory storage stand-in so tests never touch a real browser/localStorage.
function fakeStore() {
  const m = new Map();
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: k => m.delete(k),
    _raw: m
  };
}

console.log('rarity tiers');
eq('weights sum to 100', RARITY.reduce((a, r) => a + r.w, 0), 100);
ok('every tier has a RMAP entry', RARITY.every(r => RMAP[r.key] === r));
ok('ranks are ascending', RARITY.every((r, i) => r.rank === i));

console.log('rollRarity (forced RNG)');
eq('rng 0 -> common', rollRarity(() => 0).key, 'common');
eq('rng 0.59 -> common', rollRarity(() => 0.59).key, 'common');
eq('rng 0.60 -> rare', rollRarity(() => 0.60).key, 'rare');
eq('rng 0.999 -> legendary', rollRarity(() => 0.999).key, 'legend');

console.log('catch: new item');
{
  const e = new LootEngine({ storageKey: 't', storage: fakeStore(), rng: () => 0 }); // always common
  const d = e.catch('あ'); // あ
  ok('isNew is true', d.isNew === true);
  ok('now in collection', e.has('あ'));
  eq('count is 1', e.count(), 1);
  eq('awards common spirit', e.spirit, 5);
  eq('drop carries id', d.id, 'あ');
  eq('starts at level 1', d.lv, 1);
}

console.log('catch: duplicate levels up, never downgrades');
{
  const e = new LootEngine({ storageKey: 't', storage: fakeStore(), rng: () => 0.999 }); // legendary
  e.catch('か'); // か lv1 legendary
  e.rng = () => 0;   // force a common roll on the duplicate
  const d = e.catch('か');
  eq('levels to 2', d.lv, 2);
  eq('rarity stays legendary (no downgrade)', d.rarity.key, 'legend');
  eq('count still 1 (same item)', e.count(), 1);
}

console.log('catch: duplicate can upgrade rarity');
{
  const e = new LootEngine({ storageKey: 't', storage: fakeStore(), rng: () => 0 }); // common
  e.catch('き'); // き lv1 common
  e.rng = () => 0.999; // legendary on the dup
  const d = e.catch('き');
  eq('upgrades to legendary', d.rarity.key, 'legend');
}

console.log('persistence: preserves foreign fields under the same key');
{
  const store = fakeStore();
  store.setItem('shared', JSON.stringify({ lesson: 3, streak: 7 }));
  const e = new LootEngine({ storageKey: 'shared', storage: store });
  e.catch('く'); // く
  const after = JSON.parse(store.getItem('shared'));
  eq('lesson preserved', after.lesson, 3);
  eq('streak preserved', after.streak, 7);
  ok('spirit written', typeof after.spirit === 'number');
  ok('col written', after.col && typeof after.col === 'object');
}

console.log('resilience: survives broken/absent storage');
{
  const e = new LootEngine({ storageKey: 'x', storage: { getItem: () => 'not json{', setItem: () => {}, removeItem: () => {} } });
  ok('does not throw on garbage', true); // reaching here means constructor + _load handled it
  const d = e.catch('け');
  ok('still catches after garbage load', d.isNew === true);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
