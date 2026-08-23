export const useTrackedNavigation = () => {
	const { gtag } = useGtag()

	const trackNavigation = (
		e: MouseEvent,
		url: string,
		eventCategory: string,
		eventLabel: string
	) => {
		// Preserve modified clicks
		if (e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 0) {
			gtag('event', 'click', { event_category: eventCategory, event_label: eventLabel })
			return
		}

		e.preventDefault()

		let navigated = false
		const navigate = () => {
			if (navigated) return
			navigated = true
			window.location.href = url
		}

		gtag('event', 'click', {
			event_category: eventCategory,
			event_label: eventLabel,
			event_callback: navigate,
			event_timeout: 500,
		})

		// Fallback timeout in case gtag fails or is blocked
		setTimeout(navigate, 500)
	}

	return { trackNavigation }
}
