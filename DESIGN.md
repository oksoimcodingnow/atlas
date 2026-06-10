# Atlas — Design System

The vocabulary every page should share. Update this in lockstep with the visual code.

---

## Identity, in one paragraph

Atlas is a **personal field manual**, not a SaaS dashboard. It feels like a quiet workshop: dark, intentional, typographic. The first impression we want is *editorial confidence* — not "look at this 3D thing." 3D is reserved for moments that earn it.

## Palette

| Token | Hex | Used for |
|---|---|---|
| `--bg`        | `#0a0a14` | Page background, deepest layer |
| `--bg-2`      | `#11112a` | Soft overlays, hover-state panels |
| `--panel`     | `rgba(20, 20, 38, 0.6)` | Cards, glass surfaces (use with `backdrop-filter: blur(14px)`) |
| `--border`    | `rgba(184, 192, 255, 0.16)` | Default outline |
| `--border-hi` | `rgba(184, 192, 255, 0.45)` | Hover / focus outline |
| `--text`      | `#f1efe6` | Primary text — warm off-white, **not** pure `#fff` (too cold) |
| `--muted`     | `#8a8aa8` | Captions, labels, low-priority text |
| `--accent`    | `#b8c0ff` | Primary highlight (periwinkle blue) |
| `--accent-2`  | `#f3d59a` | Secondary highlight (warm gold) — for "premium" moments |
| `--rule`      | `rgba(241, 239, 230, 0.16)` | Hairline dividers in editorial layouts |

**Do not** introduce new colors casually. The palette is small on purpose. If you need a third accent for a one-off tile, choose from: green `#34d399`, amber `#fbbf24`, red `#ef4444`, cyan `#22d3ee` — these match Atlas's tile system but should not appear in body content.

## Typography

Two font families. That's it.

