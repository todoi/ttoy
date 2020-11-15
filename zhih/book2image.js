// var computedStyle = getComputedStyle(element);
// var elementHeight = element.clientHeight;  // height with padding
// var elementWidth = element.clientWidth;   // width with padding
// elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
// elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
// var opts = {
//     width: elementWidth,
//     height: elementHeight,
// }

(function () {
    const a = document.createElement('a')
    const getPage = () => document.querySelector(".reader-chapter-content > div")
    const getImages = () => Array.from(document.querySelectorAll(".reader-chapter-content > div img"))
    const getTitle = () => document.querySelector('.reader-chapter-content .ZhihuEPub h3')?.innerText || 'page';
    const getNextButton = () =>  document.querySelector('.next-chapter a');

    let timer;

    // install html2canvas 
    // https://html2canvas.hertzen.com/dist/html2canvas.min.js
    function installHtml2Canvas() {
        const script = document.createElement('script');
        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
        document.appendChild(script);
    }

    function arrayBufferToBase64(buffer) {
        const binary = [].slice.call(new Uint8Array(buffer))
            .map(a => String.fromCharCode(a))
            .join('')
        
        return window.btoa(binary);
    }

    function imagesSrcToBase64(imgs) {
        const promises = imgs.map(image => {
            return fetch(image.src)
                .then(res => res.arrayBuffer())
                .then(arrayBufferToBase64)
                .then(base64 => 'data:image/jpeg;base64,' + base64) // add base64Flag 
                .then(dataURL => image.src = dataURL)
        })
        return Promise.all(promises)
    }

    function download() {
        return imagesSrcToBase64(getImages())
        .then(() => {
            window.scrollTo(0, 0) // to window top
            return html2canvas(getPage())
        })
        .then(canvas => {
            const title = getTitle();
            a.href = canvas.toDataURL("image/jpeg", 1.0);
            a.download = title + '.jpg';
            a.click();
        })
        .then(() => {
            const btn = getNextButton();
            if(!btn) return;
            btn.click()
            timer = setTimeout(() => {
                clearTimeout(timer);
                download();
            }, 5000)
        })
    }

    function main() {
        installHtml2Canvas()
        download()
    }

    main()
})()
