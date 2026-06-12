# RESUME — where we are, for any new session

> **Purpose:** If this terminal/session is lost, read this file first. It says what's done,
> what's in flight, and the one true path. Last updated: 2026-06-11 (early AM).

## ✅ Done 2026-06-11 (early AM): home redesign + design system docs + quant backtester

### Session 2026-06-12 (afternoon): big build sprint
- **Security Academy COMPLETE (14/14 lessons, live, SW v91).** All at `security/`,
  defender-first + white-hat, each with an interactive: internet/CIA/crypto/passwords
  (1-4), web-attacks/network/malware/phishing (5-8), secure-coding/OS-access/cloud (9-11),
  blue-team/forensics/capstone (12-14). Shared `security/lesson.css`. Capstone walks one
  breach through every lesson. Hub data-driven (status flips ready/soon).
- **Economy cluster 100% unified + live (SW v89).** overview/ai-ripple/spotlight/
  semiconductors/economy ALL share the editorial system + show live firm prices via
  `lib/tickers.js`. AI Ripple v2 got a full redesign + 8 categories (added Software/Models,
  Robotics/Security, Neoclouds). economy.html uses a MutationObserver price-painter.
- **EMA crossover trading idea tested** (owner's first own strategy): fails on BTC intraday
  (whipsaw), trend filter halves the damage, SURVIVES on gold daily (Sharpe 1.08 OOS).
  `alphas/ema_cross.py` + `ema_cross_filtered.py` in quant; written up in
  `research/ema-crossover.md`. Lesson: a strategy is right for some markets, wrong for others.
- **Home decluttered** 27->23 tiles (removed Flock/Luck/Beat-the-Market/PDF Tools).
- **lib/tickers.js** added earlier this session: shared live-quote layer (Yahoo via
  corsproxy.io + CoinGecko), 10-min cache, graceful fallback. The fragile dep is the proxy.

## ✅ Done 2026-06-11 (early AM): home redesign + design system docs + quant backtester

- **Live price tape on overview.html (cbaeda0, live, SW v84):** `lib/tickers.js`
  shared quote layer — stocks via Yahoo chart API through corsproxy.io, crypto/
  commodity tokens via CoinGecko (CORS-open), 10-min localStorage cache,
  graceful fallback (dead feed leaves the name, never blanks). Tape on overview
  shows NVDA/TSM/AMD/ASML/PAXG/BTC with price+%+sparkline. Verified live.
  IMPORTANT caveat: corsproxy.io is a fragile 3rd-party dependency — if the tape
  ever shows only names, the proxy is down (not a bug). Module is reusable; next
  step parked = drop the tape into semiconductors/ai-ripple/spotlight too.
- **Backtesting stack completed tonight:** quant repo now has run.py (universal),
  risk.py (sizing/stops/take-profit/leverage + liquidation guard), lab.py
  (auto-propose → judge OOS → ledger), ml/vol_sizing.py (vol forecast → position
  sizing), all leakage-safe + fees-on. See HOW_TO_BACKTEST.md + HOW_TO_RESEARCH_LAB.md.
- **Security Academy live** (security/, 4 of 14 lessons), **Depths of the d20**
  roguelike (dungeon.html), **Fin-Eng Exam Drill** (fineng/drill.html) all shipped.

### 🔄 PARKED for a wide-awake session: 'works while I sleep' overnight agent
Owner saw the 'agent works while you sleep' pattern (it's real — it's Paypers point
#10 from the earlier writeup: an hourly bug-fixer routine, narrow/no-decision/no-DB).
DECIDED to set it up later, awake, NOT at 3am — unsupervised automation with repo
access needs a deliberate short leash. When revisiting:
  - It needs an ALWAYS-ON host (the PC sleeps) — Claude Code cloud routines, a VPS,
    or GitHub Actions. Not the local machine.
  - Scope it READ-ONLY / TEST-ONLY first: e.g. nightly `lab.py` run logging
    survivors to the ledger, or a 'site up + npm test passes' health check.
    NEVER auto-push to live / main, NEVER let it make product decisions.
  - Watch cost: an unsupervised loop burns tokens unwatched (recall the Hermes
    screenshot — 6/15 agents blocked, 1.3M tokens wasted). Cap it.

- **"Depths of the d20" roguelike shipped (700cc55, live, SW v82):** `dungeon.html` —
  turn-based dungeon crawler, real d20 combat (d20+bonus vs AC, crits), 3 difficulties
  (6/8/10 floors), 8 tiered monsters + dragon boss, rarity loot, fog of war, drunkard's-
  walk floor gen, mobile d-pad. **Daily Dungeon** = date-seeded identical map for friend
  races (share-card copies result). Spirit via dynamic import of loot.js (shared pool;
  game never depends on it — the schedule.html lesson applied). Home tile added.
  v2 ideas parked: Firebase turn-based co-op, more item types, sound.
- **Gold backtesting confirmed:** `run.py --symbol PAXG/USDT` works as-is (PAXG = gold-
  backed token). Result: gold TRENDS — sma Sharpe 1.35 (vs 0.87 on BTC), maxDD −18%.
  Standing offer: owner describes "my gold strategy" in words → encode as alphas/ file.

- **Fin-Eng Exam Drill shipped (6aa22df, live, SW v81):** `fineng/drill.html` —
  randomized exam questions across all courses; correct = +5 Spirit (+3 streak
  bonus) into the SHARED pool with the Japanese game (`atlas_jp_start`); wrong =
  worked solution. Distractors are real student mistakes. Math in tested module
  `lib/drillmath.js` — **npm test now 63 assertions** (26 loot + 17 BS + 20 drill).

- **Home page redesigned into the editorial system (b9efc87, live, SW v79→v80).**
  index.html now matches fineng/demos: serif hero ("Everything I'm building, in one
  place."), 4 featured rows (Fin-Eng, Japanese, Schedule, AI Investing Map), everything
  else as a compact grouped index. Gradient wordmark / glass tiles / "live" pill spam
  retired. ITEMS stays data-driven; `featured: true` promotes a flagship. Sacred objects
  kept: constellation, clock, click-to-copy path, tour. Built via the **impeccable**
  skill; verified with headless-Chrome screenshots at 1280/390px.
- **Readability hotfix (c161669, live, SW v80), owner-reported:** index rows were
  transparent so the starfield bled through text → rows now solid `--panel`, canvas
  dimmed (`body #bg-canvas{opacity:.4}`). Owner confirmed "looks just fine".
- **New design constitution: `PRODUCT.md`** (register: brand; quiet observatory;
  anti-references; 5 principles) + **`DESIGN.md` hub section rewritten** (editorial
  hub pattern, atlas-fx class contract). Read both before any design work.
- **schedule.html critiqued (impeccable): 31/40 Good.** Snapshot in
  `.impeccable/critique/2026-06-10T17-27-00Z__schedule-html.md`. Top finding (P1):
  delete has no undo/confirm. P2s: static "saved & synced" header lie; "Calendar
  sync" vs "Add to calendar" ambiguity. `/impeccable polish` can pick these up.
- **Quant repo: real backtesting shipped (ff351ec, pushed).** `backtests/run.py` =
  universal runner (any strategy/symbol/timeframe, `--strategy all` races everything
  vs B&H, compact 8-metric table + chart). 3 new alphas: rsi_meanrev, breakout,
  momentum. **`HOW_TO_BACKTEST.md`** = owner's manual. Verified on live Binance BTC/USDT
  1d: sma Sharpe 0.87, momentum 0.83 (maxDD −25% vs B&H deeper), breakout 0.62, rsi 0.18
  (6 trades = noise); all trail B&H +132% in this bull window — honest result. Next on
  quant's list: generalize walk_forward.py over the STRATEGIES registry; sweep CSV.
- Owner is running **Claude Fable 5** (`/model claude-fable-5[1m]`; free window ends
  June 22, then 2× Opus pricing).

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
