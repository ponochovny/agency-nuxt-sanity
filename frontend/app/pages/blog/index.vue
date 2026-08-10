<script lang="ts" setup>
const {data, pending} = await usePosts()
</script>

<template>
	<div class="min-h-screen">
		<div v-if="pending" class="py-20 text-center text-muted-foreground">Building page...</div>

		<div v-else-if="!data || !data.length" class="py-20 text-center">
			<h1 class="text-3xl font-bold">No Content</h1>
		</div>

		<div v-else class="container mx-auto px-4 py-20">
			<h1
				v-gsap.fromInvisible.whenVisible.once.entrance.fade.delay-300
				class="text-4xl font-bold mb-8"
			>
				Blog
			</h1>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				<div
					v-for="(post, idx) in data"
					:key="post._id"
					v-gsap.once.entrance.slide-bottom="{delay: 0.3 + idx * 0.2}"
					class="flex"
				>
					<Card
						class="flex grow bg-background/80 backdrop-blur-md pt-0 overflow-hidden hover:shadow-xl hover:-translate-y-2! transition-all duration-300"
					>
						<NuxtLink :to="`/blog/${post.slug}`" class="flex flex-col grow">
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
	</div>
</template>
