<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug ? String(route.params.slug) : ''
const { data: project, pending } = await useProject(slug)

useSeoMeta({
	title: () =>
		project.value?.seoGroup?.metaTitle || `${project.value?.title} | Portfolio`,
	description: () =>
		project.value?.seoGroup?.metaDescription || project.value?.task,
	ogTitle: () => project.value?.seoGroup?.metaTitle || project.value?.title,
	ogDescription: () =>
		project.value?.seoGroup?.metaDescription || project.value?.task,
	ogImage: () => project.value?.seoGroup?.ogImageUrl || project.value?.coverUrl,
})
</script>

<template>
	<article class="container mx-auto px-4 py-20 max-w-5xl">
		<div
			v-if="pending"
			class="py-32 text-center text-muted-foreground animate-pulse"
		>
			Loading case...
		</div>

		<div v-else-if="project">
			<header class="mb-16 text-center max-w-3xl mx-auto space-y-8">
				<h1
					v-motion
					:initial="{
						opacity: 0,
					}"
					:visible-once="{
						opacity: 1,
					}"
					:duration="500"
					:delay="300"
					class="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
				>
					{{ project.title }}
				</h1>

				<div
					v-motion
					:initial="{
						opacity: 0,
					}"
					:visible-once="{
						opacity: 1,
					}"
					:duration="500"
					:delay="400"
					class="flex flex-wrap justify-center gap-12 text-muted-foreground border-y py-6"
				>
					<div class="flex flex-col items-center">
						<span class="text-xs uppercase tracking-widest font-semibold mb-1"
							>Client</span
						>
						<span class="text-foreground font-medium">{{
							project.client
						}}</span>
					</div>
					<div v-if="project.service" class="flex flex-col items-center">
						<span class="text-xs uppercase tracking-widest font-semibold mb-1"
							>Service:
						</span>
						<NuxtLink
							:to="`/services/${project.service.slug}`"
							class="inline-flex items-center gap-1 font-medium text-primary hover:underline"
						>
							{{ project.service.title }} &rarr;
						</NuxtLink>
					</div>

					<div class="flex flex-col items-center">
						<span class="text-xs uppercase tracking-widest font-semibold mb-1"
							>Task</span
						>
						<span class="text-foreground font-medium">{{ project.task }}</span>
					</div>
				</div>
			</header>

			<div
				v-motion
				:initial="{
					opacity: 0,
				}"
				:visible-once="{
					opacity: 1,
				}"
				:duration="500"
				:delay="500"
				class="mb-20 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border relative aspect-video"
			>
				<NuxtImg
					v-if="project.coverUrl"
					:src="project.coverUrl"
					:alt="project.title || 'Case'"
					class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
				/>
				<div
					v-else
					class="w-full h-full bg-muted flex items-center justify-center"
				>
					No cover
				</div>
			</div>

			<section v-if="project.gallery?.length" class="mb-16 space-y-6">
				<h2 class="text-2xl font-bold">Gallery</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div
						v-for="(item, idx) in project.gallery"
						:key="idx"
						class="group space-y-2"
					>
						<div
							class="rounded-xl overflow-hidden border bg-muted aspect-video"
						>
							<img
								:src="item.url || ''"
								:alt="item.caption || project.title"
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<p
							v-if="item.caption"
							class="text-xs text-muted-foreground text-center"
						>
							{{ item.caption }}
						</p>
					</div>
				</div>
			</section>

			<section
				v-if="project.result"
				v-motion
				:initial="{
					opacity: 0,
					y: 30,
				}"
				:visible-once="{
					opacity: 1,
					y: 0,
				}"
				:duration="500"
				:delay="100"
				class="max-w-3xl mx-auto space-y-6"
			>
				<h2 class="text-3xl font-bold tracking-tight">Result</h2>
				<p
					class="text-lg text-muted-foreground leading-relaxed whitespace-pre-line"
				>
					{{ project.result }}
				</p>
			</section>
		</div>

		<div v-else class="py-32 text-center">
			<h1 class="text-4xl font-bold mb-4">Case not found</h1>
			<NuxtLink to="/cases" class="text-primary hover:underline"
				>Return to portfolio</NuxtLink
			>
		</div>
	</article>
</template>
