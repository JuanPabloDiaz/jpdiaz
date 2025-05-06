const translations = {
  en: {
    'post.dateFormat': 'YYYY-MM-DD',
  },
  es: {
    'post.dateFormat': 'DD/MM/YYYY',
  },
};

export function t(key: string, lang: string = 'en'): string {
  return translations[lang]?.[key] || key;
}