import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const RSS_FEED_BASE_URL = 'https://talentoparati.com/';
const TARGET_AUTHOR = 'juan diaz';

export async function fetchRssFeed(lang = 'en') {
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
			return [];
		}

		// Filter items by author
		const filteredItems = items.filter((item) => {
			const authorField = item.author;
			return (
				authorField &&
				typeof authorField === 'string' &&
				authorField.toLowerCase().includes(TARGET_AUTHOR)
			);
		});

		return filteredItems;
	} catch (error) {
		console.error(`[RSS Feed] Failed to fetch or parse RSS feed from ${RSS_FEED_URL}:`, error);
		return [];
	}
}