```css
--serif: 'Cormorant Garamond', 'Iowan Old Style', 'Apple Garamond', Georgia, serif;
--sans:  'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

- **Serif** = anything narrative. H1s, H2s, body prose in editorial pages, page numbers in the book. Use the *italic* cut for emphasis — it has real personality.
- **Sans** = utility. Buttons, labels, eyebrows, code, data displays.
- **Mono** (`'SF Mono', Consolas, Menlo, monospace`) only for code snippets and command examples.

### Scale (fluid)

| Role | Size |
|---|---|
| Hero H1 | `clamp(58px, 12vw, 168px)` |
| Section H2 | `clamp(38px, 5.5vw, 76px)` |
| Lede | `clamp(20px, 2.4vw, 28px)` |
| Body | `17px` base, `clamp(18px, 1.55vw, 22px)` in editorial |
| Caption / Label | `11px`, letter-spacing `0.22em–0.28em`, uppercase |
| Code | `13px` |

### Eyebrow pattern

Small caps label above a heading, prefixed with a horizontal rule:

```html
<div class="eyebrow">Build</div>
```
```css
.eyebrow {
  font-family: var(--sans); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--muted); font-weight: 600;
  display: inline-flex; align-items: center; gap: 12px;
}
.eyebrow::before {
  content: ''; width: 28px; height: 1px;
  background: var(--accent);
}
```

This appears on every editorial section. It anchors the eye and signals "this is an article, not a feature box."

## Spacing & rhythm

- Use `--gutter: clamp(22px, 5vw, 56px)` as the default outer padding.
- Max content width: `--max: 1100px`. Stories should never exceed this — line length matters.
- Section vertical padding: `120px top / 80px bottom` on full-screen sections, narrower on cards.
- Card padding: `22px 24px 24px`.
- Hover lift: `transform: translateY(-3px)` plus a slightly stronger border + shadow. Keep transitions ~`0.22s`.

## Motion principles

1. **Entrances**: fade up `28px` over `0.7–0.9s` with `cubic-bezier(0.2, 0.7, 0.2, 1)` easing. Stagger sibling reveals by `0.06–0.10s`.
2. **Always respect `prefers-reduced-motion: reduce`** — set `opacity: 1; transform: none` and skip animations.
3. **Tile tilt**: max 5° rotation on hover, perspective `700px`. Subtle, not amusement-park.
4. **3D / Three.js**: cycles should be ≥ 20s so the user can read what's happening. Faster than that feels like a screensaver.
5. **Scroll-driven** beats time-driven. Use `IntersectionObserver` for reveals when possible — fires when content is genuinely visible, not just after a timer.
6. **List changes use FLIP.** When items add / remove / reorder (e.g. Schedule tasks), animate with First-Last-Invert-Play: record `getBoundingClientRect()` before the DOM change, re-append in new order, then `el.animate()` the position delta back to zero. Items glide instead of snapping. Removed items lift to `position: absolute` so survivors can FLIP into the gap. Spring easing for this: `cubic-bezier(0.34, 1.3, 0.64, 1)`. See `schedule.html` for the reference implementation.
7. **Spring vs glide easing.** Two reusable curves: `--spring: cubic-bezier(0.34, 1.56, 0.64, 1)` for playful entrances / button presses (slight overshoot), `--glide: cubic-bezier(0.4, 0, 0.2, 1)` for calm state transitions (hover, color). Don't spring everything — overshoot on every transition feels cheap.

## Surfaces

- **Glass panel**: `var(--panel)` + `backdrop-filter: blur(14px)` + `border: 1px solid var(--border)`. Use sparingly — every glass panel adds rendering cost.
- **Solid card**: `var(--bg-2)` background — for nested content where blur would over-stack.
- **Editorial sections**: no card at all. Just generous padding on the body background. Negative space is the design.

## Visual styles by page type

### Editorial pages (e.g. `demos/handshake.html`)
- Hero with massive serif H1 mixing roman + italic
- Per-section: eyebrow → H2 → body → optional code/glyph
- Left-rail dot navigation when there are > 4 sections
- Film-grain SVG overlay (low opacity, mix-blend-mode: overlay)
- Google Fonts loaded with `preconnect` for instant render

### Hub pages (e.g. `index.html`, `fineng/index.html`)
- Editorial, not dashboard: serif hero (one gold eyebrow + italic-accent H1 + serif lede),
  then **featured rows** for flagships (big serif name, full description, pill-link actions),
  then a compact **index** of everything else grouped by section (one quiet row each:
  glyph · name · one-line desc · →; extra actions as small mono links).
- Section headers are serif italic with a hairline rule and a mono count — NOT tiny
  uppercase tracked labels.
- Status pills only when they carry information (planned/local). Never a "live" pill
  on everything.
- No gradient text, no glass blur, no colored top accent strips (retired 2026-06-10).
- Per-item accent color (`--tile-color`) tints the glyph only, never fills.
- Background: shared `lib/atlas-fx.js` particle constellation. Keep `.tile` /
  `.section-header` class names — atlas-fx hooks entrance stagger + tilt onto them,
  and honors inline `animation-delay` when a page sets its own rhythm.
- Use icons (Unicode geometric chars) sparingly — only `❖ ◆ ◎ ⊞ ✦ ✧ ⊛ ▣ ◫ ❦ ∫ ∑ ⬡ 語`

### Utility pages (e.g. `schedule.html`)
- Function-first. Stat row at top, form below, content below.
- Less editorial flourish, more dashboard.
- Still respects the palette and typography.

### 3D / WebGL pages
- Reserved for cases where motion *is* the medium.
- Always include a back link, always have controls (Auto / Open / Close).
- Background should be transparent — let `lib/atlas-fx.js` handle ambient.
- *None currently in the repo — `demos/book.html` was removed pending better references for 3D editorial.*

## When NOT to use 3D

- Anything instructional. Editorial > 3D for "here's how X works" — proven by an early A/B (a 3D book reads in ~4 minutes and most users don't wait; the editorial version reads in ~90 seconds).
- Anywhere the user needs to *act* (forms, dashboards, lists). 3D is for ambience or showcase.
- Anywhere mobile users need to be productive. WebGL kills phone batteries.

## When 3D earns its keep

- Hero / landing pages where impression > information
- Showcase / portfolio pieces
- Moments of intentional pause (loading screens, "you've completed X")
- Ambient backgrounds that animate but stay out of the way (the constellation)

## Don'ts

- **No emojis in UI text.** Use Unicode geometric chars or SVG icons. Emoji rendering is inconsistent across OSes and pulls the eye away from typography.
- **No pure white (`#fff`) text.** Use `--text` (warm off-white).
- **No bright primary colors** outside of tile accents. Saturated red/green/blue look like CSS defaults.
- **No drop shadows on text.** Use opacity / color hierarchy instead.
- **No `system-ui` for headlines.** Specify a real serif — system fonts make everything look like an unstyled HTML page.
- **No skeuomorphism by default.** The 3D book is the *exception*, not the rule. Default to abstract / editorial.
- **No motion that the user can't pause.** Auto-loops must have an interaction to stop them (click, button, etc.).

## File conventions

- Every new HTML page: include `manifest.json`, favicon, `apple-touch-icon`, `meta name="theme-color"` in `<head>`.
- Every full-experience page: include `<script src="../lib/atlas-fx.js"></script>` at the bottom of `<body>` so it inherits the shared background.
- Editorial pages: use Google Fonts (`Cormorant Garamond` + `Inter Tight`) — they earn their load cost.
- Utility pages: system fonts only — faster, no FOIT.

## When you change the design system

1. Update this file in the same commit as the change.
2. If you introduce a new pattern, name it here and show the code.
3. Bump `CACHE_VERSION` in `sw.js` so installed PWAs evict stale assets.
4. If anything visible across pages changes (palette, type stack), grep for hard-coded values and migrate them to vars in `:root`.

---

*Last revised 2026-06-10 — home page joined the editorial system (featured rows + index); see also PRODUCT.md for the strategic register.*
