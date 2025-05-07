import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    lang: z.string(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    inProgress: z.boolean().optional(),
    github_link: z.string(),
    link: z.string().optional(),
    contribution: z.string(),
  }),
});

const moreOpenSourceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    inProgress: z.boolean().optional(),
    github_link: z.string(),
    link: z.string().optional(),
    contribution: z.string(),
  }),
});

export const collections = {
  'en/blog': blogCollection,
  'es/blog': blogCollection,
  'en/projects': projectCollection,
  'es/projects': projectCollection,
  'en/more-open-source': moreOpenSourceCollection,
  'es/more-open-source': moreOpenSourceCollection,
};