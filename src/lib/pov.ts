import { getCollection, type CollectionEntry } from 'astro:content';

type PovEntry = CollectionEntry<'pov'>;

/**
 * Drafts are hidden in production `main` builds and visible everywhere else:
 *   - local `astro dev`
 *   - Cloudflare Pages preview deploys (any non-`main` branch)
 *   - explicit opt-in via `SHOW_DRAFTS=true`
 */
export function shouldShowDrafts(): boolean {
  if (!import.meta.env.PROD) return true;
  // Astro only exposes PUBLIC_* env vars via `import.meta.env` in bundled
  // output; raw `process.env` is available at build time in server frontmatter.
  const env = typeof process !== 'undefined' ? process.env : {};
  if (env.SHOW_DRAFTS === 'true') return true;
  const branch = env.CF_PAGES_BRANCH;
  if (branch && branch !== 'main') return true;
  return false;
}

export async function getPovPosts(): Promise<PovEntry[]> {
  const showDrafts = shouldShowDrafts();
  const posts = await getCollection('pov', ({ data }) => showDrafts || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
