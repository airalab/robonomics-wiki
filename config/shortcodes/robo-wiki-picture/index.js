/*
	available args - src, alt, caption, link, sizes, loading
*/

export const roboWikiPicture = async (...args) => {
	let link = null;
	let src = args[1].src && args[1].src;
	let caption = args[1].caption ? args[1].caption : '';
	let alt = args[1].alt && args[1].alt ? args[1].alt : '';
	let loading = args[1].loading && args[1].loading ? args[1].loading  : 'lazy'; // other option is eager

	if(args[1].link) {
		link = 'https://wiki.robonomics.network/assets/images/' + args[1].link
	} else {
		if(args[1].zoom) {
			link = 'https://wiki.robonomics.network/assets/images/' + args[1].src
		}
	}

	if (link) {
		return `<figure class="robo-wiki-picture"><a href="${link}" class="robo-wiki-picture__link" target="_blank"><picture>
		<img
			src="/assets/images/${src}"
			alt="${alt}"
			loading="${loading}"
			decoding="async">
	</picture></a>${caption ? '<figcaption class="robo-wiki-picture__text">' + caption + '</figcaption>' : ''}</figure>`
	} else {
		return `<figure class="robo-wiki-picture"><picture>
		<img
			src="/assets/images/${src}"
			alt="${alt}"
			loading="${loading}"
			decoding="async">
	</picture>${caption ? '<figcaption class="robo-wiki-picture__text">' + caption + '</figcaption>' : ''}</figure>`
	}
}
