/*
	available args - link, autoplay, loop
*/

const getURL = (link, autoplay, loop) => {
	let linkCode = '';
	let videoSrc = 'https://www.youtube.com/embed/';

	if(link.includes('v=')) {
		linkCode = link.split('v=')[1];
	} else {
		const n = link.lastIndexOf('/');
		linkCode = link.substring(n + 1);
	}

	if(autoplay && loop) {
		videoSrc += linkCode + '?autoplay=1&mute=1&loop=1&playlist=' + linkCode;
		return videoSrc
	}

	if(autoplay && !loop) {
		videoSrc += linkCode + '?autoplay=1&mute=1';
		return videoSrc
	}

	if(!autoplay && loop) {
		videoSrc += linkCode + '?loop=1&playlist=' + linkCode;
		return videoSrc
	}

	if (!autoplay && !loop) {
		videoSrc += linkCode;
		return videoSrc
	}
}

export const roboWikiYoutube = (...args) => {
	let link = args[1].link;
	let autoplay = args[1].autoplay ? args[1].autoplay : false;
	let loop = args[1].loop ? args[1].loop : false;

	return `<div class="youtube-embed"><div class="youtube-embed__wrapper"><div class="youtube-embed__container"><iframe width="1060" height="615" src="${getURL(link, autoplay, loop)}" title="Youtube Video" frameborder="0" allow="${autoplay ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' : 'autoplay; encrypted-media'}" allowfullscreen></iframe></div></div></div>`
}

