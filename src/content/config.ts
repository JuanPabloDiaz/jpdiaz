import { defineCollection, z } from 'astro:content';
import type { languages } from '../i18n/ui';

type Lang = keyof typeof languages;


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

const moreOpenSourceCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		link: z.string(),
		contribution: z.number().optional(),
	}),
});

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		lang: z.enum(['en', 'es'] as const),
		tags: z.array(z.string()),
		image: z.string().optional(),
		canonicalURL: z.string().url().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = {
	projects: projectsCollection,
	moreProjects: moreProjectsCollection,
	blog: blogCollection,
	openSource: openSourceCollection,
	moreOpenSource: moreOpenSourceCollection,
};
