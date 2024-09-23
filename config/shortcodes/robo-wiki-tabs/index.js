/*
	available arguments - mode, tabs
*/

const roboWikiTabs = (...args) => {
	let content = args[0];
	let mode = args[1].mode ? args[1].mode : 'horizontal';
	let tabs = args[1].tabs ? args[1].tabs : [];

	return `<div class="robo-wiki-tabs robo-wiki-tabs--${mode}"><ul class="robo-wiki-tabs__list">${tabs.map((tab, index) => `<li class="robo-wiki-tabs__item" ${index === 0 ? 'data-defaultTab="true"' : ''}>${tab.title}</li>`).join("")}</ul>${content}</div>`
}


module.exports = roboWikiTabs;
