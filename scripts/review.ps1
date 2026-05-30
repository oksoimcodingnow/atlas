# review.ps1 — print the Codex review prompt for the latest commit on this repo.
Set-Location (git rev-parse --show-toplevel)

$subject = git log -1 --pretty=%s
$sha     = git log -1 --pretty=%h
$stamp   = Get-Date -Format "yyyy-MM-dd-HHmm"
$slugRaw = ($subject -replace '[^a-zA-Z0-9]+', '_').Trim('_')
$slug    = $slugRaw.Substring(0, [Math]::Min(50, $slugRaw.Length))
$file    = "REVIEWS/${stamp}-${slug}.md"

@"

--- Paste this into Codex ---------------------------------------

Review commit $sha ("$subject") on this repo.

Read the full diff with:   git show $sha

The commit message has a "### Verify" section. For each item, check
the diff and decide PASS / FAIL / NOTE with a one-sentence evidence
quote. Also flag any obvious bug, security hole, or contract violation
that isn't in the checklist (skip style nitpicks).

Write your findings to:    $file

Format:
  # Review: $sha -- $subject

  ## Verify checklist
  - [PASS|FAIL|NOTE] item 1 -- one-sentence evidence
  - [PASS|FAIL|NOTE] item 2 -- one-sentence evidence

  ## Other findings
  - (only if something real outside the checklist)

------------------------------------------------------------------
"@
