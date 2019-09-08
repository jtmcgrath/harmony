;(function() {
	const hideMembers = () => {
		if (window.innerWidth < 900) {
			if (document.querySelector('[class*="members"]')) {
				document.querySelector('[aria-label="Member List"]').click()
			}
		}
	}

	window.addEventListener('load', () => {
		setTimeout(hideMembers, 1000)
	})

	let debounceTimer
	window.addEventListener('resize', () => {
		clearTimeout(debounceTimer)
		debounceTimer = setTimeout(hideMembers, 200)
	})
})()
