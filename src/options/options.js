let content
let status
let timeout

const mapTypeToValue = {
	checkbox: 'checked',
	input: 'value',
}

const controls = [
	{
		id: 'charcount',
		label: 'Character Count',
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
	{
		id: 'hide-gift-icon',
		label: 'Hide Gift Icon',
		initialValue: true,
		type: 'checkbox',
		category: 'features',
	},
	{
		label: 'On Small Screens...',
		type: 'header',
	},
	{
		id: 'servers',
		label: 'Make Server Icons Smaller',
		initialValue: true,
		type: 'checkbox',
		category: 'features',
	},
	{
		id: 'channels',
		label: 'Auto-hide Channels',
		initialValue: true,
		type: 'checkbox',
		category: 'features',
	},
	{
		id: 'members',
		label: 'Auto-hide Members',
		initialValue: true,
		type: 'checkbox',
		category: 'features',
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
	header(id, value, { label }) {
		return `<h3>${label}</h3>`
	},
}

function render(state) {
	content.innerHTML = controls
		.map(({ category, id, initialValue, type, ...settings }) =>
			renderControl[type](
				id,
				state[category] && typeof state[category][id] !== 'undefined'
					? state[category][id]
					: initialValue,
				settings
			)
		)
		.join('')
}

function save() {
	const state = controls.reduce((acc, { id, type, category }) => {
		if (category) {
			if (!acc[category]) {
				acc[category] = {}
			}
			acc[category][id] = document.getElementById(id)[
				mapTypeToValue[type]
			]
		}
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
