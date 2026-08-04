## Page constructor

```TS
// app/pages/[slug].vue
<script setup lang="ts">
import { PortableText } from '@portabletext/vue'

import HeroBlock from '~/widgets/hero-block.vue'
import FeaturesBlock from '~/widgets/features-block.vue'
import TextImageBlock from '~/widgets/text-image-block.vue'
import CtaBlock from '~/widgets/cta-block.vue'

const portableTextComponents = {
	types: {
		heroBlock: ({ value }: any) => h(HeroBlock, { block: value }),
		featuresBlock: ({ value }: any) => h(FeaturesBlock, { block: value }),
		textImageBlock: ({ value }: any) => h(TextImageBlock, { block: value }),
		ctaBlock: ({ value }: any) => h(CtaBlock, { block: value }),
	},
}
</script>
<template>
	<div class="min-h-screen">
		<div v-if="data?.content">
			<PortableText
				:value="data.content"
				:components="portableTextComponents"
			/>
		</div>

		<div v-else-if="pending" class="py-20 text-center text-muted-foreground">
			Building page...
		</div>

		<div v-else-if="!data || !data.content" class="py-20 text-center">
			<h1 class="text-3xl font-bold">Page not found</h1>
		</div>
	</div>
</template>
```

```TS
// hero-block.vue
<template>
	<section
		class="py-20 flex justify-center items-center text-center"
	>
		<div
			class="flex flex-col container items-center text-center"
		>
			<h1 class="text-5xl font-bold tracking-tight mb-4">{{ block.title }}</h1>
			<p class="text-xl text-muted-foreground mb-8">{{ block.subtitle }}</p>
			<Button size="lg" as-child>
				<NuxtLink to="/contact">
					{{ block.buttonText }}
				</NuxtLink>
			</Button>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	block: {
		title: string
		subtitle: string
		buttonText: string
	}
}>()
</script>
```

## FIX

```BASH
[@nuxtjs/sanity]  WARN  Could not generate Sanity types: Unknown file extension ".css" for \node_modules\@sanity-labs\ui-poc\dist\styles.css
```

1. install `"@sanity/types": "^6.7.0"` as non dev into sanity
2. Use `@sanity/types` to import `import {defineField, defineType} from '@sanity/types'`

```TS
const MyQuery = groq``

// or

import { defineQuery } from 'groq'

const MyQuery = defineQuery(``)
```
