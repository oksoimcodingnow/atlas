# Atlas Build Journal

A record of what was built, decisions made, what worked, what didn't. Append-only.

---

## 2026-05-30 — Session 1: Hub + Quant kickoff

### What shipped tonight

1. **Atlas personal hub** (`index.html`, `skills.html`, `schedule.html`) — vanilla HTML/JS, no build.
2. **3D particle constellation background** — Three.js r128 via CDN. Mouse parallax, cursor attraction, low-poly drift.
3. **Tile tilt + entrance stagger** — perspective rotation on hover, staggered fade-in on load.
4. **PWA** — `manifest.json`, `sw.js` (cache-first), 192/512/1024 icons + favicon. Deployed to GitHub Pages at https://oksoimcodingnow.github.io/atlas/. Installable from Chrome's URL-bar install icon.
5. **Schedule v1** — task planner with due dates, priorities, today/week/overdue views. localStorage-backed.
6. **Skills library** — 49 skills indexed across 12 categories. Searchable. Click-to-copy example prompts.
7. **Custom constellation-A icon** — Pillow-generated, indigo→cyan diagonal gradient, glow halo, accent dots.
8. **Desktop + Start Menu + Startup shortcuts** — opens Atlas as a Chrome app on every login.
9. **Quant workspace** (`C:\Users\HOME\quant`, **private repo**) — ccxt + vectorbt + Binance scaffold. Toy SMA(10/30) backtest runs end-to-end. Parameter sweep generates heatmap.

### Key decisions and why

- **Vanilla HTML/JS, no build step.** Frictionless edits, no toolchain drift. Trade-off: harder to share components across pages → solved with `lib/atlas-fx.js`.
- **GitHub Pages over Firebase Hosting.** Already had repo, free, HTTPS, deploys on push. Firebase would have been fine too but added an extra service.
- **Private repo for Quant.** Trading strategies should never be public. `gh repo create --private` from the start.
- **Crypto-first stack (ccxt + Binance) over US equities (Alpaca).** Owner is in Thailand — Alpaca live trading is US-only. Crypto is 24/7 (no market-hours code), Binance accepts Thai users, only exchange trading fees. Free across the board.
- **vectorbt over backtrader.** Vectorized, fast for sweeps. Backtrader is event-driven, cleaner for paper-trading later — but slower for research. Picked vectorbt for the research phase, will revisit for live.
- **Pillow icon generator instead of "use existing PNG"** so icons can be regenerated when design evolves. `icons/generate_icons.py` lives in the repo.

### What didn't work — lessons learned

#### 1. NotebookLM MCP — auth half-broken, unfixable from our side today

We installed `julianoczkowski/notebooklm-mcp-2026` to let Claude query NotebookLM notebooks. The MCP installs cleanly, captures cookies via headless Chrome login, and reports `check_auth: authenticated`. **But every real RPC (`list_notebooks`, `query_notebook`) returns HTTP 401.**

Root cause we found:
- `check_auth` is a **false positive** — it fetches the homepage and looks for the `SNlM0e` CSRF token in the HTML. The trick: that token also appears on Google's sign-in page (it's used for the sign-in form). So `check_auth` returns "authenticated" even when Google is bouncing us to sign-in.
- The captured cookies (16 of them — SID, HSID, SSID, all the 1P/3P variants) don't actually authenticate against NotebookLM's batchexecute API. Likely the headless Chrome login completed the Google sign-in but didn't reach the post-redirect state that establishes the NotebookLM session.

Attempted fixes (none worked):
- `browser-cookie3` to copy cookies from main Chrome profile → blocked by **Chrome 127+ App-Bound Encryption** ("Unable to get key for cookie decryption") on Profile 1/17/20. The accessible profile (14) had auth cookies but for a different Google account.
- Re-running `notebooklm-mcp-2026 login` → succeeds, but the new cookies still 401.

Verdict: parked. Manual workflow (NotebookLM in browser, Claude in chat, copy-paste between) works fine. The tile description now says so honestly.

If revisiting:
- Try `PleasePrompto/notebooklm-mcp` (different MCP, different architecture).
- Restart Chrome with `--remote-debugging-port=9222` and connect via CDP to the live session.

Backup of the (broken) auth.json saved at `auth.json.bak-broken`.

#### 2. Windows shortcuts + Thai locale + OneDrive desktop = pain

The user's desktop folder is `C:\Users\HOME\OneDrive\เดสก์ท็อป` (Thai for "Desktop"). The `WScript.Shell` COM object can **create** a `.lnk` file at this path, but **can't read it back** — returns empty target. Diagnosing whether a shortcut is correctly wired becomes hard.

Fix that works: build the shortcut at an ASCII path (`C:\Users\HOME\Atlas.lnk`) using `WScript.Shell`, then copy to the Thai desktop using `[System.IO.File]::Copy` (.NET handles Unicode fine). The `.lnk` content is bit-identical; only the read path is broken.

