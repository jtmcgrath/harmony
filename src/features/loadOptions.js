;(function() {
	const loadStyles = styles => {
		const style = document.createElement('style')
		style.setAttribute('type', 'text/css')
		style.innerHTML = `
            :root {
            ${Object.entries(styles)
				.map(([key, value]) => `  --${key}: ${value};`)
				.join('')}
            }`

		head = document.getElementsByTagName('head')[0].appendChild(style)
	}

	window.addEventListener('load', () => {
		chrome.storage.sync.get({ styles: {} }, ({ styles }) => {
			loadStyles(styles)
		})
	})
})()
