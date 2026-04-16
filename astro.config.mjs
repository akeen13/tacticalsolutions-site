// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL is used for RSS, sitemap, and canonical links.
// Override per-env with ASTRO_SITE when the real domain is attached.
const site = process.env.ASTRO_SITE ?? 'https://tacticalsolutions.com';

// Base path. Defaults to root. Set to `/tacticalsolutions-site` when
// deploying to GitHub Pages at akeen13.github.io/tacticalsolutions-site
// (the GH Pages workflow sets ASTRO_BASE). Drops back to `/` on custom
// domain (Cloudflare Pages / tacticalsolutions.com).
const base = process.env.ASTRO_BASE ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
