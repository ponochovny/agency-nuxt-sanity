// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/sanity',
		'@nuxt/fonts',
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		'@pinia/nuxt',
		'@nuxt/image',
		'@vueuse/motion/nuxt',
		'@nuxtjs/color-mode',
	],

	colorMode: {
		classSuffix: '',
		preference: 'dark',
		fallback: 'dark',
		dataValue: 'theme',
	},

	sanity: {
		projectId: process.env.SANITY_PROJECT_ID,
		dataset: process.env.SANITY_DATASET,
		apiVersion: '2024-06-15',
		token: process.env.SANITY_STUDIO_TOKEN || '',
		useCdn: false,
		typegen: {
			enabled: true,
			schemaTypesPath: '../studio/schemaTypes',
		},
		visualEditing: {
			studioUrl:
				process.env.SANITY_STUDIO_URL ||
				'https://ponochovny-agency-nuxt-studio.sanity.studio',
			token: process.env.SANITY_STUDIO_TOKEN || '',
			stega: true,
			zIndex: 51,
		},
	},
	runtimeConfig: {
		public: {
			studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
		},
	},

	shadcn: {
		prefix: '',
		componentDir: './app/shared/ui',
	},

	routeRules: {
		'/about': { prerender: true },
		'/contact': { prerender: true },

		'/': { isr: true },
		'/services/**': { isr: true },
		'/cases/**': { isr: true },
		'/blog/**': { isr: true },
	},
})
