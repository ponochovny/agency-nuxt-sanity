<template>
	<section
		v-gsap.fromInvisible.entrance.fade
		class="py-20 sm:py-60 flex justify-center items-center text-center bg-linear-to-b from-primary/10 to-transparent"
	>
		<div class="flex flex-col container items-center text-center">
			<h1
				v-gsap.splitText.words.from="{
					opacity: 0,
					y: 30,
					delay: 0.1,
					duration: 0.6,
					stagger: 0.15,
				}"
				class="text-balance text-4xl sm:text-5xl font-bold tracking-tight mb-4"
			>
				{{ block.title }}
			</h1>
			<p v-gsap.entrance.slide-bottom.delay-500 class="text-xl text-muted-foreground mb-8">
				{{ block.subtitle }}
			</p>

			<div v-gsap.entrance.slide-bottom.delay-850>
				<Button size="lg" as-child>
					<NuxtLink
						to="/contact"
						@click="gtag('event', 'click', {event_category: 'hero', event_label: block.buttonText})"
					>
						{{ block.buttonText }}
					</NuxtLink>
				</Button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const {gtag} = useGtag()
defineProps<{
	block: {
		title: string
		subtitle: string
		buttonText: string
	}
}>()
</script>
