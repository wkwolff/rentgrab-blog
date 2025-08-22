import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  const sortedPosts = posts.sort((a, b) => 
    new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  return rss({
    title: 'RentGrab Blog - Peer-to-Peer Rental Platform',
    description: 'Join the sharing economy revolution. Learn how to turn unused items into income and save money by renting from neighbors.',
    site: context.site || 'https://blog.rentgrab.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}