import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
	title: z.string(),
	description: z.string(),
	link: z.string().url(),
	tags: z.array(z.string()),
	github_link: z.string().optional(),
	inProgress: z.boolean().optional(),
	contribution: z.number().optional(),
});

const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.date(),
	updatedDate: z.date().optional(),
	draft: z.boolean().optional(),
	lang: z.string().optional(),
	tags: z.array(z.string()),
});

export const collections = {
	projects: defineCollection({ schema: projectSchema }),
	'more-full-stack-projects': defineCollection({ schema: projectSchema }),
	'more-projects': defineCollection({ schema: projectSchema }),
	'open-source': defineCollection({ schema: projectSchema }),
	'more-open-source': defineCollection({ schema: projectSchema }),
	blog: defineCollection({ schema: blogSchema }),
};
