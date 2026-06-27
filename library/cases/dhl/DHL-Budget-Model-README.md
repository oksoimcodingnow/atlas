# 📗 DHL-Budget-Model.xlsx — what this spreadsheet is (read me first)

> Companion brief for `DHL-Budget-Model.xlsx`. If you're Claude-in-Excel (or anyone) opening that file,
> this tells you what each tab does, which cells are inputs, and how the numbers flow. Built 27 Jun 2026.

---

## WHAT IT IS
A live, formula-driven budget + ROI model for the **DHL × UOB WonderLab 2026** ฿5M campaign. Change an input
and every downstream number recalculates. It is the quantitative engine behind `DHL-FINANCE-DEEP.md` (the
narrative version) and `DHL-FINANCE-MODEL.md` (the ROI logic).

## THE 3 TABS

### 1. `Budget` — the bottom-up line items
- Each row = a real cost line: **Subtotal = Unit ฿ × Qty** (column E = `C*D`).
- **Yellow cells = editable inputs** (Unit ฿ and Qty). Everything else is computed.
- `GRAND TOTAL` (row 27, col E) = `SUM(E5:E27)`; a variance row checks it against the ฿5,000,000 cap.
- "Basis / source" column says where each unit price came from; `[est.]` = benchmarked, not yet quoted.
- 23 line items across 6 buckets.

### 2. `Summary` — budget by bucket
- Uses `SUMIF(Budget!A:A, "<bucket>", Budget!E:E)` to total each of the 6 buckets from the Budget tab.
- Gives the **donut-chart numbers** (30/20/18/15/12/5%). Auto-updates if you change Budget lines.

### 3. `ROI Model` — the funnel + sensitivity
- **Yellow inputs:** Customers reached (150,000 proxy), Awareness lift (20pp), Opt-in conversion (10%).
- Computes: Incremental opt-ins = `reached × lift × opt-in`; Cost per aware customer; Cost per opt-in.
- Campaign cost pulls live from the Budget grand total.
- **Sensitivity block:** cost-per-opt-in at 2% / 5% / 10% / 20% / 30% opt-in — proves it's justified even at 2%.

## HOW TO USE IT (common asks)
- **"What if posters cost more?"** → edit Unit ฿ on the poster row in `Budget`; grand total + Summary update.
- **"What if opt-in is only 5%?"** → change `ROI Model!B6` to 5%; cost-per-opt-in recalculates.
- **"Show me the bucket split"** → `Summary` tab.
- **Keep it at exactly ฿5M** → watch the "Variance vs cap" row on `Budget`; adjust quantities to zero it.

## HONESTY / CAVEATS (say these if a judge probes)
- Inputs marked `[est.]` are **benchmarked from Thai vendor rates, not tendered quotes** — firmed at RFP in
  Phase 1. (Claiming invoice-precision on an un-tendered 3-month plan is less credible, not more.)
- "Customers reached" (150,000) is a **proxy** — DHL Express TH's exact volume isn't public. Stated openly.
- All unit prices sourced in `DHL-FINANCE-DEEP.md` (Gogoprint, LINE OA, Bangkok Video, market-research rates).

## RECONCILIATION
Grand total = **฿5,000,000**, matching the Canva finance slide and `DHL-FINANCE-DEEP.md` exactly.

---
↩ **[Back to Atlas case library](https://github.com/oksoimcodingnow/atlas/tree/main/library/cases)** · part of the Atlas project.
