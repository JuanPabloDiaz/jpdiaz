import { getCollection } from 'astro:content';
import { getSortedPosts } from '@utils/collectionUtils';

async function getBlogs() {
  const allPosts = await getCollection('blog');
  
  // Get both English and Spanish posts
  const enPosts = getSortedPosts(allPosts, 'en');
  const esPosts = getSortedPosts(allPosts, 'es');
  
  // Combine all posts
  const allFormattedPosts = [...enPosts, ...esPosts].map(post => {
    return {
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      tags: post.data.tags,
      lang: post.data.lang || 'en',
    };
  });
  
  return allFormattedPosts;
}

export async function GET() {
  return new Response(JSON.stringify(await getBlogs()), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
