<template>
	<NuxtLink v-if="isVisible && banner?.ctaUrl" :to="banner?.ctaUrl" as-child>
		<div class="relative border-b border-primary/20 bg-primary text-white cursor-pointer">
			<div
				class="container mx-auto flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between"
			>
				<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 text-center">
					<span
						class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
						:class="{
							'bg-black text-white':
								banner?.bannerType === 'info' ||
								banner?.bannerType === 'promo' ||
								banner?.bannerType === 'announcement',
							'bg-destructive text-destructive-foreground':
								banner?.bannerType === 'urgent',
						}"
					>
						{{ bannerLabel }}
					</span>
					<p class="text-sm font-bold leading-6 text-primary-foreground">
						{{ banner?.message || 'Special offer for agency clients.' }}
					</p>
				</div>

				<div class="flex items-center justify-between gap-3">
					<Button
						type="button"
						@click.stop.prevent="dismiss"
						variant="ghost"
						class="inline-flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground hover:bg-white/20 hover:text-white"
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
					</Button>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
	banner?: {
		enabled: boolean | null
		bannerType: 'announcement' | 'promo' | 'urgent' | 'info' | null
		message: string | null
		ctaUrl: string | null
	} | null
}>()

const storageKey = 'promoBannerDismissedState'
const visibleState = ref(false)
const isMounted = ref(false)

const bannerKey = computed(() => {
	if (!props.banner?.enabled) {
		return ''
	}

	return `${props.banner.bannerType || 'promo'}|${props.banner.message || ''}|${props.banner.ctaUrl || ''}`
})

const isDismissed = () => {
	if (!import.meta.client || !bannerKey.value) {
		return false
	}
	return window.localStorage.getItem(storageKey) === bannerKey.value
}

const isVisible = computed(() => {
	return (
		isMounted.value &&
		props.banner?.enabled &&
		!!props.banner?.message &&
		!visibleState.value &&
		!isDismissed()
	)
})

onMounted(() => {
	isMounted.value = true
})

watchEffect(() => {
	if (!props.banner?.enabled) {
		visibleState.value = false
	}
})

const dismiss = () => {
	if (import.meta.client && bannerKey.value) {
		window.localStorage.setItem(storageKey, bannerKey.value)
	}
	visibleState.value = true
}

const bannerLabel = computed(() => {
	switch (props.banner?.bannerType) {
		case 'announcement':
			return 'Announcement'
		case 'urgent':
			return 'Urgent'
		case 'promo':
			return 'Promo'
		default:
			return 'Info'
	}
})
</script>
