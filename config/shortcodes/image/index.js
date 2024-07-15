const eleventyImagePlugin = require("@11ty/eleventy-img");

const imageShortcode = async (src, alt, sizes)  => {
	let metadata = await eleventyImagePlugin(src, {
		widths: [400, 800, 1280],
		sizes: '100vw',
		formats: ["jpg", "png", "jpeg",  "webp"],
		urlPath: "/assets/images",
		outputDir: "_site/assets/images/",
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

	return eleventyImagePlugin.generateHTML(metadata, imageAttributes);
}


module.exports = {
  imageShortcode,
};
