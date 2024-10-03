/*
	available args - src, alt, caption, link, sizes, loading
*/

import path from 'node:path';
import eleventyImagePlugin from "@11ty/eleventy-img";

const getFormat = (src) => {
	const dotIndex = src.lastIndexOf('.');
	const format = src.substring(dotIndex);

	return format
}

export const roboWikiPicture = async (...args) => {
	let link = null;
	let src = args[1].src && args[1].src;
	let caption = args[1].caption ? args[1].caption : '';
	let alt = args[1].alt && args[1].alt ? args[1].alt : '';
	let sizes = args[1].sizes && args[1].sizes ? args[1].sizes : "100vw"
	let loading = args[1].loading && args[1].loading ? args[1].loading  : 'lazy'; // other option is eager

	if(args[1].link) {
		link = args[1].link
	} else {
		if(args[1].zoom) {
			link = args[1].src
		}
	}

	const imagesFormats = getFormat(src) === '.gif' ? ["webp", "png", "jpeg", "gif"] : ["webp", "png", "jpeg"];

	let metadata = await eleventyImagePlugin('./src/assets/images/' + src, {
		widths: [420, 960, 1200],
		sizes: sizes,
		formats: imagesFormats,
		urlPath: "/assets/images/",
		outputDir: "./dist/assets/images/",
		filenameFormat: function (id, src, width, format, options) {
			const extension = path.extname(src);
			const name = path.basename(src, extension);

			return `${name}-${width}w.${format}`;
		},
		sharpOptions: {
			animated: getFormat(src) === '.gif',
		},
		sharpWebpOptions: {
			lossless: true,
			quality: 100
		},
		sharpJpegOptions: {
			quality: 100
		},
		sharpPngOptions: {
			compressionLevel: 8,
		}
	});

	let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

	if (link) {
		return `<figure class="robo-wiki-picture"><a href="${link}" class="robo-wiki-picture__link" target="_blank"><picture>
	${Object.values(metadata)
		.map((imageFormat) => {
			return `<source type="${
				imageFormat[0].sourceType
			}" srcset="${imageFormat
				.map((entry) => entry.srcset)
				.join(", ")}" sizes="${sizes}">`;
		})
		.join("\n")}
		<img
			src="${highsrc.url}"
			alt="${alt}"
			loading="${loading}"
			decoding="async">
	</picture></a>${caption ? '<figcaption class="robo-wiki-picture__text">' + caption + '</figcaption>' : ''}</figure>`
	} else {
		return `<figure class="robo-wiki-picture"><picture>
	${Object.values(metadata)
		.map((imageFormat) => {
			return `<source type="${
				imageFormat[0].sourceType
			}" srcset="${imageFormat
				.map((entry) => entry.srcset)
				.join(", ")}" sizes="${sizes}">`;
		})
		.join("\n")}
		<img
			src="${highsrc.url}"
			alt="${alt}"
			loading="${loading}"
			decoding="async">
	</picture>${caption ? '<figcaption class="robo-wiki-picture__text">' + caption + '</figcaption>' : ''}</figure>`
	}
}
