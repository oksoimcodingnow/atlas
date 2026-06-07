# RESUME — where we are, for any new session

> **Purpose:** If this terminal/session is lost, read this file first. It says what's done,
> what's in flight, and the one true path. Last updated: 2026-06-07.

## ⛳ The one true path (memorize this)

- **REAL Atlas (edit here):** `C:\Users\HOME\atlas`  ← live site, 16 pages, always current
- **GitHub (cloud backup):** https://github.com/oksoimcodingnow/atlas  (branch `main` = live site)
- **Live site:** https://oksoimcodingnow.github.io/atlas/
- ❌ **Do NOT use** any folder with `Codex\...\review-commit\...` in the path — those are stale/deleted review clones.

## 🟢 What is safe / backed up

- `main` branch: fully pushed to GitHub. The whole real Atlas is in the cloud.
- Branch **`feat/japanese-beginner-path`** (commit `12a86fd`): **pushed to GitHub** ✅ — the Japanese beginner work is backed up.

## 🚧 Work in flight: Japanese beginner page

- **File:** `C:\Users\HOME\atlas\japanese.html`
- **Done & committed (12a86fd, on branch `feat/japanese-beginner-path`, NOT merged to main):**
  a guided "🌱 Start here" path for total beginners — 5 kana/lesson, one big tap-to-hear
  card at a time, 2-question check, localStorage streak/progress (`atlas_jp_start` key),
  soft daily cap. All display copy in one `T={}` object for an easy translation swap.
- **NOT done yet (next steps the user wants):**
  1. **Thai (TH) version** — add a TH/EN language toggle using the `T={}` copy object. (English first was intentional; Thai is the follow-up.)
  2. Decide whether to **merge to `main`** (go live) or run the Codex review handshake first.

## ↩️ How to resume in a new session

```powershell
cd C:\Users\HOME\atlas
git checkout feat/japanese-beginner-path   # get back on the Japanese work
git log --oneline -5                        # the Japanese feature is commit 12a86fd
                                            # (the branch tip may be later, e.g. RESUME/doc commits)
```

Then open `japanese.html`. To continue: add the Thai toggle, or merge to main to deploy.
The beginner "Start here" feature itself is commit **12a86fd** — look for it in the log
rather than expecting it to be the tip, since later doc commits sit on top of it.

## 🧹 Cleanup leftover (do once, after closing the session that's locked in it)

Two empty locked dirs remain from deleting the old review clones. Finish with:
```powershell
Remove-Item "C:\Users\HOME\Documents\Codex\2026-06-01" -Recurse -Force
```

## 🗂️ Other context from this session

- **graphify** was run on the quant repo → outputs in `C:\Users\HOME\quant-graphify-out\` (graph.html).
- **Google `google/skills`** repo evaluated → it's Google-Cloud/Gemini infra skills (BigQuery, GKE, Firebase…), Apache-2.0. Not useful for a static site like Atlas. Skip unless the Firebase sync grows into a real backend.
- Rescued Codex review notes: atlas ×2 in `C:\Users\HOME\atlas\REVIEWS\`, quant ×2 in `C:\Users\HOME\quant\REVIEWS\`.
