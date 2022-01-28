import preprocess from "svelte-preprocess";
import nodeAdapter from "@sveltejs/adapter-node";
import netlifyAdapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		paths: {
			base: process.env.BASE_URL,
		},
		adapter: process.env.VITE_NETLIFY ? netlifyAdapter() : nodeAdapter(),
		target: "#svelte",
	},
};

export default config;
