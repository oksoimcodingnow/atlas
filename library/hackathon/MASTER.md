# 🤖 AI × Finance Hackathon — Master Doc

> The team's single source of truth: the brief, the validated problem, the idea, the AI stack, the build
> workflow, and the 4-minute video plan. **CFA Society Thailand · AI × Finance Hackathon (first in Thailand).**
> Pair with the [playbook](../hackathon.html) (how to win) and the [command center](../../hackathon.html) (dates, roster, checklist).
> Deep dive on the build: [Financial Modeling × Stats × AI architecture](FINANCIAL-MODELING-AI.md).
> **Built:** 23 Jun 2026.

---

## 0. WHAT WE OWE RIGHT NOW

1. **Team-intro video, ≤4 min** — the redo (the first was rejected). It must answer: *"how would you use AI to **help** finance?"*
2. *(Later)* the actual build + the pitch deck.

This doc focuses on nailing #1 with a real idea behind it.

---

## 1. THE FRAME (what the judges actually want)

- A hackathon rewards **build & show**, not a report. ([playbook](../hackathon.html))
- The brief — *"what can AI **help** in finance"* — is the key word. To a **CFA charterholder**, "help" means
  **do the grunt work, leave the judgment to me.** AI that *replaces* the analyst scares them (fiduciary duty);
  AI that makes them faster **and is auditable** delights them.
- **Judges' deepest fear:** AI that hallucinates numbers. Whoever shows **trust/citations** speaks their language.

> **Our north star:** *AI as the analyst's tireless junior — it reads everything and shows its receipts. The
> human keeps the judgment.*

---

## 2. THE VALIDATED PROBLEM (we didn't guess — here's the data)

| Pain | Evidence |
|---|---|
| Reading & data-gathering eats the week | analysts/associates/partners spend **40–60% of their week** on routine data collection & reading |
| It's expensive | an analyst on $120k doing **25 hrs/wk** of manual research ≈ **$60k/yr** of wasted labor |
| Nobody trusts the data | **86% of finance leaders lack confidence** in their internal data; **75%** call manual spreadsheet work a major pain |
| The grind burns people out | IB juniors report **95–100 hr weeks**, ~5 hrs sleep, **>50% planned to quit in 6 months** |
| Retail/Thai locked out ⭐ | Thailand has only **~2M SET investors**; Thais score low on risk/bonds/inflation; filings are long, dense, English-heavy |

**The triangulation:** our idea hits the **three biggest pains at once** — time on reading, distrust of data,
and retail complexity. (Sources at bottom.)

---

## 3. THE IDEA — "The Tireless Junior Analyst"

**Working name:** SET Analyst Copilot · **Positioning line (use everywhere):**
> *"AI as your tireless junior analyst — it reads everything and shows its receipts. You keep the judgment."*

**What it is:** ask a question about a company's filing (e.g. a **56-1 One Report**) — *"what's the debt
maturity profile / key risks / margin guidance?"* — and get an **answer in seconds, in Thai, with exact page
citations** you can click to verify.

**The three pains it removes (one tool):**
| Documented pain | What the AI does |
|---|---|
| 40–60% of the week reading | reads the filing, answers in seconds |
| 86% don't trust their data | **citations + audit trail** = verifiable |
| Retail/Thai locked out by complexity | **plain-language Thai** answers |

