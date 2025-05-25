import js from '@eslint/js';
import * as astro from 'eslint-plugin-astro';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	js.configs.recommended,

	{
		files: ['**/*.{js,ts,astro}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: globals.browser,
		},
		plugins: {
			'@typescript-eslint': ts,
			astro: astro,
		},
		rules: {
			'no-console': 'off',
			'no-unused-vars': 'warn',
			quotes: ['warn', 'single'],
			semi: ['warn', 'always'],
		},
	},
	// Node.js para archivos de configuración
	{
		files: ['astro.config.*', 'playwright.config.*', 'vite.config.*', 'tailwind.config.*', 'postcss.config.*', '*.cjs', '*.mjs', '*.config.js', '*.config.ts'],
		languageOptions: {
			globals: globals.node,
		},
	},
	// Node.js y Jest/Playwright para tests
	{
		files: ['**/*.spec.{js,ts}', '**/*.test.{js,ts}'],
		languageOptions: {
			globals: { ...globals.node, ...globals.jest },
		},
	},

	// Soporte para archivos .astro
	{
		files: ['**/*.astro'],
		languageOptions: {
			parser: (await import('astro-eslint-parser')).default,
			parserOptions: {
				parser: (await import('@typescript-eslint/parser')).default,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				Astro: 'readonly',
			},
		},
		plugins: {
			astro: astro,
		},
		rules: {
			'no-undef': 'off',
		},
	},

	// Ignora carpetas que no deberían ser analizadas
	{
		ignores: ['node_modules', 'dist', 'public', '.astro'],
	},
];
