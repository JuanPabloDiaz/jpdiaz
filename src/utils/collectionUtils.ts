import type { CollectionEntry } from 'astro:content';

/**
 * Filters and sorts blog posts by language and publication date.
 * Shows draft posts in development mode.
 */
export function getSortedPosts(
	posts: CollectionEntry<'blog'>[],
	lang: string
): CollectionEntry<'blog'>[] {
	// Obtener la fecha actual
	const now = new Date();

	return posts
		.filter((post) => post.data.lang === lang)
		.filter((post) => {
			// Siempre filtrar posts que son borradores
			if (post.data.draft) return false;

			// En desarrollo, mostrar todos los posts no-borradores
			if (import.meta.env.DEV) return true;

			// En producción, verificar la fecha
			if (!(post.data.pubDate instanceof Date)) return false;

			// Comparar fechas usando los timestamps completos
			return post.data.pubDate.getTime() <= now.getTime();
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