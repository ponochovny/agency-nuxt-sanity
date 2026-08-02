<script setup lang="ts">
const { data: services, pending } = await useServices()

useSeoMeta({
	title: 'Services and Competencies | Agency',
	description: 'Design, development and branding for modern business.',
})
</script>

<template>
	<div class="py-20 container mx-auto px-4 max-w-6xl">
		<div
			v-motion-slide-visible-once-bottom
			:initial="{
				y: 30,
				opacity: 0,
			}"
			class="text-center max-w-3xl mx-auto mb-16 space-y-4"
		>
			<span class="text-xs uppercase font-bold tracking-widest text-primary"
				>How we help</span
			>
			<h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight">
				Our Services
			</h1>
			<p class="text-xl text-muted-foreground">
				We transform complex business challenges into understandable digital
				products with high conversion rates.
			</p>
		</div>

		<div v-if="pending" class="text-center py-20 text-muted-foreground">
			Loading services...
		</div>

		<div
			v-else-if="services?.length"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
		>
			<div
				v-for="(service, idx) in services"
				:key="service._id"
				v-motion-slide-visible-once-bottom
				:initial="{
					y: 30,
					opacity: 0,
				}"
				:delay="100 + idx * 100"
				class="group relative flex flex-col bg-card border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
			>
				<div class="flex items-center justify-between mb-4">
					<span
						class="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full"
					>
						{{ service.badge || 'Service' }}
					</span>
					<span class="text-xs text-muted-foreground font-mono">{{
						service.timeframe
					}}</span>
				</div>

				<!-- Название -->
				<h2
					class="text-2xl font-bold mb-3 group-hover:text-primary transition-colors"
				>
					{{ service.title }}
				</h2>

				<!-- Краткое описание -->
				<p class="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">
					{{ service.excerpt }}
				</p>

				<!-- Футер карточки -->
				<div class="pt-4 border-t flex items-center justify-between mt-auto">
					<div>
						<span class="text-xs text-muted-foreground block">Cost</span>
						<span class="font-bold text-foreground">{{ service.price }}</span>
					</div>

					<NuxtLink
						:to="`/services/${service.slug}`"
						class="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
					>
						Details &rarr;
					</NuxtLink>
				</div>
			</div>
		</div>

		<!-- Если услуг нет -->
		<div v-else class="text-center py-20 text-muted-foreground">
			Services are not yet added to Sanity Studio.
		</div>

		<!-- Блок призыва к действию -->
		<div
			v-motion-slide-visible-once-bottom
			:initial="{
				y: 30,
				opacity: 0,
			}"
			:delay="500"
			class="bg-primary/5 border rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6"
		>
			<h3 class="text-2xl sm:text-3xl font-bold">
				Need an unconventional solution?
			</h3>
			<p class="text-muted-foreground max-w-xl mx-auto">
				Describe your task, and we will select a customized technology stack and
				team for your project.
			</p>
			<NuxtLink
				to="/contacts"
				class="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
			>
				Discuss Task
			</NuxtLink>
		</div>
	</div>
</template>
