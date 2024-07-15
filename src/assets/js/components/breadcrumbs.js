// same breadcrumbs code as in filters, as eleventy can't process client-side (query params, topic)

document.addEventListener('DOMContentLoaded', function ()  {
	const config = require('../../../_data/sidebar_docs.json');
	const allLocales = ['en', 'ru', 'zh'];
	const breadcrumbsBlock = document?.querySelector('.breadcrumbs');
	const breadcrumbsExists = document?.querySelector('.breadcrumbs__list');

	const breadcrumbs = [];

	// remove all locales from link
	const getCleanPath = (path) => {
		const filteredPath = path.split('/').filter(el => !allLocales.includes(el))
		return filteredPath.join('/')
	}

	const getBreadcrumbs =  (items, path, topic)  => {

		const urlPath =  '/' + getCleanPath(path).split('/')[1] + '/' + getCleanPath(path).split('/')[2] + '/';

		const getParentItem = (root, link, topic) => {
			let node = null;
				let t = null;
				for (let i = 0; i < root.length; i++) {
						node = root[i];
						if ((node.topic && node.topic.replace(/\s+/g, '-').toLowerCase() == topic && node.url + '/' == link) || (node.topic && node.topic.replace(/\s+/g, '-').toLowerCase() == topic && node.url + '/' == link) || node.children && (t = getParentItem(node.children, link, topic))) {
							let tempTopic = node.topic && node.topic.replace(/\s+/g, '-').toLowerCase() === topic ? node.topic : null;
							const link = node.url ? node.url : null;
							const breadcrumb = {
								id: Math.floor(Math.random() * 1000000),
								title: node[`title`],
								link,
								title_en: node[`title`],
							}
							if(breadcrumbs.length && tempTopic) {
								breadcrumb.forEach(it => {
									it.title === tempTopic
									breadcrumbs.unshift(breadcrumb);
									tempTopic = null
								})
							} else {
								breadcrumbs.unshift(breadcrumb);
							}
							return node;
						}

				}
				return null;
		}

		getParentItem(items, urlPath, topic)

		return breadcrumbs
	}

	const getAllParents = (elem) =>  {
		const parents = [];
		while(elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
			elem = elem.parentNode;
			parents.push(elem);
		}
		return parents;
	}

	const removeAllDetails = () => {
		const details = document.querySelectorAll('details');

		details.forEach(det => {
			det.open = false;
		})
	}

	const activateAllDetails = (elements) => {
		removeAllDetails();
		elements.forEach(el => {
			if(el.classList.contains('menu-details')) {
				el.open = true;
			}
		})
	}

	const activateSidebarLink = (topic) => {
		const items = document.querySelectorAll('.menu li');

		items.forEach(item => {
			if(item.dataset.topic && item.dataset.topic.replace(/\s+/g, '-').toLowerCase() === topic.replace(/\s+/g, '-').toLowerCase() && item.dataset.title === breadcrumbs[breadcrumbs.length - 1].title) {
				item.classList.add('with-active-link')
				activateAllDetails(getAllParents(item))
			}
		})
	}

	if(!breadcrumbsExists) {
		const topic = new URL(document.location).searchParams.get("topic");
		if(topic) {
			getBreadcrumbs(config, document.location.pathname, topic.replace(/\s+/g, '-').toLowerCase());
			activateSidebarLink(topic);
			breadcrumbsBlock.innerHTML =
				`<nav  aria-label="breadcrumbs" class="breadcrumbs__list">
				<li class="breadcrumbs__item">
					<a href="https://wiki.robonomics.network" class="breadcrumbs__home-icon">
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						viewBox="0 0 50 44.4" style="enable-background:new 0 0 50 44.4;" xml:space="preserve">
							<g>
								<polygon class="st0" points="25.3,18.8 16.2,33.4 33.8,33.4 	"/>
								<polygon class="st1" points="25.3,3.1 2.8,41.2 47.2,41.2 	"/>
								<circle class="st0" cx="25" cy="3.1" r="3.1"/>
								<g>
									<circle class="st0" cx="46.9" cy="41.2" r="3.1"/>
									<circle class="st0" cx="3.1" cy="41.2" r="3.1"/>
								</g>
							</g>
						</svg>
					</a>
				</li>` +
				`${breadcrumbs.map((breadcrumb, index) => {
					return `<li class="breadcrumbs__item"> ${breadcrumbs[breadcrumbs.length - 1].title !== breadcrumb.title ? '<a href="/summary/' + breadcrumb.title_en.split(" ").join("-").toLowerCase() + '" class="breadcrumbs__link" aria-current=' + (index === breadcrumbs.length-1 ? 'location' : '') + '>' + breadcrumb.title + '</a>' : ''}
					${ breadcrumb.link ? '<a href="' + breadcrumb.link + '" class="breadcrumbs__link active" aria-current="' + (index === breadcrumbs.length-1 ? 'location"' : '')  + '>' + breadcrumb.title + '</a>' : ''}</li>`
				}).join("")}
			</nav>`
		}
	}
})

