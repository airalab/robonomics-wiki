/*
	available arguments - label, link, type='primary', disabled=false, size='medium', additionalText, block=false, extraCls
*/

export const roboWikiButton = (...args) => {

	let content = args[0];
	let label = args[1].label;
	let link = args[1].link;
	let type = args[1].type ? args[1].type : 'primary';
	let disabled = args[1].disabled ? args[1].disabled : false;
	let size = args[1].size ? args[1].size : 'medium';
	let additionalText = args[1].additionalText ? args[1].additionalText : '';
	let block = args[1].block ? args[1].block : false;
	let extraCls = args[1].extraCls ? args[1].extraCls : '';

	if(link) {
		return `
		<a class="button inline-block ${type} button__${size} ${block ? 'button__block' : ''} ${extraCls}" href="${link}">${!label && additionalText != '' ? '<span class="additional-text">' + additionalText + '</span>' : ''} ${label || content}</a>`
	} else {
		return `
		<button type="button" class="button inline-block ${extraCls, type} button__${size} ${block ? 'button__block' : ''}"  :disabled="${disabled}"> ${label || content}</button>`
	}
}
