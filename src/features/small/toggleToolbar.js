;(function() {
	chrome.storage.sync.get({ features: { toolbar: true } }, ({ features }) => {
		if (features.toolbar) {
			window.addEventListener('load', () => {
				const toggleElement = document.createElement('div')
				toggleElement.className = 'harmony_toolbar-toggle'
				toggleElement.innerHTML = '☰'

				toggleElement.addEventListener('click', () => {
					toggleElement.classList.toggle('show-toolbar')
				})
				document.body.insertAdjacentElement('afterbegin', toggleElement)
			})
		}
	})
})()
