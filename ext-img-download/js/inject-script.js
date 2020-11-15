const a = document.createElement('a');
// const reader = new FileReader()
function getBasename(url) {
	const uri = new window.URL(url)
	return uri.pathname.split('/').slice(-1)[0];
}

window.addEventListener("message", function(e) {
	const {url} = e.data;
	fetch(url)
		.then(res => res.blob())
		// .then(blob => new Promise((resolve, reject) => {
		// 	reader.readAsDataURL(blob);
		// 	reader.onload = () => resolve(reader.result);
		// 	reader.onerror = reject
		// }))
		// .then(dataURL => {
		//     const name = getBasename(url);
		//     console.log(name, dataURL)
		//     a.href = dataURL;
		//     a.donwload = name;
		//     a.click()
		// })
		.then(blob => URL.createObjectURL(blob))
		.then(blobURL => {
			console.log(blobURL, url)
			const name = getBasename(url);
			a.href = blobURL;
			a.donwload = name;
			a.click()
			URL.revokeObjectURL(blobURL);
		})
}, false);
