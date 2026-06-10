# Product

## Register

brand

## Users

One person: the owner (a 3rd-year Financial Engineering student learning to code),
on their own Windows PC and phone, usually at night. Atlas is their personal hub,
the front door to everything they build and study. Occasional second audience:
friends or future employers being shown the work ("portfolio by accident").

## Product Purpose

A static, no-build personal hub (GitHub Pages PWA) that collects every project,
study tool, and demo in one installable place. Success = the owner opens it daily
without friction, finds everything in two clicks, and feels proud showing it.

## Brand Personality

Quiet observatory. Three words: **calm, literary, hand-built.**
The voice is a patient notebook, not a SaaS dashboard. The night-sky constellation
background is the brand's one piece of theater; everything else stays still and lets
typography carry the room.

## Anti-references

- SaaS dashboard grammar: gradient text logos, frosted-glass cards, neon status
  pills on everything, identical icon-heading-text card grids.
- Crypto-bro landing pages (glow, purple-cyan gradients, hero metrics).
- Anything that needs a build step or a framework to exist.

## Design Principles

1. **The front door matches the rooms.** Every surface speaks the editorial system
   the Fin-Eng Studio and Field Manuals established; no page gets its own dialect.
2. **Typography is the furniture.** Serif display for voice, sans for utility,
   mono for data. Color is seasoning (lavender + gold), never the meal.
3. **Curate, don't pile.** A few flagship projects get stage light; the long tail
   stays one quiet row each. Adding a project must never mean redesigning.
4. **Data, not markup.** Tiles/rows render from an ITEMS array; conventions in
   CLAUDE.md (atlas-fx classes, per-page head links) are load-bearing.
5. **Sacred objects survive every redesign:** the 3D constellation, the clock,
   the click-to-copy folder path, the guided tour.

## Accessibility & Inclusion

- Respect `prefers-reduced-motion` everywhere (atlas-fx already disables the
  canvas + entrance animation; keep that contract).
- Body text ≥ 4.5:1 contrast on the dark ink background; muted text reserved
  for metadata, never for primary reading.
- Touch targets ≥ 40px on mobile; the owner uses Atlas on a phone.
