# 🏗️ Financial Modeling × Stats × AI — The Architecture (Master Doc)

> First: how financial modeling and statistics actually work, step by step. Then: an architecture for
> **where AI plugs into each step** — so we implement AI on purpose, not as decoration.
> Part of the [AI × Finance Hackathon](MASTER.md) section.
> **Built:** 23 Jun 2026.

---

## ⚡ TL;DR (the whole thing in 5 lines)
1. Financial modeling = **gather → clean → analyze → assume → project → value → stress-test → present.**
2. Statistics = the toolkit that turns raw numbers into **signal** (returns, correlation, regression, risk).
3. **~80% of both is mechanical grunt work** (gathering, cleaning, computing, filtering, testing, explaining).
4. **AI does that 80%; the human keeps the 20% that's judgment** (assumptions, thesis, the final call).
5. Our hackathon product implements this: **AI screens the noise → proposes hypotheses → our backtester tests them → we decide.**

---

# PART 1 — How financial modeling actually works

**What it is:** a quantitative model of a company/asset, built to **forecast** its future and **value** it today.

### The main model types
| Model | What it answers | Core method |
|---|---|---|
| **3-Statement** | how do the financials connect & evolve? | linked Income Statement + Balance Sheet + Cash Flow |
| **DCF** (Discounted Cash Flow) | what is it *intrinsically* worth? | project free cash flows → discount at WACC → sum |
| **Comps** (comparable companies) | what's it worth *vs peers*? | peer multiples (P/E, EV/EBITDA, P/B) |
| **Precedent transactions** | what did similar deals pay? | past M&A multiples |
| **Factor / quant model** ⭐ | which stocks to pick & why? | multi-factor scoring + statistical testing |

### The 8-step build process (this is the spine)
1. **Gather data** — historical financials (56-1 / 10-K), market prices, macro.
2. **Clean & structure** — normalize, fill gaps, lay it into a template.
3. **Analyze historicals** — ratios (margins, ROE, growth), trends, anomalies.
4. **Set assumptions** ⭐ — growth, margins, WACC, terminal value. *(the judgment step)*
5. **Build projections** — forecast the statements forward, keep them linked.
6. **Value** — DCF and/or comps → a number (or a range).
7. **Sensitivity / scenario** — how does the value move if assumptions change?
8. **Sanity-check & present** — error-check, write the "what & why," present.

> Steps 1–3, 5–8 are mostly **mechanical**. Step 4 (assumptions) is where **human judgment** lives.

---

# PART 2 — The statistics behind it

The stats toolkit, roughly in the order you meet it:

| Tool | What it's for | Where it shows up |
|---|---|---|
| **Descriptive stats** | mean, median, **std dev = volatility**, min/max | risk, return summaries |
| **Returns & distributions** | log returns, normality, **fat tails** | everything quant |
| **Correlation / covariance** | what moves together | diversification, portfolio risk |
| **Regression** | relationship + significance (R², t-stat, **p-value**) | CAPM **beta**, factor models |
| **Time series** | stationarity (ADF), autocorrelation, **GARCH** (vol clustering) | forecasting, vol |
| **Hypothesis testing** | "does this factor actually predict returns?" | factor research |
| **Dimensionality / feature selection** ⭐ | cut 100s of factors to the few that matter (**PCA, LASSO, importance**) | quant stock selection |
| **Risk stats** | **VaR, Sharpe, drawdown**, Monte Carlo | portfolio & risk mgmt |

> The quant problem Pakkapon named lives here: **too many factors (PE, PBV, ROE, oil, …) → which are signal vs noise?** That's **feature selection + hypothesis testing.**

---

# PART 3 — The AI architecture: WHERE AI plugs in

### The governing principle
> **AI handles the mechanical 80% (gather, clean, compute, filter, test, explain). The human owns the 20% that's judgment (assumptions, thesis, the decision).**

That single sentence is the whole "AI helps finance" thesis — and it's what CFA judges want (augment, don't replace).

