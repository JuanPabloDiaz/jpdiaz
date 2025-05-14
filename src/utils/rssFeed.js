import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const RSS_FEED_BASE_URL = 'https://talentoparati.com/';

export async function fetchRssFeed(lang = 'en') {
	// Default to 'en' if no lang is provided
	if (lang !== 'es' && lang !== 'en') {
		console.error(`Unsupported language: ${lang}. Defaulting to 'en'.`);
		lang = 'en';
	}
	const RSS_FEED_URL = `${RSS_FEED_BASE_URL}${lang}/rss.xml`;

	try {
		const response = await fetch(RSS_FEED_URL);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const xmlData = await response.text();
		const parsedData = await parseStringPromise(xmlData, { explicitArray: false, trim: true });
		return parsedData.rss.channel.item; // Adjust this path based on your RSS feed structure
	} catch (error) {
		console.error('Failed to fetch or parse RSS feed:', error);
		return []; // Return an empty array in case of an error
	}
}
