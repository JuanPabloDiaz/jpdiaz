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
 * Filters posts by language and a specific tag, then sorts them by publication date.
 * Shows draft posts in development mode.
 */
export function getPostsByTagAndLang(
	posts: CollectionEntry<'blog'>[],
	lang: string,
	tag: string
): CollectionEntry<'blog'>[] {
	const langAndDraftFilteredPosts = posts
		.filter((post) => post.data.lang === lang)
		.filter((post) => {
			if (import.meta.env.DEV) return true;
			return !post.data.draft;
		});

	const tagFilteredPosts = langAndDraftFilteredPosts.filter(post => 
		post.data.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
	);
	
	return tagFilteredPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Extracts unique tags for a given language, sorted alphabetically.
 * Considers draft status of posts.
 */
export function getUniqueTagsByLang(
	posts: CollectionEntry<'blog'>[],
	lang: string
): string[] {
	const langAndDraftFilteredPosts = posts
		.filter((post) => post.data.lang === lang)
		.filter((post) => {
			if (import.meta.env.DEV) return true;
			return !post.data.draft;
		});
	
	const allTags = langAndDraftFilteredPosts.flatMap(post => post.data.tags);
	const uniqueTags = [...new Set(allTags.map(tag => tag.toLowerCase()))]; // Store unique tags in lowercase to avoid duplicates like "Tag" and "tag"
	
	// Sort alphabetically, but map back to original casing if needed or decide on a consistent casing.
	// For now, returning lowercase sorted tags. If original casing is important, this needs adjustment.
	// The current blog pages already use encodeURIComponent(tag.toLowerCase()) for links and originalTag for display.
	// So, returning sorted lowercase tags is fine for generating links.
	// However, for display on index pages, we might want to show the most common casing or original.
	// For simplicity, let's return sorted unique tags (original casing from the first occurrence if we group, or just sorted lowercase).
	// The previous implementation on index pages just did new Set(allLangTags), which would keep original casing of the first seen.
	// Let's refine to get unique tags and then sort them alphabetically, maintaining one version of casing (e.g. first seen).
	
	// Get unique tags while preserving one version of casing
	const tagMap = new Map<string, string>();
	allTags.forEach(tag => {
		if (!tagMap.has(tag.toLowerCase())) {
			tagMap.set(tag.toLowerCase(), tag);
		}
	});
	const uniqueOriginalCaseTags = Array.from(tagMap.values());

	return uniqueOriginalCaseTags.sort((a, b) => a.localeCompare(b));
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