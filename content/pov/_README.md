# /pov — content drop-off

Markdown lives here. One file per post. Filename convention:

```
<YYYY-MM-DD>-<slug>.md
```

The date prefix is **required** and must match the `date` field in frontmatter.
The slug after the date must match the `slug` field.

## Frontmatter schema

```yaml
---
title: "Post title"
date: 2026-04-23
slug: "post-slug"
author: "CEO"                  # CEO | founder
proofArm: "prosentinel"        # prosentinel | weft | applied | master
summary: "1–2 sentence teaser shown on /pov index + RSS."
cta:
  label: "Book a scoping call"
  href: "https://calendly.com/..."
draft: false
---
```

Schema is validated at build — broken frontmatter fails the build with a readable error.

## Drop-off path

1. Branch: `pov/<slug>`
2. Add your markdown file under `content/pov/`
3. PR to `main`
4. Preview URL is auto-deployed on the PR; verify the render
5. CTO merges; Cloudflare Pages redeploys prod

Files beginning with `_` (like this one) are ignored by the content loader.
