# Workflow — the maps

These diagrams are **Mermaid**: plain text that AI agents read and edit like
code, and that renders to a visual flowchart for humans. GitHub draws them
automatically below. A styled visual version lives at `demos/workflow.html`.

When the workflow changes, edit the Mermaid text here — both the human picture
and the AI's understanding update from the same source.

---

## 1. The Handshake — how code ships safely

Claude builds, Codex checks, you decide. Nothing reaches `main` without you.

```mermaid
flowchart TD
    A([Start]) --> B["Claude: build the feature"]
    B --> C["Commit with a #35;#35;#35; Verify block<br/>(3–6 falsifiable checks)"]
    C --> D["Run scripts/review.bat"]
    D --> E["Paste the printed prompt into Codex"]
    E --> F["Codex reads the diff,<br/>checks each Verify item"]
    F --> G["Codex writes REVIEWS/&lt;date&gt;.md<br/>PASS · FAIL · NOTE per item"]
    G --> H{"Owner reads<br/>the review"}
    H -->|all PASS| I["Merge / push"]
    H -->|any FAIL| J["Claude fixes in a NEW commit<br/>(never amend)"]
    J --> D
    I --> K([Done])

    classDef build fill:#1a1a3e,stroke:#818cf8,color:#f1efe6;
    classDef check fill:#11243a,stroke:#22d3ee,color:#f1efe6;
    classDef owner fill:#2a2416,stroke:#f3d59a,color:#f1efe6;
    class B,C,J build;
    class E,F,G check;
    class H,I owner;
```

**Skip the handshake** for: typos, docs, comment-only edits, hotfix one-liners.
**Always run it** for: alpha logic, money handling, auth, data sync, security.

---

## 2. The agent stack — who does what

Four specialists, one decider. Each catches what the others miss.

```mermaid
flowchart LR
    subgraph Builders
      C["Claude<br/>builds code"]
    end
    subgraph Checkers
      X["Codex<br/>reviews the diff<br/>(logic, bugs)"]
      A["Antigravity<br/>runs it in a browser<br/>(does the UI work?)"]
      I["Impeccable<br/>critiques the design<br/>(does it look generic?)"]
    end
    O(["You<br/>the only one who merges"])

    C --> X
    C --> A
    C --> I
    X --> O
    A --> O
    I --> O
    O -->|"fix this"| C
    O -->|"approved"| M([main])

    classDef b fill:#1a1a3e,stroke:#818cf8,color:#f1efe6;
    classDef k fill:#11243a,stroke:#22d3ee,color:#f1efe6;
    classDef o fill:#2a2416,stroke:#f3d59a,color:#f1efe6;
    class C b;
    class X,A,I k;
    class O,M o;
```

| Agent | Superpower | Blind spot it fills |
|-------|------------|---------------------|
| **Claude** | builds, reasons | — (the builder) |
| **Codex** | reads code diffs | logic bugs, look-ahead bias, data races |
| **Antigravity** | drives a real browser | "does the button actually work?" |
| **Impeccable** | design expertise | "this looks AI-generated / generic" |
| **You** | judgment + authority | decides what's contextually right |

---

## 3. The study flow — turning curiosity into competence

One loop, run daily. Each pass is ~45 minutes.

```mermaid
flowchart TD
    Q["1 · Capture<br/>write the question (falsifiable)"] --> S["2 · Source<br/>open the NotebookLM notebook"]
    S --> K["3 · Ask<br/>bring it to Claude (skills fire)"]
    K --> CO["4 · Code<br/>implement one instance in quant/"]
    CO --> LO["5 · Log<br/>one paragraph in research/"]
    LO --> CY{"6 · Cycle"}
    CY -->|"new questions"| Q
    CY -->|"weekly"| W["Triage research/ · promote 2"]
    CY -->|"monthly"| MO["Snapshot: reflexive vs hand-wavy"]

    classDef s fill:#2a2416,stroke:#f3d59a,color:#f1efe6;
    class Q,S,K,CO,LO s;
```

---

## 4. Quant research — from idea to (maybe) trading

Nothing goes live until it survives honest validation.

```mermaid
flowchart TD
    H["Hypothesis<br/>(an alpha idea)"] --> D["Get data<br/>(ccxt → cache)"]
    D --> B["Backtest<br/>(vectorbt, fees + slippage)"]
    B --> WF{"Walk-forward<br/>validation"}
    WF -->|"FAILED out-of-sample"| GR["Graveyard<br/>(log why in research/)"]
    WF -->|"held up"| PT["Paper trade<br/>(Binance testnet, ≥ 30 days)"]
    PT --> LIVE{"SAFETY.md<br/>checklist clear?"}
    LIVE -->|no| PT
    LIVE -->|yes| GO([Go live, small])
    GR --> H

    classDef q fill:#11243a,stroke:#22d3ee,color:#f1efe6;
    classDef warn fill:#2a1616,stroke:#ef4444,color:#f1efe6;
    class H,D,B,PT q;
    class WF,LIVE,GR warn;
```

---

## Editing these

- Change the Mermaid text → the diagram and the AI's mental model update together.
- Preview locally: paste a block into <https://mermaid.live>, or open `demos/workflow.html`.
- GitHub renders these inline automatically on this page.
