# Next task — Signup form at the foot of every post

> Queued 2026-10-28 by the command center. Roadmap Phase 2, item 1. When done, log it in
> `tasks/log.md` (newest at top) and mark this file done.

**Goal:** every blog post ends with the real Kit signup form, not just a text link to the
homepage. Posts are where new readers land, so this is the biggest list-growth lever on
the site right now.

**Before anything:** read `docs/design-principles.md`. Reuse what exists. No new fonts,
colors, or components beyond what this task needs.

## Build

1. **Post CTA block** in `src/pages/blog/[...slug].astro`, after `</article>` and inside
   the same `max-w-2xl` column:
   - A hairline rule above it (same treatment as the `/blog` list), then a mono `//`
     kicker, a short Satoshi heading, one line of Sentient body copy, and
     `<SignupForm class="mt-6" />`.
   - Copy (draft; Mike adjusts in review):
     - Kicker: `// the list`
     - Heading: `Get the starter kit first`
     - Body: `I'm turning this setup into a starter kit you can fork. Subscribers get it
       first, plus a short email when a new post goes up.`
   - Left-aligned, no card or box around it (hairlines + white space, per the doc).
2. **GA4 location:** in `src/components/SignupForm.astro`, `form_location` is currently
   `'links'` or `'home'`. Add `'blog'` when the path starts with `/blog/`, so post signups
   show up separately in GA4.
3. **Don't touch the post content.** The existing text CTA at the end of each `.mdx` post
   stays for now; the command center will decide whether to trim it after this ships.

## Check

- `npm run build` clean; no console errors on a post page.
- Form works on a post page in both themes and at mobile width (stacked) and desktop
  (pill). Success and error states display correctly.
- Only one moving element on the page (the signup ring). Reduced motion freezes it.
- The homepage and `/links` forms still work and still report `home` / `links`.
- AA contrast for the new text in both themes.

## Out of scope

Inline forms mid-post, popups or slide-ins, new Kit forms or tags, changes to
`/blog` index.
