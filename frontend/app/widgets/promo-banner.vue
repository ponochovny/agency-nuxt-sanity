<template>
  <div v-if="isVisible" class="relative border-b border-primary/20 bg-primary text-white">
    <div class="container mx-auto flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
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
          v-if="banner?.buttonUrl"
          :href="banner.buttonUrl"
          class="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-white/90"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ banner?.buttonText || 'Lean more' }}
        </a>
        <button
          type="button"
          @click="dismiss"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close promo banner"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

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

const bannerKey = computed(() => {
  if (!props.banner?.enabled) {
    return ''
  }

  return `${props.banner.bannerType || 'promo'}|${props.banner.message || ''}|${props.banner.buttonText || ''}|${props.banner.buttonUrl || ''}`
})

const isDismissed = () => {
  if (!process.client || !bannerKey.value) {
    return false
  }
  return window.localStorage.getItem(storageKey) === bannerKey.value
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

watchEffect(() => {
  if (!props.banner?.enabled) {
    visibleState.value = false
  }
})

const dismiss = () => {
  if (process.client && bannerKey.value) {
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
    default:
      return 'Sale'
  }
})
</script>
