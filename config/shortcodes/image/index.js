const { optimize } = require('svgo');
const fs = require('fs');
const eleventyImagePlugin = require("@11ty/eleventy-img");

const imageShortcode = async (src, alt, sizes)  => {
	let metadata = await eleventyImagePlugin(src, {
		widths: [400, 800, 1280],
		sizes: '100vw',
		formats: ["jpg", "png", "jpeg",  "webp"],
		urlPath: "./src/assets/images/",
		outputDir: "dist/assets/images/",
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

	return eleventyImagePlugin.generateHTML(metadata, imageAttributes);
}

const svgShortcode = (svgName, ariaName = '', className = '', styleName = '') => {
  const svgData = fs.readFileSync(`./src/assets/images/${svgName}.svg`, 'utf8');

  const {data} = optimize(svgData);

  return data.replace(
    /<svg(.*?)>/,
    `<svg$1 ${ariaName ? `aria-label="${ariaName}"` : 'aria-hidden="true"'} ${className ? `class="${className}"` : ''} ${styleName ? `style="${styleName}"` : ''} >`
  );
};


module.exports = {
  imageShortcode,
	svgShortcode
};
