<script lang="ts" setup>
import {useCookie} from '#app'
import {Cookie} from '@lucide/vue'

const {gtag} = useGtag()

type ConsentState = {
	analytics: boolean
	ads: boolean
}

const consentCookie = useCookie<ConsentState | 'accepted' | 'declined' | null>('cookie_consent', {
	maxAge: 60 * 60 * 24 * 365,
})
const show = ref(false)
const showCustomize = ref(false)

const preferences = ref<ConsentState>({
	analytics: true,
	ads: true,
})

onMounted(() => {
	if (!consentCookie.value) {
		setTimeout(() => {
			show.value = true
		}, 1000)
	} else {
		applyConsent(consentCookie.value)
	}
})

const applyConsent = (state: ConsentState | 'accepted' | 'declined') => {
	if (state === 'accepted') {
		updateGtagConsent('granted', 'granted')
	} else if (state === 'declined') {
		updateGtagConsent('denied', 'denied')
	} else {
		updateGtagConsent(state.ads ? 'granted' : 'denied', state.analytics ? 'granted' : 'denied')
	}
}

const updateGtagConsent = (
	adsStatus: 'granted' | 'denied',
	analyticsStatus: 'granted' | 'denied',
) => {
	gtag('consent', 'update', {
		ad_storage: adsStatus,
		ad_user_data: adsStatus,
		ad_personalization: adsStatus,
		analytics_storage: analyticsStatus,
	})
}

const acceptAll = () => {
	consentCookie.value = 'accepted'
	show.value = false
	applyConsent('accepted')
}

const declineAll = () => {
	consentCookie.value = 'declined'
	show.value = false
	applyConsent('declined')
}

const savePreferences = () => {
	consentCookie.value = {...preferences.value}
	show.value = false
	showCustomize.value = false
	applyConsent(preferences.value)
}

const openCustomize = () => {
	if (consentCookie.value === 'accepted') {
		preferences.value = {analytics: true, ads: true}
	} else if (consentCookie.value === 'declined') {
		preferences.value = {analytics: false, ads: false}
	} else if (consentCookie.value && typeof consentCookie.value === 'object') {
		preferences.value = {...consentCookie.value}
	} else {
		preferences.value = {analytics: true, ads: true}
	}
	showCustomize.value = true
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
			<div class="mx-auto max-w-5xl">
				<div
					class="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border bg-background/90 p-5 shadow-2xl backdrop-blur-xl"
				>
					<div class="flex items-center gap-4 text-center md:text-left">
						<div class="rounded-full bg-primary/10 p-3 shrink-0 hidden sm:block">
							<Cookie class="h-6 w-6 text-primary" />
						</div>
						<div>
							<h3 class="font-semibold text-foreground">We value your privacy</h3>
							<p class="text-sm text-muted-foreground mt-1">
								We use cookies to enhance your browsing experience, serve personalized ads or
								content, and analyze our traffic. By clicking "Accept All", you consent to our use
								of cookies.
							</p>
						</div>
					</div>
					<div
						class="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 justify-center md:justify-end mt-2 md:mt-0"
					>
						<Button variant="ghost" class="w-full sm:w-auto" @click="openCustomize">
							Customize
						</Button>
						<Button variant="outline" class="w-full sm:w-auto" @click="declineAll">
							Decline All
						</Button>
						<Button class="w-full sm:w-auto" @click="acceptAll"> Accept All </Button>
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
			v-if="!show && !showCustomize"
			@click="show = true"
			class="fixed bottom-4 left-4 z-40 rounded-full bg-background/90 border p-3 shadow-md backdrop-blur hover:bg-muted transition-colors flex items-center justify-center group"
			aria-label="Cookie Settings"
		>
			<Cookie class="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
		</button>
	</Transition>

	<Dialog v-model:open="showCustomize">
		<DialogContent class="sm:max-w-106.25">
			<DialogHeader>
				<DialogTitle>Cookie Preferences</DialogTitle>
				<DialogDescription>
					Manage your cookie settings. You can enable or disable different types of cookies below.
				</DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 py-4">
				<div class="flex items-center justify-between space-x-2 border-b pb-4">
					<div class="flex flex-col space-y-1">
						<Label class="text-base font-semibold">Strictly Necessary</Label>
						<span class="text-sm text-muted-foreground leading-snug mt-1">
							Essential for the website to function properly. Cannot be disabled.
						</span>
					</div>
					<Switch :model-value="true" disabled />
				</div>
				<div class="flex items-center justify-between space-x-2 border-b pb-4">
					<div class="flex flex-col space-y-1">
						<Label class="text-base font-semibold">Analytics</Label>
						<span class="text-sm text-muted-foreground leading-snug mt-1">
							Help us understand how visitors interact with the website.
						</span>
					</div>
					<Switch v-model="preferences.analytics" />
				</div>
				<div class="flex items-center justify-between space-x-2 pb-2">
					<div class="flex flex-col space-y-1">
						<Label class="text-base font-semibold">Marketing</Label>
						<span class="text-sm text-muted-foreground leading-snug mt-1">
							Used to deliver advertising that is more relevant to you and your interests.
						</span>
					</div>
					<Switch v-model="preferences.ads" />
				</div>
			</div>
			<DialogFooter>
				<Button @click="savePreferences" class="w-full sm:w-auto">Save Preferences</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
