;(function() {
	const characterLimit = 2000
	const countContainerClass = 'harmony_character-count'
	const countValueClass = 'harmony_character-count-value'

	const selectCountElement = countContainer => countContainer.children[0]

	const createCountElement = target => {
		const countContainer = document.createElement('div')
		countContainer.className = countContainerClass
		countContainer.innerHTML = `<span class="${countValueClass}">${
			target.value.length
		}</span>/${characterLimit}`
		target.insertAdjacentElement('afterend', countContainer)
		return selectCountElement(countContainer)
	}

	const getCountElement = target =>
		target.nextSibling.className === countContainerClass
			? selectCountElement(target.nextSibling)
			: createCountElement(target)

	window.addEventListener('keyup', ({ target }) => {
		if (target.type === 'textarea') {
			getCountElement(target).innerHTML = target.value.length

			if (target.value.length > characterLimit) {
				target.classList.add('error')
			} else {
				target.classList.remove('error')
			}
		}
	})
})()
