<template>
	<div v-if="isVisible" class="relative border-b border-primary/20 bg-primary text-white">
		<div
			class="container mx-auto flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between"
		>
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
				<span
					class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
				>
					{{ bannerLabel }}
				</span>
				<p class="text-sm leading-6 text-white">
					{{ banner?.message || 'Special offer for agency clients.' }}
				</p>
			</div>

			<div class="flex items-center justify-between gap-3">
				<a
					v-if="buttonUrl"
					:href="buttonUrl"
					class="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-white/90"
					target="_blank"
					rel="noopener noreferrer"
				>
					{{ banner?.buttonText || 'Learn more' }}
				</a>
				<button
					type="button"
					@click="dismiss"
					class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
					aria-label="Close promo banner"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 6 6 18" />
						<path d="M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	banner?: {
		enabled?: boolean
		bannerType?: string
		message?: string
		buttonText?: string
		buttonUrl?: string
	}
}>()

const storageKey = 'promoBannerDismissedState'
const visibleState = ref(false)
const hasMounted = ref(false)

const buttonUrl = computed(() => {
	const value = props.banner?.buttonUrl?.trim()
	if (!value) return ''

	try {
		const url = new URL(value)
		return ['http:', 'https:'].includes(url.protocol) ? url.href : ''
	} catch {
		return ''
	}
})

const bannerKey = computed(() => {
	if (!props.banner?.enabled) {
		return ''
	}

	return JSON.stringify([
		props.banner.bannerType || 'promo',
		props.banner.message || '',
		props.banner.buttonText || '',
		buttonUrl.value,
	])
})

const isDismissed = () => {
	if (!import.meta.client || !bannerKey.value) {
		return false
	}
	try {
		return window.localStorage.getItem(storageKey) === bannerKey.value
	} catch {
		return false
	}
}

const isVisible = computed(() => {
	return (
		props.banner?.enabled &&
		hasMounted.value &&
		!!props.banner?.message &&
		!visibleState.value &&
		!isDismissed()
	)
})

onMounted(() => {
	hasMounted.value = true
})

watch(bannerKey, (nextKey, previousKey) => {
	if (nextKey !== previousKey) {
		visibleState.value = false
	}
})

const dismiss = () => {
	if (import.meta.client && bannerKey.value) {
		try {
			window.localStorage.setItem(storageKey, bannerKey.value)
		} catch {
			// Ignore storage write failures so current session still hides banner
		}
	}
	visibleState.value = true
}

const bannerLabel = computed(() => {
	switch (props.banner?.bannerType) {
		case 'announcement':
			return 'Announcement'
		case 'urgent':
			return 'Urgent'
		default:
			return 'Sale'
	}
})
</script>
