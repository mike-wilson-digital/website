// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.mikewilson.digital',
	markdown: {
		// Dual Shiki themes; defaultColor:false emits --shiki-light/--shiki-dark
		// CSS vars per token, which global.css maps to our [data-theme] selector.
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
			defaultColor: false,
			wrap: true,
		},
	},
	integrations: [
		mdx(),
		sitemap({
			// Keep noindex pages out of the sitemap. Blog pages are included.
			filter: (page) => !/\/(contact|privacy|links)\/?$/.test(page),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
