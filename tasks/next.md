# Next task

**Status:** ✅ Done 2026-08-06 (see `tasks/log.md`). No active task — awaiting the next spec from the command center.

## Task
Add a light / dark mode toggle.

## Why
The site is dark by default, but the palette and `[data-theme]` scoping are already wired for
light mode, and the logo now has both dark and light versions. A toggle gives light-preferring
visitors an out without changing the dark-first default — the "zero-rework" payoff of how we
set up the theming.

## Steps
- Add a small, accessible toggle in the header (sun/moon style) that switches `data-theme` on
  `<html>` between "dark" (default) and "light".
- Persist the visitor's choice in `localStorage` (standard for a real site). Default to dark
  when there's no stored preference.
- Prevent a flash of the wrong theme on load — set the theme before first paint with a tiny
  inline script in `<head>`.
- Swap the header logo to `src/assets/logo/mw-digital-light.svg` in light mode, dark wordmark
  otherwise.
- Keep the primary CTA orange `#DD3300` in both themes; other accents follow each theme.

## Acceptance
- Toggling flips the whole site (bg, text, borders, accents, logo) cleanly between dark and
  light — no breakage in either.
- Opens dark by default, remembers the choice on reload, no theme flash on load.
- Accessible: the control has an aria-label, is keyboard-operable, and contrast passes AA in
  both modes.

## Commit
Commit + push when done? yes
Check with Mike before committing? yes
