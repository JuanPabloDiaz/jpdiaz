import { getCollection, type CollectionEntry } from 'astro:content';
import { getSortedPosts } from '../utils/collectionUtils';
import { fetchRssFeed } from '../utils/rssFeed';

// Define interfaces for type safety
interface PostData {
  slug?: string; // Optional for RSS posts
  externalId?: string; // Optional for local blog posts
  title: string;
  description: string;
  pubDate: Date | string; // Astro collection gives Date, RSS might give string
  tags: string[];
  lang: string;
  type: 'blog' | 'rss';
}

interface RssItem {
  link: string;
  title: string;
  description?: string; // Description can be optional in RSS
  pubDate: string | Date; // pubDate can be a string or Date
}

interface RssFeedResponse {
  posts?: RssItem[];
  // Add other properties if fetchRssFeed returns more, e.g., total
}

async function getBlogs(): Promise<PostData[]> {
  // Get blog posts from content collection
  const allPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  
  // Get both English and Spanish posts
  // Assuming getSortedPosts is typed correctly or we'll need to cast/update it
  const enPosts = getSortedPosts(allPosts, 'en');
  const esPosts = getSortedPosts(allPosts, 'es');
  
  // Combine all posts
  const allFormattedPosts: PostData[] = [...enPosts, ...esPosts].map((post: CollectionEntry<'blog'>) => {
    return {
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      tags: post.data.tags,
      lang: post.data.lang || 'en', // Default to 'en' if lang is not specified
      type: 'blog'
    };
  });
  
  // Get RSS feed posts
  const enRssPosts: RssFeedResponse = await fetchRssFeed('en', { returnTotal: true, pageSize: 100 });
  const esRssPosts: RssFeedResponse = await fetchRssFeed('es', { returnTotal: true, pageSize: 100 });
  
  // Format RSS posts
  const enRssFormatted: PostData[] = enRssPosts.posts ? enRssPosts.posts.map((post: RssItem) => ({
    externalId: post.link,
    title: post.title || '',
    description: post.description || '',
    pubDate: post.pubDate,
    tags: ['rss', 'talentoparati'],
    lang: 'en',
    type: 'rss'
  })) : [];
  
  const esRssFormatted: PostData[] = esRssPosts.posts ? esRssPosts.posts.map((post: RssItem) => ({
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

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(await getBlogs()), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
