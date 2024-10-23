import {execSync} from 'child_process';
import fs from 'node:fs';
import yaml from 'js-yaml';
import dotenv from 'dotenv';
dotenv.config();

const NOT_FOUND_PATH = "dist/404.html";

// all translation files
const en = JSON.parse(fs.readFileSync('./translations/pages/en.json'))
const ar = JSON.parse(fs.readFileSync('./translations/pages/ar/ar.json'))
const de = JSON.parse(fs.readFileSync('./translations/pages/de/de.json'))
const el = JSON.parse(fs.readFileSync('./translations/pages/el/el.json'))
const es = JSON.parse(fs.readFileSync('./translations/pages/es/es.json'))
const fr = JSON.parse(fs.readFileSync('./translations/pages/fr/fr.json'))
const it = JSON.parse(fs.readFileSync('./translations/pages/it/it.json'))
const ja = JSON.parse(fs.readFileSync('./translations/pages/ja/ja.json'))
const ko = JSON.parse(fs.readFileSync('./translations/pages/ko/ko.json'))
const pt = JSON.parse(fs.readFileSync('./translations/pages/pt/pt.json'))
const ru = JSON.parse(fs.readFileSync('./translations/pages/ru/ru.json'))
const uk = JSON.parse(fs.readFileSync('./translations/pages/uk/uk.json'))
const zh = JSON.parse(fs.readFileSync('./translations/pages/zh/zh.json'))

// config
import { 
	getDocs,
	allDocs 
} from './config/collections/index.js';

// shprtcodes
import {svgShortcode} from './config/shortcodes/image/index.js';
import {codeHelper} from './config/shortcodes/code-helper/index.js';
import {roboWikiNote} from './config/shortcodes/robo-wiki-note/index.js';
import {roboWikiButton} from './config/shortcodes/robo-wiki-button/index.js';
import {roboWikiPicture} from './config/shortcodes/robo-wiki-picture/index.js';
import {roboWikiVideo} from './config/shortcodes/robo-wiki-video/index.js';
import {roboWikiYoutube} from './config/shortcodes/robo-wiki-youtube/index.js';
import {roboWikiTabs} from './config/shortcodes/robo-wiki-tabs/index.js';
import {roboWikiTab} from './config/shortcodes/robo-wiki-tab/index.js';
import {roboWikiTitle} from './config/shortcodes/robo-wiki-title/index.js';
import {roboWikiGridWrapper} from './config/shortcodes/robo-wiki-grid-wrapper/index.js';
import {roboWikiGrid} from './config/shortcodes/robo-wiki-grid/index.js';

import {getOGImage} from './config/shortcodes/og-image/index.js';

import {
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
	transformSummaryLinks,
	trimFirstHundredCharacters
} from './config/filters/index.js';


import {	
	getCommit,
	getTitleForIssue
} from './config/filters/github/index.js';


import { htmlMinify } from './config/transformations/index.js';
import { markdownLib } from './config/libs/index.js';

import {cssConfig} from './config/css-config.js'
import {jsConfig} from './config/js-config.js'


// plugins
import embedYouTube from "eleventy-plugin-youtube-embed";
import  pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"; // code syntax highlighting
import  pluginBundle from  "@11ty/eleventy-plugin-bundle";
import pluginNavigation from "@11ty/eleventy-navigation"; // helps with navigation and pagination as well
import { EleventyHtmlBasePlugin, EleventyI18nPlugin, EleventyRenderPlugin } from "@11ty/eleventy"; // base plugins + localization
import pluginRss from "@11ty/eleventy-plugin-rss";
import i18n from 'eleventy-i18n'; // for translations
import pluginTOC from 'eleventy-plugin-nesting-toc'; // table of content
import pluginWebc from '@11ty/eleventy-plugin-webc'; // for webc
import metagen from 'eleventy-plugin-metagen'; // for pages metadata

export default async function(eleventyConfig) {

	// to get 404 page
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, bs) {
				bs.addMiddleware("*", (req, res) => {
					if (!fs.existsSync(NOT_FOUND_PATH)) {
						throw new Error(
							`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`
						);
					}

					const content_404 = fs.readFileSync(NOT_FOUND_PATH);
					// Add 404 http status code in request header.
					res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				});
			},
		},
		files: './_dist',
		rewriteRules: [
			{
				match: /\/$/,
				fn: function(req, res, match) {
					if (req.url.endsWith('/')) {
						req.url = req.url.slice(0, -1); // Remove trailing slash
					}
					return req.url;
				}
			}
		]
	});

	// eleventy copy assets
	eleventyConfig.addPassthroughCopy("_redirects");

  // same path
  ['src/assets/fonts/', 'src/assets/images/', 'src/assets/og/', 'src/assets/images/og/'].forEach(
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
	eleventyConfig.addPlugin(i18n, {
    translations: {
			en, ar, de, el, es, fr, it, ja, ko, pt, ru, uk, zh 
    },
		fallbackLanguageTag: 'en',
  });
	eleventyConfig.addPlugin(pluginTOC);
	eleventyConfig.addPlugin(pluginWebc, {
    components: ['./src/_components/**/*.webc'],
    useTransform: true
  });
	eleventyConfig.addPlugin(metagen);

	// assets
	eleventyConfig.addPlugin(cssConfig);
	eleventyConfig.addPlugin(jsConfig);

	// layout aliases
  eleventyConfig.addLayoutAlias('home', 'page-index.njk');
  eleventyConfig.addLayoutAlias('docs', 'page-docs.njk');
	eleventyConfig.addLayoutAlias('doc', 'page-doc.njk');


	// collections
	eleventyConfig.addCollection('docs', getDocs);
  eleventyConfig.addCollection('allDocs', allDocs);
	// transformations
	eleventyConfig.addTransform("htmlmin", htmlMinify);

	// Filters
	eleventyConfig.addFilter("readableDate", readableDate);
	eleventyConfig.addFilter('htmlDateString', htmlDateString);
	eleventyConfig.addFilter("getAllTags", getAllTags);
	eleventyConfig.addFilter("filterTagList", filterTagList);
	eleventyConfig.addFilter("cssmin", cssMin);
	// eleventyConfig.addFilter('url', relativeUrl);
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
	eleventyConfig.addFilter('trimFirstHundredCharacters', 	trimFirstHundredCharacters);
	// filters for github data
	eleventyConfig.addFilter('getTitleForIssue', getTitleForIssue);
	eleventyConfig.addFilter('getCommit', getCommit);

	// Customize Markdown library settings:
	eleventyConfig.setLibrary('md', markdownLib);

	// shortcodes
	eleventyConfig.addShortcode("svg", svgShortcode);
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
	eleventyConfig.addPairedShortcode('getOGImage', getOGImage);


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
