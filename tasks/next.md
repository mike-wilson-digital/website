# Next task — Retrofit the live site to the new design system

**Goal:** apply the new design system (`docs/design-principles.md`) to the *existing*
site — not just future pages. Type system, tokens, anti-generic layout, and a restrained
developer-native signature.

**Before anything:** read `docs/design-principles.md` in full. Build against it. The live
color tokens in `src/styles/global.css` are canonical — **do not recolor**; the only
deliberate palette-adjacent change is sharper radii (see Phase 1).

**How to run this:** three phases, **one at a time**. After each phase, run
`npm run build`, show Mike the result, and **WAIT for his OK before committing and before
starting the next phase**. This is a high-touch redesign — do not batch phases or
auto-commit. Don't touch analytics/GTM/GA4, SEO/meta, JSON-LD, the sitemap, or the
anti-flash theme script. Preserve the light/dark toggle + cross-fade behavior.

---

## Phase 1 — Typographic + token foundation

The highest-leverage, lowest-risk change. Swaps the type system and wires tokens; this
alone transforms the look.

1. **Fonts — self-host all three, drop the CDN.**
   - Remove the Google Fonts **Inter** stylesheet `<link>` and its `fonts.googleapis.com`
     / `fonts.gstatic.com` preconnects in `src/layouts/Layout.astro` (~lines 143–150).
   - Add self-hosted `woff2` under `public/fonts/`:
     **Satoshi** (400/500/700/900), **Sentient** (400/500 + 400 italic),
     **Commit Mono** (400/700 + 400 italic).
     Sources: Satoshi & Sentient → Fontshare (fontshare.com); Commit Mono → commitmono.com.
   - Add `@font-face` blocks in `global.css` with `font-display: swap`. `<link rel="preload">`
     the two most critical faces (Satoshi 700/900 for the hero H1, Sentient 400 for body).
   - *Fallback if self-hosting is blocked:* keep the existing **Fontshare** CDN link for
     Satoshi + add Sentient to it (`f[]=sentient@...`), and self-host only Commit Mono.
     Self-hosting all three is the target; note in the log if you fall back.

2. **Font tokens** (`global.css`, `@theme inline`, ~lines 37–38):
   - `--font-heading` → keep Satoshi.
   - `--font-body` → `"Sentient", Georgia, "Times New Roman", serif` (was Inter).
   - Add `--font-mono` → `"Commit Mono", ui-monospace, "SFMono-Regular", monospace` and
     expose it to Tailwind (so the `font-mono` utility works).

3. **Radii — sharpen** (the one deliberate change from today's CSS):
   - Add tokens `--radius: 3px` and `--radius-window: 6px`.
   - Replace the current rounded values with `--radius`: fields `border-radius: 0.5rem`
     (global.css ~309), `.form-status` `0.6rem` (~274), and the `rounded-*` utilities in
     components. Reserve `--radius-window` for any intentional terminal/window chrome only.

4. **Apply the type roles** — *serif = read, sans = state, mono = operate*:
   - Mono (`font-mono`, uppercase + tracking for labels): kickers/eyebrows, section labels,
     nav items, buttons/CTA label, badges, stats/numbers.
   - Concretely: `index.astro` kicker "Mike Wilson Digital" (line 14) → `font-mono`;
     the CTA button label in `SignupForm.astro` → `font-mono`; nav links in `Header.astro`
     → `font-mono`. Body/`.prose` inherits Sentient from `body`. Headings stay Satoshi.
   - `.prose` (global.css ~193): now serif — bump `font-size` to ~1.0625–1.125rem and keep
     line-height ~1.7 for comfortable serif reading.

5. **Do not recolor.** Keep the existing dark/light tokens. Optional: add an `--info`
   token for in-code links per the brief. `::selection` already exists — leave it.

**Acceptance (P1):** `npm run build` clean; headings render Satoshi, body Sentient
(serif), labels/nav/buttons Commit Mono; corners sharpened; dark **and** light both
correct; AA contrast holds (confirm every `#dd3300` use is CTA/large text, not small
body). Screenshot home + contact for Mike. **Stop. Commit only after Mike's OK.**

---

## Phase 2 — De-generic layout pass

Work the brief's §2 table, page by page: `index`, `links`, `contact`, `privacy`, and
`Header` / `Footer` / `SignupForm`.

- Replace card-on-card / bordered boxes with **hairline rules + whitespace**; a card must
  earn itself.
- **Left-align and introduce asymmetry.** Stop centering everything — the homepage hero is
  currently a centered `max-w-2xl`; propose a left-aligned, editorial hero.
- Sharp radii throughout (from P1).
- Craft details: sharp **orange focus rings** as a feature, considered hover states on
  every interactive element, `tabular-nums` on numbers, a tuned dark-mode scrollbar.
- **Remove the decorative elements** (Mike approved 2026-08-07 — do this, don't ask):
  delete the sitewide **radial orange hero glow** (`Layout.astro` ~169–177) and the
  **animated-gradient headline** (`index.astro` `.text-gradient-animated` span, plus the
  `.text-gradient-animated` + `@keyframes gradient-pan` rules and the light-mode override
  in `global.css`). Replace the headline with solid Satoshi; a single word may take the
  CTA orange (`--cta`) for emphasis if it still clears AA. No glow, no gradient text — per
  the brief's §7 guardrails. Clean up anything left orphaned by the removal.

**Acceptance (P2):** no nested card stacks; layouts left-aligned/asymmetric where
sensible; focus/hover/selection polished; build clean; per-page screenshots for Mike.
**Stop. Commit only after Mike's OK.**

---

## Phase 3 — Developer-native signature (restrained)

Add the signature layer per brief §6, honoring the §7 guardrails: **no** fake-terminal
hero, **no** typewriter H1, **no** glow/matrix/glitch, **no** mono on body prose.

- Mono kickers with prompt/path glyphs (`~$`, `//`, `>`) used consistently as a language.
- Footer: a file-tree / path-style sitemap motif.
- Code-as-content where the page teaches the method — real, copyable snippets with syntax
  colors from the semantic set.
- Astro **View Transitions** for navigation; keep the theme cross-fade; subtle,
  reduced-motion-safe micro-interactions.
- View-source hygiene: semantic landmarks, tidy markup; optional tasteful console easter egg.

**Acceptance (P3):** signature reads as builder-made, not costume; guardrails respected;
Lighthouse 95+; keyboard nav, reduced-motion, and form labels intact; build clean.
**Stop. Commit only after Mike's OK.**

---

## Commit & log

- **Check with Mike before EVERY commit? yes.** Commit + push per phase (separate commit
  each), only after his OK.
- Append a dated entry to `tasks/log.md` (newest at top) per phase when done: what changed,
  which files, and anything the command center should know.
