#!/usr/bin/env bash
# review.sh — print the Codex review prompt for the latest commit on this repo.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

SUBJECT=$(git log -1 --pretty=%s)
SHA=$(git log -1 --pretty=%h)
STAMP=$(date +%Y-%m-%d-%H%M)
SLUG=$(echo "$SUBJECT" | tr -cs 'a-zA-Z0-9' '_' | sed 's/^_*//;s/_*$//' | cut -c1-50)
FILE="REVIEWS/${STAMP}-${SLUG}.md"

cat <<EOF

─── Paste this into Codex ───────────────────────────────────────

Review commit ${SHA} ("${SUBJECT}") on this repo.

Read the full diff with:   git show ${SHA}

The commit message has a "### Verify" section. For each item, check
the diff and decide PASS / FAIL / NOTE with a one-sentence evidence
quote. Also flag any obvious bug, security hole, or contract violation
that isn't in the checklist (skip style nitpicks).

Write your findings to:    ${FILE}

Format:
  # Review: ${SHA} — ${SUBJECT}

  ## Verify checklist
  - [PASS|FAIL|NOTE] item 1 — one-sentence evidence
  - [PASS|FAIL|NOTE] item 2 — one-sentence evidence

  ## Other findings
  - (only if something real outside the checklist)

─────────────────────────────────────────────────────────────────
EOF
