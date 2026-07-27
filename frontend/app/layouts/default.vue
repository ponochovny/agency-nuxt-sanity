<script lang="ts" setup>
import Footer from '~/widgets/footer.vue'
import Header from '~/widgets/header.vue'

const { data: settings } = await useSiteSettings()
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<Header :settings="settings" />

		<main class="grow">
			<NuxtPage />
		</main>

		<Footer :settings="settings" />
	</div>
</template>
