<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

import HeroBlock from '~/widgets/hero-block.vue'
import FeaturesBlock from '~/widgets/features-block.vue'
import TextImageBlock from '~/widgets/text-image-block.vue'
import CtaBlock from '~/widgets/cta-block.vue'

const route = useRoute()
const slug = route.params.slug ? String(route.params.slug) : ''
const { data: service, pending } = await useService(slug)

const portableTextComponents = {
	types: {
		heroBlock: ({ value }: any) => h(HeroBlock, { block: value }),
		featuresBlock: ({ value }: any) => h(FeaturesBlock, { block: value }),
		textImageBlock: ({ value }: any) => h(TextImageBlock, { block: value }),
		ctaBlock: ({ value }: any) => h(CtaBlock, { block: value }),
	},
}

useSeoMeta({
	title: () => service.value?.title + ' | Services',
	description: () => service.value?.excerpt,
})
</script>

<template>
	<div class="py-16">
		<div v-if="pending" class="text-center py-32 text-muted-foreground">
			Loading service information...
		</div>

		<div v-else-if="service">
			<section class="container mx-auto px-4 max-w-5xl mb-20">
				<NuxtLink
					to="/services"
					class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
				>
					&larr; All Services
				</NuxtLink>

				<div class="flex flex-col items-center gap-12">
					<div class="lg:col-span-2 space-y-6">
						<span
							v-if="service.badge"
							class="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
						>
							{{ service.badge }}
						</span>
						<h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight">
							{{ service.title }}
						</h1>
						<p class="text-xl text-muted-foreground leading-relaxed">
							{{ service.excerpt }}
						</p>
					</div>

					<div
						class="bg-card border p-6 rounded-2xl shadow-lg space-y-6 w-full lg:max-w-xl"
					>
						<div class="space-y-4">
							<div class="flex justify-between border-b pb-3">
								<span class="text-muted-foreground text-sm">Cost:</span>
								<span class="font-bold text-foreground">{{
									service.price || 'On Request'
								}}</span>
							</div>
							<div class="flex justify-between border-b pb-3">
								<span class="text-muted-foreground text-sm">Timeframe:</span>
								<span class="font-bold text-foreground">{{
									service.timeframe || 'Custom'
								}}</span>
							</div>
						</div>

						<NuxtLink
							to="/contacts"
							class="block w-full text-center bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
						>
							Order Service
						</NuxtLink>
					</div>
				</div>
			</section>

			<section v-if="service.benefits?.length" class="bg-muted/40 py-20 mb-20">
				<div class="container mx-auto px-4 max-w-6xl">
					<h2 class="text-3xl font-bold text-center mb-12">
						What's Included in the Price
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div
							v-for="(item, idx) in service.benefits"
							:key="idx"
							class="bg-background border p-6 rounded-xl space-y-3"
						>
							<div
								class="w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center mb-4"
							>
								0{{ idx + 1 }}
							</div>
							<h3 class="text-xl font-bold">{{ item.title }}</h3>
							<p class="text-muted-foreground text-sm leading-relaxed">
								{{ item.description }}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section
				v-if="service.relatedCases?.length"
				class="container mx-auto px-4 max-w-6xl mb-20"
			>
				<h2 class="text-3xl font-bold mb-8 text-center">
					Work examples for this service
				</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<NuxtLink
						v-for="item in service.relatedCases"
						:key="item._id"
						:to="`/cases/${item.slug}`"
						class="group border rounded-2xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 flex flex-col"
					>
						<div class="aspect-video overflow-hidden bg-muted relative">
							<img
								v-if="item.coverUrl"
								:src="item.coverUrl"
								:alt="item.title"
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div class="p-6 space-y-2 flex-grow">
							<span
								v-if="item.client"
								class="text-xs text-muted-foreground uppercase tracking-wider font-semibold block"
							>
								{{ item.client }}
							</span>
							<h3
								class="text-xl font-bold group-hover:text-primary transition-colors"
							>
								{{ item.title }}
							</h3>
						</div>
					</NuxtLink>
				</div>
			</section>

			<section
				v-if="service.content?.length"
				class="container mx-auto px-4 max-w-5xl"
			>
				<PortableText
					:value="service.content"
					:components="portableTextComponents"
				/>
			</section>
		</div>

		<!-- 404 -->
		<div v-else class="text-center py-32 space-y-4">
			<h1 class="text-3xl font-bold">Service not found</h1>
			<NuxtLink to="/services" class="text-primary hover:underline block"
				>Return to services list</NuxtLink
			>
		</div>
	</div>
</template>
