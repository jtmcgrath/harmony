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
    },
]

const renderControl = {
	input(id, label, value) {
		return `<p>${label}: <input type="text" id="${id}" value="${value}" /></p>`
	},
}

function render(state) {
	content.innerHTML = controls
		.map(({ id, initialValue, label, type }) =>
			renderControl[type](id, label, state[id] || initialValue)
		)
		.join('')
}

function save() {
    const state = controls.reduce((acc, { id, type }) => {
        acc[id] = document.getElementById(id)[mapTypeToValue[type]]
        return acc
    }, {})

    chrome.storage.sync.set(state, () => {
        status.textContent = 'Options saved.'
        setTimeout(function () {
            status.textContent = ''
        }, 2000)
    })
}

function init() {
	content = document.getElementById('content')
	status = document.getElementById('status')

	const initialState = controls.reduce((acc, { id, initialValue }) => {
        acc[id] = initialValue
        return acc
	}, {})

	chrome.storage.sync.get(initialState, state => {
		render(state)
	})
}

document.addEventListener('DOMContentLoaded', init)
document.getElementById('save').addEventListener('click', save)
