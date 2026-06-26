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
```
SizeBoost = 1 + 0.15 * (1 - min( T / 200 , 1 ))
# small shipper (low T) → boost up to +15%
# large shipper (T ≥ 200) → boost = 0  (no penalty, just no boost)
```
Rationale: a tiny seller's effort is *harder* (less infrastructure), so we tilt the field gently toward
them. Big firms aren't punished — they simply don't get the small-firm bonus. Defensible to a bank judge.

**Step 4 — combine:**
```
Base  = 0.50*GreenRate + 0.20*Consistency + 0.20*Momentum + 0.10*Depth
Score = 100 * Base * Cred * SizeBoost      (capped at 100)
```

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

## 4. ⭐ WORKED EXAMPLE — small firm BEATS big firm (this is the slide)

**Small seller "Nong's Crafts":** ships 40 parcels/90 days, 32 green (80% rate), active 11 of 13 weeks,
chose 50% reductions, last window was 60% green (improving +20pp).
```
GreenRate=0.80  Consistency=11/13=0.85  Momentum=(0.20/0.25)=0.80  Depth=(50-30)/70=0.29
Base = 0.50*0.80 + 0.20*0.85 + 0.20*0.80 + 0.10*0.29 = 0.40+0.17+0.16+0.029 = 0.759
Cred = min(40/5,1)=1.0    SizeBoost = 1+0.15*(1-40/200)=1+0.15*0.8=1.12
Score = 100 * 0.759 * 1.0 * 1.12 = 85.0  → 🥇 GOLD
```

**Big firm "MegaCorp Logistics":** ships 8,000 parcels/90 days, 800 green (10% rate), active all 13 weeks,
chose 30% reductions, flat vs last window.
```
GreenRate=0.10  Consistency=13/13=1.0  Momentum=0  Depth=(30-30)/70=0
Base = 0.50*0.10 + 0.20*1.0 + 0.20*0 + 0.10*0 = 0.05+0.20 = 0.25
Cred = 1.0    SizeBoost = 1+0.15*(1-1)=1.0   (T≥200, no boost)
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

## 7. ONE-LINE FOR THE PITCH
> *"We rank shippers by the greenness of their choices, not the size of their wallet — so a home seller in
> Chiang Mai who ships green every week can wear Gold while a giant corporation sits at Bronze. The tier
> protects the little guy by design — it's in the math."*
