<template>
	<section class="py-20 overflow-hidden bg-muted/10">
		<div class="container mx-auto px-4">
			<div v-if="block.title || block.subtitle" class="text-center mb-10">
				<h2 v-if="block.title" class="text-4xl font-bold tracking-tight mb-3">
					{{ block.title }}
				</h2>
				<p
					v-if="block.subtitle"
					class="text-xl text-muted-foreground max-w-2xl mx-auto"
				>
					{{ block.subtitle }}
				</p>
			</div>

			<div class="relative overflow-hidden h-8">
				<div class="marquee-wrapper h-full overflow-hidden">
					<div
						class="marquee flex items-center gap-6 h-full"
						:style="{ '--marquee-duration': block.speed || '24s' }"
					>
						<template v-for="repeatIndex in 3" :key="repeatIndex">
							<template
								v-for="(logo, logoIndex) in logos"
								:key="`${repeatIndex}-${logoIndex}`"
							>
								<div class="logo-item">
									<NuxtImg
										v-if="logo?.url"
										:src="logo.url"
										:alt="logo.alt || 'Logo'"
										class="h-8 object-contain dark:invert dark:grayscale-90 dark:hover:grayscale-0 transition-all duration-300"
										sizes="120px"
										loading="lazy"
									/>
									<div v-else class="h-8 w-24 rounded-xl bg-muted/40"></div>
								</div>
							</template>
						</template>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	block: {
		title?: string
		subtitle?: string
		speed?: string
		logos?: Array<{ url?: string; alt?: string }>
	}
}>()

const logos = computed(() => props.block.logos || [])
</script>

<style scoped>
.marquee-wrapper {
	height: 100%;
	overflow: hidden;
	mask-image: linear-gradient(
		to right,
		transparent 0%,
		rgba(0, 0, 0, 1) 10%,
		rgba(0, 0, 0, 1) 90%,
		transparent 100%
	);
	-webkit-mask-image: linear-gradient(
		to right,
		transparent 0%,
		rgba(0, 0, 0, 1) 10%,
		rgba(0, 0, 0, 1) 90%,
		transparent 100%
	);
}

.logo-item {
	display: inline-flex;
	height: 32px;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	padding: 0 12px;
	opacity: 0.9;
	transition: opacity 0.2s ease;
}

.logo-item:hover {
	opacity: 1;
}

.marquee {
	display: flex;
	align-items: center;
	width: max-content;
	animation: marquee var(--marquee-duration) linear infinite;
	animation-play-state: running;
}

.marquee-wrapper:hover .marquee {
	animation-play-state: paused;
}

@keyframes marquee {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-33.3333%);
	}
}
</style>
