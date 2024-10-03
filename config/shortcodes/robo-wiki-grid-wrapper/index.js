/*
	available args - columns, align, justify, textAlign, flexible
*/
export const roboWikiGridWrapper = (...args) => {
	const content = args[0];
	const columns = args[1] && args[1].columns ? args[1].columns : 4;
	const align =  args[1] && args[1].align ? args[1].align : null;
	const justify =  args[1] && args[1].justify ? args[1].justify : null;
	const textAlign =  args[1] && args[1].textAlign ? args[1].textAlign : 'left';
	const flexible =  args[1] && args[1].flexible ?  args[1].flexible : true;

	return `<div class="robo-wiki-grid-container grid-${columns} grid-align-${align} grid-justify-${justify} grid-text-${textAlign} ${flexible ? 'grid-flexible' : ''}">${content}</div>`
}
