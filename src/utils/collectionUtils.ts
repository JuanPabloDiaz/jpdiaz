import type { CollectionEntry } from 'astro:content';

/**
 * Filters and sorts blog posts by language and publication date.
 * Shows draft posts in development mode.
 */
export function getSortedPosts(
	posts: CollectionEntry<'blog'>[],
	lang: string
): CollectionEntry<'blog'>[] {
	// Convertir la fecha actual a UTC y establecerla al inicio del día
	const now = new Date();
	const nowUtc = Date.UTC(
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate(),
		0, 0, 0, 0
	);

	return posts
		.filter((post) => post.data.lang === lang)
		.filter((post) => {
			// Siempre filtrar posts que son borradores
			if (post.data.draft) return false;

			// En desarrollo, mostrar todos los posts no-borradores
			if (import.meta.env.DEV) return true;

			// En producción, convertir la fecha de publicación a UTC
			if (!(post.data.pubDate instanceof Date)) return false;

			const pubDateUtc = Date.UTC(
				post.data.pubDate.getUTCFullYear(),
				post.data.pubDate.getUTCMonth(),
				post.data.pubDate.getUTCDate(),
				0, 0, 0, 0
			);

			// Comparar fechas en UTC
			return pubDateUtc <= nowUtc;
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