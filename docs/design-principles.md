# Design Principles — Mike Wilson Digital

**Status:** source of truth for design. **Updated 2026-08-07.**
**Where this lives:** `docs/design-principles.md` in the `website` repo. Reference it from
`CLAUDE.md` so Claude Code reads it before building or restyling any page.

> Read this before writing a line of markup or choosing a color, spacing value, or
> component shape. When a default and this doc disagree, this doc wins. If something
> here is genuinely wrong for a page, flag it — don't silently fall back to defaults.

---

## 0. Why this doc exists

The audience is **builders** — repo-first, AI-first people who will open devtools and
read the source. For them the site *is* the portfolio: it has to look and read as though
it was made by someone who lives in a terminal and a git repo, because that's the exact
method being sold. A site that reads as "one-shot generated" quietly refutes the pitch.

So the goal isn't "pretty." It's **credible to people who build.** Every choice below
serves that.

---

## 1. The concept: the site is the proof

One organizing idea drives everything: **developer-native by conviction, not decoration.**
The site should feel like a well-crafted CLI tool and a clean repo — precise, monospaced
where it counts, aligned to a grid, fast, keyboard-friendly, honest in its markup. The
medium matches the message. This is the *signature*, and everything else hangs off it.

"All-in" means we commit to this as a **system** — type, grid, motifs, motion, and the
source code itself all point the same direction. It does **not** mean piling on terminal
gimmicks (see §7). One or two signature moves executed impeccably beat ten costume props.

---

## 2. Anti-generic constraints (the "Claude generic" tells → the rule that replaces each)

These are the specific patterns that make a generated site look generic. Each has a rule.

| Generic tell | Our rule |
|---|---|
| Card-on-card stacks; everything in a bordered white/off-white box | Content sits on the page. Use **hairline rules, grid lines, and negative space** to separate — not nested boxes. A "card" must earn itself; default to none. |
| Rounded corners everywhere (8–12px) | **Sharp by default.** Radius `0–3px`. Rounding is reserved for one intentional motif (the terminal/window chrome) — not sprinkled on every element. |
| Inter body + one geometric sans, nothing else | **Three-voice type system** (§4): Satoshi display (sans), **Sentient** body (serif), **Commit Mono** functional voice. The serif body alone breaks the all-sans generic look; mono carries identity. |
| Slate gray + a single indigo/violet/blue accent | Slate + **orange `#DD3300`** (already non-generic) + a *tight* set of syntax-inspired semantic accents used sparingly (§3). |
| Centered hero → 3-feature grid → CTA, evenly padded | **Asymmetry and editorial rhythm.** Left-align. Vary section shape. Let whitespace be uneven on purpose. |
| Mesh/radial gradients, glowing status dots | No decorative gradients. Texture comes from **the grid, mono type, and code itself.** A status dot is allowed only if it means something (e.g. build/online state). |
| Uniform padding, symmetric everything | Align to a **monospace character grid** (§5). Intentional tension, not centered mush. |
| Generic stock copy | Copy is plain, specific, buildery. No "empower your journey." Write like a good README. |

---

## 3. Color

Keep the locked palette; extend it into a working token set. Orange is a **CTA/accent**
color, **never** body text. Semantic accents are borrowed from syntax highlighting and
used *sparingly* — a little goes a long way and overuse re-genericizes.

> **Canonical source:** the live tokens in `src/styles/global.css` ARE the palette. The
> hex values below illustrate the *system and roles* — they are not overrides. Do **not**
> recolor the site to match them; keep the existing slate + orange tokens and only *add*
> what's missing (e.g. a mono/in-code link color, radii tokens). The one deliberate
> change from today's CSS is sharper radii (§5), not color.

