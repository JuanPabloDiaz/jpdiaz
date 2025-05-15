// Define the available languages and the default language
// You might have these in a separate ui.ts file, adjust if so.
export const supportedLangs = ['en', 'es'] as const;
export const defaultLang: (typeof supportedLangs)[number] = 'en';

type Lang = (typeof supportedLangs)[number];

// Your existing translations object
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

// Function to get the language from the URL
export function getLangFromUrl(url: URL): Lang {
	const [, langPart] = url.pathname.split('/');
	if (langPart && supportedLangs.includes(langPart as Lang)) {
		return langPart as Lang;
	}
	return defaultLang;
}

// Function to get a t-function scoped to a language
export function useTranslations(lang: Lang | undefined) {
	const currentLang = lang || defaultLang;
	return function t(key: keyof (typeof translationsData)[Lang]): string {
		const langTranslations = translationsData[currentLang];
		// Check if langTranslations and the key exist
		if (langTranslations && key in langTranslations) {
			return (langTranslations as any)[key];
		}
		// Fallback to default language if key not found in current language
		if (currentLang !== defaultLang) {
			const defaultLangTranslations = translationsData[defaultLang];
			if (defaultLangTranslations && key in defaultLangTranslations) {
				return (defaultLangTranslations as any)[key];
			}
		}
		// Fallback to the key itself if not found in any translation
		return String(key);
	};
}

// Your existing t function (can be kept if used directly elsewhere,
// but useTranslations is often preferred in Astro components)
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
