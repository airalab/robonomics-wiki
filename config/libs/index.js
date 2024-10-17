import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import markdownItFootnote from 'markdown-it-footnote';
import markdownitMark from 'markdown-it-mark';
import markdownitAbbr from 'markdown-it-abbr';
import {slugifyString} from '../filters/index.js';

export const markdownLib = markdownIt({
	html: true,
  breaks: true,
  linkify: true,
  typographer: true
})
	// .disable('code')
  .use(markdownItAnchor, {
    slugify: slugifyString,
    tabIndex: false,
    permalink: markdownItAnchor.permalink.headerLink({
      class: 'heading-anchor',
    })
  })
  .use(markdownItClass, {
    ol: 'list ordered-list',
    ul: 'list simple-list'
  })
  .use(markdownItLinkAttributes, [
    {
      // match external links
      matcher(href) {
        return href.match(/^https?:\/\//);
      },
      attrs: {
        rel: 'noopener',
				target: '_blank'
      }
    }
  ])
  .use(markdownItFootnote)
  .use(markdownitMark)
  .use(markdownitAbbr);

