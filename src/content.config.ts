import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Repo-first blog: posts are Markdown/MDX files; the AI is the CMS.
// Slug is derived from the filename (see the loader's generateId default).
const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).optional(),
		ogImage: z.string().optional(),
	}),
});

export const collections = { blog };
