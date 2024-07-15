// same prev/next doc buttons code as in filters, as eleventy can't process client-side (query params, topic that is needed here)

document.addEventListener('DOMContentLoaded', function ()  {
	const config = require('../../../_data/sidebar_docs.json');

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
				return  item.topic.replace(/\s+/g, '-').toLowerCase() === topic.replace(/\s+/g, '-').toLowerCase() && item.url + '/' === document.location.pathname;
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

	if(!navigationBlock.childElementCount) {
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

				const prevLink = prev.topic ? prev.url + '/?topic=' + prev.topic.replace(/\s+/g, '-').toLowerCase() : prev.url;
				const nextLink = next.topic ? next.url + '/?topic=' + next.topic.replace(/\s+/g, '-').toLowerCase() : next.url;

				navigationBlock.innerHTML =  `<a href="${prevLink}" class="button inline-block secondary button__medium"><span class="additional-text">previous</span> ← ${prev.title}</a><a href="${nextLink}" class="button inline-block secondary button__medium"><span class="additional-text">next</span> ${next.title} →</a>`
			}
	}

})
