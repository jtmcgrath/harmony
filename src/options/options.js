let content
let status
let timeout

const mapTypeToValue = {
	checkbox: 'checked',
	input: 'value',
}

const controls = [
	{
		id: 'channels',
		label: 'Hide Channels',
		initialValue: true,
		type: 'checkbox',
		category: 'features',
	},
	{
		id: 'font-size',
		label: 'Font Size',
		initialValue: '16px',
		type: 'input',
		category: 'styles',
	},
]

const renderControl = {
	checkbox(id, value, { label }) {
		return `
			<div>
				<label for="${id}">${label}</label>:
			</div>
			<div>
				<input type="checkbox" id="${id}" ${value ? 'checked' : ''} />
			</div>`
	},
	input(id, value, { label }) {
		return `
			<div>
				<label for="${id}">${label}</label>:
			</div>
			<div>
				<input type="text" id="${id}" value="${value}" />
			</div>`
	},
}

function render(state) {
	content.innerHTML = controls
		.map(({ category, id, initialValue, type, ...settings }) =>
			renderControl[type](
				id,
				state[category] &&
					typeof state[category][id] !== 'undefined'
					? state[category][id]
					: initialValue,
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
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			status.textContent = ''
		}, 1000)
	})
}

document.addEventListener('DOMContentLoaded', () => {
	content = document.getElementById('content')
	status = document.getElementById('status')
	chrome.storage.sync.get(null, render)
})
document.getElementById('save').addEventListener('click', save)
