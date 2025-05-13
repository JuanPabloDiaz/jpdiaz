// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { AnalyticsConfig } from './types/analyticsTypes';

/**
 * title {string} website title
 * favicon {string} website favicon url
 * description {string} website description
 * author {string} author
 * avatar {string} Avatar used in the profile
 * motto {string} used in the profile
 * url {string} Website link
 * baseUrl {string} When using GitHubPages, you must enter the repository name, startWith '/', e.g. /repo_name
 * recentBlogSize {number} Number of recent articles displayed in the sidebar
 * archivePageSize {number} Number of articles on archive pages
 * postPageSize {number} Number of articles on blog pages
 * feedPageSize {number} Number of articles on feed pages
 * beian {string} Chinese policy
 * asideTagsMaxSize {number}
 *    0: disable,
 *    > 0: display the limited number of tags in the sidebar
 *    All tags will be displayed in single page "/tags".
 */
export const site = {
	title: 'Juan Diaz', // required
	favicon: '/favicon.svg', // required
	description: 'Welcome to my Portfolio website! ',
	author: 'Juan Diaz', // required
	avatar: '/avatar.png', // required
	url: 'https://jpdiaz.vercel.app/', // required
	baseUrl: '', // When using GitHubPages, you must enter the repository name startWith '/'. e.g. '/astro-blog'
	motto: 'Actions speak louder than words.',
	recentBlogSize: 5,
	archivePageSize: 25,
	postPageSize: 10,
	feedPageSize: 20,
	beian: '',
	asideTagsMaxSize: 0,
};

export const SITE_DESCRIPTION =
	'Juan Diaz is a web developer based in Charlotte, NC. He specializes in building (and occasionally designing) exceptional websites.';
export const GENERATE_SLUG_FROM_TITLE = true;
export const TRANSITION_API = true;

export const backHomeMenu = [
	{
		title: '', // Intentionally blank, assuming Navbar handles this as an icon or specific style
		path: '/',
	},
];

export const config = {
	lang: 'en', // en | es
	codeFoldingStartLines: 16, // Need to re-run the project to take effect

	// memos config
	memosUrl: '', // https://xxxx.xxx.xx
	memosUsername: '', // login name
	memosPageSize: 10, // number
};

/**
 * Navigator
 * name {string}
 * iconClass {string} icon style
 * href {string}  link url
 * target {string} optional "_self|_blank" open in current window / open in new window
 */
export const categories = [
	{
		name: 'Blog',
		iconClass: 'ri-draft-line',
		href: '/blog/1',
	},

	{
		name: 'Archive',
		iconClass: 'ri-archive-line',
		href: '/archive/1',
	},
	{
		name: 'Message',
		iconClass: 'ri-chat-1-line',
		href: '/message',
	},
	{
		name: 'Search',
		iconClass: 'ri-search-line',
		href: '/search',
	},
	{
		name: 'More',
		iconClass: 'ri-more-fill',
		href: 'javascript:void(0);',
		children: [
			{
				name: 'About',
				iconClass: 'ri-information-line',
				href: '/about',
			},
		],
	},
];

/**
 * Personal link address
 */
export const infoLinks = [
	{
		icon: 'ri-telegram-fill',
		name: 'telegram',
		outlink: '',
	},
	{
		icon: 'ri-twitter-fill',
		name: 'twitter',
		outlink: '',
	},
	{
		icon: 'ri-instagram-fill',
		name: 'instagram',
		outlink: '',
	},
	{
		icon: 'ri-github-fill',
		name: 'github',
		outlink: 'https://github.com/',
	},
	{
		icon: 'ri-rss-fill',
		name: 'rss',
		outlink: '',
	},
];

export const comment = {
	enable: false,
	type: 'giscus', // waline | giscus,
	walineConfig: {
		serverUrl: '',
		lang: 'en',
		pageSize: 20,
		wordLimit: '',
		count: 5,
		pageview: true,
		reaction: true,
		requiredMeta: ['nick', 'mail'],
		whiteList: ['/message/', '/friends/'],
	},

	//
};
