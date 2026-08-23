<template>
	<section
		v-gsap.fromInvisible.entrance.fade
		class="py-24 bg-primary text-primary-foreground relative overflow-hidden"
	>
		<div
			class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"
		></div>

		<div class="container mx-auto px-4 max-w-4xl text-center relative z-10 space-y-8">
			<h2
				v-gsap.splitText.lines.whenVisible.once.from="{
					opacity: 0,
					y: 20,
					duration: 1,
					delay: 0.15,
				}"
				class="text-4xl font-extrabold tracking-tight sm:text-5xl"
			>
				{{ block.title }}
			</h2>
			<p
				v-gsap.whenVisible.once.from="{
					opacity: 0,
					y: 20,
					duration: 1,
					delay: 0.25,
				}"
				class="text-xl text-primary-foreground/80 max-w-2xl mx-auto"
			>
				{{ block.description }}
			</p>

			<div
				v-gsap.whenVisible.once.from="{
					opacity: 0,
					y: 20,
					duration: 1,
					delay: 0.35,
				}"
				class="pt-4"
			>
				<Button size="lg" variant="secondary" class="font-semibold text-lg px-8 h-14" as-child>
					<NuxtLink to="/contact" @click="gtag('event', 'click', { event_category: 'cta', event_label: block.buttonText })">
						{{ block.buttonText }}
					</NuxtLink>
				</Button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const { gtag } = useGtag()
defineProps<{
	block: {
		title: string
		description: string
		buttonText: string
	}
}>()
</script>
