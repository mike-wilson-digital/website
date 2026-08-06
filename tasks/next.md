# Next task(s)

**Status:** ✅ Done 2026-08-06 (see `tasks/log.md`). No active task — awaiting the next spec from the command center. Two small, independent items — do both.

## Task 1 — Ignore `.claude/`
CC's local agent-config directory (`.claude/`) is untracked and not ignored, so it shows
as a dangling entry in `git status` and could be committed by accident. It's local tooling
config, not site source.
- Add a line `.claude/` to `.gitignore` (create the file if missing; keep existing entries).
- Confirm `git status` no longer lists `.claude/`.

## Task 2 — Version the new brand mark SVGs
Four new brand-mark SVGs were added to `src/assets/logo/` (the command center placed them):
`mw-mark-orange.svg`, `mw-mark-offwhite.svg`, `mw-tile-dark-orange.svg`,
`mw-tile-dark-offwhite.svg`. These are the `[mw]` icon marks (bare + dark app-icon tile)
for the GitHub org avatar and other brand uses.
- `git add` those four files and commit them.
- Do NOT modify them — they're final. Just track them.

## Acceptance
- `.claude/` is ignored and gone from `git status`.
- The four `src/assets/logo/mw-mark-*.svg` / `mw-tile-*.svg` files are committed.
- Working tree clean afterward.

## Commit
Commit + push when done? yes  (one commit per task is fine, or two — your call)
Check with Mike before committing? no

## Log
Append a line to tasks/log.md when done. The log is currently empty — the light/dark
toggle + cross-fade shipped as 51ec840 was never logged; feel free to note it too.
