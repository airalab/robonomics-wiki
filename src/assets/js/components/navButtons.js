// same prev/next doc buttons code as in filters, as eleventy can't process client-side (query params, topic that is needed here)

import {translateLine} from '../customLineTranslation.js';

document.addEventListener('DOMContentLoaded', function ()  {
	const config = require('../../../_data/sidebar_docs.json');
	const language = document.getElementsByTagName("html")[0].getAttribute("lang");
	const allLocales = ["ar","de","el", "en", "es","fr","it","ja","ko","pt","ru","uk","zh"];


	// remove all locales from link
	const getCleanPath = (path) => {
		const filteredPath = path.split('/').filter(el => !allLocales.includes(el))
		return filteredPath.join('/')
	}

	const navigationBlock = document?.querySelector('.page-content__navigation-btns');

	const flatten = (array) => {
		let result = [];
			for (const item of array) {
				if (item.url) {
					result.push(item);
				}
				if (item.children) {
					result = [...result, ...flatten(item.children)];
				}
			}
		return result;
	}

	const getDocIndex = (items, topic) => {
		return items.findIndex(item => {
			if(item.topic) {
				return  item.topic.replace(/\s+/g, '-').toLowerCase() === topic.replace(/\s+/g, '-').toLowerCase() && item.url + '/' === getCleanPath(document.location.pathname);
			}

		})
	}

	const prevPage = (items, index) => {
		let prevObj = {...flatten(items)[index - 1]}
		if(index > -1 && Object.entries(prevObj).length)  {
			return prevObj
		}
	}

	const nextPage = (items, index) => {
		let nextObj = {...flatten(items)[index + 1]}
		if(index > -1)  {
			return nextObj
		}
	}

	const currentPage = (items, index) => {
		let currObj = {...flatten(items)[index]}
		if(index > -1)  {
			return currObj
		}
	}

	if(navigationBlock && !navigationBlock.childElementCount) {
			const topic = new URL(document.location).searchParams.get("topic");

			if(topic) {

				const index = getDocIndex(flatten(config), topic);
				const curr = currentPage(config, index)

				let prev = prevPage(flatten(config), index)
				let next = nextPage(flatten(config),index)

				if(curr.next) {
					next = curr.next[0]
				}

				if(curr.prev) {
					prev = curr.prev[0]
				}

				const translatedNext = translateLine(next.title, language);
				const translatedPrev = translateLine(prev.title, language);

				const prevLink = prev.topic ? prev.url + '/?topic=' + prev.topic.replace(/\s+/g, '-').toLowerCase() : prev.url;
				const nextLink = next.topic ? next.url + '/?topic=' + next.topic.replace(/\s+/g, '-').toLowerCase() : next.url;

				navigationBlock.innerHTML =  `<a href="${language !== 'en' ? "/" + language + prevLink : prevLink}" class="button inline-block secondary button__medium custom"><span class="additional-text">${translateLine('previous', language)}</span> ← ${translatedPrev ? translatedPrev : prev.title}</a><a href="${language !== 'en' ? "/" + language + nextLink : nextLink}" class="button inline-block secondary button__medium custom"><span class="additional-text">${translateLine('next', language)}</span> ${translatedNext ? translatedNext : next.title} →</a>`
			}

	}

})
