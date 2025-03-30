import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), mdx(), sitemap(), icon()],
	site: 'https://jpdiaz.dev/',
});
