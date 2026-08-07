import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// RSS feed at /rss.xml. Drafts are excluded in a production build.
export async function GET(context) {
	const posts = (
		await getCollection('blog', ({ data }) => (import.meta.env.PROD ? !data.draft : true))
	).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

	return rss({
		title: 'Mike Wilson Digital — Blog',
		description: 'Building an AI-first, repo-first website workflow in the open.',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
	});
}
