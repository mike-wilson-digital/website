# Task log

Reverse-chronological record of tasks run through the command-center handoff.
Claude Code appends a brief entry (newest at top) when a task from `tasks/next.md`
is completed or blocked.

---

## 2026-08-07 — Design retrofit, Phase 2 (de-generic layout pass)

Worked the brief's §2 anti-generic table page by page. **Homepage hero → left-aligned
editorial**: kicker/headline/serif subhead/signup/secondary link all flush-left in a
`max-w-3xl` block within the `max-w-5xl` column, sharing the header's left edge (was a
centered `max-w-2xl`). **Removed the headline gradient** — "AI-first" is now solid
`text-primary` (`#f97316` dark / `#dd3300` light); deleted `.text-gradient-animated`,
`@keyframes gradient-pan`, and the light override from `global.css`. **Removed the sitewide
radial hero glow** (`Layout.astro`). **Contact de-carded**: dropped the `rounded-2xl`
bordered/blurred box → heading + serif intro, a hairline rule, fields on the page; aligned
to the left spine (`max-w-5xl` main + inner `max-w-xl`). **Links**: six filled cards →
hairline-ruled menu (icon + mono label + arrow, 1px rules, orange hover); avatar circle
preserved. **Privacy** aligned to the same left edge. **Craft**: token-driven scrollbar
(both themes), `tabular-nums` on body, footer hairline separator, sharp orange focus rings
kept. **Logo/content alignment fix**: the logo SVG has ~8% dead space on its left (ink
starts at x=205 of the 2516 viewBox), so the mark sat ~9–10px inboard of the text; added a
`-9px`/`-10px` negative margin on the logo link (scaled to h-8/h-9) — now aligned to 0.25px.

Files: `index.astro`, `contact.astro`, `privacy.astro`, `links.astro`, `Layout.astro`,
`Header.astro`, `Footer.astro`, `SignupForm.astro`, `global.css`. No recolor; GTM/SEO/
JSON-LD/sitemap/anti-flash script/toggle+cross-fade untouched. Build clean (4 pages);
verified all pages in dark + light. Committed + pushed as its own commit.

Command-center note: light-mode "AI-first" resolves to `#dd3300` (same hue as the CTA) because
`#f97316` fails AA on the light paper; left as-is (colored word vs filled button don't
compete). One-line flip to `#ea580c` if we ever want them visibly distinct in light.
Phase 3 (dot-grid bg, animated signup border, prompt glyphs, file-tree footer, View
Transitions) still pending — held for Mike's go.

## 2026-08-07 — Design retrofit, Phase 1 (type + token foundation)

Applied the three-voice type system from `docs/design-principles.md`. Self-hosted all three
faces (dropped the Google/Fontshare CDN): 8 `@font-face` blocks over `/fonts/*.woff2` (Satoshi
400/500/700/900, Sentient 400/400-italic/500, Commit Mono VF), `font-display: swap`; preload
Satoshi 900 + Sentient 400. Font tokens: `--font-heading: Satoshi`, `--font-body: Sentient`
(serif), added `--font-mono: Commit Mono`. Type roles applied — Satoshi headings, Sentient
serif prose, Commit Mono on kickers/labels/inputs/CTA buttons/footer (incl. the contact
`Send` button). Radii sharpened: `--radius: 3px` (+ `--radius-window: 6px` token), so the
signup pill and all inputs/buttons are crisp; `/links` avatar circle preserved. No recolor —
same slate+orange palette; added an unused `--info` token per the doc. Left untouched:
GTM/GA4, SEO/meta, JSON-LD, sitemap, anti-flash theme script, light/dark toggle + cross-fade.
Gradient headline + hero glow intentionally deferred to Phase 2. Build clean (4 pages);
verified home + contact in dark and light. Committed + pushed as its own commit.

Note: `docs/design-principles.md` and `tasks/next.md` also carry the command-center's
approved Phase 3 dot-grid spec — left uncommitted here; belongs with the Phase 3 work.

## 2026-08-06 — Enlarge header logo

Bumped the header wordmark from `h-7` to `h-8 sm:h-9` (32px mobile / 36px desktop) on both
the dark and light `<img>`. Toggle still right-aligned, no layout break; build clean.

## 2026-08-06 — Commit brand mark SVGs

Tracked the four `[mw]` icon marks in `src/assets/logo/` (`mw-mark-orange/offwhite.svg` bare
marks + `mw-tile-dark-orange/offwhite.svg` dark app-icon tiles, rx=0 for GitHub's rounding),
committed unmodified.

## 2026-08-06 — Ignore `.claude/`

Added `.claude/` to the repo `.gitignore` (it was previously only covered by a global
exclude, so it could be committed by someone with a different global config). Confirmed it
no longer appears in `git status`. Note: 4 new untracked logo files (`mw-mark-*`,
`mw-tile-*`) appeared in `src/assets/logo/` — left untracked as out of scope.

## 2026-08-06 — Theme cross-fade (backfilled — shipped as 51ec840)

Cross-fade the light/dark flip: a temporary `.theme-transition` class transitions
background/text/border/fill over 0.45s, scoped to the toggle so hover/focus stay instant,
and skipped under `prefers-reduced-motion`.

## 2026-08-06 — Light/dark mode toggle

Added a header sun/moon toggle that switches `data-theme` on `<html>` between dark
(default) and light, persisted in `localStorage`. An anti-flash `is:inline` script in
`<head>` sets `data-theme` + `color-scheme` before first paint. The header logo swaps
dark↔light automatically via the existing two-`<img>` setup. Fixed the animated
`AI-first` headline gradient for light mode (deep-orange stops so it stays AA-legible on
white). CTA stays `#DD3300` in both themes.

- Files: `src/layouts/Layout.astro` (inline theme script; removed the static color-scheme
  meta), `src/components/Header.astro` (toggle button + logic), `src/styles/global.css`
  (light-mode gradient override).
- Verified: dark by default for a fresh visitor; remembers an explicit choice on reload;
  no theme flash; keyboard-operable button with a dynamic aria-label; clean flip on home
  and contact, no breakage.
- Acceptance criteria met.

<!-- newest entries above this line -->
