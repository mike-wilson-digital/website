# mikewilson.digital

Production website and digital home for **Mike Wilson Digital LLC**. First
repository-first production build — the template for future client projects.

## Stack (confirmed)

- **Astro** — repository-first, static-first
- **TypeScript**
- **Tailwind CSS**
- **Markdown / MDX** for content
- **GitHub** for source control
- Node `>=22.12.0`

Deployed on **Cloudflare Pages**, auto-deploying on every push to `main`.
Asset caching is controlled by `public/_headers` (content-hashed `/_astro/*`
assets are cached immutable). Database, auth, client portal, and a headless
CMS are deferred — not required initially.

## Source of truth

Canonical context lives in the **context-repo** at `../context-repo`. Read it
before making decisions about identity, tone, or architecture:

- `profile.md` — who Mike is (stable facts)
- `preferences.md` — how Mike wants AI output
- `projects/mikewilson-digital/` — this project's goals, architecture
  decisions, and roadmap

If anything here conflicts with the context-repo, the context-repo wins.

## Working preferences

- **Lead with the plan.** Give the full picture — what we're doing and why —
  before any steps.
- **One step at a time.** One instruction, then wait for confirmation or a
  snag. Don't jump ahead or batch steps.
- **Tone:** casual and direct, punchy, zero fluff. Candid feedback welcome —
  thick-skinned, no softening.
- Prefer reusable systems and templates across projects.

## Secrets

**No secrets in the repo.** Use a gitignored `.env` (already in `.gitignore`
alongside `.env.production`). Never commit keys, tokens, or credentials.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full docs: https://docs.astro.build

Consult these before related work:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
