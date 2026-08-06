// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.mikewilson.digital',
	integrations: [
		sitemap({
			// Keep noindex pages out of the sitemap.
			filter: (page) => !/\/(contact|privacy|links)\/?$/.test(page),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
