import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import remarkDirective from 'remark-directive';
import expressiveCode from 'astro-expressive-code';




import {remarkModifiedTime,} from "./src/plugins/remark-modified-time.mjs";
import {resetRemark} from "./src/plugins/reset-remark.js";
import {remarkAsides} from './src/plugins/remark-asides.js'
import {remarkCollapse} from "./src/plugins/remark-collapse.js";
import {remarkGithubCard} from './src/plugins/remark-github-card.js'
import {remarkButton} from "./src/plugins/remark-button.js";
import {remarkHtml} from "./src/plugins/remark-html.js";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		expressiveCode({
			plugins: ['@expressive-code/plugin-collapsible-sections', '@expressive-code/plugin-line-numbers'],
			themes: ['github-dark', 'github-light'],
			defaultLocale: 'en',
		}),
		mdx(),
		sitemap(),
		icon(),
	],
	site: 'https://jpdiaz.dev/',
	markdown: {
    remarkPlugins: [remarkModifiedTime, resetRemark, remarkDirective, remarkAsides({}), remarkCollapse({}), remarkGithubCard({ token: process.env.PUBLIC_GITHUB_TOKEN }), remarkButton(), remarkHtml()],
    rehypePlugins: [],
		shikiConfig: {
			theme: 'github-dark',
			wrap: true,
		},
	},
});
