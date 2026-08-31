# SETScout

An explainable stock screener for the Thai market — and an honest account of
whether it works.

**Live:** https://oksoimcodingnow.github.io/atlas/setscout/
**Course:** Data Science (01526125) term project

---

## What it does

Ranks ~95 SET100 stocks on five transparent, price-based factors, adapts the
ranking to the user's risk profile, and explains every recommendation in four
plain sentences: a verdict, the risk in baht, the reasons, and how much to
trust it.

## What we found

**It does not beat buying the whole market, and the score does not predict
direction.** Two hypotheses were tested against pass marks written down *before*
the tests ran, and both fell short:

| Test | Result |
|---|---|
| Does the ranking predict? | Up-rate flat at ~47% across all ten score deciles. 0% luck bar on the fair hold test |
| Does the risk sizing protect? | Max drawdown improved 5.1% at best, against a 20% pre-set bar |

That null result *is* the project. The full account, including a bias we
quantified and an error of our own we corrected, is in
**[`docs/REPORT.md`](docs/REPORT.md)**.

---

## Layout

```
setscout/
├── index.html          the app          ─┐
├── onboard.html        how it works      │ served by GitHub Pages
├── legal.html          terms & privacy   │ (do not move these)
├── today.json          what the site reads ─┘
│
├── universe.json       canonical ticker list — READ-ONLY for the engine
├── calibration.json    measured up-rate per score decile
├── run_today.py        the daily engine
├── verify_today.py     health check; fails loudly on a bad refresh
│
├── research/           analysis — nothing here runs in production
├── reports/            generated results, one file per script
└── docs/               report, changelog, handover notes
```

**`universe.json` is read-only for the engine and `today.json` is write-only.**
That separation exists because the engine used to read its own output, so a
single failed download deleted a stock permanently. Four were lost that way
before it was fixed.

---

## Running it

The default `python` on the dev machine has no pandas — use the venv:

```bash
PY="C:\Users\HOME\.venvs\quant-project\Scripts\python.exe"

$PY run_today.py                   # refresh today.json (95 stocks x 3 profiles)
$PY verify_today.py                # health check, exit 1 if the refresh is bad

$PY research/backtest.py           # calibration + luck bar
$PY research/backtest_hold.py      # the fair test: buy and hold
$PY research/blind_test.py         # pre-registered, one shot
$PY research/backtest_sizing.py    # pre-registered, one shot
$PY research/explore.py --years    # survivorship bias, year by year
```

Every research script writes a dated, reproducible report into `reports/`.

**Setup:** `pip install pandas numpy yfinance`

---

## Two scripts are pre-registered — do not re-run casually

`blind_test.py` and `backtest_sizing.py` each state their hypothesis, method and
pass mark in a block at the top of the file, written *before* the first run.
Editing those blocks and re-running makes the result exploratory rather than
pre-registered, and it has to be reported that way. The original runs are
preserved in `reports/`.

## Numbers that must never be quoted

Absolute returns from before ~2015 are inflated more than fourfold by
survivorship bias — our universe is *today's* SET100, so every backtest holds
only companies we already know survived. `docs/REPORT.md` Appendix B lists the
specific figures and what to say instead.

The short rule: **compare rows, never quote levels.**

---

## Where to start reading

1. **[`docs/REPORT.md`](docs/REPORT.md)** — the findings
2. **[`docs/CHANGELOG.md`](docs/CHANGELOG.md)** — what changed and why
3. **[`docs/CONTINUE.md`](docs/CONTINUE.md)** — current state, for a new machine
4. **[`docs/NEXT.md`](docs/NEXT.md)** — what to do next

Educational and research use only. Not investment advice. See
[`legal.html`](legal.html).
