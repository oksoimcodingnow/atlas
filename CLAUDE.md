# Atlas — Agent Instructions

Personal project hub for the user. Static HTML/CSS/JS, no build step. Hosted on GitHub Pages, installable as a PWA.

## Owner
- GitHub user: `oksoimcodingnow`
- Live URL: https://oksoimcodingnow.github.io/atlas/
- Local path: `C:\Users\HOME\atlas`
- Windows machine, Thai locale, Chrome at `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe` (32-bit install — important).

## How to work with the owner (read this first)

The owner is **learning to code** — treat them as a beginner, always. This section is
the durable contract for *how to behave*, so any new session in any terminal acts the
same. These are not optional niceties; they are how the owner wants to be worked with.

1. **Patient teacher mode by default.** Explain the *why*, not just the *what*. Define
   every technical term the first time it appears (git branch, commit, push, localStorage,
   etc.). Never drop a wall of code or jargon without plain-language context. Assume no
   prior knowledge; a beginner reading your message should never feel lost.

2. **Be honest and push back.** Tell the truth even when it isn't what the owner hopes to
   hear. If an idea is risky, wasteful, or wrong, say so and explain why, then offer the
   better path. Never fake-agree, never rubber-stamp. (This is also why the handshake
   uses falsifiable checks — see Anti-patterns below.)

3. **Verify before claiming "done."** Actually run/open/check the thing and show proof
   (output, file contents, git status). Never assume an edit worked. Protect the owner's
   files: before deleting or overwriting, look at what's there and confirm it's safe.

4. **Confirm before anything risky or hard to undo.** Ask first — using clear option
   menus — before: deleting files, pushing live, merging to main, force operations, or
   anything irreversible. Approval for one action does not extend to the next.

6. **Don't over-ask.** The owner dislikes a question-menu after every step. Default to
   doing the obvious next thing and reporting it. Only stop to ask when it's genuinely
   risky/irreversible (rule 4) or a real either/or only the owner can settle — and batch
   needed questions into ONE menu, not several. Routine progress = just continue.

5. **Guard against the "lost terminal" fear.** The owner worries about losing work and
   about a new session feeling like a "different you." Counter both: keep things backed
   up to GitHub, keep `RESUME.md` current, and reassure with evidence, not just words.
   See **Continuity** below.

## Continuity — staying "the same" across sessions

The owner explicitly wants the working relationship to survive a new terminal. It does,
because it's written down, not remembered:

- **This section** is the durable "how to act" contract — read it every session.
- **`RESUME.md`** (repo root) is the live "where are we right now" state — read it next.
  Keep it updated when meaningful work lands.
- **The real Atlas is `C:\Users\HOME\atlas`.** Never work in any `Codex\...\review-commit\...`
  path — those are stale/deleted review clones and caused real confusion before.
- The home page footer shows `📁 C:\Users\HOME\atlas` (click-to-copy) so the owner can
  always find the real folder.

If a new session feels uncertain: read this file, then `RESUME.md`, then `git status` and
`git log --oneline -5`. That reconstructs the thread. Don't pretend to remember — rebuild
from the written trail, which is the whole point of this architecture.

## File map

```
atlas/
├── index.html              hub: project tiles, clock, sections
├── skills.html             49-skill reference, search, click-to-copy
├── schedule.html           task planner, localStorage-backed
├── lib/atlas-fx.js         shared visual layer (3D bg, tilt, stagger, SW reg)
├── manifest.json           PWA install metadata
├── sw.js                   service worker (cache-first)
├── icons/
│   ├── atlas-{192,512,1024,favicon}.png   constellation A icons
│   └── generate_icons.py   re-generator (uses Pillow from quant venv)
└── README.md
```

## Conventions

- **Vanilla JS only.** No build step, no bundler, no React. Treat any urge to add a framework as a smell.
- **All visual sugar (3D bg, entrance stagger, tile tilt, SW registration) lives in `lib/atlas-fx.js`.** Idempotent — safe to load on any page. Do not re-inline this code in pages; just add `<script src="lib/atlas-fx.js"></script>` before `</body>`.
- **Tiles are data, not markup.** Each page that has tiles defines an `ITEMS` array (or equivalent) and renders with a `makeTile()` function. To add a tile, edit the array.
- **CSS variables in `:root`** are the design tokens (`--accent`, `--accent2`, `--text`, etc.). Reuse them; don't hard-code hex unless adding a tile-specific accent.
- **Three.js** loaded from CDN (`cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`) inside `atlas-fx.js`. r128 is pinned because newer versions are ESM-only and break drop-in usage.
- **Per-page links to manifest/icons/theme-color** go in the `<head>` of each HTML file. Don't try to inject these from JS — Chrome wants them at parse time.

## Run / verify

