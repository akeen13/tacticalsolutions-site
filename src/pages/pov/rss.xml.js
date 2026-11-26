import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { withBase } from '../../lib/urls';

export async function GET(context) {
  const posts = (await getCollection('pov', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: 'Tactical Solutions POV',
    description:
      'Founder-led essays from Tactical Solutions. What we are seeing, what we are building, what we are wrong about.',
    // Item links already carry the base via withBase; the channel link is built
    // from `site` alone, so it needs the base appended or it points at the print
    // host root and 404s. On a custom domain the base is `/` and this is a no-op.
    site: new URL(withBase('/'), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: withBase(`/pov/${post.data.slug}`),
    })),
  });
}
