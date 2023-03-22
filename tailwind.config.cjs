const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{cjs,css,html,js,postcss,svelte,ts}',
		'./node_modules/@natoboram/heroicons.svelte/**/*.{cjs,css,html,js,postcss,svelte,ts}',
	],
	darkMode: 'class',
	plugins: [],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Arimo', ...defaultTheme.fontFamily.sans],
			},
		},
	},
}
