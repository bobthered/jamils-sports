import adapter from '@sveltejs/adapter-vercel';
import { type Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const config: Config = {
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	extensions: ['.svelte', '.svx'],
	preprocess: [
		vitePreprocess()
		//, mdsvex()
	],
	kit: { adapter: adapter(), experimental: { remoteFunctions: true } }
};

export default config;
