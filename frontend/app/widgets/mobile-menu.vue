<script lang="ts" setup>
import {MenuIcon} from '@lucide/vue'
import {useMediaQuery} from '@vueuse/core'

// Define the media query rule and provide an SSR fallback width
const isMobile = useMediaQuery('(max-width: 767px)', {
	ssrWidth: 375, // Instructs SSR engine to assume a mobile view initially
})

const isOpen = ref(false)

const closeSheet = () => {
	isOpen.value = false
}
</script>

<template>
	<ClientOnly>
		<Sheet v-if="isMobile" v-model:open="isOpen">
			<SheetTrigger>
				<Button variant="outline" size="icon">
					<MenuIcon class="h-4 w-4" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle class="sr-only">Navigation</SheetTitle>
					<SheetDescription class="sr-only">Navigation</SheetDescription>
					<NuxtLink to="/" class="self-start" @click="closeSheet">
						<div class="flex items-center">
							<NuxtImg src="/android-chrome-512x512.png" alt="Logo" class="size-9" />
							<span class="ml-2.5 text-xl font-semibold"> P. Agency </span>
						</div>
					</NuxtLink>
				</SheetHeader>
				<div class="overflow-y-auto py-2 space-y-1 flex flex-col items-start justify-stretch">
					<Button
						as-child
						variant="ghost"
						class="w-full justify-start text-base py-6"
						@click="closeSheet"
					>
						<NuxtLink to="/"> Home </NuxtLink>
					</Button>
					<Button
						as-child
						variant="ghost"
						class="w-full justify-start text-base py-6"
						@click="closeSheet"
					>
						<NuxtLink to="/cases"> Portfolio </NuxtLink>
					</Button>
					<Button
						as-child
						variant="ghost"
						class="w-full justify-start text-base py-6"
						@click="closeSheet"
					>
						<NuxtLink to="/services"> Services </NuxtLink>
					</Button>
					<Button
						as-child
						variant="ghost"
						class="w-full justify-start text-base py-6"
						@click="closeSheet"
					>
						<NuxtLink to="/blog"> Blog </NuxtLink>
					</Button>
					<Button
						as-child
						variant="ghost"
						class="w-full justify-start text-base py-6"
						@click="closeSheet"
					>
						<NuxtLink to="/about"> About Us </NuxtLink>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	</ClientOnly>
</template>
