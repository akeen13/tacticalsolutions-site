// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL is used for RSS, sitemap, and canonical links.
// Override per-env with ASTRO_SITE when the real domain is attached.
const site = process.env.ASTRO_SITE ?? 'https://tacticalsolutions.com';

export default defineConfig({
  site,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
