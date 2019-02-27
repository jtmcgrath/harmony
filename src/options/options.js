let content
let status

const mapTypeToValue = {
	input: 'value',
}

const controls = [
	{
		id: 'font-size',
		label: 'Font Size',
		initialValue: '16px',
		type: 'input',
		category: 'styles',
	},
]

const renderControl = {
	input(id, value, { label }) {
		return `<div><label for="${id}">${label}</label>:</div><div><input type="text" id="${id}" value="${value}" /></div>`
	},
}

function render(state) {
	content.innerHTML = controls
		.map(({ category, id, initialValue, type, ...settings }) =>
			renderControl[type](
				id,
				(state[category] && state[category][id]) || initialValue,
				settings
			)
		)
		.join('')
}

function save() {
	const state = controls.reduce((acc, { id, type, category }) => {
		if (!acc[category]) {
			acc[category] = {}
		}
		acc[category][id] = document.getElementById(id)[mapTypeToValue[type]]
		return acc
	}, {})

	chrome.storage.sync.set(state, () => {
		status.textContent = 'Options saved.'
		setTimeout(function() {
			status.textContent = ''
		}, 2000)
	})
}

document.addEventListener('DOMContentLoaded', () => {
	content = document.getElementById('content')
	status = document.getElementById('status')
	chrome.storage.sync.get(null, render)
})
document.getElementById('save').addEventListener('click', save)
