import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  // First try to get language from URL
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return 'en';
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang], params?: Record<string, string>) {
    let text = ui[lang][key] || ui[defaultLang][key];
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, value);
      });
    }
    return text as typeof ui[typeof defaultLang][typeof key];
  }
}

export function getRouteFromUrl(url: URL): string {
  const [, , ...rest] = url.pathname.split('/');
  if (rest.length === 0) return '/';
  return '/' + rest.join('/');
}

export const dateFormat = {
  en: 'YYYY-MM-DD',
  es: 'DD/MM/YYYY',
} as const;