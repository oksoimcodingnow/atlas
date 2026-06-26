# 🧮 DHL Challenge — The Green Shipper Tier MODEL (the math behind the fairness)

> The scoring engine under [DHL-TIER-loyalty.md](DHL-TIER-loyalty.md). Built to answer the killer
> question: *"Won't big corporate clients just dominate your Gold tier?"* — **No, and here's the math.**
> Design principle: a small seller who ships **greener** must be able to out-rank a big firm that ships
> **more**. We score the *choice*, not the *size*. Built 26 Jun 2026 (Pakkapon's tier, made rigorous).

---

## 0. THE PROBLEM IN ONE LINE
Rank by raw green volume → big firms win automatically (they ship more of everything).
Rank by raw green % → a 1-of-1 shipper "wins" with 100%.
**Solution: a blended score that is size-neutral, habit-rewarding, and gaming-resistant.**

---

## 1. THE FOUR INPUTS (per shipper, rolling 90-day window)

| Symbol | Meaning | How measured |
|---|---|---|
| `G` | green shipments (GoGreen Plus) in window | count |
| `T` | total shipments in window | count |
| `W` | # distinct weeks with ≥1 green shipment | count (max 13 in 90 days) |
| `D` | avg verified CO₂ reduction % chosen (30–100%) | from GoGreen Plus selection |
| `R_now`, `R_prev` | green rate this window vs previous window | G/T this vs last |

---

## 2. THE SCORE (0–100)

**Step 1 — four sub-scores, each 0–1:**
```
GreenRate     = G / T                          # the fairness core (size-neutral)
Consistency   = W / 13                          # weeks active out of ~13 in 90 days
Momentum      = clip( (R_now - R_prev) / 0.25 , 0, 1 )   # +25pp improvement = full marks
Depth         = (D - 30) / 70                   # 30%→0, 100%→1 (verified reduction chosen)
```

**Step 2 — credibility floor (anti-gaming):**
```
Cred = min( T / 5 , 1 )      # need ~5 shipments for full credibility; 1-of-1 is discounted
```
This kills the "100% from a single shipment" exploit — a 1-shipment shipper gets Cred = 0.2.

**Step 3 — small-firm fairness handicap (the anti-big-firm lever):**

How do we know a shipper is "small"? **We don't guess — DHL already knows.** (See §3a.)
```
isSME      = 1 if DHL classifies the account as SME / retail / ServicePoint, else 0
SizeBoost  = 1 + 0.15 * isSME
# SME / ServicePoint account → +15% boost
# Corporate / contract account → boost = 0  (no penalty, just no SME bonus)
```
Rationale: a tiny seller's effort is *harder* (less infrastructure, no sustainability team), so we tilt the
field gently toward them. Big firms aren't punished — they simply don't get the SME bonus. The flag comes
from **DHL's own customer classification**, which aligns with Thailand's official SME definition (§3a) — so
"small" is defined by law + DHL's data, not by us.

**Step 4 — combine:**
```
Base  = 0.50*GreenRate + 0.20*Consistency + 0.20*Momentum + 0.10*Depth
Score = 100 * Base * Cred * SizeBoost      (capped at 100)
```

---

## 3a. HOW WE DEFINE "SMALL" (the answer to "how do you even know?")

We do **not** invent a size cutoff. Three layers, primary first:

1. **DHL's own account flag (primary).** DHL already separates **Corporate / contract accounts** from
   **SME / retail / MyDHL+ shippers**, and our campaign runs at **ServicePoints — inherently the SME /
   walk-in channel.** So the SME flag is data DHL *already holds*; `isSME` reads straight off it.
2. **Thailand's official SME definition (the legal backing).** Per OSMEP, Ministerial Regulation
   B.E. 2562 (2019), for **trade & service** firms (where shippers/e-commerce sellers sit):
   | Class | Annual revenue | Employees |
   |---|---|---|
   | Micro | ≤ ฿1.8M | ≤ 5 |
   | Small | ≤ ฿50M | ≤ 30 |
   | Medium | ≤ ฿300M | ≤ 100 |
   | Large | above | above |
   → "An SME is officially a firm under **฿300M revenue / 100 staff**. That's who the tier protects."
3. **Shipment-volume backstop (only if the flag is missing).** If an account isn't tagged, low
   parcels/quarter stands in as a proxy for "small." Approximate, used only as a fallback.

**Pitch answer:** *"We don't decide who's small — DHL's own SME classification does, and it lines up with
Thailand's legal SME definition. We just reward the small ones for shipping green."*

---

## 3. THE TIER CUTOFFS

| Tier | Score | Plain meaning |
|---|---|---|
| 🌱 **Sprout** | first green shipment (Score > 0) | "You started." |
| 🥉 **Bronze** | ≥ 25 | Ships green sometimes, building the habit |
| 🥈 **Silver** | ≥ 50 | Steady green shipper, consistent |
| 🥇 **Gold** | ≥ 75 | High green rate + consistent + deep reductions |

*(Cutoffs are tunable; these are the pitch defaults. Tier = status layer on top — Sprout already gets the
Receipt + good feeling, per the loyalty-doc guardrail "don't paywall participation.")*

---

## 3b. WHAT EACH TIER GETS — the rewards breakdown

Design rule (from loyalty research): **status/recognition/visibility beats discounts** — it's more
motivating, on-brand, and **margin-safe** (no cash given away, fits the "you're already helping, for free"
frame). Every reward below is **earned recognition, not a price cut.** Benefits **stack** (each tier keeps
the ones below).

| Tier | Earn it by | 🎁 Badge | 📣 Visibility | ⭐ Status perk | 💚 Real value to the SME |
|---|---|---|---|---|---|
| 🌱 **Sprout** | 1st green shipment (Score > 0) | "Green Shipper — Started" badge | — | Welcome + first Green Receipt | Proof to show "I ship green" from day one |
| 🥉 **Bronze** | Score ≥ 25 | Bronze Green Shipper badge (shop/socials) | Listed on Thailand Green Map | Progress bar: "X to Silver" | A credible badge buyers recognize |
| 🥈 **Silver** | Score ≥ 50 | Silver badge (nicer art) | **Featured** pin on the Green Map | Branded Green Stamp on their boxes | Stands out on the map; better box presentation |
| 🥇 **Gold** | Score ≥ 75 | Premium Gold badge | **Spotlight story** (the SME video pipeline) | Priority on UGC features; "Gold Green Shipper" title | Real earned media — DHL tells their story |

**Why these rewards (not discounts):**
- **Badges/titles** = the SPREAD pillar — sellers show buyers → free marketing for them *and* DHL.
- **Map features/spotlight** = the BELONG pillar — collective pride + recognition (research: status > price).
- **Branded stamp** = the CARRY pillar — a tangible upgrade that costs DHL almost nothing.
- **No cash, no % off** → protects DHL margin, stays Green-Claims safe, and never asks the SME to "pay more."

**Cost guardrail:** loyalty best practice caps reward cost at ~5–10% of incremental revenue. Ours is mostly
**digital/recognition (near-zero marginal cost)** — it fits inside the campaign, not on top of it.

---

## 4. ⭐ WORKED EXAMPLE — small firm BEATS big firm (this is the slide)

**Small seller "Nong's Crafts":** ships 40 parcels/90 days, 32 green (80% rate), active 11 of 13 weeks,
chose 50% reductions, last window was 60% green (improving +20pp).
```
GreenRate=0.80  Consistency=11/13=0.85  Momentum=(0.20/0.25)=0.80  Depth=(50-30)/70=0.29
Base = 0.50*0.80 + 0.20*0.85 + 0.20*0.80 + 0.10*0.29 = 0.40+0.17+0.16+0.029 = 0.759
Cred = min(40/5,1)=1.0    SizeBoost = 1+0.15*1 = 1.15  (DHL-tagged SME / ServicePoint account)
Score = 100 * 0.759 * 1.0 * 1.15 = 87.3  → 🥇 GOLD
```

**Big firm "MegaCorp Logistics":** ships 8,000 parcels/90 days, 800 green (10% rate), active all 13 weeks,
chose 30% reductions, flat vs last window.
```
GreenRate=0.10  Consistency=13/13=1.0  Momentum=0  Depth=(30-30)/70=0
Base = 0.50*0.10 + 0.20*1.0 + 0.20*0 + 0.10*0 = 0.05+0.20 = 0.25
Cred = 1.0    SizeBoost = 1+0.15*0 = 1.0   (Corporate / contract account — no SME bonus)
Score = 100 * 0.25 * 1.0 * 1.0 = 25.0  → 🥉 BRONZE
```

➡️ **Nong's Crafts (40 parcels) = GOLD. MegaCorp (8,000 parcels) = BRONZE.** The small seller wins on
*choice quality*, not size. **That's the answer to the takeover fear, in numbers.**

*(Note: MegaCorp still cut far more absolute CO₂ — and that's fine. The TIER rewards green behaviour/loyalty;
absolute tonnage is celebrated separately on the national Map. Two scoreboards, no conflict.)*

---

## 5. WHY EACH CHOICE IS DEFENSIBLE (judge Q&A)
- **"Why rate not volume?"** → "Volume rewards being big. Rate rewards the *decision* — which is what we
  want every shipper, especially SMEs, to make. Absolute impact is shown on the Map; the tier shows commitment."
- **"Isn't the small-firm boost unfair to big clients?"** → "It's +15% max and fades to zero by 200 shipments.
  Big firms aren't penalised — we just don't make a tiny seller compete on a corporation's infrastructure.
  It mirrors how UOB's SME programs are *designed for* the small player."
- **"Can't someone game it?"** → "The credibility floor (needs ~5 shipments) blocks the 1-of-1 trick, and
  it's all verified GoGreen Plus usage — book-and-claim, not self-reported. Green-Claims safe."
- **"Why a 90-day rolling window?"** → "Matches the campaign length, rewards *current* habit, and lets a
  reformed shipper climb — momentum is built in."

---

## 6. FEASIBILITY (keep it cheap — it's still a marketing campaign)
- All four inputs come from data DHL **already has** (GoGreen Plus usage in MyDHL+/LINE). No new tracking.
- The whole model is **4 counts + a little arithmetic** → a spreadsheet or a few lines of code. Runs in LINE OA.
- For the pitch: show the **two worked examples** (Nong vs MegaCorp). The formula is the back-up slide.

---

## 7. ⚠️ KEEP IT SIMPLE ON STAGE (don't make judges do the math)

The formula is the **back-up slide, not the pitch.** Complexity kills if the audience has to follow it live.
What you actually SAY (≈15 sec):

> *"Four tiers — Sprout, Bronze, Silver, Gold — earned by how green your choices are, not how big you are.
> Each unlocks a better badge and more spotlight. A small seller who ships green every week can hit Gold
> while a corporation sits at Bronze."*

Then **only if a judge asks "how exactly?"** → flip to the formula slide. Layered, not dumped:
- **Layer 1 (always):** the 4-tier ladder + the rewards table (§3b) — concrete and satisfying.
- **Layer 2 (on request):** "greenness = mostly your green *rate*, plus consistency and improvement."
- **Layer 3 (deep Q&A):** the full weighted formula (§2) and the SME definition (§3a).

Research backs this: 3–5 tiers is the simplicity sweet spot, and **transparent, clear benefits drive
participation** — so show the *ladder and the prizes*, hide the *engine*.

---

## 8. ONE-LINE FOR THE PITCH
> *"We rank shippers by the greenness of their choices, not the size of their wallet — so a home seller in
> Chiang Mai who ships green every week can wear Gold while a giant corporation sits at Bronze. The tier
> protects the little guy by design — it's in the math."*
