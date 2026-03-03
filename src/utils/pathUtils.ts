/**
 * Utility functions for handling paths with base URL support
 */

/**
 * Get the base URL from environment or default to '/'
 * This is used in client-side code where import.meta.env is available
 */
export function getBaseUrl(): string {
	if (typeof import.meta !== 'undefined' && import.meta.env) {
		const base = import.meta.env.BASE_URL;
		return base.endsWith('/') ? base.slice(0, -1) : base;
	}
	return '';
}

/**
 * Add base URL to a path
 * @param path - The path to prepend base URL to (should start with /)
 * @returns The path with base URL prepended
 */
export function withBase(path: string): string {
	const base = getBaseUrl();
	// Don't add base to external URLs or anchors
	if (path.startsWith('http') || path.startsWith('#')) {
		return path;
	}
	// Ensure path starts with /
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return base ? `${base}${normalizedPath}` : normalizedPath;
}

/**
 * Configuration constants with base URL support
 * Use these in consts.ts or other config files
 */
export const paths = {
	pdf: '/files/2025-SoftwareEngineer-DataEngineerCV.pdf',
	ogImage: '/placeholder-og-image.jpg',
	certifications: {
		itApplicationSoftware: '/certification/IT-AplicationSoftwareFundamentals.jpg',
		itWebTechnologies: '/certification/IT-WebTechnologies(AAS).jpg',
	},
} as const;

/**
 * Get a path with base URL
 * This is a runtime helper that works in both server and client contexts
 */
export function getPath(key: keyof typeof paths | string): string {
	const path = typeof key === 'string' && key in paths ? paths[key as keyof typeof paths] : key;
	return withBase(typeof path === 'string' ? path : '');
}
