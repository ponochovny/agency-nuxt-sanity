<template>
	<section class="py-20 overflow-hidden">
		<div class="container mx-auto px-4">
			<div
				class="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
				:class="{'md:flex-row-reverse': block.imagePosition === 'right'}"
			>
				<div class="flex-1 space-y-6">
					<h2
						v-gsap.add.whenVisible.once.from="{
							opacity: 0,
							y: 20,
							duration: 1,
							delay: 0.15,
						}"
						class="text-3xl font-bold tracking-tight md:text-4xl"
					>
						{{ block.title }}
					</h2>
					<p
						v-gsap.add.whenVisible.once.from="{
							opacity: 0,
							y: 20,
							duration: 1,
							delay: 0.25,
						}"
						class="text-lg text-muted-foreground leading-relaxed"
					>
						{{ block.text }}
					</p>
				</div>

				<div class="flex-1 w-full relative">
					<div
						v-if="block.imageUrl"
						v-gsap.add.whenVisible.once.from="{
							opacity: 0,
							duration: 1,
							delay: 0.15,
						}"
						class="relative rounded-2xl overflow-hidden shadow-2xl aspect-video md:aspect-4/3"
					>
						<NuxtImg
							:src="block.imageUrl"
							:alt="block.title"
							class="absolute inset-0 w-full h-full object-cover"
							sizes="100vw sm:50vw md:600px"
							loading="lazy"
						/>
					</div>
					<div
						v-else
						class="rounded-2xl bg-muted aspect-video md:aspect-4/3 flex items-center justify-center"
					>
						<span class="text-muted-foreground">Image not available</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	block: {
		title: string
		text: string
		imageUrl?: string
		imagePosition: 'left' | 'right'
	}
}>()
</script>
