<script lang="ts" setup>
import type { PortableTextComponents } from '@nuxtjs/sanity/runtime/types'
import { PortableText } from '@portabletext/vue'

const customComponents: PortableTextComponents = {
	// 1. Custom block elements (headings, normal paragraphs)
	block: {
		h2: (_, { slots }) =>
			h('h2', { class: 'text-3xl font-bold my-4' }, slots.default?.()),
		normal: (_, { slots }) =>
			h('p', { class: 'text-base mb-2 text-gray-700' }, slots.default?.()),
		blockquote: (_, { slots }) =>
			h(
				'blockquote',
				{ class: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4' },
				slots.default?.(),
			),
	},
}

const route = useRoute()
const slug = route.params.slug ? String(route.params.slug) : ''
const { data, pending } = await usePost(slug)
</script>

<template>
	<div>
		<div v-if="pending" class="py-20 text-center text-muted-foreground">
			Loading...
		</div>

		<div v-else-if="!data" class="py-20 text-center">
			<h1 class="text-3xl font-bold">Post not found</h1>
		</div>

		<div
			v-else
			v-motion
			:initial="{
				opacity: 0,
			}"
			:visible-once="{
				opacity: 1,
			}"
			:duration="500"
			:delay="100"
			class="max-w-3xl px-4 py-10 mx-auto"
		>
			<h1 class="text-4xl font-bold mb-4">{{ data.title }}</h1>
			<p class="text-sm text-muted-foreground mb-6">
				{{ new Date(data.publishedAt).toLocaleDateString() }}
			</p>
			<NuxtImg
				v-if="data.coverUrl"
				:src="data.coverUrl"
				className="relative aspect-video w-full object-cover mb-6"
			/>
			<PortableText
				v-if="data.content"
				:value="data.content"
				:components="customComponents"
			/>
		</div>
	</div>
</template>
