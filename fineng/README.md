# Fin-Eng Studio

Interactive study tools for a Financial Engineering degree — one per course. Each tool
turns a piece of the syllabus into something you can *drag and watch*, and the numerical
core of the hardest one (Black–Scholes) is **unit-tested against textbook values**.

Live: https://oksoimcodingnow.github.io/atlas/fineng/

## The tools

| Page | Course | What it does |
|------|--------|--------------|
| `portfolio.html`  | Portfolio Analysis  | Efficient frontier (verified: 60/40 → 12.55% return) |
| `valuation.html`  | Valuation           | Bond pricer + stock DCF (par/premium/parity checks) |
| `stochastic.html` | Stochastic Processes| Geometric Brownian-motion lab (mean → S₀e^{μT}, std → σ√T) |
| `datascience.html`| Data Science        | Return explorer (skew, excess kurtosis, Sharpe) |
| `markets.html`    | Markets & Institutions | Interactive institutions flow-map |
| `options.html` ★  | Capstone            | Black–Scholes pricer + payoff diagram + greeks |

## Why the capstone is the showpiece

`options.html` ties three courses together: the random walk from Stochastic Processes,
discounting from Valuation, and volatility from Data Science — out comes the Black–Scholes
price. The pricing math is **not** written inline on the page; it lives in a pure,
dependency-free module so it can be tested:

- **Math:** [`../lib/blackscholes.js`](../lib/blackscholes.js) — knows nothing about the
  DOM. `blackScholes(S, K, sigma, T, r)` → `{ call, put, d1, d2, deltaCall, deltaPut }`.
- **Tests:** [`../test/blackscholes.test.mjs`](../test/blackscholes.test.mjs) — run with
  `npm test`. Verifies the textbook case (S=K=100, σ=20%, T=1, r=5% → **call 10.4506 /
  put 5.5735**), put–call parity to 1e-9, the N(·) anchors, and the T=0 / σ=0 edge cases.

```
npm test    # 43 assertions: 26 loot engine + 17 Black–Scholes
```

## Running locally

The capstone loads its math as an ES module, which browsers block over `file://`. To run
it locally, serve the folder:

```
python -m http.server      # from the atlas/ root, then open localhost:8000/fineng/options.html
```

Opening the file directly still renders the explanation and formula; only the live pricing
is inert (the page detects `file://` and says so).
