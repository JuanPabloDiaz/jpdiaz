import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
	schema: z.object({
		inProgress: z.boolean(),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		link: z.string(),
		github_link: z.string(),
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
		github_link: z.string(),
	}),
});

export const collections = {
	projects: projectsCollection,
	moreProjects: moreProjectsCollection,
};
