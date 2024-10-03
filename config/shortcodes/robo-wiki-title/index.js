/*
available args - type, anchor
*/
export const roboWikiTitle = (...args) => {
	const content = args[0];
	const type = args[1].type;
	const anchor = args[1].anchor;
	const id = anchor && anchor.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g, '-').toLowerCase();
	const link = anchor && '#' + anchor.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g, '-').toLowerCase();

	return `<h${type} class="robo-wiki-title heading-anchor" id="${id}">${anchor ? '<a href="' + link + '" aria-hidden="true"></a>' : ""}${content}</h${type}>`
}
