import { getCollection } from 'astro:content';
import { getSortedPosts } from '../utils/collectionUtils';
import { fetchRssFeed } from '../utils/rssFeed';

async function getBlogs() {
  // Get blog posts from content collection
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
      type: 'blog'
    };
  });
  
  // Get RSS feed posts
  const enRssPosts = await fetchRssFeed('en', { returnTotal: true, pageSize: 100 });
  const esRssPosts = await fetchRssFeed('es', { returnTotal: true, pageSize: 100 });
  
  // Format RSS posts
  const enRssFormatted = enRssPosts.posts ? enRssPosts.posts.map(post => ({
    externalId: post.link,
    title: post.title || '',
    description: post.description || '',
    pubDate: post.pubDate,
    tags: ['rss', 'talentoparati'],
    lang: 'en',
    type: 'rss'
  })) : [];
  
  const esRssFormatted = esRssPosts.posts ? esRssPosts.posts.map(post => ({
    externalId: post.link,
    title: post.title || '',
    description: post.description || '',
    pubDate: post.pubDate,
    tags: ['rss', 'talentoparati'],
    lang: 'es',
    type: 'rss'
  })) : [];
  
  // Combine all posts
  return [...allFormattedPosts, ...enRssFormatted, ...esRssFormatted];
}

export async function GET() {
  return new Response(JSON.stringify(await getBlogs()), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
