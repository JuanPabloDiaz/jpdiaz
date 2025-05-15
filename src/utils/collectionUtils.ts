import type { CollectionEntry } from 'astro:content';

/**
 * Filters and sorts blog posts by language and publication date.
 * Shows draft posts in development mode.
 */
export function getSortedPosts(
	posts: CollectionEntry<'blog'>[],
	lang: string
): CollectionEntry<'blog'>[] {
	return posts
		.filter((post) => post.data.lang === lang)
		.filter((post) => {
			
			if (import.meta.env.DEV) return true;
			
			return !post.data.draft;
		})
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Sorts a collection of items (like projects) by extracting a numeric part from their ID.
 * Assumes IDs are in a format like 'p_1-something', 'p_2-another', etc.
 */
export function sortCollectionById<T extends { id: string }>(collection: T[]): T[] {
	return [...collection].sort((a, b) => {
		const numA = parseInt(a.id.match(/\d+/)?.[0] || '0', 10);
		const numB = parseInt(b.id.match(/\d+/)?.[0] || '0', 10);
		return numA - numB;
	});
}