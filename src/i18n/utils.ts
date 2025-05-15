

export const supportedLangs = ['en', 'es'] as const;
export const defaultLang: (typeof supportedLangs)[number] = 'en';

type Lang = (typeof supportedLangs)[number];


const translationsData = {
	en: {
		'post.dateFormat': 'YYYY-MM-DD',
		'blog.title': 'Blog',
		'blog.publishedOn': 'Published on',
	},
	es: {
		'post.dateFormat': 'DD/MM/YYYY',
		'blog.title': 'Blog',
		'blog.publishedOn': 'Publicado el',
	},
} as const; // Using "as const" for better type inference and stricter keys


export function getLangFromUrl(url: URL): Lang {
	const [, langPart] = url.pathname.split('/');
	if (langPart && supportedLangs.includes(langPart as Lang)) {
		return langPart as Lang;
	}
	return defaultLang;
}


export function useTranslations(lang: Lang | undefined) {
	const currentLang = lang || defaultLang;
	return function t(key: keyof (typeof translationsData)[Lang]): string {
		const langTranslations = translationsData[currentLang];
		
		if (langTranslations && key in langTranslations) {
			return (langTranslations as any)[key];
		}
		
		if (currentLang !== defaultLang) {
			const defaultLangTranslations = translationsData[defaultLang];
			if (defaultLangTranslations && key in defaultLangTranslations) {
				return (defaultLangTranslations as any)[key];
			}
		}
		
		return String(key);
	};
}



export function t(key: string, lang: string = defaultLang): string {
	const effectiveLang = supportedLangs.includes(lang as Lang) ? (lang as Lang) : defaultLang;
	const langTranslations = translationsData[effectiveLang];

	if (langTranslations && key in langTranslations) {
		return (langTranslations as any)[key];
	}
	// Fallback for the standalone t function
	if (effectiveLang !== defaultLang) {
		const defaultLangTranslations = translationsData[defaultLang];
		if (defaultLangTranslations && key in defaultLangTranslations) {
			return (defaultLangTranslations as any)[key];
		}
	}
	return key;
}
