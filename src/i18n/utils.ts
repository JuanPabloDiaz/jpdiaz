import { ui, defaultLang as appDefaultLang, i18nLangs } from './ui';

export const supportedLangs = i18nLangs;
export const defaultLang = appDefaultLang;

export type Lang = (typeof supportedLangs)[number];
export type TranslationKeys = keyof (typeof ui)[typeof defaultLang];

export function getLangFromUrl(url: URL): Lang {
	const [, langPart] = url.pathname.split('/');
	if (langPart && supportedLangs.includes(langPart as Lang)) {
		return langPart as Lang;
	}
	return defaultLang;
}

export function useTranslations(lang: Lang | undefined) {
	const currentLang = lang || defaultLang;
	return function t(key: TranslationKeys): string {
		const langTranslations = ui[currentLang];

		if (langTranslations && key in langTranslations) {
			return (langTranslations as any)[key];
		}

		// Fallback to default language if key not found in current language
		if (currentLang !== defaultLang) {
			const defaultLangTranslations = ui[defaultLang];
			if (defaultLangTranslations && key in defaultLangTranslations) {
				return (defaultLangTranslations as any)[key];
			}
		}

		// Fallback to the key itself if not found in any language
		return String(key);
	};
}

// Standalone t function, also using the ui object from ui.ts
export function t(key: TranslationKeys, langParam: string = defaultLang): string {
	const effectiveLang = supportedLangs.includes(langParam as Lang)
		? (langParam as Lang)
		: defaultLang;
	const langTranslations = ui[effectiveLang];

	if (langTranslations && key in langTranslations) {
		return (langTranslations as any)[key];
	}

	// Fallback for the standalone t function
	if (effectiveLang !== defaultLang) {
		const defaultLangTranslations = ui[defaultLang];
		if (defaultLangTranslations && key in defaultLangTranslations) {
			return (defaultLangTranslations as any)[key];
		}
	}
	return String(key);
}
