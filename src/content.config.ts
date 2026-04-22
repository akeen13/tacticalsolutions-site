import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// POV (point-of-view) content collection.
// Markdown lives at the repo root under content/pov/ so that Marketing owns
// a clean, obvious drop-off path independent of the site's source tree.
// Filename convention: <YYYY-MM-DD>-<slug>.md
const pov = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/pov' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string().regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, {
      message: 'slug must be kebab-case (lowercase, digits, hyphens)',
    }),
    author: z.string().default('Anthony Keen'),
    proofArm: z.enum(['prosentinel', 'weft', 'applied', 'master']),
    summary: z.string().min(1).max(400),
    cta: z
      .object({
        label: z.string().min(1),
        href: z.string().min(1),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pov };
