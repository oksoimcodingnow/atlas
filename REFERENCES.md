# References — what "premium" looks like

Living doc. Anywhere we attempt premium design, the bar we're trying to clear lives here. When a reference goes stale, update or remove it.

---

## 3D web — the dora.run bar (2026)

### What dora-built sites do

- **3D objects float in space** — not a scene, a *centerpiece*. The model commands attention.
- **Scroll-triggered keyframe animation** is the dominant motion. Objects rotate, translate, scale at specific scroll positions. *Not* time-loop autoplay.
- **Hero responds to the cursor** — small parallax of the 3D object + tilt toward mouse.
- **Multi-layer parallax** — backgrounds, mid-ground, foreground each move at different speeds. They describe this as "parallax on steroids."
- **Hero is the 3D model, supporting copy is around it.** Not the inverse.

### Their actual technical stack (worth mirroring)

- **Real designed 3D models** imported as **`.gltf` or `.glb`** files. Authored in **Spline** (3D web design app) or **Blender** (offline 3D suite).
- **Environment lighting** is the default — a single HDRI or PMREM-generated environment lights the scene realistically. Plus fill lights for dark spots.
- **Baked textures** when realtime fidelity isn't enough — render textures offline, ship as PNG/JPG.
- The doc itself acknowledges: *"real-time lighting has limits compared to offline rendering"* — i.e., they cheat with baked detail.

### Honest critique of `demos/book.html` (now removed) against this bar

| Dora idiom | What our book did | Verdict |
|---|---|---|
| 3D model imported from Spline/Blender | Primitive `PlaneGeometry` built in code | ❌ |
| Environment lighting / HDRI | Three `MeshPhong` lights only | ❌ |
| Scroll-triggered keyframes | Time-driven `requestAnimationFrame` auto-loop | ❌ |
| Hero centerpiece commanding attention | Page text competed with the book for the eye | ❌ |
| Multi-layer parallax depth | Single object on a flat background | ❌ |
| Real PBR materials | Plastic-looking Phong shading | ❌ |

Zero for six. That's why it felt "amateur 3D demo" rather than "premium 3D site." The book was never going to clear the bar with the materials it had. We were right to remove it pending real assets.

### Checklist for the next 3D attempt — must have *all* of these before starting

- [ ] A specific 3D **model** authored externally (Spline, Blender, or downloaded — `.glb` file ≤ 2 MB)
- [ ] **`GLTFLoader`** wired in (one extra `<script>` tag from the three.js examples bundle)
- [ ] **Environment lighting** — either a small HDRI (`RGBELoader` + `PMREMGenerator`) or a procedurally-generated cube env
- [ ] **`GSAP` + `ScrollTrigger`** loaded (we have the skill installed — just CDN includes)
- [ ] An explicit **scroll storyboard** — written out before code: at scroll Y=0 model is at (x, y, z, rot), at scroll Y=800 model is at (x', y', z', rot'), etc.
- [ ] A **specific design intention** for what the model represents and why it's 3D (vs a flat illustration). If you can't justify the 3D, don't use 3D.

If a future agent is about to start 3D and *any* checkbox is unchecked, stop and source the missing piece first. The book demo is the cautionary tale for skipping this.

### Where to source models

- **Spline** (`spline.design`) — free tier, export to `.gltf`. Closest to dora's authoring environment.
- **Sketchfab** (`sketchfab.com`) — huge library, filter by free / `.glb` / CC license. Most premium models are paid.
- **Poly Haven** (`polyhaven.com`) — free PBR models + HDRIs + textures. Excellent quality.
- **Khronos sample models** — github.com/KhronosGroup/glTF-Sample-Models — official test assets, great for learning.
- **Spline Library** — built into Spline, free-to-use abstract shapes.

### Reference sites worth studying directly

- **dora.run** itself — the meta-example
- **dora.run/SnskVYFkqj** — their "design & publish without code" microsite
- **awwwards.com/websites/three-js/** — curated 3D site collections
- **awwwards.com/inspiration/scroll-3d-animation** — scroll-driven 3D specifically
- **tympanus.net/codrops/** — best Three.js tutorial source; their March 2026 piece *Building a Scroll-Reactive 3D Gallery* is directly aligned with this bar

---

## Editorial / typography — the bar (already cleared)

Examples `demos/handshake.html`, `demos/study-flow.html`, `demos/start-here.html` are at the current 2026 bar for editorial:

- Oversized serif headlines mixing roman + italic
- Eyebrow labels above each section
- Fluid type scale (`clamp()` everywhere — never fixed px on headlines)
- Scroll-triggered fade-up reveals (~28px translate, 0.9s, eased `cubic-bezier(0.2, 0.7, 0.2, 1)`)
- Minimal chrome: top bar with brand + back link, optional left rail
- Generous negative space — never feels packed
- Subtle film-grain SVG overlay at low opacity
- Dark warm-off-white palette (no pure `#fff` text, no `#000` background)

This is the template for any future page that isn't itself an interactive surface. We don't need to keep researching this — we have the system. Document is in `DESIGN.md`.

---

## Motion — observations to formalize later

Will fill in when we have more reference data, but a few notes:

- 2026 winners use **scroll-driven** motion far more than time-driven. The user sets the pace.
- Easing curves are usually variants of `cubic-bezier(0.2, 0.7, 0.2, 1)` (slow start, fast middle, slow end). Linear is dead.
- Reveal motions stagger by **60–100ms**. Faster feels mechanical; slower feels laggy.
- The best sites have ONE moment of "wow" — not seven. Don't compete with yourself.

---

## What this document is *not*

- A list of sites to copy verbatim. References inform the bar; they don't dictate the design.
- A trend report. Things move fast — when a reference here is six months old, re-evaluate.
- An excuse to over-research before building. Three references and a checklist is enough to start. Don't read for a week.

---

*Last updated 2026-05-30 after pulling dora.run as the 3D web bar and removing `demos/book.html`.*
