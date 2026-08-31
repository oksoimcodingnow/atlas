# 🚀 SETScout — quick status (Atlas working copy)
*(the 30-second version · full state = `CONTINUE.md` · full design = `HANDOFF.md`)*

**Live:** https://oksoimcodingnow.github.io/atlas/setscout/

## ✅ What we've done
- **Website** — SET100 · verdict **+ sector** filters · TH/EN · dark/light · **risk-quiz** personalization · **"ⓘ How we score"** panel · **💰 DCA** calculator
- **Engine** (`run_today.py`) — **de-biased** (z-score + sector-neutral) → no more bank cluster, spread across sectors, no ties
- **Backtest** (`backtest.py`) — luck bar + p_win calibration. **Honest finding: the strategy does NOT beat buy-and-hold** (that's the *thesis*, not a bug — don't fake an edge)
- **Synced to Pakkapon's repo** + `CONTINUE.md` written
- **Python now installed here** → can run engine + backtest end-to-end

## ✅ Done 30 Aug 2026 (see `CHANGELOG.md` for the full why)
- ~~Re-run backtest as "buy & HOLD"~~ → `backtest_hold.py`
- ~~Wire real `p_win` from `calibration.json`~~ → **done.** It now shows the *measured* up-rate (flat ~47% across every decile), and the UI says the score doesn't predict direction
- **Daily workflow now fails loudly** (`verify_today.py`) — closes a silent-failure path. (The Action itself was never broken; an earlier note saying so came from an unfetched local clone.)
- **`universe.json` split out** — engine can no longer lose tickers by overwriting its own input (92 → 95 stocks)

## ▶️ Do FIRST (next session)
1. **AHP survey** — `research/expert-ahp.md` **does not exist** (this file used to say "finalize" it; it was never written). Write it, then send to 6–10 experts. **The long pole: it depends on other people, so start it before anything else.** Gives real weights *and*, via bootstrap, a defensible confidence number.
2. **Legal pages** — Terms of Use, cookie/storage notice, privacy. The site is public and gives stock verdicts; PDPA applies the moment the survey collects names.
3. **Finish the report.** `REPORT.md` v1 drafted 1 Sep — needs team review, real names/IDs, and a decision on whether `quant-project/REPORT-draft.md` merges in or retires.
4. ~~Fix the verdict thresholds~~ → done 31 Aug (now stated as percentiles).
5. ~~Save backtest numbers to `reports/`~~ → done 31 Aug via `reportlib.py`; all 5 backtests + `blind_test.py` write there now.

## ⚠️ Do NOT do
- **No more engine work.** The stopping rule fired in July and the blind test independently confirmed it. Adding fundamentals or tuning weights now would undo the discipline that *is* the contribution.
- **Never quote these numbers**: sealed-period returns (+60.2% etc.), +41.1% sealed buy&hold, full-window CAGR, +164% net 10y. All survivorship-inflated. See `CHANGELOG.md`.

## 🧭 Remember
SETScout = **discovery + risk + explanation**, *not* a beat-the-market system. The honest backtest is a **strength** for the report. Keep the "educational, not advice" disclaimer.

*(To run, use the venv — the default `python` has no pandas:*
`C:\Users\HOME\.venvs\quant-project\Scripts\python.exe run_today.py`*)*
