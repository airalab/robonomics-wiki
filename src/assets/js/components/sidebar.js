// sidebar code
window.addEventListener("load", () => {
	const toc = document.querySelector('.toc');

	let manualHush = null;
	let currentPosition = null;


	// another option
	const activateLinkOnScroll = () => {
		const allHeads = document.querySelector('.docs-content').querySelectorAll('h2, h3, h4, h5');

		allHeads.forEach(ha => {
			const rect = ha.getBoundingClientRect();

			if(rect.top > 0 && rect.top < 150) {
				const location = window.location.toString().split('#')[0];
				if(ha.getAttribute('id') === null) {
					return
				} else {
					removeAllVisible();
					history.replaceState(null, null, location + '#' + ha.getAttribute('id'));
					manualHush = `#${ha.getAttribute('id')}`;
					toc.querySelector(`a[href="#${ha.getAttribute('id')}"]`).classList.add('visible')
				}
			}
		});
	}

	const removeAllVisible = () => {
		toc?.querySelectorAll('a').forEach(el => {
			el.classList.remove('visible')
		})
	}

	const scrollToElement = () => {

		if (window.location.hash == '') {
			return false;
		}

		const hash = decodeURIComponent(window.location.hash.substring(1));
		const el = document.querySelector(`[id='${hash}']`) || manualHush && document.querySelector(`[id='${hush}']`);


		if (el !== null ) {

			const top = el.offsetTop;
			window.document.querySelector('.all-content').scrollTo(0, top);

			manualHush = `#${el.getAttribute('id')}`;

		}
	};

	const activateScrollbar = () => {
		const el = document.querySelector('.custom-scroll ');
		const currentScrollPosition = el.scrollTop

		el.classList.add('active')

		currentPosition = currentScrollPosition


		setTimeout(() => {
			if(currentPosition === currentScrollPosition) {
				el.classList.remove('active')
			}
		}, 150)

		activateLinkOnScroll()
	};


	document.querySelectorAll('.all-content ').forEach(item => {
		item.addEventListener('scroll', activateScrollbar)
	})
	manualHush = window.location.hash;
	scrollToElement()

 });

