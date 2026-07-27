<template>
	<footer class="border-t bg-muted/30 pt-16 pb-8">
		<div class="container mx-auto px-4 grid gap-8 md:grid-cols-3 mb-12">
			<div
				v-motion
				:initial="{
					opacity: 0,
					y: 30,
				}"
				:visibleOnce="{
					opacity: 1,
					y: 0,
				}"
				:duration="500"
				:delay="300"
			>
				<h3 class="text-xl font-bold mb-4">
					{{ settings?.siteTitle || 'Our brand' }}
				</h3>
				<p class="text-muted-foreground text-sm max-w-xs">
					We create digital products that help businesses grow and stand out in
					the market.
				</p>
			</div>

			<div
				v-motion
				:initial="{
					opacity: 0,
					y: 30,
				}"
				:visibleOnce="{
					opacity: 1,
					y: 0,
				}"
				:duration="500"
				:delay="300"
			>
				<h4 class="font-semibold mb-4 text-foreground">Contact Us</h4>
				<ul class="space-y-3 text-sm text-muted-foreground">
					<li
						v-motion
						:initial="{
							opacity: 0,
							y: 30,
						}"
						:visibleOnce="{
							opacity: 1,
							y: 0,
						}"
						:duration="500"
						:delay="500"
						v-if="settings?.email"
					>
						<a
							:href="`mailto:${settings.email}`"
							class="hover:text-primary transition-colors"
						>
							{{ settings.email }}
						</a>
					</li>
					<li
						v-motion
						:initial="{
							opacity: 0,
							y: 30,
						}"
						:visibleOnce="{
							opacity: 1,
							y: 0,
						}"
						:duration="500"
						:delay="600"
						v-if="settings?.phone"
					>
						<a
							:href="`tel:${settings.phone}`"
							class="hover:text-primary transition-colors"
						>
							{{ settings.phone }}
						</a>
					</li>
				</ul>
			</div>

			<div
				v-motion
				:initial="{
					opacity: 0,
					y: 30,
				}"
				:visibleOnce="{
					opacity: 1,
					y: 0,
				}"
				:duration="500"
				:delay="400"
			>
				<h4 class="font-semibold mb-4 text-foreground">Social links</h4>
				<ul class="space-y-3 text-sm text-muted-foreground">
					<li
						v-for="(link, i) in settings?.socialLinks"
						:key="i"
						v-motion
						:initial="{
							opacity: 0,
							y: 30,
						}"
						:visibleOnce="{
							opacity: 1,
							y: 0,
						}"
						:duration="500"
						:delay="500 + +i * 100"
					>
						<a
							:href="link"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-primary transition-colors"
						>
							{{ link }}
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div
			v-motion
			:initial="{
				opacity: 0,
				y: 30,
			}"
			:visibleOnce="{
				opacity: 1,
				y: 0,
			}"
			:duration="500"
			:delay="300"
			class="border-t pt-8 text-center text-sm text-muted-foreground"
		>
			© {{ new Date().getFullYear() }} {{ settings?.siteTitle }}. All rights
			reserved.
		</div>
	</footer>
</template>

<script setup lang="ts">
defineProps<{ settings: any }>()
</script>
