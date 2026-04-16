# Contributing to /pov

Marketing drop-off guide for the founder-led POV cadence ([TACA-9](/TACA/issues/TACA-9)).

## The short version

1. Create branch `pov/<slug>`
2. Add `content/pov/<YYYY-MM-DD>-<slug>.md` with the frontmatter below
3. Open PR → `main`
4. Open the Cloudflare Pages preview URL that the bot posts on the PR
5. When it looks right, ask CTO to merge
6. Cloudflare redeploys prod within ~30s; the post is live at `tacticalsolutions.com/pov/<slug>`

## Frontmatter schema

Required fields are marked REQ. Optional fields have defaults.

```yaml
---
title: "Post title, sentence case, no trailing period"        # REQ
date: 2026-04-23                                               # REQ, ISO date
slug: "post-slug"                                              # REQ, kebab-case; must match filename tail
author: "CEO"                                                  # CEO | founder (default: CEO)
proofArm: "prosentinel"                                        # REQ: prosentinel | weft | applied | master
summary: "1–2 sentence teaser shown on /pov index + RSS."      # REQ, max 400 chars
cta:                                                           # optional
  label: "Book a scoping call"
  href: "https://calendly.com/..."
draft: false                                                   # default: false
---
```

Rules:

- **Filename must match date and slug.** `content/pov/2026-04-23-three-things.md` with `date: 2026-04-23` and `slug: "three-things"`.
- **Slug is kebab-case only.** Lowercase, digits, hyphens. Starts and ends with a letter or digit.
- **proofArm** is which product/arm this post is proving out. Use `master` if the post is brand-level.
- **draft: true** keeps the post hidden on prod `main` deploys. It still shows in PR preview URLs so you + CEO can review.
- Broken frontmatter **fails the build**. Read the build error — it names the field and the problem.

## Body

Standard markdown. All of this works:

- Headings (`##`, `###`)
- Bold, italic, lists, links, blockquotes
- Fenced code blocks with language hints
- Tables
- Images: put files in `public/pov/<slug>/` and reference them as `/pov/<slug>/image.png`

No HTML unless you need it. Keep it simple.

## CTAs

The `cta` block becomes a bordered call-out at the bottom of the post. Use:

- `mailto:pov@tacticalsolutions.com` — generic reply capture
- `mailto:ceo@tacticalsolutions.com` — for direct-to-CEO posts
- Calendly URL — when you want booking
- `/scoping` — once that page exists (TBD, see [TACA-8](/TACA/issues/TACA-8))

Posts 1–3 use reply-based CTAs per the attribution plan. Post 4 will need a booking link.

## UTM tags for external links

When posting to LinkedIn / email, append UTM params per the [TACA-9 attribution doc](/TACA/issues/TACA-9#document-attribution):

```
?utm_source=linkedin&utm_medium=organic&utm_campaign=pov-2026-04-23-<slug>
```

The site doesn't rewrite links — UTM tags are for the distribution channel, not the canonical URL.

## Fallback drop-off

If GitHub access is blocked (org not yet created, permission issue, etc.), paste the full markdown body + frontmatter as a comment on [TACA-9](/TACA/issues/TACA-9) and CTO will commit it. Preview URL still gets generated on the resulting PR.

## Checking your work locally (optional)

```sh
nvm use
npm install
npm run dev
```

Open http://localhost:4321/pov. Drafts are visible in `dev` mode. If the build errors, the frontmatter or filename rule is off.

## Deletion / retraction

If a post needs to come down:

1. Set `draft: true` in frontmatter and PR. Post disappears from prod within one deploy.
2. If you need it fully gone, delete the file in a PR. The URL will 404.
3. Never edit a published post's slug or date — it breaks inbound links and the RSS feed. If you need a correction, edit the body or the summary in place and mention the edit in the next post if material.

---

Questions → ping CTO on [TACA-10](/TACA/issues/TACA-10) or [TACA-9](/TACA/issues/TACA-9).
