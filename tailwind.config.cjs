const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	// Performance optimizations
	corePlugins: {
		// Disable unused core plugins to reduce bundle size
		preflight: true, // Keep this for reset styles
		container: false, // Using custom containers
		backdropOpacity: false,
		backdropSepia: false,
		backdropSaturate: false,
		backdropInvert: false,
		backdropHueRotate: false,
		backdropGrayscale: false,
		backdropContrast: false,
		backdropBrightness: false,
		backdropBlur: false,
	},
	theme: {
		screens: {
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		colors: {
			black: '#000',
			white: '#fff',
			orange: '#E06330',
			'orange-darker': '#B94F28',
			brown: '#6F2B11', // only for nav
		},
		fontFamily: {
			// Optimized system font stack - no web fonts for instant rendering
			sans: [
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'sans-serif'
			],
			// System monospace fonts for code
			mono: [
				'SF Mono',
				'Monaco',
				'Cascadia Code',
				'Roboto Mono',
				'Consolas',
				'Liberation Mono',
				'Menlo',
				'Courier New',
				'monospace'
			],
		},
		fontWeight: {
			normal: '400',
			medium: '500',
			semibold: '600',
			bold: '700',
		},
		fontSize: {
			xs: '.75rem',
			sm: '.875rem',
			tiny: '.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
		},
		letterSpacing: {
			wide: '.025em',
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(function ({ addBase, theme }) {
			addBase({
				h2: {
					letterSpacing: theme('letterSpacing.wide'),
					fontWeight: 'bold',
				},
				li: {
					letterSpacing: theme('letterSpacing.wide'),
				},
			});
		}),
	],
};
