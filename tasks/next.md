# Next task — Blog engine (the build-in-public spine)

**Goal:** stand up a repo-first blog so the weekly build-in-public post has a home.
Content = Markdown/MDX files in the repo (the AI is the CMS). The blog must look like it
belongs to the site, not bolted on — it inherits the existing design system, not a new one.

**Before anything:** read `docs/design-principles.md`, and reuse the existing `.prose`
styles + design tokens already in `src/styles/global.css`. Do **not** restyle the site or
add new fonts/colors. The whole point is the blog rides the retrofit we just shipped:
Sentient serif prose, Satoshi headings, Commit Mono for code/metadata, hairline lists,
sharp radii, dot-grid background, left-aligned editorial.

## Build

1. **Content collection** (`astro:content`) — define a `blog` collection (config file per
   the installed Astro version: `src/content.config.ts` w/ a `glob()` loader on Astro 5,
   else `src/content/config.ts`). Zod schema: `title` (string), `description` (string),
   `pubDate` (date), `updatedDate` (date, optional), `draft` (boolean, default false),
   `tags` (string[], optional), `ogImage` (string, optional). Posts live in
   `src/content/blog/*.md(x)`; slug from filename.

2. **Routes:**
   - **`/blog` — index.** List published posts (exclude `draft` in a production build),
     newest first by `pubDate`. Render as a **hairline-ruled list** in the same style as
     `/links` — each row = mono `pubDate` (tabular-nums) + title + optional tags, `border-b`
     rows, orange hover, left-aligned on the `max-w-5xl` spine. Not cards.
   - **`/blog/[...slug]` — post page** via `getStaticPaths` over the collection. Render
     `<Content />` inside `<article class="prose">`. Header block above the prose: a mono
     kicker (`~/blog`), Satoshi H1 title, and a mono metadata line (pubDate, "updated"
     date if present, reading time, tags). Body uses the existing `.prose`. **Code blocks:**
     make sure fenced code renders in Commit Mono on `--surface` with a hairline border and
     `--radius`, using the syntax/semantic colors from the design system (Shiki theme tuned
     to the palette, or a CSS pass — dark + light both legible).

3. **SEO / structured data:**
   - Per-post `<title>` / description from frontmatter; canonical; OG/Twitter (extend the
     `Layout` props; add `ogImage` support, fall back to the site default).
   - **Article / BlogPosting JSON-LD** per post: `headline`, `datePublished`,
     `dateModified` (= updatedDate ?? pubDate), `author` → the existing Person `@id`,
     `publisher` → the Organization `@id`, `mainEntityOfPage`. Reuse the identifiers already
     in `Layout.astro`.
   - Confirm posts land in the **sitemap** (should happen automatically via
     `getStaticPaths` + the existing sitemap integration).
   - **RSS feed** at `/rss.xml` via `@astrojs/rss` (`npm i @astrojs/rss`) — builders read
     RSS. Include title/description/pubDate/link; exclude drafts.
   - Update `public/llms.txt` to mention the blog + RSS feed.

4. **Discoverability:**
   - Add `~/blog` to the **footer file-tree** menu, consistent with `~/contact` / `~/privacy`.
   - A header `/blog` link is optional — but the homepage's one job stays the signup, so
     **don't restructure the header without checking with Mike first.**

5. **Seed post (placeholder only — for testing, not content):**
   - Create ONE minimal post (`src/content/blog/hello-world.md`, `draft: true`) purely to
     validate the collection, routes, and styling. Keep it a short technical stub. **Do NOT
     write marketing/voice content** — the real first post (the WordPress→repo story) is
     drafted in Mike's voice by the command center and will drop in later.

## Acceptance

- `npm run build` clean; `/blog`, a `/blog/<slug>` post, and `/rss.xml` all generate.
- Post page renders in `.prose`: Sentient serif body, Satoshi headings, Commit Mono code
  on a hairline surface, left-aligned, dot-grid behind. `/blog` index is a hairline list,
  not cards. Dark **and** light both correct; AA holds.
- Article JSON-LD present + valid on a post; the post appears in the sitemap; `/rss.xml`
  validates. Drafts are excluded from the index, sitemap, and RSS in a production build.
- Existing pages (home / contact / links / privacy) unchanged except the footer `~/blog`
  addition. Analytics / anti-flash script / theme toggle / View Transitions untouched.

## Commit & log

- This is additive and self-testable. Build it, **self-verify the acceptance checklist**
  (`npm run build` + eyeball the routes in dark + light), then **commit + push** (one
  commit, or logically grouped). **Flag before touching the header nav**; the footer
  `~/blog` addition is fine to include.
- Append a dated entry to `tasks/log.md` (newest at top): what you built, files touched,
  and anything the command center should know.
