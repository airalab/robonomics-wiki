import fs from 'node:fs/promises'; // Use promises API for async operations
import matter from 'gray-matter'; // Import gray-matter to parse front matter

export default {
	layout: "doc",
	tags: ['docs'],
	eleventyComputed: {
		description: async function (data) {
			if (data.page && data.page.inputPath) {
				try {
					const fileContent = await fs.readFile(data.page.inputPath, 'utf8');
					
					// Ensure file content is valid and not empty
					if (!fileContent) {
						console.error(`File content is empty: ${data.page.inputPath}`);
						return 'Default description'; // Return fallback description
					}

					const parsedContent = matter(fileContent); // Parse front matter

					// Ensure parsedContent and its content are valid
					if (parsedContent && parsedContent.content) {
						const trimmedContent = this.trimFirstHundredCharacters(parsedContent.content);
						
						// Ensure trimmedContent is valid and not undefined/null
						if (trimmedContent && trimmedContent.length > 0) {
							return trimmedContent;
						} else {
							return 'Default description'; // Fallback description if trimming fails
						}
					} else {
						return 'Default description'; // Fallback if no content is found
					}
				} catch (err) {
					console.error(`Error reading file: ${data.page.inputPath}`, err);
					return 'Default description'; // Return default in case of an error
				}
			} else {
				console.error(`No page data found: ${data.page}`);
				return 'Default description'; // Fallback if no page data
			}
		},
		img: function (data) {
			if (data.page && data.page.url && data.fileSlug !== 'docs.11tydata') {
				return '/assets/images/og-images/' + data.page.url.slice(1, -1).toLowerCase().replace(/\//g, '-') + '.png';
			} else {
				// console.error(`No page URL found: ${data.page}`);
				return '/assets/images/og-images/docs-ptz-camera.png'; // Fallback image
			}
		},
		permalink: function(data) {
			// Only render specific pages (e.g., in the "docs" directory) in production
			if (data.vars.env === 'production') {
				// Example: Only render pages inside the "docs/production-only" directory in production
				return `/zh/docs/${ data.page.fileSlug }/index.html`;
			} else {
				if (data.page && data.page.inputPath.includes('/docs/edit-wiki')) {
					return `/zh/docs/${ data.page.fileSlug }/index.html`;
				} else {
					return false; // Skip rendering these pages in non-production environments
				}
			}
		}
	}
}
