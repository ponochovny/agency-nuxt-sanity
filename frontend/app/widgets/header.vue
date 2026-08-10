<template>
	<header
		v-gsap.whenVisible.once.from="{
			opacity: 0,
			duration: 0.5,
			delay: 0.35,
		}"
		class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
	>
		<div class="container mx-auto flex h-16 items-center justify-between px-4">
			<NuxtLink to="/" class="flex items-center space-x-2">
				<span class="text-xl font-extrabold tracking-tight">
					{{ settings?.siteTitle || 'Agency' }}
				</span>
			</NuxtLink>

			<nav class="hidden md:flex gap-8">
				<NuxtLink to="/" class="text-sm font-medium transition-colors hover:text-primary"
					>Home</NuxtLink
				>
				<NuxtLink to="/cases" class="text-sm font-medium transition-colors hover:text-primary"
					>Portfolio</NuxtLink
				>
				<NuxtLink to="/services" class="text-sm font-medium transition-colors hover:text-primary"
					>Services</NuxtLink
				>
				<NuxtLink to="/blog" class="text-sm font-medium transition-colors hover:text-primary"
					>Blog</NuxtLink
				>
				<NuxtLink to="/about" class="text-sm font-medium transition-colors hover:text-primary"
					>About Us</NuxtLink
				>
			</nav>

			<div class="flex items-center gap-2">
				<ClientOnly>
					<Button
						variant="outline"
						size="icon"
						@click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'"
						:class="{'border-primary': colorMode.preference === 'dark'}"
					>
						<Moon v-if="colorMode.preference !== 'dark'" class="h-4 w-4" />
						<Sun v-else class="h-4 w-4" />
					</Button>
				</ClientOnly>

				<Button as-child variant="default">
					<NuxtLink to="/contact"> Contact Us </NuxtLink>
				</Button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
defineProps<{settings: any}>()
import {Moon, Sun} from '@lucide/vue'

const colorMode = useColorMode()
</script>
