import adapterAuto from '@sveltejs/adapter-auto'
import adapterStatic from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { loadEnv } from 'vite'

/** @type {{BUILD_BASE?: '' | `/${string}`}} */
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), 'BUILD')

/** @returns {import('@sveltejs/kit').Adapter} */
function adapter() {
	if (process.env.GITHUB_ACTIONS) return adapterStatic({ fallback: '404.html' })
	return adapterAuto()
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: env.BUILD_BASE,
		},
	},
}

export default config
