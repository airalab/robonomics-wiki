/*
	available arguments - additionalLine, copy
*/

export const codeHelper = (...args) => {
	let content = args[0];
	let additionalLine = args.length > 1 && args[1].additionalLine ? args[1].additionalLine : null;
	let copy = args[1] && args[1].copy ? args[1].copy : false;

	return `<div class="code-helper ${!additionalLine ? 'code-helper--only-copy' : ''}"><div class="code__additionalLine ${!additionalLine ? 'code__additionalLine--nobg' : ''}">${additionalLine ? '<span>' + additionalLine + '</span>' : ''} ${copy ? '<button class="copy-btn"><svg xmlns="http://www.w3.org/2000/svg" width="18.207" height="18.207" viewBox="0 0 18.207 18.207"><path id="copy-regular" d="M17.863,2.512,15.685.334A1.135,1.135,0,0,0,14.879,0H9.062A2.276,2.276,0,0,0,6.786,2.276v9.1a2.323,2.323,0,0,0,2.307,2.276h6.828A2.283,2.283,0,0,0,18.2,11.379V3.316A1.139,1.139,0,0,0,17.863,2.512ZM16.49,11.379a.569.569,0,0,1-.569.569H9.062a.569.569,0,0,1-.569-.569V2.28a.569.569,0,0,1,.569-.569h4.552l.032,1.7a1.138,1.138,0,0,0,1.138,1.138h1.675v6.828ZM9.663,15.931a.569.569,0,0,1-.569.569H2.234a.569.569,0,0,1-.569-.569l.031-9.1a.569.569,0,0,1,.569-.569H5.68V4.552H2.266A2.276,2.276,0,0,0-.01,6.828v9.1a2.277,2.277,0,0,0,2.276,2.276H9.094a2.283,2.283,0,0,0,2.276-2.276V14.793H9.695Z" transform="translate(0.01)" fill="#fff" opacity="0.5"/></svg> </button>' : ''}</div><div class="code-helper__content">${content}</div></div>`
}

