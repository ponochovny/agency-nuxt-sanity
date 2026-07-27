<script lang="ts" setup>
const { data, pending } = await usePosts()
</script>

<template>
	<div class="min-h-screen">
		<div v-if="pending" class="py-20 text-center text-muted-foreground">
			Building page...
		</div>

		<div v-else-if="!data || !data.length" class="py-20 text-center">
			<h1 class="text-3xl font-bold">No Content</h1>
		</div>

		<div v-else class="container mx-auto px-4 py-20">
			<h1
				v-motion
				:initial="{
					opacity: 0,
				}"
				:visible-once="{
					opacity: 1,
				}"
				:duration="500"
				:delay="200"
				class="text-4xl font-bold mb-8"
			>
				Blog
			</h1>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				<Card
					v-for="(post, i) in data"
					:key="post._id"
					v-motion
					:initial="{
						opacity: 0,
						y: 30,
					}"
					:visible-once="{
						opacity: 1,
						y: 0,
						transition: {
							duration: 500,
							delay: 300 + i * 100,
						},
					}"
					:hovered="{
						y: -10,
						transition: {
							y: {
								delay: 0,
								duration: 300,
							},
						},
					}"
					class="bg-background/80 backdrop-blur-md pt-0 overflow-hidden"
				>
					<NuxtLink :to="`/blog/${post.slug}`" class="block">
						<NuxtImg
							:src="post.coverUrl || ''"
							:alt="post.title"
							className="relative aspect-video w-full object-cover  mb-6"
						/>
						<CardHeader>
							<CardTitle>{{ post.title }}</CardTitle>
							<CardDescription>{{ post.excerpt }}</CardDescription>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-muted-foreground">
								{{ new Date(post.publishedAt).toLocaleDateString() }}
							</p>
						</CardContent>
					</NuxtLink>
				</Card>
			</div>
		</div>
	</div>
</template>
