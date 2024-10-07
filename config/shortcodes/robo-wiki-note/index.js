/*
	available args - content, title, type
*/

export const roboWikiNote = (...args) => {
	let content = args[0];
	let title =  args[1].title ? args[1].title : '';
	let type = args[1].type ?  args[1].type : 'note';

	if((title || content) && type !== 'warning') {
		return `
		<div class="robo-wiki-note robo-wiki-note--${type}">${title ? '<div class="robo-wiki-note__title">' + title + '</div>' : ''}<div class="robo-wiki-note__text">${content}</div></div>
		`;
	}

	if((title || content) && type === 'warning') {
		return `
		<div class="robo-wiki-note robo-wiki-note--warning">
			<img class="robo-wiki-note__img" src="/assets/images/disclaimer-guy.png" alt="pic" aria-hidden="true"/><div class="robo-wiki-note__wrapper">${title ? '<div class="robo-wiki-note__title">' + title + '</div>' : ''}<div class="robo-wiki-note__text">${content}</div></div>
		</div>
		`
	}

};
