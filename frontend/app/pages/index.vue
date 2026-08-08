<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

import HeroBlock from '~/widgets/hero-block.vue'
import FeaturesBlock from '~/widgets/features-block.vue'
import TextImageBlock from '~/widgets/text-image-block.vue'
import CtaBlock from '~/widgets/cta-block.vue'
import LogoMarquee from '~/widgets/logo-marquee.vue'

const route = useRoute()
const slug = route.params.slug ? String(route.params.slug) : 'home'

const { data, pending } = await usePage(slug)

const portableTextComponents = {
	types: {
		heroBlock: ({ value }: any) => h(HeroBlock, { block: value }),
		featuresBlock: ({ value }: any) => h(FeaturesBlock, { block: value }),
		textImageBlock: ({ value }: any) => h(TextImageBlock, { block: value }),
		ctaBlock: ({ value }: any) => h(CtaBlock, { block: value }),
		logoMarqueeBlock: ({ value }: any) => h(LogoMarquee, { block: value }),
	},
}

useSeoMeta({
	title: () => data.value?.seoGroup?.metaTitle || data.value?.title || '',
	description: () => data.value?.seoGroup?.metaDescription || '',

	ogTitle: () => data.value?.seoGroup?.metaTitle || data.value?.title,
	ogDescription: () => data.value?.seoGroup?.metaDescription,
})
</script>

<template>
	<div class="min-h-screen">
		<div v-if="pending" class="py-20 text-center text-muted-foreground">
			Building page...
		</div>

		<div v-else-if="!data || !data.content" class="py-20 text-center">
			<h1 class="text-3xl font-bold">No Content</h1>
		</div>

		<div v-else>
			<PortableText
				:value="data.content"
				:components="portableTextComponents"
			/>
		</div>
	</div>
</template>
