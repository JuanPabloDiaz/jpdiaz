import { defineCollection, z } from 'astro:content';
import { i18nLangs } from '@i18n/ui';
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
    img_alt: z.string().optional(),
    link: z.string().optional().nullable(),
    github_link: z.string().optional(),
    tags: z.array(z.string()),
    image: image().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    tags: z.array(z.string()),
    lang: z.enum(i18nLangs),
    draft: z.boolean().optional(),
    author: z.string().optional(),
    // SEO related fields, if you want them per-post
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: image().optional(), // For specific OG image per post
    pageKeywords: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects: projectCollection,
  blog: blogCollection,
  'more-full-stack-projects': projectCollection,
  'more-open-source': projectCollection,
  'more-projects': projectCollection,
  'open-source': projectCollection,
};
