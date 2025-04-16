import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Usar el adaptador estático para GitHub Pages
		adapter: adapter({
			// Directorio de salida para la compilación
			pages: "build",
			assets: "build",
			fallback: "index.html",
			precompress: false,
			strict: true,
		}),
		// Configurar la ruta base para GitHub Pages
		paths: {
			base:
				process.env.NODE_ENV === "production"
					? "/permutations-and-combinations"
					: "",
		},
	},
};

export default config;
