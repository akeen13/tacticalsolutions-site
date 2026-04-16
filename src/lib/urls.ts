/**
 * Prefix an internal path with the Astro site's configured `base`.
 *
 * Why this exists: on GitHub Pages the site is served under
 * `akeen13.github.io/tacticalsolutions-site/`, so every internal link must
 * include the `/tacticalsolutions-site` prefix. Once the site moves to a
 * custom domain (`tacticalsolutions.com`) the base becomes `/` and the
 * prefix drops out. Using this helper everywhere makes that migration a
 * config flip with no template churn.
 *
 * Always pass paths beginning with `/` (or no leading slash). Never pass
 * an already-base-prefixed path.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith('/') ? path : `/${path}`;
  const joined = `${trimmedBase}${trimmedPath}`;
  // Collapse any accidental doubles.
  return joined.replace(/\/{2,}/g, '/');
}
