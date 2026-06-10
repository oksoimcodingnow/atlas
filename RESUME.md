# RESUME — where we are, for any new session

> **Purpose:** If this terminal/session is lost, read this file first. It says what's done,
> what's in flight, and the one true path. Last updated: 2026-06-10.

## ✅ Done 2026-06-10 (later): Studio polish pass + neural.html removed + Fable 5

- **Fin-Eng polish (f2d63c6, live, SW v78):** full review of all 6 Studio pages found
  3 rough edges, fixed: (1) `markets.html` node labels no longer spill outside their
  circles on phones (24px radius floor, font scales, short labels under 30px;
  `nodeR()` shared by draw + click hit-testing); (2) every course page now has a
  **prev/next footer trail** in hub order (portfolio→valuation→stochastic→markets→
  datascience→options→Studio); (3) valuation DCF bar labels skip every other year
  when >10 bars (collided on mobile).
- **`neural.html` deleted (4491f86, live):** Neural Net Playground removed at owner's
  request, plus ALL references (home tile, sw.js precache, footers in flock/luck/learn-12).
  `learn/08-neural-nets.html` is a different file (a lesson) — kept.
- **schedule.html gamification: attempted and REVERTED** (see parked section below —
  plan updated with what went wrong).
- **Owner switched the session model to Claude Fable 5** (`/model claude-fable-5[1m]`,
  released 2026-06-09; free on the plan until June 22, then 2× Opus pricing). The
  continuity contract (CLAUDE.md + this file) applies to whichever model reads it.

## ✅ Done 2026-06-10: Black–Scholes extracted to a tested module + SW bug fix

A "proper engineering" pass on the Fin-Eng capstone (teaching session for the owner):
- **`lib/blackscholes.js`** — the Black–Scholes math, pulled out of `options.html` into a
  pure, DOM-free ES module (single source of truth). Contract: sigma & r are **decimals**
  (0.20 = 20%), T in years. Exports `normCDF`, `d1d2`, `blackScholes`.
- **`test/blackscholes.test.mjs`** — 17 assertions: textbook case (call 10.4506 / put 5.5735),
  put–call parity to 1e-9, N(·) anchors, T=0 / σ=0 edges, vega-positive sanity.
- **`npm test` is now 43 assertions** (26 loot + 17 Black–Scholes).
- **`fineng/options.html`** now `import`s the module (so the page & tests can't drift). It's
  a `<script type="module">` → needs http(s); a classic script shows a `file://` banner.
- **SW registration bug fixed (`lib/atlas-fx.js`):** `register('sw.js')` resolved relative
  to the *page*, so pages in `fineng/`, `learn/`, etc. tried to register a non-existent
  `<subdir>/sw.js` and failed silently. Now resolved relative to the script's own URL
  (`new URL('../sw.js', SELF_SRC)`) → always the root `sw.js`. Empty `.catch` → `console.warn`.
- **`sw.js` bumped v76 → v77** and `lib/blackscholes.js` added to the precache list.
- **`fineng/README.md`** added (frames the Studio as a portfolio piece).
- Committed as `0325444`, merged to main, pushed — live.

## ⛳ The one true path (memorize this)

- **REAL Atlas (edit here):** `C:\Users\HOME\atlas`  ← live site, always current
- **GitHub (cloud backup):** https://github.com/oksoimcodingnow/atlas  (branch `main` = live site)
- **Live site:** https://oksoimcodingnow.github.io/atlas/
- ❌ **Do NOT use** any folder with `Codex\...\review-commit\...` in the path — those are stale/deleted review clones.

## 🟢 What is safe / backed up

- `main` branch: fully pushed to GitHub. The whole real Atlas is in the cloud.
- **Live on main:** Japanese kana-loot (incl. Drill + Trace tabs, merged f6df5ae)
  + the full **Fin-Eng Studio** (6 pages, polished). Nothing unmerged is pending.

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
- Home `index.html` has a "Fin-Eng Studio" tile. Service worker at **v78**.
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

## 🅿️ Parked: gamify schedule.html (ATTEMPTED 2026-06-10, REVERTED — read before retrying)

**What happened:** the plan below was implemented (module script + `window.atlasLoot`
+ reward in `toggleDone`), but at runtime NOTHING executed — not even `console.log`
diagnostics in the main classic script fired, even after cache-busted reloads. Root
cause never confirmed (suspects: stale SW/browser cache on localhost, or the module/
classic script interaction). Owner chose to revert cleanly (working tree restored,
branch deleted) rather than keep debugging. The plan itself is still considered sound:

Reuse `lib/loot.js` so completing a Schedule task awards Spirit + a rarity loot
drop (decided: **shared Spirit pool** with the Japanese game; **loot-drop-with-rarity**
feel; **study-tagged tasks roll better odds** — ties into the `STUDYING.md` loop).
- **Key caution:** `schedule.html` has **Firebase + Google Calendar** integration and
  its main script is a **classic `<script>` (line ~420), NOT a module.** Do NOT convert
  it to a module (risks breaking Firebase/GCal). Instead add a *separate* small
  `<script type="module">` that imports the engine and exposes `window.atlasLoot`,
  then call `window.atlasLoot.award(...)` from `toggleDone(id)` (line ~630) when a
  task flips undone→done. Bonus Spirit if the task text/tag is `study`.
- Engine already has `award(n)` and `catch(id)`; tests cover both (28 passing).

## ✅ Also done 2026-06-09: Drill reading-test fix + PC speedup

- **Drill fix (live, bbe6dba):** the timed Drill no longer speaks the kana on show
  (it was giving away the answer). Now silent until you answer, then speaks as feedback.
- **PC speedup (owner's machine):** C: was 93% full → freed to ~14% (cleared Temp,
  moved Downloads to D:\Medal, uninstalled Greenshot/PowerDVD/ACDSee). Trimmed ~17
  startup apps (kept Vanguard/Defender/audio/PenTablet). Applies on next reboot.
  See the "Other context" section for the diagnosis.

## ✅ Live: japanese Drill + Trace tabs (merged f6df5ae, fixed bbe6dba)

- **⏱️ Drill:** 60s romaji sprint, awards 5 Spirit per correct (via `award`), wrong = −2s,
  banks into the Collection total. Kana is **silent until you answer** (reading test).
- **✍️ Trace:** writing pad — pick a kana, trace over a faint guide, clear/next, toggle
  guide, hear it. **No auto-grading** (stroke recognition would be unreliable) — practice surface.

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
npm test                      # sanity-check both engines (expect: 26 + 17 = 43 passed)
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
