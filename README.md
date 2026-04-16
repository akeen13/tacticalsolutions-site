# tacticalsolutions-site

Source for `tacticalsolutions.com`. Single repo, single deploy. Product subsites (ProSentinel, Weft) land as route subtrees over time.

## Stack

- [Astro 5](https://astro.build) — markdown-first SSG, zero JS by default.
- Content Collections for frontmatter validation.
- Deployed to Cloudflare Pages (GitHub-connected, auto-deploy on push to `main`, preview deploys on PRs).

## Local dev

```sh
nvm use         # Node 20
npm install
npm run dev
```

Open http://localhost:4321.

## Content drop-off

Marketing adds POV posts as markdown under `content/pov/`.

- Filename: `<YYYY-MM-DD>-<slug>.md`
- Frontmatter schema: see `content/pov/_README.md`
- Drop-off workflow:
  1. Branch `pov/<slug>`
  2. Add the markdown file
  3. PR to `main`
  4. Cloudflare Pages auto-generates a preview URL on the PR
  5. CTO merges; production redeploys automatically

## Layout

```
astro.config.mjs          # site config
src/
  content.config.ts       # Content Collection schemas
  layouts/BaseLayout.astro
  pages/
    index.astro           # homepage stub
    pov/
      index.astro         # POV index
      [...slug].astro     # single post
      rss.xml.js          # RSS feed
content/
  pov/                    # POV markdown lives here
public/
  favicon.svg
```

## Related tickets

- Scaffold + launch: [TACA-10](/TACA/issues/TACA-10)
- POV cadence: [TACA-9](/TACA/issues/TACA-9)
- ProSentinel site rebuild: [TACA-6](/TACA/issues/TACA-6)
- Weft site: [TACA-7](/TACA/issues/TACA-7)
