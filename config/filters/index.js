const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const slugify = require('slugify');
const {url} = require('../../src/_data/metadata');


// other filters imports
const {
	getCommit,
	getTitleForIssue
} = require('./github');

const allLocales = ["ar","de","el", "en", "es","fr","it","ja","ko","pt","ru","uk","zh"];

const readableDate = (dateObj, format, zone) => {
	return DateTime.fromISO(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
};

const htmlDateString = (dateObj) => {
	return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
}

// Return all the tags used in a collection
const getAllTags = collection => {
	let tagSet = new Set();
	for(let item of collection) {
		(item.data.tags || []).forEach(tag => tagSet.add(tag));
	}
	return Array.from(tagSet);
}

// return docs
const filterTagList = (tags) => {
	return (tags || []).filter(tag => ["all", "docs"].indexOf(tag) === -1);
}

const cssMin = (code) => {
	return new CleanCSS({}).minify(code).styles;
}

const slugifyString = str => {
  return slugify(str, {
    replacement: '-',
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
    lower: true
  });
};

/** Formats the given string as an absolute url. */
const toAbsoluteUrl = link => {
  // Replace trailing slash, e.g., site.com/ => site.com
  const siteUrl = url.replace(/\/$/, '');
  // Replace starting slash, e.g., /path/ => path/
  const relativeUrl = link.replace(/^\//, '');

	return `${siteUrl}/${relativeUrl}`;

};

// remove all locales from link
const getCleanPath = (path) => {
	const filteredPath = path.split('/').filter(el => !allLocales.includes(el))
	return filteredPath.join('/')
}

// flatten array
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

const flattenAll = (array) => {
	let result = [];
		for (const item of array) {
			if (item) {
				result.push(item);
			}
			if (item.children) {
				result = [...result, ...flattenAll(item.children)];
			}
		}
  return result;
}

// string without space
const convertStringWithoutSpaces = (item) => {
	return item.toLowerCase().replace(' ', '-');
}

// for breadcrumbs

// crating array of breadcrumbs for current page
const getBreadcrumbs =  (items, path, topic)  => {

	const breadcrumbs = [];
	let urlPath = '';

	if(path) {
		urlPath =  '/' + getCleanPath(path).split('/')[1] + '/' + getCleanPath(path).split('/')[2];
	} else {
		urlPath = path
	}

	const getParentItem = (root, link, topic) => {
    let node = null;
      let t = null;
      for (let i = 0; i < root.length; i++) {
          node = root[i];
          if (node.url === link && !node.topic || node.url === link + '/' && !node.topic || node.children && (t = getParentItem(node.children, link, topic))) {
            const link = node.url ? node.url : null;
            const breadcrumb = {
              id: Math.floor(Math.random() * 1000000),
              title: node[`title`],
              link,
              title_en: node[`title`],
            }
						breadcrumbs.unshift(breadcrumb);
            return node;
          }

      }
      return null;
	}

	getParentItem(items, urlPath, topic)

	return breadcrumbs
}

const getCleanTitleLinkForBreadcrumbs = (title) => {
	return title.split(" ").join("-").toLowerCase();
}

const getCleanPathForBreadcrumbs = (path) => {
	return getCleanPath(path).slice(0, -1)
}

// end of breadcrumbs

// next, prev page
const getDocIndex = (items, path) => {
	return flatten(items).findIndex(item => {
			return item.url.replace(/\/$/, '') === getCleanPath(path).replace(/\/$/, '')
	})
}

const prevPage = (items, index) => {
	let prevObj = {...flatten(items)[index - 1]}
	if(index > -1 && Object.entries(prevObj).length)  {
		if(prevObj.topic) {
			return {...prevObj, url: prevObj.url + '/?topic=' + prevObj.topic.replace(/\s+/g, '-').toLowerCase()}
		} else {
			return prevObj
		}
	} else {
		return null
	}
}

const nextPage = (items, index) => {
	let nextObj = {...flatten(items)[index + 1]}
	if(index > -1)  {
		if(nextObj.topic) {
			return {...nextObj, url: nextObj.url + '/?topic=' + nextObj.topic.replace(/\s+/g, '-').toLowerCase()}
		} else {
			return nextObj
		}

	}
}

const currentPage = (items, index) => {
	let currObj = {...flatten(items)[index]}
	if(index > -1)  {
		return currObj
	}
}
// end of next, prev page

const transformSummaryLinks = (links) => {
	const newArr = [];
	links.map(l => {
		if(l.children) {
			newArr.push({title: l.title, url: `summary/${l.title.replace(/\s+/g, '-').toLowerCase()}/`})
		} else {
			newArr.push(l)
		}
	})
	return newArr
}

const trimFirstHundredCharacters = (content) => {
	return content.slice(0,100).replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)/, " ").replace(/[/\{L}/]/g, " ").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g,' ').trim() + '...'
}


module.exports = {
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
	trimFirstHundredCharacters,
	getCommit,
	getTitleForIssue
};
