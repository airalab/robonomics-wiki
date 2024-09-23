const esbuild = require('esbuild');

module.exports = eleventyConfig => {
	eleventyConfig.addTemplateFormats('js');

	const envPlugin = {
		name: 'env',
		setup(build) {
			// Intercept import paths called "env" so esbuild doesn't attempt
			// to map them to a file system location. Tag them with the "env-ns"
			// namespace to reserve them for this plugin.
			build.onResolve({ filter: /^env$/ }, args => ({
				path: args.path,
				namespace: 'env-ns',
			}))
	
			// Load paths tagged with the "env-ns" namespace and behave as if
			// they point to a JSON file containing the environment variables.
			build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
				contents: JSON.stringify(process.env),
				loader: 'json',
			}))
		},
	}


	eleventyConfig.addExtension('js', {
		outputFileExtension: 'js',
		compile: async (content, path) => {
			if (path !== './src/assets/js/index.js') {
				return;
			}

			return async () => {
				let output = await esbuild.build({
					target: 'es2020',
					entryPoints: [path],
					minify: true,
					bundle: true,
					write: false,
					plugins: [envPlugin]
				});

				return output.outputFiles[0].text;
			}
		}
	});
}


