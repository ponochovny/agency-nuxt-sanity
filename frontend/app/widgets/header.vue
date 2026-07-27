<template>
	<header
		v-motion
		:initial="{
			opacity: 0,
		}"
		:visible="{
			opacity: 1,
		}"
		:duration="750"
		class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
	>
		<div class="container mx-auto flex h-16 items-center justify-between px-4">
			<NuxtLink to="/" class="flex items-center space-x-2">
				<span class="text-xl font-extrabold tracking-tight">
					{{ settings?.siteTitle || 'Agency' }}
				</span>
			</NuxtLink>

			<nav class="hidden md:flex gap-8">
				<NuxtLink
					to="/"
					class="text-sm font-medium transition-colors hover:text-primary"
					>Home</NuxtLink
				>
				<NuxtLink
					to="/cases"
					class="text-sm font-medium transition-colors hover:text-primary"
					>Portfolio</NuxtLink
				>
				<NuxtLink
					to="/services"
					class="text-sm font-medium transition-colors hover:text-primary"
					>Services</NuxtLink
				>
				<NuxtLink
					to="/blog"
					class="text-sm font-medium transition-colors hover:text-primary"
					>Blog</NuxtLink
				>
				<NuxtLink
					to="/about"
					class="text-sm font-medium transition-colors hover:text-primary"
					>About Us</NuxtLink
				>
			</nav>

			<Button as-child variant="default">
				<NuxtLink to="/contact"> Contact Us </NuxtLink>
			</Button>
		</div>
	</header>
</template>

<script setup lang="ts">
defineProps<{ settings: any }>()
</script>
