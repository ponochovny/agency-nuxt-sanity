<script lang="ts" setup>
import Footer from '~/widgets/footer.vue'
import Header from '~/widgets/header.vue'
import PromoBanner from '~/widgets/promo-banner.vue'

const { data: settings } = await useSiteSettings()
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<PromoBanner v-if="settings?.promoBanner" :banner="settings.promoBanner" />
		<Header :settings="settings" />

		<main class="grow">
			<NuxtPage />
		</main>

		<Footer :settings="settings" />
	</div>
</template>
