# Agent Instructions

This file mirrors `CLAUDE.md` so any agent (Claude Code, Codex, Cursor, etc.) picks up the same context. **See `CLAUDE.md` for the authoritative version** — update both together.

## TL;DR for any agent reading this for the first time

- Personal project hub. Vanilla HTML/JS, no build. Deployed to GitHub Pages.
- `lib/atlas-fx.js` owns all visual sugar (3D bg, tilt, stagger, SW reg). Don't duplicate it inline.
- Tiles in `index.html` come from the `ITEMS` array. Add a tile by extending the array.
- Repo is public; some local-only links (file:// paths) exist. They work locally and 404 on the deploy. That's tolerated, not a bug.

Read `CLAUDE.md` next for the full conventions, known issues, and "don't do this" list.

## Handshake (builder = Claude, checker = Codex, decider = owner)

1. Commits include a `### Verify` block (3–6 falsifiable checks). Use `.gitmessage`.
2. Run `scripts\review.bat` (Win, recommended — handles execution-policy block) or `scripts/review.sh` (Unix) — prints a prompt to paste into Codex.
3. Codex writes findings to `REVIEWS/YYYY-MM-DD-HHMM-<subject>.md`. Append-only.
4. Owner reads + decides merge. If FAILs, Claude addresses in a *new* commit (not amend).

Full protocol in `CLAUDE.md`.
