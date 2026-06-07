# RESUME — where we are, for any new session

> **Purpose:** If this terminal/session is lost, read this file first. It says what's done,
> what's in flight, and the one true path. Last updated: 2026-06-08.

## ⛳ The one true path (memorize this)

- **REAL Atlas (edit here):** `C:\Users\HOME\atlas`  ← live site, always current
- **GitHub (cloud backup):** https://github.com/oksoimcodingnow/atlas  (branch `main` = live site)
- **Live site:** https://oksoimcodingnow.github.io/atlas/
- ❌ **Do NOT use** any folder with `Codex\...\review-commit\...` in the path — those are stale/deleted review clones.

## 🟢 What is safe / backed up

- `main` branch: fully pushed to GitHub. The whole real Atlas is in the cloud.
- The **Japanese kana-loot feature is now MERGED to `main`** and live (2026-06-08).

## ✅ Just landed: Japanese "Spirit Collection" + a real loot engine

- **`japanese.html`** now has, on top of the beginner "🌱 Start here" path:
  - **🔮 Collection tab** — the 46 hiragana as a collectible album (Caught X / 46).
  - **Loot on learning** — finishing a kana "catches" it with a weighted rarity
    (Common 60 / Rare 30 / Epic 9 / Legendary 1), awards **Spirit**, and dupes level up.
  - Streak + Spirit live in the existing `atlas_jp_start` localStorage key.
- **Architecture (the important part):** the game logic was extracted into
  **`lib/loot.js`** — a reusable ES-module engine that knows nothing about Japanese
  or the DOM (it speaks generic `id`s). `japanese.html` imports and drives it.
  - **Tests:** `test/loot.test.mjs` — run with **`npm test`** (23 assertions, zero deps,
    its own tiny runner). Injectable RNG + storage make the engine deterministically testable.
  - **Tradeoff to remember:** because the page now uses `import`, it will NOT run over
    `file://` (double-click). It works on the live HTTPS site, or via a local server
    (`python -m http.server`). There's a friendly file:// fallback note baked in.

## 🧭 Engineering direction (owner's stated goal)

Owner is **learning to code** and wants to climb the "proper engineering" ladder
**one rung at a time, on Atlas** (not a rewrite). Rungs done: testing (Rung 1) +
separation into a reusable module (Rung 2). Possible next rungs: a pre-commit/CI
check that runs `npm test`, then types/backends only if/when truly needed.

## 💡 Ideas parked (from the "Tamashii Tactics" inspiration)

A Thai gamified-habit RPG the owner showed. Worth borrowing later, in **English**:
- Reuse `lib/loot.js` to put **Spirit + loot drops on real tasks in `schedule.html`**.
- A "finish all 5 in a lesson" **bonus charm** drop; a sound/flourish on Legendary.
- Skip the shop/forge/gems/raid-boss stuff — those need a backend and a real economy.
- A Thai (TH/EN) toggle for `japanese.html` was also discussed but **deprioritized**
  (owner is an international student, fine with English).

## ↩️ How to resume in a new session

```powershell
cd C:\Users\HOME\atlas
git checkout main
git log --oneline -6          # the merge + kana-loot commits should be at/near the top
npm test                      # sanity-check the loot engine (expect: 23 passed)
```

Then open the live site (or serve locally) and look at `japanese.html` → 🔮 Collection.

## 🧹 Cleanup leftover (do once, after closing the session that's locked in it)

Two empty locked dirs remain from deleting the old review clones. Finish with:
```powershell
Remove-Item "C:\Users\HOME\Documents\Codex\2026-06-01" -Recurse -Force
```

## 🗂️ Other context

- **graphify** was run on the quant repo → outputs in `C:\Users\HOME\quant-graphify-out\` (graph.html).
- **Google `google/skills`** repo: Google-Cloud/Gemini infra skills (BigQuery, GKE, Firebase…),
  Apache-2.0. Not useful for a static site like Atlas. Skip unless a real backend appears.
- **Hermes (Nous Research) + Obsidian**: an open-source self-hosted agent with persistent
  memory (uses an Obsidian vault as memory; same SKILL.md standard as Claude Code).
  Evaluated 2026-06-08 → overkill for a beginner; the markdown + git continuity trail here
  already solves the same "stay the same across sessions" problem. Revisit only if always-on
  memory / an agent that messages you is actually wanted.
- Rescued Codex review notes: atlas ×2 in `C:\Users\HOME\atlas\REVIEWS\`, quant ×2 in `C:\Users\HOME\quant\REVIEWS\`.
