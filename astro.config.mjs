import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';

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
		remarkPlugins: [],
		rehypePlugins: [],
		shikiConfig: {
			theme: 'github-dark',
			wrap: true,
		},
	},
});
