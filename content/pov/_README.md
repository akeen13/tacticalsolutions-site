# /pov: content drop-off

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

Schema is validated at build. Broken frontmatter fails the build with a readable error.

## Drop-off path

1. Branch: `pov/<slug>`
2. Add your markdown file under `content/pov/`
3. PR to `main`
4. Preview URL is auto-deployed on the PR; verify the render
5. CTO merges; Cloudflare Pages redeploys prod

Files beginning with `_` (like this one) are ignored by the content loader.

## Voice rules (non-negotiable)

These come from the `anthony-voice` skill. A draft that breaks them is not ready.

- **No em dashes. Ever.** Not in body copy, headings, titles, summaries or CTA labels. Biggest AI tell there is. Use a comma, a full stop, brackets or a colon depending on what the sentence actually needs. The site is swept clean; a new em dash is a regression.
- **No banned vocabulary.** delve, leverage, harness, foster, embark, elevate, embrace, underscore, unlock, unleash, empower, streamline, optimize, revolutionize, transform, utilize, meticulous, comprehensive, intricate, pivotal, crucial, robust, seamless, vibrant, multifaceted, journey, testament, paradigm, synergy, cornerstone, catalyst, navigate.
- **No banned patterns.** "It's not X, it's Y" negated contrast. Triple adjective stacking. Openers like "In today's..." or "It's worth noting". Engagement-bait closers ("What do you think?", "Thoughts?", "Tag someone").
- **Lead with the lived detail, not the lesson.** Conclusion follows the story, it does not open the post.
- **Short sentences. Active voice. British English.** No bare imperatives at the reader; use the request form.
- **The truth gate is separate and just as hard.** Pre-customer means no claims of live deployments, real incidents or real customers. Any composite gets labelled as one in the opener, verbatim, and never trimmed.
