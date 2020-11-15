chrome.storage.sync.get('isCheckRightClick', function({isCheckRightClick}) {
    checkRightClick.checked = isCheckRightClick;
});

checkRightClick.onclick = function(event) {
    let value = event.target.checked;
    console.log(value)
    chrome.storage.sync.set({isCheckRightClick: value}, function() {
        console.log('update isCheckRightClick')
    });
};
