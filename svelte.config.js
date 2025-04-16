import adapter from "@sveltejs/adapter-static";

const dev = process.argv.includes("dev");

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		appDir: "app",
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "404.html",
			precompress: false,
			strict: true,
		}),
		paths: {
			base:
				process.env.NODE_ENV === "production"
					? "/permutations-and-combinations"
					: "",
		},
	},
};
