import { defineCollection, z } from 'astro:content';
import type { languages } from '../i18n/ui';

type Lang = keyof typeof languages;

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image_path: z.string(),
    img_alt: z.string(),
    link: z.string(),
    github_link: z.string().optional(),
    tags: z.array(z.string()),
    inProgress: z.boolean().optional().default(false)
  })
});

export const collections = {
  'projects': projectsCollection,
  'more-projects': projectsCollection,
  'open-source': projectsCollection,
  'more-open-source': projectsCollection,
  'more-full-stack-projects': projectsCollection
};

export const config = {
  lang: 'en', // Default language
};