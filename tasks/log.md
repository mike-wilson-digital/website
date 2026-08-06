# Task log

Reverse-chronological record of tasks run through the command-center handoff.
Claude Code appends a brief entry (newest at top) when a task from `tasks/next.md`
is completed or blocked.

---

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
