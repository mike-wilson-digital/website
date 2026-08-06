# Next task(s)

**Status:** ✅ Done 2026-08-06 (see `tasks/log.md`) — task 1 in 5a8a6fe, task 2 in this commit. No active task — awaiting the next spec from the command center.

## Task 1 — Commit the new brand mark SVGs
Four brand-mark SVGs are in `src/assets/logo/` (placed by the command center, final —
the tiles were just re-squared to `rx="0"` so GitHub applies its own corner rounding):
`mw-mark-orange.svg`, `mw-mark-offwhite.svg`, `mw-tile-dark-orange.svg`,
`mw-tile-dark-offwhite.svg`. These are the `[mw]` icon marks (bare + dark app-icon tile).
- `git add` those four files and commit. Do NOT modify them — just track them.

## Task 2 — Enlarge the header logo
The header wordmark is currently `h-7` (28px) and reads a bit small on the spacious
coming-soon page. Bump it modestly.
- In `src/components/Header.astro`, both `<img>` tags use `h-7 w-auto` (one for dark,
  one for light). Change `h-7` -> `h-8 sm:h-9` on **both** (32px mobile / 36px desktop).
- Leave everything else (widths, alt, loading, the dark/light swap classes) untouched.
- If Mike later wants it bolder, the ceiling is `h-9 sm:h-10` — but ship `h-8 sm:h-9`.

## Acceptance
- The four `src/assets/logo/mw-mark-*.svg` / `mw-tile-*.svg` files are committed.
- Header logo renders larger (h-8 / sm:h-9) in both light and dark, no layout break,
  toggle still aligned on the right. Verify with a quick `npm run build` (no errors).
- Working tree clean afterward.

## Commit
Commit + push when done? yes  (separate commits per task is fine)
Check with Mike before committing? no

## Log
Append a line to tasks/log.md per task when done. The log is still empty — the light/dark
toggle + cross-fade (51ec840) and the `.gitignore` task (589e6ce) were never logged;
feel free to backfill those too.
