export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';
export const i18nLangs = ['en', 'es'] as const;

export const ui = {
  en: {
    'blog.title': 'Blog',
    'blog.description': 'Read my latest articles about web development, design, and technology.',
    'blog.readMore': 'Read More',
    'blog.publishedOn': 'Published on',
    'blog.updatedOn': 'Updated on',
    'blog.minuteRead': 'min read',
    'blog.tags': 'Tags',
  },
  es: {
    'blog.title': 'Blog',
    'blog.description': 'Lee mis últimos artículos sobre desarrollo web, diseño y tecnología.',
    'blog.readMore': 'Leer Más',
    'blog.publishedOn': 'Publicado el',
    'blog.updatedOn': 'Actualizado el',
    'blog.minuteRead': 'min de lectura',
    'blog.tags': 'Etiquetas',
  },
} as const;
