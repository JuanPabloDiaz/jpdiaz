import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const RSS_FEED_BASE_URL = 'https://talentoparati.com/';
const TARGET_AUTHOR = 'juan diaz'; // Author to filter by (case-insensitive)

export async function fetchRssFeed(lang = 'en') {
	if (lang !== 'es' && lang !== 'en') {
		console.error(`[RSS Feed] Unsupported language: ${lang}. Defaulting to 'en'.`);
		lang = 'en';
	}
	const RSS_FEED_URL = `${RSS_FEED_BASE_URL}${lang}/rss.xml`;
	console.log(`[RSS Feed] Fetching feed for lang '${lang}' from: ${RSS_FEED_URL}`);

	try {
		const response = await fetch(RSS_FEED_URL);
		console.log(`[RSS Feed] Response status: ${response.status}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
		}
		const xmlData = await response.text();
		// console.log('[RSS Feed] XML Data:', xmlData); // Optional: log raw XML, can be very verbose

		const parsedData = await parseStringPromise(xmlData, { explicitArray: false, trim: true });
		// console.log('[RSS Feed] Parsed Data:', JSON.stringify(parsedData, null, 2)); // Optional: log parsed structure, can be verbose

		let items = [];
		if (parsedData.rss && parsedData.rss.channel && parsedData.rss.channel.item) {
			items = Array.isArray(parsedData.rss.channel.item)
				? parsedData.rss.channel.item
				: [parsedData.rss.channel.item];
			console.log(`[RSS Feed] Found ${items.length} item(s) before filtering.`);
		} else {
			console.warn(
				'[RSS Feed] RSS feed structure not as expected or no items found in parsedData.rss.channel.item.'
			);
			console.log(
				'[RSS Feed] Parsed data structure for debugging:',
				JSON.stringify(parsedData, null, 2)
			);
			return [];
		}

		// Filter items by author
		const filteredItems = items.filter((item) => {
			const authorField = item.author; // Changed from item['dc:creator'] to item.author
			console.log(
				`[RSS Feed] Checking item. Title: "${item.title}", Author from feed: '${authorField}' (Type: ${typeof authorField})`
			);
			return (
				authorField &&
				typeof authorField === 'string' &&
				authorField.toLowerCase().includes(TARGET_AUTHOR)
			);
		});

		console.log(
			`[RSS Feed] Found ${filteredItems.length} item(s) after filtering for author '${TARGET_AUTHOR}'.`
		);
		return filteredItems;
	} catch (error) {
		console.error(`[RSS Feed] Failed to fetch or parse RSS feed from ${RSS_FEED_URL}:`, error);
		return []; // Return an empty array in case of an error
	}
}
