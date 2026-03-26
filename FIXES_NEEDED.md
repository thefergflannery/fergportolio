# FIXES NEEDED — Pixel-Perfect Audit

Reference: `SITE_AUDIT.md` (Phase 1, completed 2026-03-12)
Build: `/Users/fergflannery/Desktop/work/dev/ff-nextjs/`

---

## FIX 1 — Left Rail + Top Nav Background Colour

**Section:** Global Layout
**Element:** `.left-rail` background, `.top-nav` background
**Issue:** Uses `--lime: #39FF14` instead of accent-1 `#51ff00`. Two different shades of lime green.
**Source value:** `#51ff00` (`--wp--preset--color--accent-1` per SITE_AUDIT §2.1)
**Current value:** `#39FF14` (`--lime`)
**Source file:** `globals.css` — `.left-rail { background: var(--lime) }`, `.top-nav { background: var(--lime) }`
**Fix applied:** Updated `--lime: #51ff00` in `:root` and changed hardcoded `#39FF14` in `.cursor--fixed` to `var(--lime)`.
**Status:** [x] Resolved

---

## FIX 2 — Scroll-Rotate Animation Method

**Section:** Left Rail (logo), BottomNav
**Element:** `.scroll-rotate` CSS `@supports animation-timeline: scroll()`
**Issue:** CSS scroll-timeline rotates exactly 360deg over the full page scroll height regardless of actual scroll distance. WP source uses `0.2deg × scrollY px`, which on a 3000px page = 600deg (≠ 360deg). On browsers supporting `animation-timeline` (Chrome, Edge, Safari), the CSS block activates instead of the correct JS fallback, producing wrong rotation speed.
**Source value:** `0.2deg/px` (`data-rotate-speed` default in WP inline JS, SITE_AUDIT §3.2)
**Current value:** CSS `@keyframes from 0deg to 360deg` over full scroll
**Source file:** `globals.css` — `@supports (animation-timeline: scroll()) { .scroll-rotate { ... } }`
**Fix applied:** Removed `@supports (animation-timeline: scroll())` block from `globals.css`. Removed early-return guard from `LeftRail.tsx` and `BottomNav.tsx` so JS 0.2deg/px handler always runs.
**Status:** [x] Resolved

---

## FIX 3 — Hero Down-Arrow Figure Margin-Top

**Section:** Homepage Hero
**Element:** `<figure>` wrapping the Group-1597883031.svg down-arrow
**Issue:** `margin-top: 24px` instead of `-58px`. Arrow is too far below the second H1 rather than overlapping it.
**Source value:** `margin-top: -58px` (SITE_AUDIT §9.1)
**Current value:** `marginTop: "24px"` (`Hero.tsx` line 108)
**Source file:** `src/components/sections/Hero.tsx`
**Fix applied:** Changed `marginTop: "24px"` → `marginTop: "-58px"`.
**Status:** [x] Resolved

---

## FIX 4 — DesignIntent Section Min-Height

**Section:** Homepage — Design Intent
**Element:** Outer `<div id="work">` wrapper and inner left-column div
**Issue:** `minHeight: "100px"` instead of `33vh`. Section renders too short compared to original.
**Source value:** `min-height: 33vh` (SITE_AUDIT §9.1)
**Current value:** `minHeight: "100px"` (`DesignIntent.tsx` lines 13, 40)
**Source file:** `src/components/sections/DesignIntent.tsx`
**Fix applied:** Changed both `minHeight: "100px"` instances to `minHeight: "33vh"`.
**Status:** [x] Resolved

---

## FIX 5 — LogoMarquee Full-Width

**Section:** All pages — Logo Marquee Row
**Element:** Outer wrapper of LogoMarquee
**Issue:** Constrained to `maxWidth: 1340px` with `padding-left/right: spacing-50`. In the WP site the 9-column SVG row spans the full content width with the `border-bottom` going edge-to-edge. Current implementation means the border stops at the padding.
**Source value:** Full-width, no max-width, no horizontal padding, border-bottom edge-to-edge (SITE_AUDIT §9.1 "9 × SVG in equal columns, border-bottom: 1px")
**Current value:** `maxWidth: 1340px`, `paddingLeft/Right: spacing-50`, inner div has `borderBottom`
**Source file:** `src/components/sections/LogoMarquee.tsx`
**Fix applied:** Collapsed to a single div with `display: flex`, `flexWrap: nowrap`, `borderBottom: "1px solid #111111"` — no max-width or padding. Border now spans full content width.
**Status:** [x] Resolved

---

## FIX 6 — Project Page Back Button Text Colour

**Section:** Project Single Page — Title Row
**Element:** Back button `<Link>`
**Issue:** `color: "#ffffff"` makes `backgroundColor: "color-mix(in srgb, currentColor 20%, transparent)"` evaluate with white as currentColor → background becomes near-invisible white on white. Button is invisible.
**Source value:** Button text/currentColor should be `#111111` so the mix produces a visible semi-transparent dark background. (SITE_AUDIT §9.5 "GSPB back button (left arrow icon, bg: accent-6, radius: 9999px)")
**Current value:** `color: "#ffffff"` (`src/app/projects/[slug]/page.tsx` line 93)
**Source file:** `src/app/projects/[slug]/page.tsx`
**Fix applied:** Changed `color: "#ffffff"` → `color: "#111111"`.
**Status:** [x] Resolved

---

## Definition of Done

All items above marked `[x] Resolved`. `next build` completes with zero errors and zero TypeScript errors. ✓
