<script lang="ts" setup>
import {useCookie} from '#app'
import {Cookie} from '@lucide/vue'
const {
	gtag,
	// grantConsent
} = useGtag()

const consentCookie = useCookie('cookie_consent', {maxAge: 60 * 60 * 24 * 365})
const show = ref(false)

onMounted(() => {
	if (!['accepted', 'declined'].includes(consentCookie.value ?? '')) {
		consentCookie.value = null
		// Small delay for better UX
		setTimeout(() => {
			show.value = true
		}, 1000)
	}
	if (consentCookie.value === 'accepted') {
		updateGtagConsent('granted')
		// grantConsent() // (strict mode) GA4 script will be injected only at this moment
	}
})

const updateGtagConsent = (status: 'granted' | 'denied') => {
	gtag('consent', 'update', {
		ad_storage: status,
		ad_user_data: status,
		ad_personalization: status,
		analytics_storage: status,
	})
}

const accept = () => {
	consentCookie.value = 'accepted'
	show.value = false
	updateGtagConsent('granted')
	// grantConsent() // (strict mode) GA4 script will be injected only at this moment
}

const decline = () => {
	consentCookie.value = 'declined'
	show.value = false
	updateGtagConsent('denied')
}
</script>

<template>
	<Transition
		enter-active-class="transition-all duration-500 ease-out"
		enter-from-class="transform translate-y-full opacity-0"
		enter-to-class="transform translate-y-0 opacity-100"
		leave-active-class="transition-all duration-300 ease-in"
		leave-from-class="transform translate-y-0 opacity-100"
		leave-to-class="transform translate-y-full opacity-0"
	>
		<div v-if="show" class="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
			<div class="mx-auto max-w-4xl">
				<div
					class="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border bg-background/90 p-5 shadow-2xl backdrop-blur-xl"
				>
					<div class="flex items-center gap-4 text-center sm:text-left">
						<div class="rounded-full bg-primary/10 p-3 shrink-0">
							<Cookie class="h-6 w-6 text-primary" />
						</div>
						<div>
							<h3 class="font-semibold text-foreground">We value your privacy</h3>
							<p class="text-sm text-muted-foreground mt-1">
								We use cookies to enhance your browsing experience, serve personalized ads or
								content, and analyze our traffic. By clicking "Accept", you consent to our use of
								cookies.
							</p>
						</div>
					</div>
					<div class="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end mt-2 sm:mt-0">
						<Button variant="outline" class="w-full sm:w-auto" @click="decline"> Decline </Button>
						<Button class="w-full sm:w-auto" @click="accept"> Accept </Button>
					</div>
				</div>
			</div>
		</div>
	</Transition>

	<Transition
		enter-active-class="transition-all duration-300 ease-out"
		enter-from-class="transform translate-y-full opacity-0"
		enter-to-class="transform translate-y-0 opacity-100"
		leave-active-class="transition-all duration-200 ease-in"
		leave-from-class="transform translate-y-0 opacity-100"
		leave-to-class="transform translate-y-full opacity-0"
	>
		<button
			v-if="!show"
			@click="show = true"
			class="fixed bottom-4 left-4 z-40 rounded-full bg-background/90 border p-3 shadow-md backdrop-blur hover:bg-muted transition-colors flex items-center justify-center group"
			aria-label="Cookie Settings"
		>
			<Cookie class="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
		</button>
	</Transition>
</template>
