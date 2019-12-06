;(function() {
	chrome.storage.sync.get(
		{ features: { channels: true, } },
		({ features }) => {
			if (features.channels) {
				const toggleClass = 'harmony_mobile-toggle'

				window.addEventListener('load', () => {
					const toggleElement = document.createElement('div')
					toggleElement.className = toggleClass
					toggleElement.innerHTML = 'toggle channels'

					toggleElement.addEventListener('click', () => {
						toggleElement.classList.toggle('show-channels')
					})
					document.body.insertAdjacentElement(
						'afterbegin',
						toggleElement
					)
				})
			}
		}
	)
})()
