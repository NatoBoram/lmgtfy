import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		files: ['.js', '.mjs', '.mts', '.svelte', '.ts'].flatMap(e => [`**/*${e}`, `*${e}`]),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			prettier,
		],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parser: tseslint.parser,
			parserOptions: { extraFileExtensions: ['.svelte'], project: './tsconfig.eslint.json' },
		},
		rules: {
			'@typescript-eslint/class-methods-use-this': [
				'error',
				{ ignoreClassesThatImplementAnInterface: true, ignoreOverrideMethods: true },
			],
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ fixStyle: 'separate-type-imports' },
			],
			'@typescript-eslint/default-param-last': 'error',
			'@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
			'@typescript-eslint/method-signature-style': 'error',
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/no-unnecessary-qualifier': 'error',
			'@typescript-eslint/no-useless-empty-export': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: true }],
			'@typescript-eslint/prefer-readonly': 'error',
			'@typescript-eslint/prefer-regexp-exec': 'error',
			'@typescript-eslint/promise-function-async': ['error', { checkArrowFunctions: false }],
			'@typescript-eslint/require-array-sort-compare': 'error',
			'@typescript-eslint/return-await': 'error',
			'@typescript-eslint/sort-type-constituents': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'func-style': ['error', 'declaration'],

			// SvelteKit uses that for returning errors in routes
			'@typescript-eslint/no-throw-literal': 'off',
		},
	},

	{
		extends: [...svelte.configs['flat/recommended'], ...svelte.configs['flat/prettier']],
		files: ['.svelte'].flatMap(e => [`**/*${e}`, `*${e}`]),
		languageOptions: {
			globals: globals.browser,
			parser: svelteParser,
			parserOptions: { parser: tseslint.parser, project: './tsconfig.eslint.json' },
		},
	},

	{
		ignores: [
			'.pnpm-store',
			'.svelte-kit',
			'build',
			'dist',
			'node_modules',
			'package',
			'vite.config.js.timestamp-*',
			'vite.config.ts.timestamp-*',
		],
	},
)
