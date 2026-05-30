# The Study Flow

The reference card. Editorial version lives at `demos/study-flow.html`.

---

## The loop (every cycle, ~45 min)

| # | Move | What you do | Where |
|---|------|-------------|-------|
| 1 | **Capture** | Write the question on one line, falsifiable. Drop into Schedule tagged `study`. | Schedule |
| 2 | **Source** | Open the right NotebookLM notebook. Upload the source if it's not there. One notebook per *domain*, not per topic. | NotebookLM |
| 3 | **Ask** | Bring the question + a quote to Claude. Push back on the first answer. Demand a worked example, not just a formula. | Claude (skills auto-fire) |
| 4 | **Code** | Implement one concrete instance in `quant/`. Run it on real BTC bars via `utils.data_loader`. If your number matches the worked example, you learned it. | Quant repo |
| 5 | **Log** | Tick the Schedule task. Write a 1-paragraph note in `quant/research/`. Future-you is the audience. | Schedule + research/ |
| 6 | **Cycle** | One loop = enough. Three = great day. Don't chase 8-hour deep work; chase repetition. | — |

## Cadence

- **Daily**: 1–3 loops.
- **Weekly (Sunday)**: skim `quant/research/`, retire dead questions, promote two open ones to *This Week*.
- **Monthly (1st)**: snapshot — what's reflexive vs still hand-wavy. Wavy list = next month's curriculum.

## Hard rules (don't skip)

1. **Every question is falsifiable.** "Learn X" is not a question.
2. **Every answer cites a source.** Quote the page, not your vibes.
3. **Every concept gets implemented at least once.** Reading without coding rots.
4. **Every cycle ends in writing.** No log = it didn't happen.

## What goes in which notebook

One notebook per **domain**. Topics rotate inside the notebook; domains last.

| Notebook | What's inside |
|---|---|
| Quant Finance | Hull, Lopez de Prado, Grinold & Kahn, papers from arXiv q-fin |
| Math foundations | Real analysis, stochastic calc, linear algebra refreshers |
| CS / Algo | Adversarial Search, RL primers, anything that's not language-specific |
| Markets | Sector primers, regime histories, micro-structure notes |

Add notebooks sparingly. Five is plenty.

## Friction points worth tolerating

- **NotebookLM × Claude MCP is parked.** Manual copy/paste between tabs is the workaround. Don't waste a day trying to fix it — the manual flow is fine and the value is in the loop, not the integration.
- **Claude doesn't see your NotebookLM context automatically.** When the question is grounded in a source, paste the relevant passage into the chat. It's two seconds.
- **Your Skills library is a lookup, not a tutorial.** When you forget which skill does VaR vs CVaR, search `skills.html`. Don't try to remember all 49.

## Friction points NOT worth tolerating

- A question you can't articulate in one line → it's not a question yet, it's a vibe. Sit longer.
- A loop that's only steps 2–3 (read & chat) → no coding = it didn't stick. Force step 4.
- Skipping the log because "I'll remember." You won't.

## What this is, ultimately

The flow is the work. The questions are the work. The implementations are the work. The notebooks, the chat, the code, the log — they're scaffolding for *repetition*. The compound interest of the loop is what makes you good at fin-eng. Not the heroic session.

---

*See `DESIGN.md` for the visual language. See `CLAUDE.md` for agent conventions.*
