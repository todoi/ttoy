let changeRate = document.getElementById("changeRate");

// chrome.storage.sync.get("color", function(data) {
//     changeRate.style.backgroundColor = data.color;
//     changeRate.setAttribute("value", data.color);
// });

changeRate.onclick = function(event) {
    let rate = event.target.dataset.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0]
        // chrome.webNavigation.getAllFrames({
        //     tabId: tab.id,
        // }, function(frames) {
        //     for (var frame of frames) {
        //         if (frame.url === 'http://player.youku.com/embed/XNDQzNjk3NTExNg==') {
        //             chrome.tabs.executeScript(tab.id, {
        //                 frameId: frame.frameId,
        //                 code: `document.body.dataset.value = new Date().getTime();`
        //             });
        //             break;
        //         }
        //     }
        // });

        chrome.tabs.executeScript(tab.id, {
            allFrames: true,
            code: ` document.querySelector("video") && (document.querySelector("video").playbackRate = ${rate});`
        });
    });
};
