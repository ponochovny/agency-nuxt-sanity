interface MainStoreState {
	siteTitle: string
	email: string
	phone: string
	socialLinks: string[]
}

export const useMainStore = defineStore('main', {
	state: (): MainStoreState => ({
		siteTitle: '',
		email: '',
		phone: '',
		socialLinks: [],
	}),
	getters: {
		// methodExample: (state) => { state.siteTitle  },
	},
	actions: {
		// increment() {
		//   this.siteTitle = 'New Site Title'
		// },
		async fetchSiteSettings() {
			const { data } = useSanityQuery<SiteSettingsQueryResult>(
				groq`*[_type == "siteSettings"][0]`,
			)
			if (data.value) {
				this.siteTitle = data.value.siteTitle || ''
				this.email = data.value.email || ''
				this.phone = data.value.phone || ''
				this.socialLinks = data.value.socialLinks || []
			}
		},
	},
})
