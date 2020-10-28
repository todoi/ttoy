function getBodyHeight() {
    return document.body.scrollHeight;
}
function scroll(height) {
    return window.scrollTo(0, height)
}
function scroll(height) {
    return window.scrollTo(0, height)
}

var prevBodyHeight = 0;
var timer;
function loadmore() {
    var cardmore = document.querySelector('.WB_cardmore.WB_cardmore_noborder.S_txt1.clearfix') // 查看更多
    var bodyHeight = getBodyHeight();
    scroll(bodyHeight)
    if(cardmore || bodyHeight === prevBodyHeight) {
        var rts = document.querySelectorAll('.W_ficon.ficon_forward.S_ficon') // 转发按钮
        var index = 0
        var length = rts.length
        var halfWindowHeight = window.innerHeight / 2
        scroll(rts[0].offsetTop - halfWindowHeight)
        function rt() {
            if (index === length - 1) return;
            timer = setTimeout(() => {
                clearTimeout(timer)
                var button = rts[index]
                button.click()  // 点击转发按钮
                document.querySelector('.W_btn_a').click()  // 点击弹窗中的转发按钮
                scroll(button.offsetTop - halfWindowHeight)
                index++
                rt()
            }, 5000)
        }
        return rt()
    };
    timer = setTimeout(() => {
        clearTimeout(timer)
        prevBodyHeight = bodyHeight;
        loadmore();
    }, 3000)
}

loadmore();
