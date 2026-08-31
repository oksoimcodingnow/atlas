# ▶️ SETScout — Current State & How to Continue
*(as of 31 Aug 2026 — read this first if you're picking up on a new PC. What changed and why = `CHANGELOG.md`. Full design = `HANDOFF.md`.)*

**Live demo:** https://oksoimcodingnow.github.io/atlas/setscout/

---

## ✅ Where we are (all working)
- **`index.html`** — the website (SET100 shop-window): verdict + 4 sentences · filter by **verdict + sector** · **TH/EN** · **light/dark** · **risk-quiz personalization** · **"ⓘ How we score"** method panel · **💰 DCA calculator**.
- **`universe.json`** — **the canonical stock list (read-only for the engine).** Edit here to add/remove a stock. Added 30 Aug 2026 so a failed fetch can no longer delete a ticker forever.
- **`run_today.py`** — the engine: `universe.json` → real yfinance prices → 5 factors → `today.json`. `p_win` is now the **measured** up-rate from `calibration.json`, not the old `0.44+0.22×score` placeholder. **DE-BIASED** (winsorized z-score + **sector-neutralization**) → no bank cluster, spread across sectors, no tied scores.
- **`backtest.py`** — point-in-time backtest + **luck bar** + **p_win calibration** → writes `calibration.json`.
- **`verify_today.py`** — health check run by the GitHub Action before it commits; fails loudly instead of silently serving stale data.
- **`CHANGELOG.md`** — **what changed and why. Read this first if something looks different.**
- **`gen_today.js`** — mock-data generator (build the website without running the engine).
- **`research/`** — `expert-ahp.md` (AHP factor-weight questionnaire) + `investor-survey.md`. **Not sent yet.**

## ⚠️ The honest finding (this shapes the whole story — read it)
The backtest showed the v1 factor strategy **does NOT beat buy-and-hold** (+6.7% vs +40% over 7y), **beats only 7% of random portfolios**, and the score **doesn't predict 1-month returns** (calibration flat ~47% across all deciles, spread only 4.5pp).
**As of 30 Aug 2026 the website says this out loud** — `p_win` shows the measured up-rate instead of the old invented one.

**This is expected, and it's the point.** SETScout's thesis is the *honesty rails / luck bar / "most rules lose to buy-and-hold."* We have rigorous, look-ahead-free **proof** of exactly that → a **credibility strength** for the report, not a failure. **Do NOT overfit to fake an edge.** SETScout is a **discovery + risk + explanation** tool, *not* a beat-the-market system. (The monthly-rotation test was a stress test, not how users use it — they research a few and **hold**.)

## 🖥️ How to run (on any PC with Python)
One-time setup:
```bash
winget install Python.Python.3.12      # Windows (or install from python.org)
python -m pip install pandas numpy yfinance
```
Then:
```bash
# NOTE: the default `python` on this machine has NO pandas. Use the venv:
C:\Users\HOME\.venvs\quant-project\Scripts\python.exe run_today.py   # refresh today.json
C:\Users\HOME\.venvs\quant-project\Scripts\python.exe backtest.py    # honesty check → calibration.json
C:\Users\HOME\.venvs\quant-project\Scripts\python.exe explore.py --years  # bias, year by year
```
Git flow: `git pull` → work → `git add -A && git commit -m "…" && git push`

## 📋 TODO / next ideas (none done yet — pick any)
1. **Re-run backtest as "buy the picks and HOLD ~1 year"** (matches real use, no monthly churn) — fairer + likely looks much better.
2. **Wire real `p_win`** from `calibration.json` into `run_today.py` (honest ~47% hit-rate, replaces the placeholder).
3. **Single source of truth** — engine writes its weights/thresholds into `today.json`; the "How we score" panel reads them (so code + panel can't drift).
4. **AHP survey** — finalize `research/expert-ahp.md` → collect from 6–10 experts → real weights (**primary data / prof requirement**).
5. **Investor survey** → Google Forms.
6. *(optional)* correlation map (graphify) · price sparkline · Vercel/custom domain for a "real" URL.

## 🗺️ Repo map
- **Pakkapon's repo** (`datascience-equity-research`) = the **team's stable source of truth**. Build team work here.
- **Pim's Atlas repo** (`oksoimcodingnow/atlas` → `/setscout/`) = Pim's **working/experimental** copy **+ the hosted live demo** (GitHub Pages). Iterate there, sync stable stuff to the team repo.

## 🔒 Non-negotiables (keep these)
- Disclaimer everywhere: **educational, not investment advice.**
- Never claim a backtest/edge you haven't shown. The trust label now cites the MEASURED up-rate (~47%, flat across every score decile) instead of the old "not yet backtested" placeholder — keep it that way.
- Any AI-drafted code: **you must be able to explain every line** (Q&A day is merciless).
