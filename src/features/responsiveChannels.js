;(function() {
	const toggleClass = 'harmony_mobile-toggle'

	window.addEventListener('load', () => {
		chrome.storage.sync.get(null, ({ features }) => {
			if (features.channels) {
				const toggleElement = document.createElement('div')
				toggleElement.className = toggleClass
				toggleElement.innerHTML = 'toggle channels'

				toggleElement.addEventListener('click', () => {
					toggleElement.classList.toggle('show-channels')
				})
				document.body.insertAdjacentElement('afterbegin', toggleElement)
			}
		})
	})
})()
