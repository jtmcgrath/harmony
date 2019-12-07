;(function() {
	chrome.storage.sync.get(
		{ features: { charcount: true } },
		({ features }) => {
			if (features.charcount) {
				const characterLimit = 2000
				const countContainerClass = 'harmony_character-count'
				const countValueClass = 'harmony_character-count-value'

				const selectCountElement = countContainer =>
					countContainer.children[0]

				const createCountElement = target => {
					const countContainer = document.createElement('div')
					countContainer.className = countContainerClass
					countContainer.innerHTML = `<span class="${countValueClass}"></span>/${characterLimit}`
					target.insertAdjacentElement('afterend', countContainer)
					return selectCountElement(countContainer)
				}

				const getCountElement = target =>
					target.nextSibling.className === countContainerClass
						? selectCountElement(target.nextSibling)
						: createCountElement(target)

				window.addEventListener('keyup', ({ target }) => {
					const isSlate = Array.from(
						target.classList
					).some(className => className.startsWith('slateTextArea'))

					if (target.type === 'textarea' || isSlate) {
						const textarea = document.querySelector(
							'[class*="textArea"]'
						)
						const characterCount = document
							.querySelector(
								'[class*="textArea"] [contenteditable="true"]'
							)
							.innerText.replace(/[\r\n]*/gm, '')
							.replace(String.fromCharCode(65279), '').length

						getCountElement(textarea).innerHTML = characterCount

						if (characterCount > characterLimit) {
							textarea.classList.add('error')
						} else {
							textarea.classList.remove('error')
						}
					}
				})
			}
		}
	)
})()
