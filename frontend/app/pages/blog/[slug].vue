<script lang="ts" setup>
import PortableText from '~/components/portable-text.vue'

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
			<div
				class="dark:prose-invert prose prose-a:text-red-500 max-w-2xl"
				v-if="data.content"
			>
				<PortableText :portableText="data.content" />
			</div>
		</div>
	</div>
</template>
