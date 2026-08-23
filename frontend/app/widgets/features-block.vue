<template>
	<section v-gsap.fromInvisible.entrance.fade class="py-20 bg-muted/30">
		<div class="container mx-auto px-4">
			<div class="text-center mb-12">
				<h2
					v-gsap.whenVisible.once.from="{opacity: 0, y: 20, duration: 1, delay: 0.25}"
					class="text-4xl font-bold tracking-tight mb-4"
				>
					{{ block.title }}
				</h2>
				<p
					v-gsap.whenVisible.once.from="{
						opacity: 0,
						y: 20,
						duration: 1,
						delay: 0.5,
						start: 'bottom 95%',
					}"
					class="text-xl text-muted-foreground max-w-2xl mx-auto"
				>
					{{ block.subtitle }}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card
					v-for="(item, index) in block.items"
					:key="item._key"
					v-gsap.whenVisible.once.from="{
						opacity: 0,
						y: 20,
						duration: 1,
						delay: 0.15 + index * 0.25,
					}"
					class="h-full flex flex-col hover:shadow-md transition-shadow hover:shadow-primary/70 shadow-sm hover:border-primary/50"
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
