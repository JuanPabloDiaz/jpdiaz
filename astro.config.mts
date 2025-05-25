import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import remarkDirective from 'remark-directive';
import expressiveCode from 'astro-expressive-code';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import {remarkModifiedTime,} from "./src/plugins/remark-modified-time.mts";
import {resetRemark} from "./src/plugins/reset-remark.ts";
import {remarkAsides} from './src/plugins/remark-asides.ts'
import {remarkCollapse} from "./src/plugins/remark-collapse.ts";
import {remarkGithubCard} from './src/plugins/remark-github-card.ts'
import {remarkButton} from "./src/plugins/remark-button.ts";
import {remarkHtml} from "./src/plugins/remark-html.ts";

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
	vite: {
		resolve: {
			alias: {
				'@src': path.resolve(__dirname, 'src'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@layouts': path.resolve(__dirname, 'src/layouts'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@styles': path.resolve(__dirname, 'src/styles'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				'@lib': path.resolve(__dirname, 'src/lib'),
				'@plugins': path.resolve(__dirname, 'src/plugins'),
				// Existing ones:
				'@i18n': path.resolve(__dirname, 'src/i18n'),
				'@i18n/utils': path.resolve(__dirname, 'src/i18n/utils.ts'),
			},
		},
	},
});
