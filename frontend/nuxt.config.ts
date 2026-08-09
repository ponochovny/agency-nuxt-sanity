// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: {enabled: true},
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
				process.env.SANITY_STUDIO_URL || 'https://ponochovny-agency-nuxt-studio.sanity.studio',
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
		// Static pages pre-rendered at build time
		'/about': {prerender: true},
		'/contact': {prerender: true},

		// CMS dynamic sections cached with ISR (revalidates via webhook or 1 hour fallback TTL)
		'/': {isr: 3600},
		'/services/**': {isr: 3600},
		'/cases/**': {isr: 3600},
		'/blog/**': {isr: 3600},

		// Dynamic Page Builder catch-all routes (e.g. /[slug])
		'/*': {isr: 3600},

		// API endpoints and Sanity Studio Visual Editing preview routes (never cached)
		'/api/**': {cache: false},
		'/preview/**': {cache: false},
	},

	app: {
		head: {
			link: [
				{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
				{rel: 'icon', sizes: '192x192', href: '/favicon-192x192.png'},
				{rel: 'icon', sizes: '512x512', href: '/favicon-512x512.png'},

				// Specific PNG sizes
				{rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
				{rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},

				// Apple Touch Icon for iOS home screens
				{rel: 'apple-touch-icon', href: '/apple-touch-icon.png'},
			],
		},
	},
})
