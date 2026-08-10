<script setup lang="ts">
const form = reactive({
	name: '',
	email: '',
	message: '',
})
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitForm = async () => {
	loading.value = true
	errorMessage.value = ''
	successMessage.value = ''

	try {
		// await $fetch('/api/contact', {
		// 	method: 'POST',
		// 	body: { ...form },
		// })
		successMessage.value = 'Thanks! We will contact you shortly.'
		form.name = ''
		form.email = ''
		form.message = ''
	} catch (err: any) {
		errorMessage.value = err.data?.statusMessage || 'An error occurred while sending the message.'
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<main
		v-gsap.whenVisible.once.from="{
			opacity: 0,
			duration: 0.5,
			delay: 0.35,
		}"
		class="container mx-auto px-4 py-16 max-w-3xl"
	>
		<h1 class="text-4xl font-bold mb-8">Contact Us</h1>

		<form @submit.prevent="submitForm" class="space-y-6 bg-muted/20 p-8 rounded-xl border">
			<div>
				<label for="contact-name" class="block text-sm font-medium mb-2">Your Name</label>
				<Input id="contact-name" v-model="form.name" type="text" required class="w-full" />
			</div>

			<div>
				<label for="contact-email" class="block text-sm font-medium mb-2">Email</label>
				<Input id="contact-email" v-model="form.email" type="email" required class="w-full" />
			</div>

			<div>
				<label for="contact-message" class="block text-sm font-medium mb-2">Message</label>
				<Textarea id="contact-message" v-model="form.message" rows="4" required class="w-full" />
			</div>

			<Button type="submit" :disabled="loading" class="w-full">
				{{ loading ? 'Sending...' : 'Send Message' }}
			</Button>

			<p v-if="successMessage" role="status" aria-live="polite" class="text-green-400 text-sm mt-4">
				{{ successMessage }}
			</p>
			<p v-if="errorMessage" role="alert" class="text-red-400 text-sm mt-4">
				{{ errorMessage }}
			</p>
		</form>
	</main>
</template>
