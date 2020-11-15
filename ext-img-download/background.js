let url;

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    url = request?.url;
    chrome.storage.sync.get('isCheckRightClick', function({isCheckRightClick}) {
        if(isCheckRightClick) {
            chrome.downloads.download({ url });
        }
    });
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

chrome.contextMenus.create({
    title: "下载图片",
    contexts: ["page", "frame", "selection", "link", "editable", "image", "video", "audio"],
    onclick: function(){
        chrome.downloads.download({ url });
    }
});