```css
/* Dark is default. Light is the toggle. Define both. */
:root[data-theme="dark"] {
  --bg:            #0a0e14;  /* near-black slate, terminal-ish */
  --surface:       #10151f;  /* raised surface, used rarely */
  --border:        #1e2733;  /* hairlines / grid lines */
  --border-strong: #2c3848;
  --text:          #e6edf3;  /* primary */
  --text-muted:    #9aa7b6;  /* metadata, mono labels */
  --text-faint:    #5b6b7c;  /* captions, comments */

  --accent:        #DD3300;  /* CTA / active / "prompt" — the one loud color */
  --accent-2:      #F97316;  /* hover/secondary accent, sparing */

  /* syntax-inspired semantics — use rarely, meaningfully */
  --ok:            #3fb950;  /* diff-add / success / online */
  --info:          #58a6ff;  /* in-code links / info */
  --warn:          #d29922;
  --selection:     #DD330033;/* text selection tint */
}
```

Light theme: invert to an off-white-but-not-pure paper (`#faf9f7`-ish), keep orange as
CTA, keep hairline discipline. Don't let light mode become the generic white-card look —
same rules apply.

**Contrast is a hard requirement** (§8). `#DD3300` is a saturated red-orange: it clears
AA for large text / CTA fills on both themes, but is borderline for small body text —
so don't use it as small text. Verify every text/background pair at build time.

---

## 4. Typography — the identity carrier

Three voices, each a different texture, each with a job. The contrast between them —
geometric sans, humanist serif, mono — *is* the typographic identity.

- **Display / headings — Satoshi** (locked). Geometric sans, confident. Tight tracking on
  large sizes. Use for H1–H3 and big statements.
- **Body — Sentient** (locked). A low-contrast humanist serif (Fontshare / same foundry
  family as Satoshi). This is the deliberate "notch further" move: a serif body instantly
  breaks the all-sans generated look and gives long-form an editorial, considered feel.
  ~18px, line-height ~1.7, max measure ~68ch. Keep it for prose only — not UI chrome.
- **Mono — Commit Mono** (locked). The signature functional voice and what makes the site
  read as builder-made. Use for: kickers/eyebrows, section labels, metadata, nav items,
  buttons, badges, captions, numbers/stats, table headers, and (obviously) code.

The three never blur because they're different classes: **serif = read, sans = state,
mono = operate.** If a piece of text is a paragraph it's Sentient; a headline, Satoshi;
a label/control/number, Commit Mono.

```css
--font-display: "Satoshi", system-ui, sans-serif;
--font-mono:    "Commit Mono", ui-monospace, "SFMono-Regular", monospace;
--font-body:    "Sentient", Georgia, "Times New Roman", serif;

/* Fluid display scale; body fixed. Tabular figures for all numbers. */
--step-hero:  clamp(2.75rem, 1.8rem + 4.5vw, 5rem);
--step-h1:    clamp(2rem, 1.5rem + 2.2vw, 3.25rem);
--step-h2:    clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem);
--step-h3:    1.25rem;
--step-body:  1.125rem;   /* serif reads better a touch larger */
--step-mono:  0.8125rem;  /* labels/kickers, uppercase, +tracking */
font-variant-numeric: tabular-nums;
```

Mono labels/kickers: uppercase, letter-spacing ~0.08em, `--text-muted`. Often prefixed
with a functional glyph — `~$`, `//`, `>`, or a file path — used *consistently* so it
reads as a language, not a sticker.

---

## 5. Layout & grid

- **Align to a monospace character grid.** Because mono glyphs share a width, columns,
  labels, and rules can line up on real character positions — this is the quiet thing
  that makes a page feel engineered rather than dropped-in.
- **Hairlines over boxes.** Separate content with 1px `--border` rules and whitespace.
  Consider a faint visible column grid or ruled margins as texture (subtle).
- **Left-aligned and asymmetric.** Avoid the centered-everything default. Text blocks
  left-align to a consistent measure; let the right side breathe unevenly.
- **Base spacing unit `4px`**, scale `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`.
- **Radii:** `--radius: 3px` default; `--radius-window: 6px` reserved for terminal/window
  chrome only. Never a blanket 12px.

---

## 6. Signature motifs (use with restraint — these are seasoning)

Draw from the developer world, but treat each as a deliberate, sparing move:

