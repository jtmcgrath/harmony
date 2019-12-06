;(function () {
    chrome.storage.sync.get(
        { features: { ['hide-gift-icon']: true, } },
        ({ features }) => {
            if (features['hide-gift-icon']) {
                document.body.classList.add('harmony_hide-gift-icon')
            }
        }
    )
})()
