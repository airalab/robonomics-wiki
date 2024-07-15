/*
	available args - src, alt, caption, link, zoom
*/

const checkIfGif = (src) => {
	const dotIndex = src.lastIndexOf('.');
	const format = src.substring(dotIndex);

	if(format === '.gif') {
		return true
	} else {
		return false
	}
}

const roboWikiPicture = (...args) => {
	let link = null;
	let src = args[1].src && args[1].src;
	let caption = args[1].caption ? args[1].caption : '';
	let alt = args[1].alt && args[1].alt ? args[1].alt : 'picture';

	if(args[1].link) {
		link = args[1].link
	} else {
		if(args[1].zoom) {
			link = args[1].src
		}
	}

	if (link) {
		return `<figure class="robo-wiki-picture"><a href="${link}" class="robo-wiki-picture__link" target="_blank"><img src="/assets/images/${src}" alt="${alt}"/></a>${caption ? '<figcaption class="robo-wiki-picture__text">' + caption + '</figcaption>' : ''}</figure>`
	} else {
		return `<figure class="robo-wiki-picture"><img src="/assets/images/${src}" alt="${alt}"/> ${caption ? '<figcaption class="robo-wiki-picture__text">' + caption + '</figcaption>' : ''}</figure>`
	}
}

module.exports = roboWikiPicture;
