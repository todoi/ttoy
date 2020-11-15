document.addEventListener('contextmenu', function(e) {
    // e.preventDefault();
    // window.postMessage({url}, '*');
    const url = findImg(e.target).src;
    chrome.runtime.sendMessage({ url }, function(response) {
        console.log('收到来自后台的回复：' + response);
    });

})

function findImg(el) {
    const parent = $(el).parent();
    const imgs = parent.find('img')
    if(Object.prototype.toString.call(el) ==="[object HTMLImageElement]") {
        return el
    }
    else if(imgs?.length) {
        return imgs[0]
    }
    else if(Object.prototype.toString.call(document.body) === "[object HTMLBodyElement]") {
        throw new Error("can't find image");
        alert('没有找到你想要的图片')
    }
    else {
        findImg(parent);
    }
}


// 不会主动下载，之后打开新的页面
// function injectCustomJs(jsPath) {
// 	jsPath = jsPath || 'js/inject-script.js';
// 	var temp = document.createElement('script');
// 	temp.setAttribute('type', 'text/javascript');
// 	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
//     temp.src = chrome.extension.getURL(jsPath);
//     console.log('aaaaa', temp.src);
// 	temp.onload = function() {
// 		// 放在页面不好看，执行完后移除掉
// 		this.parentNode.removeChild(this);
// 	};
// 	document.body.appendChild(temp);
// }

// injectCustomJs()