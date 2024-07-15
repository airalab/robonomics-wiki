const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssMediaMinmax = require('postcss-media-minmax');
const autoprefixer = require('autoprefixer');
const postcssCsso = require('postcss-csso');

module.exports = eleventyConfig => {
	eleventyConfig.addTemplateFormats('css');

	eleventyConfig.addExtension('css', {
		outputFileExtension: 'css',
		compile: async (content, path) => {
			if (path !== './src/assets/css/main.css') {
				return;
			}

			return async () => {
				let output = await postcss([
					postcssImport,
					postcssMediaMinmax,
					autoprefixer,
					postcssCsso,
				]).process(content, {
					from: path,
				});

				return output.css;
			}
		}
	});
}

