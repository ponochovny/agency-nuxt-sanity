<template>
	<section class="py-20 bg-muted/30">
		<div class="container mx-auto px-4">
			<div
				v-motion-slide-visible-once-bottom
				:initial="{
					opacity: 0,
					y: 30,
				}"
				:duration="500"
				class="text-center mb-12"
			>
				<h2 class="text-4xl font-bold tracking-tight mb-4">
					{{ block.title }}
				</h2>
				<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
					{{ block.subtitle }}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card
					v-for="(item, index) in block.items"
					:key="item._key"
					v-motion-slide-visible-once-bottom
					:initial="{
						opacity: 0,
						y: 30,
					}"
					:visibleOnce="{
						opacity: 1,
						y: 0,
						transition: {
							delay: 0 + index * 200,
						},
					}"
					:duration="350"
					class="h-full flex flex-col hover:shadow-md transition-shadow"
				>
					<CardHeader>
						<CardTitle class="text-xl">{{ item.title }}</CardTitle>
					</CardHeader>
					<CardContent class="grow">
						<p class="text-muted-foreground">{{ item.description }}</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	block: {
		title: string
		subtitle: string
		items: Array<{_key: string; title: string; description: string; icon?: string}>
	}
}>()
</script>