**Why it fits "help finance":** it *augments* (doesn't replace), it's *trustworthy* (receipts), and it's
*local* (SET, Thai). Demoable in under 2 minutes.

*(Alts considered: a standalone "Trust Layer" that audits any AI finance output — folded in here as stage 6;
a plain-language Risk Radar; an explainable valuation co-pilot. The Copilot wins on demoability + clarity of "help.")*

---

## 4. THE AI STACK — what AI, doing what

**Two kinds of AI (say this to judges — most teams blur it):**
- **Build-time AI** = tools we use to *make* it (Claude Code, Codex).
- **Run-time AI** = AI *inside the product* doing the finance work.

### Run-time pipeline (the product)
| # | Stage | AI used | Why (the finance value) |
|---|---|---|---|
| 1 | Read the filing | PDF extraction + a **vision model** for tables/charts | turn 200 pages into machine-readable text |
| 2 | Chunk + tag pages | (code) keep page numbers | so every answer can cite a page |
| 3 | Embed | **multilingual embedding model** | "debt maturity" matches "ตารางการชำระหนี้" — meaning, not keywords |
| 4 | Retrieve | semantic search (cosine) | feed the LLM *only* relevant pages = grounded |
| 5 | **Answer** | **Claude** (reasoning + synthesis) | raw text → analyst answer **with citations** |
| 6 | **Verify (trust layer)** ⭐ | a **second Claude pass** | checks every number vs source, flags unverifiable, scores confidence — **the wow** |
| 7 | Thai ↔ English | Claude (native Thai) | ask & answer in Thai = the local edge |

### Build-time (how we make it) — ties to our Atlas "handshake"
- **Claude Code** → scaffolds the app, writes the RAG pipeline + UI, *explains the code* (so we can answer Q&A).
- **Codex** → second pair of eyes, reviews Claude's code (our documented Claude×Codex handshake — a build story almost no team has).
- **Claude (chat)** → scoping, the pitch script, the slide outline.

---

## 5. THE BUILD WORKFLOW (thin slices — so it finishes)

Time split (from the playbook): **~15% validate · ~65% build · ~20% polish + demo.**

1. **Slice 1 — the spine:** load ONE filing → ask ONE question → get an answer. *(ugly is fine)*
2. **Slice 2 — the wow:** add **page citations**, click-to-jump.
3. **Slice 3 — the edge:** make it work **in Thai**.
4. **Slice 4 — the differentiator:** the **verify/trust layer** + confidence badge.
5. **Slice 5 — polish:** Atlas design language, record a **backup demo video**.

> If the clock runs out, **slices 1–2 alone win** — citations are the magic.

**Roles** (someone owns each): **Finance lead** (the credibility, the honest impact number) · **Builder**
(drives the prototype with Claude) · **Designer/slides** · **Presenter**.

---

## 6. THE 4-MINUTE VIDEO

**🥷 Secret weapon — show Atlas.** Most teams will *say* they'd use AI. We **show a real AI×finance hub we
already built with Claude & Codex** (Fin-Eng Studio, Terminal, quant backtester, knowledge graph). Proof > promises.

**Beat sheet:**
| Time | Beat | On screen |
|---|---|---|
| 0:00–0:20 | **Hook** — a pain moment, not a hello ("2am, page 180, still hasn't found the number") | b-roll / bold text |
| 0:20–1:00 | **Why us** — each member ONE line (finance × AI builder), then flash **Atlas** | faces + Atlas |
| 1:00–2:45 | **The idea** — pain (felt) → tool (shown) → wow (cited Thai answer) → impact number | demo/mockup |
| 2:45–3:30 | **Why AI, why trustworthy** — citations = fiduciary-safe; "we build with Claude & Codex" | proof |
| 3:30–4:00 | **Close** — vision + the positioning one-liner, team on screen | team |

**Open AND close on the line:** *"AI as your tireless junior analyst — it reads everything and shows its receipts."*

**Production (why v1 likely failed → fix):**
- v1 was probably generic ("hi we're team X") with no sharp idea → **lead with a problem + a real artifact.**
- **Audio is king** (most amateur videos die on bad sound). Subtitles **TH/EN**.
- **One idea, rehearsed, timed.** End on a **number + vision**, not "thanks for watching."
- Use **Atlas's dark/gold design language** for titles/lower-thirds = instant premium consistency.

---

## 7. DECISIONS TO LOCK (tradeoffs — decide as a team)

1. **In-browser vs backend?** Our vanilla+Firebase stack can do **RAG in the browser** (chunks + cosine in JS,
   Claude via API) → impressive ("runs in a webpage"), nothing to crash on stage. *Lean this way.*
2. **One filing hardcoded vs upload-any?** Pre-load 1–2 filings for a **bulletproof demo**; upload = bonus.
3. **How far on the trust layer?** Real verify pass vs a slick mock for the video — decide by time.
4. **Team & names/roles** — lock them (3–5 people).

---

## 8. NEXT STEPS (see the recommendations in chat) — quick list
- [ ] Confirm exact **video deadline + rubric** from CFA Society Thailand.
- [ ] Lock team + roles.
- [ ] Build **Slice 1** at/after the workshop so the video shows **real footage, not a mock**.
- [ ] Pick ONE well-known SET filing (a bank or PTT) and pre-load it.
- [ ] Do a **real time-test** (manual vs tool) to get an honest impact number.
- [ ] Record with clean audio + TH/EN subtitles + a **backup demo video**.

---

## 📎 SOURCES
- Analysts spend 40–60% of week / $60k wasted — OWL AI: https://owlaisolutions.com/2025/06/07/the-hidden-cost-of-manual-research-how-financial-professionals-are-wasting-time-and-undermining-their-own-productivity/
- 75% manual spreadsheet pain — Vena: https://www.venasolutions.com/blog/fpa-trends-predictions
- 86% lack confidence in data — InterSystems: https://www.intersystems.com/financial-services-top-challenges-survey.pdf/
- IB junior hours / burnout (Goldman survey) — eFinancialCareers: https://www.efinancialcareers.com/news/2021/06/working-hours-banks
- Analyst grunt work breakdown — Mergers & Inquisitions: https://mergersandinquisitions.com/investment-banking-analyst-job/
- Thailand ~2M SET investors / simplify retail journey — McKinsey: https://www.mckinsey.com/featured-insights/future-of-asia/countries-and-regions/southeast-asia/southeast-asia-perspectives/improving-thailands-capital-market-competitiveness-and-efficiency
- Thai financial literacy gaps — World Federation of Exchanges: https://focus.world-exchanges.org/articles/cultivating-high-quality-financial-literacy-thais
