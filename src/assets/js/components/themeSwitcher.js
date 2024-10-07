const calculateSettingAsThemeString = () => {
	if (localStorage.getItem('theme') !== null) {
		return localStorage.getItem('theme')
	}

	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}

	return "light";
}

let currentThemeSetting = calculateSettingAsThemeString();


const toggleTheme = (theme) => {
	document?.querySelector('html').setAttribute('data-theme', theme)
}


document?.querySelector(".toggle-theme") && document.querySelector(".toggle-theme").addEventListener("click", () => {
		const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
		if(newTheme === 'light') {
			document.querySelector('.dark-theme-icon').classList.add('hide')
			document.querySelector('.light-theme-icon').classList.remove('hide')
		} else {
			document.querySelector('.dark-theme-icon').classList.remove('hide')
			document.querySelector('.light-theme-icon').classList.add('hide')
		}
		localStorage.setItem("theme", newTheme);
		toggleTheme(newTheme);
		currentThemeSetting = newTheme;
	});


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
	if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
		localStorage.setItem("theme", 'dark');
		toggleTheme('dark');
	} else {
		localStorage.setItem("theme", 'light');
		toggleTheme('light');
	}})


