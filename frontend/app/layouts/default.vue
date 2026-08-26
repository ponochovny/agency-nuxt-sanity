<script lang="ts" setup>
import Footer from '~/widgets/footer.vue'
import Header from '~/widgets/header.vue'
import PromoBanner from '~/widgets/promo-banner.vue'
import CookieConsent from '~/widgets/cookie-consent.vue'

const {data: settings} = await useSiteSettings()

import {gsap} from 'gsap'

const prefersReducedMotion = () => {
	return (
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
	)
}

const handleScroll = (scrollData: any) => {
	// console.log('Scroll event:', scrollData)
}
const LenisOptions = {
	duration: 1.2,
	easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	direction: 'vertical',
	gestureDirection: 'vertical',
	smooth: true,
	mouseMultiplier: 1,
	touchMultiplier: 2,
	infinite: false,
}
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<PromoBanner v-if="settings?.promoBanner?.enabled" :banner="settings.promoBanner" />
		<Header :settings="settings" />

		<main class="grow">
			<lenis :options="LenisOptions" @scroll="handleScroll">
				<NuxtPage
					:transition="{
						name: 'page',
						mode: 'out-in', // Wait for the old page animation to complete
						css: false, // Disable CSS animations as we are using JS (GSAP)

						// Prepare the new page before it appears
						onBeforeEnter: (el) => {
							gsap.set(el, {opacity: 0, y: 20})
						},

						// Animation of the new page appearing
						onEnter: (el, done) => {
							if (prefersReducedMotion()) {
								gsap.set(el, {opacity: 1, y: 0})
								return done()
							}
							gsap.to(el, {
								opacity: 1,
								y: 0,
								duration: 0.5,
								ease: 'power2.out',
								onComplete: done, // Must call done!
							})
						},

						// Animation of the current page disappearing
						onLeave: (el, done) => {
							if (prefersReducedMotion()) {
								return done()
							}
							gsap.to(el, {
								opacity: 0,
								y: 20,
								duration: 0.4,
								ease: 'power2.in',
								onComplete: done, // Nuxt will switch the route only after this call
							})
						},
					}"
				/>
			</lenis>
		</main>

		<Footer :settings="settings" />
		<CookieConsent />
	</div>
</template>
