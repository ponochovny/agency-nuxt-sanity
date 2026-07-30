import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { createClient } from '@sanity/client'

export default defineEventHandler(async (event) => {
	const query = getQuery(event)
	const config = useRuntimeConfig()

	console.log(
		'Test',
		config.public.sanity.projectId,
		config.public.sanity.dataset,
		config.sanitySecretToken,
	)

	// Initialize an authenticated client to validate the secret handshake
	const client = createClient({
		projectId: config.public.sanity.projectId,
		dataset: config.public.sanity.dataset,
		apiVersion: '2026-03-01',
		useCdn: false,
		token: config.sanitySecretToken, // Ensure this has Viewer capabilities
		stega: {
			enabled: true,
			studioUrl: 'https://ponochovny-agency-nuxt-studio.sanity.studio', // Replace with your Sanity Studio URL
		},
	})

	// Validate the incoming handshake request
	const requestUrl = getRequestURL(event).toString()
	const { isValid, redirectTo = '/' } = await validatePreviewUrl(
		client,
		requestUrl,
	)

	if (!isValid) {
		throw createError({ statusCode: 401, statusMessage: 'Invalid secret' })
	}

	// Activate preview mode by dropping an HttpOnly cookie
	setCookie(event, 'sanity_preview', 'true', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
	})

	// Redirect back to the requested visual editing page
	return sendRedirect(event, redirectTo, 307)
})
