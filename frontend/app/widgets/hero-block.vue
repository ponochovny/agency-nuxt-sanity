<template>
	<section
		class="py-60 flex justify-center items-center text-center bg-linear-to-b from-primary/10 to-transparent"
	>
		<div
			v-motion-slide-visible-once-bottom
			:initial="{
				y: 30,
				opacity: 0,
			}"
			:duration="500"
			class="flex flex-col container items-center text-center"
		>
			<h1 class="text-5xl font-bold tracking-tight mb-4">
				{{ block.title }}
			</h1>
			<p class="text-xl text-muted-foreground mb-8">
				{{ block.subtitle }}
			</p>

			<Button size="lg" as-child>
				<NuxtLink to="/contact">
					{{ block.buttonText }}
				</NuxtLink>
			</Button>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	block: {
		title: string
		subtitle: string
		buttonText: string
	}
}>()
</script>