- **Prompt / path glyphs** (`~$`, `>`, `//`, `mike@digital:~$`) as label prefixes.
- **File-tree / path** styling for nav or a sitemap-style footer.
- **Diff coloring** (`+` green / `-` orange-red) — only where it *means* add/remove.
- **Code as content, not screenshot.** Real, copyable, syntax-lit snippets. If the site
  teaches a repo-first method, show actual commands/config.
- **Ruled "output" blocks** — monospaced, hairline-bordered, no drop shadow.
- **A meaningful status indicator** (build passing / online) — only if it's true.

---

## 7. Taste guardrails — what "all-in" does NOT mean

Leaning in badly is its own cliché. **Do not build:**

- a fake interactive terminal as the hero, or a "type your command" gimmick;
- a blinking-cursor *typewriter animation* on the H1;
- matrix rain, glitch text, CRT scanline overlays, neon glow;
- `sudo`/`rm -rf` "jokes," 404-as-`command not found` unless it's genuinely clean;
- monospace on *everything* (body long-form stays readable in Inter);
- skeuomorphic window chrome with fake traffic-light buttons on every block.

The rule: **restraint reads as senior; excess reads as costume.** When unsure, do less
and execute it perfectly. A builder trusts a site that looks effortless and fast, not one
trying hard to prove it's technical.

---

## 8. Non-negotiables — builders will inspect these

These are part of the design, not an afterthought. Builders check them.

- **Semantic, clean HTML.** Real landmarks (`header/nav/main/footer`), sensible headings,
  no div soup. The **view-source is part of the aesthetic** — it should read as tidy as
  the page looks. A small tasteful console/comment easter egg is welcome; a mess is not.
- **Accessibility:** WCAG AA contrast on every text pair (verify `#DD3300` cases),
  visible focus states (make them a *feature* — a sharp orange focus ring fits the
  language), full keyboard nav, `prefers-reduced-motion` honored, real labels on the
  Kit signup and Web3Forms fields.
- **Performance:** Astro's no/low-JS baseline stays. Ship almost no client JS; self-host
  and `font-display: swap` the fonts (subset if licensing allows); Lighthouse 95+ across
  the board. Fast *is* a design value here.
- **Motion:** Astro **View Transitions** for navigation; keep the existing cross-fade
  theme toggle; micro-interactions subtle and reduced-motion-safe. Nothing bounces.
- **Details that signal craft:** custom text-selection color (`--selection`), a
  considered scrollbar in dark mode, tabular numerals for all stats, sharp focus rings,
  consistent hover states on every interactive element.

---

## 9. Component notes (quick specs for what CC will build)

- **Primary CTA** (the email signup — the homepage's one job): solid `--accent` fill,
  `--radius`, mono uppercase label, maybe a `>` or `~$` prefix. One primary CTA per view;
  everything else is quieter. This button should be the loudest thing on the page.
- **Links:** underline on hover with an offset; in-prose links can borrow `--info`. Nav
  links are mono, muted, orange on active/hover.
- **Buttons/secondary:** ghost/outline with hairline border; no gradients, no shadows.
- **Code blocks:** hairline border, `--surface`, mono, syntax colors from the semantic
  set, copy button, no heavy chrome.
- **Callouts/"output" blocks:** ruled, monospaced label prefix, minimal.
- **Badges/tags:** mono, uppercase, hairline or faint fill — pill shape avoided; prefer
  square-ish `--radius`.
- **Footer:** a good place for the file-tree/sitemap motif and a tasteful sign-off.

---

## 10. Type stack — LOCKED (2026-08-07)

| Role | Face | Class | Source / notes |
|---|---|---|---|
| Display / headings | **Satoshi** | geometric sans | Fontshare, free, self-host |
| Body / long-form | **Sentient** | humanist serif | Fontshare, free, self-host — the editorial differentiator |
| UI / signature / code | **Commit Mono** | monospace | free, self-host; carries the brand voice |

Self-host all three (`font-display: swap`, subset where licensing allows). No Google
Fonts CDN. Verify each renders before shipping; fallbacks in the token block cover FOUT.
