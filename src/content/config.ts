import { defineCollection, z } from 'astro:content';
import type { languages } from '../i18n/ui';

type Lang = keyof typeof languages;


export const config = {
  lang: 'en', // Default language
};