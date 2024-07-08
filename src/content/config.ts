import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
	schema: z.object({
		inProgress: z.boolean(),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		link: z.string(),
		github_link: z.string().optional(),
		img_alt: z.string().optional(),
		image_path: z.string().optional(),
	}),
});

const moreProjectsCollection = defineCollection({
	schema: z.object({
		inProgress: z.boolean(),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		link: z.string(),
		github_link: z.string().optional(),
		contribution: z.number().optional(),
	}),
});

const openSourceCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		link: z.string(),
		contribution: z.number().optional(),
	}),
});

export const collections = {
	projects: projectsCollection,
	moreProjects: moreProjectsCollection,
	openSource: openSourceCollection,
};
