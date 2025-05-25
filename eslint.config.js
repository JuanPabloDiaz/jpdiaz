import js from '@eslint/js';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,ts,astro}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
	},
];