Also: PowerShell tool started auto-backgrounding complex shortcut-creation commands silently. Switched to Python with `pywin32` for shortcut creation — reliable and outputs cleanly.

#### 3. Background command auto-routing

Several PowerShell commands silently went to background without my intending. Output files were empty. I couldn't tell whether the command had completed, was hung, or had no output. Fix going forward: prefer Python + pywin32 over PowerShell for complex Windows automation. Single-line PowerShell still works fine for trivial commands.

#### 4. Index.html duplication

Initially put 3D particle code + tilt + stagger directly in `index.html`. When we added the same features to `skills.html` and `schedule.html`, the pragmatic move was to extract everything into `lib/atlas-fx.js` and have every page just `<script src="lib/atlas-fx.js"></script>`. But for ~30 minutes index.html had BOTH the inline code AND the shared script — risking double-rendering on the canvas.

End state (fixed in this session): index.html is fully refactored to delegate to `atlas-fx.js`. ~158 lines removed. The shared script is idempotent (checks `canvas._atlasInited`, `tile._atlasTiltAttached`, existing `animationDelay`) so it's safe to drop into any page.

#### 5. Quant — toy alpha loses to buy-and-hold

The SMA(10/30) crossover on BTC/USDT daily returned +89% over ~2.7 years, vs +183% for buy-and-hold. **The strategy lost to B&H by ~93 percentage points.** This is expected for trend-following on a high-volatility asset that's been mostly uptrending — but worth saying out loud.

The real edge is drawdown protection: -38% max DD vs B&H's much deeper troughs. The 5:1 win/loss asymmetry (avg win +29.8% vs avg loss -6.3%) is classic trend-payoff.

Sweep revealed the (10/30) baseline was *not* cherry-picked — it's actually middling. Best combo was (25/30) with Sharpe 1.18 and return +167%. But the wide spread between best and worst configs is a red flag for overfitting. Walk-forward validation is the next sanity check.

### Punch list for next session (highest-value first)

#### Quant
- [ ] **Walk-forward validation** — split BTC data 60/40, fit sweep on first 60%, test best params on remaining 40%. Tells if (25/30) is overfit. ~10 min.
- [ ] **CLI args** for `run_sma.py` and `sweep_sma.py` (`--symbol`, `--timeframe`, `--limit`, `--fast`, `--slow`).
- [ ] **TTL on `data_loader.py` cache.** Add `max_age_hours=24` parameter; re-fetch if older. Current: never expires.
- [ ] **Save sweep results as CSV** alongside the heatmap PNG.
- [ ] **Error handling** in `data_loader.py` for ccxt network failures.
- [ ] **Second alpha** — mean-reversion or RSI(2) — to compare against SMA. Real research starts here.
- [ ] **Binance testnet keys** in `.env`. Then a `live/paper_runner.py` that runs continuously.

#### Atlas
- [ ] **Schedule export/import JSON** button. Right now data only lives in `localStorage` — one browser-cache clear and it's gone.
- [ ] **Knowledge Graph tile** — gate the `file://` actions behind a `protocol === 'file:'` check so they don't 404 on the deployed page.
- [ ] **Bump `CACHE_VERSION`** in `sw.js` when `lib/atlas-fx.js` or icons change. Otherwise old SW caches stick around.
- [ ] **Auto-focus task input** on `schedule.html` initial load (currently only refocuses after submit).
- [ ] **Mobile**: review `schedule.html` add-form layout at < 400px.

#### RoShop (untouched in this session)
- [ ] SlipOK integration — auto-verify Thai QR payment slips.
- [ ] Item images — MM2 + Adopt Me long tail.

### Things I'd advise the owner

- **Quant work is where your real leverage is.** Atlas is a hub — useful, satisfying, but its ceiling is "looks cool and saves clicks." The trading bot + alpha research has actual upside. Don't get stuck polishing Atlas when alpha research is what you actually want to do.
- **Don't go live until you've paper-traded ≥ 30 days.** `live/SAFETY.md` exists for a reason. The checklist isn't bureaucracy, it's risk control.
- **Keep a graveyard of dead alphas.** `research/` directory is set up for this. Honest notes on what didn't work are more valuable than a list of what did.
- **Resist installing more Claude Code skills.** You have 49. Each skill adds context noise even when unused. Less is more.
- **The Schedule app will tell you what your real workflow is** once you use it for a week. Don't add features speculatively — let the friction surface them.

### Useful context for the next session

- User is in fin-eng (quant) field. Primary applied focus: trading bot + alphas.
- 6-year MM2 (Roblox) trading veteran — deep market intuition, pragmatic.
- Has Codex installed alongside Claude Code — both agents may work on these repos. CLAUDE.md and AGENTS.md mirror each other intentionally.
- All three workspaces (atlas, quant, roshop) committed and pushed. Atlas + RoShop public, Quant private.
- Skills installed at `~/.claude/skills/` (49 total). MCP servers in `~/.claude.json`.

End of session 1.