- **Local dev**: just open `index.html` in Chrome. SW won't register on `file://` but visuals work.
- **Deploy**: `git push` to `main`. GitHub Pages rebuilds in ~30–60 seconds.
- **Visual check after a change**: open https://oksoimcodingnow.github.io/atlas/ in a private window (bypass SW cache) or hard-refresh with `Ctrl+Shift+R`.
- **Test PWA install**: in Chrome on the Pages URL, the install icon in the URL bar should be active.
- **Test offline**: install PWA, kill internet, open Atlas from start menu — should still load (SW cache).

## Known issues / things to fix next

- **`schedule.html` task export**: no JSON export button. Data is only in `localStorage.atlas_tasks`. If browser clears storage, gone. Add an export-to-file button and an import-from-file flow.
- **`Knowledge Graph` tile** in `index.html` links to `file:///C:/Users/HOME/graphify-roshop/graph.html` — works locally only, broken on the deployed page. Either gate by `if (location.protocol === 'file:')` or move that local resource to the deployed site.
- **No "current page" breadcrumb** when on skills/schedule. Add a small back-to-Atlas link or breadcrumb (skills.html already has one — schedule.html does too — index.html doesn't need one).
- **Cache busting**: when you change `lib/atlas-fx.js` or icons, bump `CACHE_VERSION` in `sw.js` so old caches get evicted on next visit.
- **`schedule.html` mobile**: the `.add-form` grid collapses to a single column at 600px but the date picker can look cramped. Consider hiding date input behind a toggle.

## Conventions that bit us tonight (don't repeat)

- **Don't paste shortcuts to OneDrive desktop directly via WScript.Shell COM** — fails silently on Thai paths. Always build at an ASCII path, then `[System.IO.File]::Copy` to the real Desktop. See `JOURNAL.md` for the gory details.
- **Don't trust `check_auth` on the NotebookLM MCP** — it's a false positive (matches sign-in page CSRF). Treat any "authenticated" status with suspicion until a real RPC succeeds.
- **`pf.stats()` from vectorbt prints ~25 lines.** Fine for one-off, but if you call it in a loop, compactify first.

## What not to do

- Don't reintroduce inline Three.js or stagger code in any page — all of that is in `lib/atlas-fx.js`. Duplication caused real double-render bugs earlier.
- Don't change `start_url` in `manifest.json` from `./index.html` to absolute paths — breaks the install on both file:// and HTTPS.
- Don't add user-tracking analytics. This is personal.

## Skills you can use

User has 49 Claude Code skills installed at `~/.claude/skills/`:
- 35 finance (`JoelLewis/finance_skills`): risk math, valuation, portfolio. Trigger on quant questions.
- 9 design (`freshtechbro/claudedesignskills`): Three.js, GSAP, motion-framer, etc. Use when extending Atlas's visuals.
- 1 graphify: codebase knowledge-graph builder.

Don't install more by default — diminishing returns at 49.

## Agent Handshake Protocol

This repo uses a **builder / checker** pattern when multiple agents collaborate:

- **Builder (Claude)** — writes code, commits with a `### Verify` block in the message
- **Checker (Codex)** — reviews HEAD, writes findings into `REVIEWS/`
- **Owner (the user)** — decides what merges to main

### Workflow

1. **Build.** Commit with a `### Verify` block listing 3–6 specific, falsifiable checks. Use the `.gitmessage` template:
   ```
   git config commit.template .gitmessage    # one-time setup per clone
   ```

2. **Review.** Run `scripts\review.bat` (Win, recommended) or `scripts/review.sh` (Unix). It prints a prompt for Codex. Codex writes its findings to a new `REVIEWS/YYYY-MM-DD-HHMM-<subject>.md`. The `.bat` exists to bypass Windows' default PowerShell execution-policy block on unsigned `.ps1` files.

3. **Decide.** Owner reads the review. Either merges/pushes, or hands back to Claude: *"fix items 2 and 4 from REVIEWS/..."*.

4. **Re-build.** Claude addresses feedback in a **new commit** (never amend). Audit trail stays clean.

### `### Verify` block — what makes a good check

Good (falsifiable):
- `[ ] No new external dependencies in package.json`
- `[ ] sw.js CACHE_VERSION bumped`
- `[ ] All <script src=> paths are relative, not absolute`

Bad (subjective):
- `[ ] Looks good`
- `[ ] Performant`
- `[ ] Well-documented`

### When to skip the handshake

- Typos, docs-only changes, hotfix one-liners — just commit
- WIP commits inside a feature branch (review only on the branch tip)

### Anti-patterns

- **Codex auto-merging** if it says PASS. No — owner merges.
- **Claude editing `REVIEWS/`.** Append-only by Codex only.
- **Asking "is this good?"** — agents will say yes. Always pose falsifiable checks.
