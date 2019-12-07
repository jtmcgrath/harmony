;(function() {
	chrome.storage.sync.get({ features: { servers: true } }, ({ features }) => {
		if (features.servers) {
			document.body.classList.add('harmony_small-servers')
		}
	})
})()
