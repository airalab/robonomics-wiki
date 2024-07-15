const { execSync } = require('child_process')
const yaml = require('js-yaml');

// config
const {getDocs,
	getRuDocs,
	getZhDocs,
	allDocs} = require('./config/collections/index.js');
const {
	imageShortcode,
	codeHelper,
	roboWikiNote,
	roboWikiButton,
	roboWikiPicture,
	roboWikiVideo,
	roboWikiYoutube,
	roboWikiTabs,
	roboWikiTab,
	roboWikiTitle,
	roboWikiGridWrapper,
	roboWikiGrid
} = require('./config/shortcodes/index.js');
const {
	readableDate,
	htmlDateString,
	getAllTags,
	filterTagList,
	cssMin,
	slugifyString,
	toAbsoluteUrl,
	getCleanPath,
	flatten,
	flattenAll,
	convertStringWithoutSpaces,
	getBreadcrumbs,
	getCleanTitleLinkForBreadcrumbs,
	getCleanPathForBreadcrumbs,
	getDocIndex,
	prevPage,
	nextPage,
	currentPage,
	currentDoc,
	transformSummaryLinks,
	github_lastupdated,
	github_link,
	getTitleForIssue
} = require('./config/filters/index.js');
const { htmlMinify } = require('./config/transformations/index.js');
const { markdownLib } = require('./config/libs/index.js');


// plugins
const embedYouTube = require("eleventy-plugin-youtube-embed");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"); // code syntax highlighting
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation"); // helps with navigation and pagination as well
const { EleventyHtmlBasePlugin, EleventyI18nPlugin, EleventyRenderPlugin } = require("@11ty/eleventy"); // base plugins + localization
const pluginRss = require("@11ty/eleventy-plugin-rss");
const relativeUrl = require('eleventy-filter-relative-url');
const pluginTOC = require('eleventy-plugin-nesting-toc') // table of content
const pluginWebc = require('@11ty/eleventy-plugin-webc') // table of content


module.exports = function (eleventyConfig) {

	// eleventy copy assets
	eleventyConfig.addPassthroughCopy("_redirects");

  // same path
  ['src/assets/fonts/', 'src/assets/images/',,"_redirects"].forEach(
    path => eleventyConfig.addPassthroughCopy(path)
  );

  // to root
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("src/assets/**/*.{svg,webp,png,jpeg,jpg}");
	eleventyConfig.addWatchTarget('src/_components/**/*.{webc}');

	// plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(pluginBundle);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(embedYouTube);
	eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default" // opt-out of <img/>-style XHTML single tags
    }
  });
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
		filters: {
			// transform a URL with the current page’s locale code
			url: "locale_url",
			// find the other localized content for a specific input file
			links: "locale_links",
		},
		errorMode: "never"
  });
	eleventyConfig.addPlugin(pluginTOC);
	eleventyConfig.addPlugin(pluginWebc, {
    components: ['./src/_components/**/*.webc'],
    useTransform: true
  });

	// assets
	eleventyConfig.addPlugin(require('./config/css-config.js'));
	eleventyConfig.addPlugin(require('./config/js-config.js'));

	// layout aliases
  eleventyConfig.addLayoutAlias('home', 'page-index.njk');
  eleventyConfig.addLayoutAlias('docs', 'page-docs.njk');
	eleventyConfig.addLayoutAlias('doc', 'page-doc.njk');


	// collections
	eleventyConfig.addCollection('docs', getDocs);
	eleventyConfig.addCollection('ruDocs', getRuDocs);
	eleventyConfig.addCollection('zhDocs', getZhDocs);
  eleventyConfig.addCollection('allDocs', allDocs);
	// transformations
	eleventyConfig.addTransform("htmlmin", htmlMinify);

	// Filters
	eleventyConfig.addFilter("readableDate", readableDate);
	eleventyConfig.addFilter('htmlDateString', htmlDateString);
	eleventyConfig.addFilter("getAllTags", getAllTags);
	eleventyConfig.addFilter("filterTagList", filterTagList);
	eleventyConfig.addFilter("cssmin", cssMin);
	eleventyConfig.addFilter('url', relativeUrl);
	eleventyConfig.addFilter('slugify', slugifyString);
	eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
	eleventyConfig.addFilter('getCleanPath', getCleanPath);
	eleventyConfig.addFilter('flatten', flatten);
	eleventyConfig.addFilter('flattenAll', flattenAll);
	eleventyConfig.addFilter('convertStringWithoutSpaces', convertStringWithoutSpaces);
	eleventyConfig.addFilter('getBreadcrumbs', getBreadcrumbs);
	eleventyConfig.addFilter('getCleanTitleBC', getCleanTitleLinkForBreadcrumbs);
	eleventyConfig.addFilter('getCleanPathBC', getCleanPathForBreadcrumbs);
	eleventyConfig.addFilter('getDocIndex', getDocIndex);
	eleventyConfig.addFilter('prevPage', prevPage);
	eleventyConfig.addFilter('nextPage', nextPage);
	eleventyConfig.addFilter('currentPage', currentPage);
	eleventyConfig.addFilter('transformSummaryLinks', 	transformSummaryLinks);
	// filters for github data
	eleventyConfig.addFilter('currentDoc', currentDoc);
	eleventyConfig.addFilter('githubLastUpdatedDoc', github_lastupdated);
	eleventyConfig.addFilter('githubLink', github_link);
	eleventyConfig.addFilter('getTitleForIssue', getTitleForIssue);

	// Customize Markdown library settings:
	eleventyConfig.setLibrary('md', markdownLib);

	// shortcodes
	eleventyConfig.addShortcode("image", imageShortcode);
	eleventyConfig.addPairedShortcode('codeHelper', codeHelper);
	eleventyConfig.addPairedShortcode('roboWikiNote', roboWikiNote);
	eleventyConfig.addPairedShortcode('roboWikiButton', roboWikiButton);
	eleventyConfig.addPairedShortcode('roboWikiPicture', roboWikiPicture);
	eleventyConfig.addPairedShortcode('roboWikiVideo', roboWikiVideo);
	eleventyConfig.addPairedShortcode('roboWikiYoutube', roboWikiYoutube);
	eleventyConfig.addPairedShortcode('roboWikiTabs', roboWikiTabs);
	eleventyConfig.addPairedShortcode('roboWikiTab', roboWikiTab);
	eleventyConfig.addPairedShortcode('roboWikiTitle', roboWikiTitle);
	eleventyConfig.addPairedShortcode('roboWikiGridWrapper', roboWikiGridWrapper);
	eleventyConfig.addPairedShortcode('roboWikiGrid', roboWikiGrid);


	// Add support for YAML data files with .yaml extension
	eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));


  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --site dist --glob \"**/*.html\"`, { encoding: 'utf-8' })
  })

	return {
		addPassthroughFileCopy: true,
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md"],
		dir: {
			input: "src",
			output: "dist",
			includes: "_includes",
			layouts: "_layouts",
		},
		pathPrefix: "/",
	}

}
