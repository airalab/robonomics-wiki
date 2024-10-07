// tabs
document.addEventListener('DOMContentLoaded', () => {
	const tabs = document?.querySelectorAll('.robo-wiki-tabs');
	const tabsButtons = document?.querySelectorAll('.robo-wiki-tabs__item');
	const tabItem = document?.querySelectorAll('.robo-wiki-tabs__wrapper');

	if(tabs.length) {

		const tabIndex = () => {
			tabItem.forEach((tab, index) => {
				tabsButtons[index].setAttribute('data-tab', index)
				tab.setAttribute('data-target', index)
			})
		}

		const activateFirstTab = () => {
			document?.querySelectorAll('[data-defaulttab]').forEach(t => {
				document?.querySelector(`[data-target="${t.dataset.tab}"]`).classList.add("robo-wiki-tabs__wrapper--active");
				document?.querySelector(`[data-tab="${t.dataset.tab}"]`).classList.add("robo-wiki-tabs__item--active");
			})
		}

		tabIndex();
		activateFirstTab();

		const tabsManager = (index) => {

			tabsButtons.forEach((el) => {
				console.log(el)
				el.classList.remove("robo-wiki-tabs__item--active");
				document?.querySelector(`[data-tab="${index}"]`).classList.add("robo-wiki-tabs__item--active");
			});

			tabItem.forEach((el) => {
				el.classList.remove("robo-wiki-tabs__item--active");
				el.classList.remove("robo-wiki-tabs__wrapper--active");

				const defaultTab = document?.querySelector(`[data-target="${index}"]`);
				if (defaultTab) {
					document?.querySelector(`[data-target="${index}"]`).classList.add("robo-wiki-tabs__wrapper--active");
				} else {
					document?.querySelector("[data-target='0']").classList.add("active");
				}
			});
		};

		tabs.forEach(t => {
			t.addEventListener('click', (e) => {
				if (e.target.classList.contains("robo-wiki-tabs__item")) {
					const tabsPath = e.target.dataset.tab;
					tabsManager(tabsPath);
				}
			})
		})
	}
})
