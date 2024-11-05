/*
	available args - videos, cover
*/
export const roboWikiVideo = async (...args) => {
	let videos = args[1].videos;
	let cover = args[1].cover ? args[1].cover : '';
	let attrs = args[1].attrs ? args[1].attrs.join(' ') : '';

	let clss = videos[0].src.includes('static') ? 'robo-wiki-video' : 'robo-wiki-video robo-wiki-video--s hide' ;
	let loaderClss = videos[0].src.includes('static') ? 'hide' : 'video-loading';
	let defaultGW = 'https://gw.crust-gateway.com/ipfs/'

	if(videos.length > 0 ) {
		return `<video class="${clss}" controls muted playsinline ${attrs} ${cover ? 'poster="/assets/images/video-covers/' + cover + '"'  : ''}>
		${videos.map(video => {
			return`<source data-source="${video.src}" src="${!video.src.includes('static') ? defaultGW + video.src + '#t=0.001' : video.src + '#t=0.001'}" type="${'video/' + video.type}" />`
		}).join("")}</video><div class="${loaderClss}"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#5D9DEB" stroke="#5D9DEB" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#5D9DEB" stroke="#5D9DEB" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#5D9DEB" stroke="#5D9DEB" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg><span>VIDEO LOADING...</span></div>`
	}
}

