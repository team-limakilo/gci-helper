import nodeAdapter from "@sveltejs/adapter-node";
import netlifyAdapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: {
			base: process.env.BASE_URL,
		},
		adapter: process.env.VITE_NETLIFY
			? netlifyAdapter({ split: true })
			: nodeAdapter(),
	},
};

export default config;
