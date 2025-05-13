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
	githubUsername: 'JuanPabloDiaz',
	aboutMePageDescription:
		'Committed Front End developer seeking opportunities in growth-oriented startups. Upholds values of discipline, loyalty, and reliability, with a self-motivated approach to continuous learning and skill enhancement',
};

export const SITE_DESCRIPTION =
	'Juan Diaz is a web developer based in Charlotte, NC. He specializes in building (and occasionally designing) exceptional websites.';
export const GENERATE_SLUG_FROM_TITLE = true;
export const TRANSITION_API = true;

export const GITHUB_API_BASE_URL = 'https://api.github.com';
export const SKILL_ICON_BASE_URL = 'https://go-skill-icons.vercel.app/api/icons?i=';

export const backHomeMenu = [
	{
		title: '', // Intentionally blank, assuming Navbar handles this as an icon or specific style
		path: '/',
	},
];

export const homePageMenu = [
	{ title: 'About', path: '#top' },
	{ title: 'Projects', path: '#projects' },
	{ title: 'Open-Source', path: '#oss' },
	{ title: 'Blog', path: '/blog' },
	{ title: 'Contact', path: '#contact' },
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
