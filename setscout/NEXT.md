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
- **Daily workflow now fails loudly** (`verify_today.py`) — it had silently served stale data for 21 days
- **`universe.json` split out** — engine can no longer lose tickers by overwriting its own input (92 → 95 stocks)

## ▶️ Do FIRST (next session)
1. **AHP survey** — finalize `research/expert-ahp.md`, send to 6–10 experts. **The long pole: it depends on other people, so start it before anything else.** Gives real weights *and*, via bootstrap, a defensible confidence number.
2. **Check the Actions tab** — find out *why* the daily refresh stopped on 9 Aug. Likely Yahoo rate-limiting the runner; add retry+backoff once the log confirms.
3. **Write the report.** Biggest grade component. Every number is now on disk in `reports/`, and the story is strong: 15 looks produced an apparent edge → we pre-registered one test on a period we'd never seen → it failed → and the benchmark itself was 4× inflated.
4. ~~Fix the verdict thresholds~~ → done 31 Aug (now stated as percentiles).
5. ~~Save backtest numbers to `reports/`~~ → done 31 Aug via `reportlib.py`; all 5 backtests + `blind_test.py` write there now.

## ⚠️ Do NOT do
- **No more engine work.** The stopping rule fired in July and the blind test independently confirmed it. Adding fundamentals or tuning weights now would undo the discipline that *is* the contribution.
- **Never quote these numbers**: sealed-period returns (+60.2% etc.), +41.1% sealed buy&hold, full-window CAGR, +164% net 10y. All survivorship-inflated. See `CHANGELOG.md`.

## 🧭 Remember
SETScout = **discovery + risk + explanation**, *not* a beat-the-market system. The honest backtest is a **strength** for the report. Keep the "educational, not advice" disclaimer.

*(To run, use the venv — the default `python` has no pandas:*
`C:\Users\HOME\.venvs\quant-project\Scripts\python.exe run_today.py`*)*