### The two kinds of AI (don't blur them)
- **LLM (Claude)** = the *language & reasoning* jobs — read filings, reason about which factors matter, **generate hypotheses, explain results, draft commentary.**
- **ML / stats code** = the *number* jobs — feature selection (LASSO / random-forest importance), regression, PCA, backtesting. **Claude & Codex write this code.**
- **Build tools** = Claude Code + Codex build the app itself (and review each other — the "handshake").

### Where AI plugs into each modeling step
| Step | Grunt? | What AI does | Which AI | Human keeps |
|---|---|---|---|---|
| 1 Gather | ✅ | extract financials from filings, pull prices/macro | LLM + data APIs | source choice |
| 2 Clean | ✅ | normalize, fill gaps, build the table | code (Codex) | — |
| 3 Analyze | ✅ | compute every ratio, flag trends & anomalies | code + LLM (explain) | what's material |
| **4 Assumptions** | ❌ **judgment** | *suggest* ranges from history/comps + draft rationale | LLM (proposes) | **the call — own it** |
| 5 Project | ◑ | auto-build linked forecast | code/LLM | structure choice |
| 6 Value | ◑ | run DCF math, pull comps, compute multiples | code + LLM | the inputs |
| 7 Sensitivity | ✅ | run all combos, surface the real drivers | code | which scenarios matter |
| 8 Present | ✅ | error-check formulas, draft the commentary | LLM | the narrative |

### Where AI plugs into the quant/stats side (Pakkapon's lane)
| Step | What AI does | Human keeps |
|---|---|---|
| Compute factors | build 100s of factors from raw data | which to consider |
| **Screen (signal vs noise)** ⭐ | drop collinear/noisy, rank importance | sanity |
| **Generate hypotheses** ⭐ | propose testable ideas **+ the reason why** | which to pursue |
| Test statistically | run regression / tests, report p-values | interpret, **avoid p-hacking** |
| Backtest | scaffold, compute Sharpe / drawdown (leakage-safe) | the decision |
| Explain | turn output into plain language | the thesis |

### The pipeline (one picture)
```
RAW OVERLOAD                AI (the easy 80%)                 HUMAN (the hard 20%)
filings, prices,   ──►  gather · clean · compute  ──►  reads the shortlist,
100s of factors         filter noise · rank ·          judges the assumptions,
                        propose hypotheses · explain    decides the thesis
                                  │
                                  ▼
                        TEST in the backtester  ──►  keep / kill the idea
```

---

# PART 4 — Where this becomes our hackathon product

**The hero implementation** (combines Pakkapon's idea + tools we already built):
> **AI screens hundreds of noisy factors → keeps the few signals, explains *why* → writes testable hypotheses → our backtester tests one → the human decides.**

- **The "easy job" on screen:** AI sifts 100 factors in seconds — visibly doing the tedious work an analyst hates.
- **The trust angle:** Claude *explains* each chosen factor + hypothesis (not a silent black box) → fiduciary-safe, CFA-friendly.
- **The "why us":** we already have the **quant backtester** + fin-eng tools in Atlas → the testing engine exists.

### Guardrails (so it's rigorous, not hand-wavy)
- **AI proposes, statistics disposes** — every AI hypothesis gets a real statistical test before anyone believes it.
- **No p-hacking** — pre-commit the test; the human watches for overfitting.
- **Explainable** — if Claude can't say *why* a factor matters, we don't use it.
- **Human decides** — the model never "picks the stock"; it hands a tested, explained shortlist to a person.

### Demo flow (≈2 min)
1. Show the mess: a universe + 100 factors. *"No human reads all this."*
2. Hit run → AI keeps 5 signals, **explains each**, writes 3 hypotheses.
3. Backtest one live → Sharpe / drawdown.
4. *"AI did the grind in 10 seconds. We keep the judgment."*

---

## 📎 Grounded in (see [MASTER.md](MASTER.md) sources)
Analyst time-sinks (40–60% on data), distrust of data (86%), factor overload — the documented pains this architecture removes.
