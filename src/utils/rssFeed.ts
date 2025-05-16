import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const RSS_FEED_BASE_URL = 'https://talentoparati.com/';
const TARGET_AUTHOR = 'juan diaz';

export interface RssFeedOptions {
  page?: number;
  pageSize?: number;
  returnTotal?: boolean;
}

export async function fetchRssFeed(lang = 'en', options: RssFeedOptions = {}) {
	const { page = 1, pageSize = 5, returnTotal = false } = options;
	
	if (lang !== 'es' && lang !== 'en') {
		console.error(`[RSS Feed] Unsupported language: ${lang}. Defaulting to 'en'.`);
		lang = 'en';
	}
	const RSS_FEED_URL = `${RSS_FEED_BASE_URL}${lang}/rss.xml`;

	try {
		const response = await fetch(RSS_FEED_URL);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
		}
		const xmlData = await response.text();

		const parsedData = await parseStringPromise(xmlData, { explicitArray: false, trim: true });

		let items = [];
		if (parsedData.rss && parsedData.rss.channel && parsedData.rss.channel.item) {
			items = Array.isArray(parsedData.rss.channel.item)
				? parsedData.rss.channel.item
				: [parsedData.rss.channel.item];
		} else {
			console.warn(
				'[RSS Feed] RSS feed structure not as expected or no items found in parsedData.rss.channel.item.'
			);
			return returnTotal ? { posts: [], total: 0, totalPages: 0 } : [];
		}

		// Define interface for RSS item
		interface RssItem {
			author: string;
			title?: string;
			description?: string;
			link?: string;
			pubDate?: string;
			[key: string]: any;
		}

		// Filter items by author
		const filteredItems = items.filter((item: RssItem) => {
			const authorField = item.author;
			return (
				authorField &&
				typeof authorField === 'string' &&
				authorField.toLowerCase().includes(TARGET_AUTHOR)
			);
		});

		// Calculate pagination
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedItems = filteredItems.slice(startIndex, endIndex);
		const totalPages = Math.ceil(filteredItems.length / pageSize);

		if (returnTotal) {
			return {
				posts: paginatedItems,
				total: filteredItems.length,
				totalPages
			};
		}

		return paginatedItems;
	} catch (error) {
		console.error(`[RSS Feed] Failed to fetch or parse RSS feed from ${RSS_FEED_URL}:`, error);
		return returnTotal ? { posts: [], total: 0, totalPages: 0 } : [];
	}
}
