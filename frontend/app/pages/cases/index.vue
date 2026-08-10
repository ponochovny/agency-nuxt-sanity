<script setup lang="ts">
const {data: projects} = await useProjects()
</script>

<template>
	<div class="container mx-auto py-20 px-4">
		<h1
			v-gsap.fromInvisible.whenVisible.once.entrance.fade.delay-300
			class="text-4xl font-bold mb-10"
		>
			Our Cases
		</h1>
		<div v-if="projects" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<NuxtLink
				v-for="(project, i) in projects"
				:key="project._id"
				v-gsap.once.entrance.slide-bottom="{delay: 0.3 + i * 0.2}"
				:to="`/cases/${project.slug}`"
				class="block group"
			>
				<div class="rounded-xl overflow-hidden mb-4">
					<NuxtImg
						:src="project.coverUrl || ''"
						class="w-full h-64 object-cover group-hover:scale-105 transition-transform"
					/>
				</div>
				<h3 class="text-2xl font-semibold">{{ project.title }}</h3>
				<p class="text-muted-foreground">{{ project.client }}</p>
			</NuxtLink>
		</div>
	</div>
</template>
