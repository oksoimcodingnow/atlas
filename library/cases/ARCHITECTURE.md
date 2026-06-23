# 🏛️ Atlas · Case Project — Architecture

How the case-study side of Atlas is organised. The goal: **one source of truth in Markdown**, a
**clean rendered view** on the live site, and a **fact-integrity discipline** so nothing fake reaches a pitch.

---

## 1. The two layers (data flow)

```
  ┌─────────────────────┐   the original brief (PDF, 18 pages)
  │   SOURCE BRIEF      │   DHL Express Sustainability Case Booklet
  └──────────┬──────────┘
             │  read · extract · tag every fact with its page (pX)
             ▼
  ┌─────────────────────┐   library/cases/*.md
  │   WORKING LAYER     │   raw editable notes — the SOURCE OF TRUTH.
  │   (Markdown)        │   travels with `git clone`, diff-able, team-editable.
  └──────────┬──────────┘
             │  hand-render the highlights into HTML (curated, not auto-generated)
             ▼
  ┌─────────────────────┐   library/cases.html
  │   PRESENTATION      │   the published, styled view on the Atlas PWA.
  │   (cases.html)      │   accordion (<details>) per section. Links back to the .md.
  └──────────┬──────────┘
             │  git push → GitHub Pages (main branch root)
             ▼
        oksoimcodingnow.github.io/atlas/library/cases.html   (LIVE)
```

**Rule:** edit the **Markdown first**, then mirror the change into `cases.html`. The `.md` is canonical;
the HTML is a curated highlight reel. They must never contradict each other.

---

## 2. The document set (per case) — and what each is for

| Layer | File | Role |
|---|---|---|
| Entry | `CASE-summary.md` (`DHL-Express-UOB-WonderLab-2026.md`) | Canonical facts + **page map**. The index everything cites. |
| Quick | `CASE-CHEAT-SHEET.md` | One-glance pre-meeting sheet. |
| Analysis | `CASE-SITUATION-analysis.md` | 5C / SWOT / problem-tree / funnel. The "why." |
| Ideas | `CASE-STRATEGY-bank.md` | Breadth — every angle + build-outs. |
| Ideas | `CASE-TOP3-deepdive.md` | Depth — the strongest few, fully built. |
| Ideas | `CASE-IDEAS-brainstorm.md` | Live working scratchpad. |
| Evidence | `CASE-RESEARCH-deepdive.md` | External research (competitors, regulation, sources). |
| Evidence | `CASE-CARBON-ECONOMICS.md` | The numbers / cost model / ROI. |
| Meta | `README.md` · `ARCHITECTURE.md` | Index + this doc. |

**Naming:** `CASENAME-TOPIC.md`, kebab/caps topic. New case = new prefix.

**Dependency direction:** analysis & ideas → cite → **summary** (facts) and **research/economics** (evidence).
Facts live in *one* place (the summary's page map); everything else references them. Don't duplicate a number
across files — link to where it's defined.

---

## 3. Fact-integrity discipline (the part that wins or loses pitches)

Three tiers of truth, always visibly labelled:

1. **Booklet fact** → tag the page: `(p14)`. Verifiable in the source brief.
2. **External research** → cite a source link. Lives in research/economics docs.
3. **Assumption / our idea** → flag explicitly: `⚠️ ASSUMED — not in booklet` or `(our working line)`.

Hard rules:
- **Never present an assumption as a booklet fact.** (We caught & fixed: an invented challenge tagline,
  fake prize splits, an unconfirmed pitch date, assumed judging criteria.)
- **Claim hygiene for green statements:** specific number + method + source; the GoGreen Plus claim is
  **book-and-claim** → "funded a verified reduction," never "flew on SAF." Never "carbon neutral."
- **Illustrative numbers are labelled illustrative** and list what real figure must replace them (e.g.
  MyDHL+ for per-shipment kg).

---

## 4. How `cases.html` is built (conventions)

- Self-contained: inline `<style>`, design tokens in `:root`, DHL brand vars (`--dhl-yellow/red`).
- One **`<div class="case">`** per case → `.case-head` (badge/title/status) + a stack of **`<details>`**
  accordions, one per `.md` doc.
- Reusable blocks: `.key` (highlight), `.num-grid`/`.stat` (numbers), `.body table` (compare),
  `.good`/`.bad` (do/don't), `.src` (source/footnote line linking the raw `.md`).
- Shared FX script: `../lib/atlas-fx.js`. Manifest/icons from atlas root (it's a PWA).

**To add a new case:** (1) write the `.md` docs, (2) list them in `README.md`, (3) clone a `.case` block in
`cases.html` and fill the accordions, (4) add a row/link on `library/index.html` if needed, (5) commit + push.

---

## 5. Deploy

- **Host:** GitHub Pages, served from **`main` branch root** (no build step, no workflow).
- **Live URL:** `https://oksoimcodingnow.github.io/atlas/library/cases.html`
- **Publish = `git push origin main`.** Pages redeploys automatically in ~1 min. Because there's no build,
  **whatever is in `main` is live** — so the fact-integrity rules above matter: a wrong claim pushed is a
  wrong claim published.

---

## 6. Roadmap (nice-to-haves)
- [ ] Interactive **ROI calculator** (HTML): inputs customers/day, opt-in %, avg kg → CO₂ cut + cost/aware-customer.
- [ ] A small **Markdown→HTML** helper so the rendered view can't drift from the notes.
- [ ] Per-case **status badge** (Active / Submitted / Won) driven from `README.md`.
