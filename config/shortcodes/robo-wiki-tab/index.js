/*
	available args - border
*/

const roboWikiTab = (...args) => {

	const content = args[0];
	const border = args[1] && args[1].border ? true : false;

	return `<div class="robo-wiki-tabs__wrapper ${border ? 'robo-wiki-tabs__wrapper--border' : ''}">${content}</div>`
}

module.exports = roboWikiTab;
