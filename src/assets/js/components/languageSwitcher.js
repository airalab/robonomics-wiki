// language switcher
document.addEventListener('DOMContentLoaded', () => {
		const languageSwitcher = document?.querySelector('.language-switcher');
		const allLanguages = "ar,de,el,en,es,fr,it,ja,ko,pt,ru,uk,zh";

		languageSwitcher.addEventListener('change', (e) => {
			const lang = e.target.value;
			const path = window.location.href;
			let splitPath = path.split('/');
			let newPath = '';

			// splitting paths according to chosen locale
			if(allLanguages.includes(splitPath[3]) && lang !== 'en') {
				splitPath = path.replace(`${splitPath[3]}`, '/').split('/')
				newPath = `/${lang}/` + splitPath.slice(5, splitPath.length - 1).join("/");
			} else if (lang === 'en') {
				splitPath = path.replace(splitPath[3], '/').split('/')
				if(splitPath.slice(4, splitPath.length - 1).length) {
					newPath = splitPath.slice(4, splitPath.length - 1).join("/") + '/';
				} else {
					newPath = '/' + splitPath.slice(4, splitPath.length - 1).join("/");
				}
			} else {
				newPath = `/${lang}/` + splitPath.slice(3, splitPath.length - 1).join("/");
			}

			window.location.href = newPath;
		})

})
