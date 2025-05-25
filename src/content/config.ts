import { defineCollection, z, image } from 'astro:content';
import type { languages } from '@i18n/ui';

type Lang = keyof typeof languages;

export const config = {
	lang: 'en', // default language
};

const projectCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({ image }) => z.object({
    inProgress: z.boolean(),
    title: z.string(),
    description: z.string(),
    img_alt: z.string(),
    link: z.string(),
    github_link: z.string().optional(),
    tags: z.array(z.string()),
    image: image(),
  }),
});

export const collections = {
  projects: projectCollection,
};
