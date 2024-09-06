const fs = require('fs');

module.exports = {
	layout: "doc",
	tags: ['uk-docs', 'all-docs'],
	eleventyComputed: {
		description: async function (data) {
			if(data.page) {
				const fileContent = await fs.readFileSync(data.page.inputPath, 'utf8');
				if(fileContent.split('---')[2]) {
					return this.trimFirstHundredCharacters(fileContent.split('---')[2])
				} else {
					return this.trimFirstHundredCharacters(fileContent.split('---')[1])
				}
			}
		},
		img: function(data) {
			if(data.page) {
				return './og-images/' + data.page.url.slice(1,-1).toLowerCase().replace(/\//g, '-') + '.png';
			}
		}
	},
	permalink: "uk/docs/{{ page.fileSlug }}/index.html",
}
