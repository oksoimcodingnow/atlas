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
- **Live on main:** Japanese kana-loot + the full **Fin-Eng Studio** (6 pages).
- **NOT yet merged:** branch `feat/jp-timed-challenge` (commit `f28481a`) — the
  Japanese Drill + Trace tabs. Backed up locally only until tested & merged.

## ✅ Live on main: Fin-Eng Studio (a study hub for the owner's degree)

Owner is a **3rd-year Financial Engineering student** (courses: Stochastic Processes
01006743, Data Science 01526125, Portfolio Analysis 01526228, Valuation 01526229,
Markets & Institutions 01526230). Built interactive study tools, one per course, at
**`fineng/`** — each with math **verified numerically against the finance skills**:
- `fineng/index.html` — hub (courses are a `COURSES` data array).
- `portfolio.html` — efficient frontier (verified: 60/40 → 12.55%).
- `valuation.html` — bond pricer + stock DCF (par/premium/parity checks).
- `stochastic.html` — geometric Brownian-motion lab (mean→S₀e^μT, std→σ√T).
- `datascience.html` — return explorer (skew/excess-kurtosis/Sharpe).
- `markets.html` — interactive institutions flow-map (tap a node).
- `options.html` — ★ Black–Scholes capstone (verified exact: call 10.4506 / put 5.5735).
- Home `index.html` has a "Fin-Eng Studio" tile. Service worker at **v73**.
- **Offer standing:** owner can drop real course materials (PDFs/slides) in
  `fineng/materials/` (or paste/screenshot) → rebuild pages to match their actual
  syllabus/professor notation. They chose "keep building generically" for now.

## ✅ Live on main: Japanese "Spirit Collection" + reusable loot engine

- **`japanese.html`** beginner "🌱 Start here" path + **🔮 Collection** (46 kana as a
  rarity album), loot-on-learning, streak + Spirit in the `atlas_jp_start` key.
- **Architecture:** game logic lives in **`lib/loot.js`** — a reusable ES-module engine
  (generic `id`s, no DOM/Japanese knowledge). Has `catch(id)` (rolls loot) and
  `award(n)` (plain Spirit). Tests in **`test/loot.test.mjs`** — `npm test` (26 assertions).
- **Tradeoff to remember:** the page uses `import`, so it will NOT run over `file://`
  (double-click). Use the live HTTPS site or a local server (`python -m http.server`).
  A friendly file:// fallback note is baked in.

## 🚧 In flight (branch feat/jp-timed-challenge, f28481a — test then merge)

- **⏱️ Drill tab:** 60-second romaji sprint, awards 5 Spirit per correct (via `award`),
  wrong = −2s. Score banks into the Collection total.
- **✍️ Trace tab:** writing pad — pick a kana, trace over a faint guide, clear/next,
  toggle guide, hear it. **No auto-grading** (honest: stroke recognition would be
  unreliable) — it's a muscle-memory surface.
- Next: owner tests locally, then merge to main + bump service worker.

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
- **PC slowness (2026-06-08):** diagnosed — **C: drive 93% full** (17 GB free of 232)
  while **D: is 69% empty** (639 GB free). That, plus a huge startup-program list
  (Steam/Epic/EA/Riot/Nexon/Roblox/Nox/Overwolf/Medal…), is the cause. Fix in progress:
  guide owner to **move games C: → D:** (biggest win). Do NOT move Atlas to D: — it's
  tiny and would break the "one true path." Owner plays a lot of games (Roblox/Valorant etc.).
