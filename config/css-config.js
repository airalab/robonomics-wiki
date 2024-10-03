import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssMediaMinmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import postcssCsso from 'postcss-csso';

export const cssConfig = eleventyConfig => {
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

