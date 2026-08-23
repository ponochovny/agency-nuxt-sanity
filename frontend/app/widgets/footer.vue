<template>
	<footer v-gsap.fromInvisible.entrance.fade class="border-t bg-muted/30 pt-16 pb-8">
		<div class="container mx-auto px-4 grid gap-8 md:grid-cols-3 mb-12">
			<div
				v-gsap.splitText.lines.whenVisible.once.from="{
					opacity: 0,
					y: 20,
					duration: 1,
					delay: 0.15,
				}"
			>
				<h3 class="text-xl font-bold mb-4">
					{{ settings?.siteTitle || 'Our brand' }}
				</h3>
				<p class="text-muted-foreground text-sm max-w-xs">
					We create digital products that help businesses grow and stand out in the market.
				</p>
			</div>

			<div
				v-gsap.whenVisible.once.from="{
					opacity: 0,
					y: 20,
					duration: 1,
					delay: 0.25,
				}"
			>
				<h4 class="font-semibold mb-4 text-foreground">Contact Us</h4>
				<ul class="space-y-3 text-sm text-muted-foreground">
					<li
						v-gsap.whenVisible.once.from="{
							opacity: 0,
							y: 20,
							duration: 1,
							delay: 0.25,
						}"
						v-if="settings?.email"
					>
						<a :href="`mailto:${settings.email}`" class="hover:text-primary transition-colors" @click="trackNavigation($event, `mailto:${settings.email}`, 'footer', 'Email')">
							{{ settings.email }}
						</a>
					</li>
					<li
						v-gsap.whenVisible.once.from="{
							opacity: 0,
							y: 20,
							duration: 1,
							delay: 0.35,
						}"
						v-if="settings?.phone"
					>
						<a :href="`tel:${settings.phone}`" class="hover:text-primary transition-colors" @click="trackNavigation($event, `tel:${settings.phone}`, 'footer', 'Phone')">
							{{ settings.phone }}
						</a>
					</li>
				</ul>
			</div>

			<div
				v-gsap.whenVisible.once.from="{
					opacity: 0,
					y: 20,
					duration: 1,
					delay: 0.35,
				}"
			>
				<h4 class="font-semibold mb-4 text-foreground">Social links</h4>
				<ul class="flex gap-4 text-sm text-muted-foreground">
					<li
						v-for="(link, i) in settings?.socialLinks"
						:key="i"
						v-gsap.whenVisible.once.from="{
							opacity: 0,
							y: 20,
							duration: 1,
							delay: 0.45 + +i * 0.1,
						}"
					>
						<a
							:href="link.url"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-primary transition-colors"
							@click="gtag('event', 'click', { event_category: 'footer', event_label: link.platform })"
						>
							<Icon
								:name="'grommet-icons:' + link.platform.toLowerCase()"
								size="28"
								class="inline-block"
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div
			v-gsap.whenVisible.once.from="{
				opacity: 0,
				y: 20,
				duration: 1,
				delay: 0.45,
				start: 'top bottom',
			}"
			class="border-t pt-8 text-center text-sm text-muted-foreground"
		>
			© {{ new Date().getFullYear() }} {{ settings?.siteTitle }}. All rights reserved.
		</div>
	</footer>
</template>

<script setup lang="ts">
const { gtag } = useGtag()
const { trackNavigation } = useTrackedNavigation()
defineProps<{settings: any}>()
</script>
