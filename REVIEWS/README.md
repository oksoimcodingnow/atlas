# REVIEWS/

Codex review files live here. One file per review, named:

```
YYYY-MM-DD-HHMM-<commit-subject-slug>.md
```

## File format

```
# Review: <sha> — <commit subject>

## Verify checklist
- [PASS|FAIL|NOTE] item 1 — one-sentence evidence
- [PASS|FAIL|NOTE] item 2 — one-sentence evidence
...

## Other findings
- <only if there's something real outside the checklist>
```

## Conventions

- **Append-only.** Don't edit existing review files.
- The next Claude session reads recent reviews and addresses any **FAIL** items in a *new* commit (never amend the original).
- The user — not the agents — decides what merges to main.

## How to generate a review

```
scripts\review.bat       # Windows (recommended — bypasses script-execution policy)
scripts/review.sh        # Unix / macOS
```

These print a prompt to paste into Codex. Codex writes the review file here.

> The `.bat` is a one-line wrapper around `review.ps1` that runs PowerShell with `-ExecutionPolicy Bypass`. It avoids the "running scripts is disabled" error that Windows shows on unsigned `.ps1` files by default. You can also run `review.ps1` directly if you've set `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

See `CLAUDE.md` / `AGENTS.md` for the full handshake protocol.
