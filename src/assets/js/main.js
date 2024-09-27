document.addEventListener('DOMContentLoaded', () => {
	const allPopovers = document?.querySelectorAll("[popover]");
  const mobileSidebarDocs = document?.querySelector(".header-nav__sidebar-docs");
	const sidebarDocs = document?.querySelector('#sidebarDocs');
  const mobileSidebarContent = document?.querySelector('.header-nav__sidebar-content');
	const sidebarContent = document?.querySelector('#sidebarContent');

	const checkPopover = (popover, btn) => {
		if(popover && popover.matches(":popover-open")) {
			btn.classList.remove('open')
		} else {
			btn.classList.add('open')
		}
	};

  mobileSidebarDocs?.addEventListener("click", (e) => {
		mobileSidebarContent?.classList.remove('open')
		checkPopover(sidebarDocs, e.target)
  })

	mobileSidebarContent?.addEventListener("click", (e) => {
		mobileSidebarDocs.classList.remove('open')
		checkPopover(sidebarContent, e.target)
  })

	document.addEventListener('click', (e) => {
		allPopovers.forEach(popover => {
			if (popover && !popover.matches(":popover-open") && e.target !== mobileSidebarContent && !popover.matches(":popover-open") && e.target !== mobileSidebarDocs) {
				if(mobileSidebarContent && mobileSidebarContent.classList.contains('open')) {
					mobileSidebarContent.classList.remove('open')
				}

				if(mobileSidebarDocs && mobileSidebarDocs.classList.contains('open')) {
					mobileSidebarDocs.classList.remove('open')
				}
			}
		})
	})


	// for code helper component
	const copyBtns = document?.querySelectorAll('.copy-btn');

	const copyCode = async (e) => {
		let code = e.parentElement.parentElement.parentElement;

		if(code !== document.querySelector('.code-helper')) {
			code = e.parentElement.parentElement;
		}

		const text = code.innerText

		if(!code.querySelector('small')) {
			try {
				await navigator.clipboard.writeText(text);
					e.insertAdjacentHTML(
					'afterend',
					'<small>copied!</small>'
				);
	
				e.disabled = true
				setTimeout(() => {
					code.querySelector('small').remove()
					e.disabled = false;
					}, 3000)
				} catch($e) {
					code.querySelector('small').remove()
					e.disabled = false;
				}
			}
		}

		copyBtns.forEach(btn => {
			btn.addEventListener('click', (e) => {
				if(e.target.classList.contains('copy-btn')) {
					copyCode(e.target)
				} else {
					if(e.target.tagName.toLowerCase() === 'path') {
					} else {
						copyCode(e.target.parentElement)
					}
				}
			})
		})


		// custom scroll
		const activateScrollbar = () =>{
      const el = document?.querySelector('.custom-scroll');
      const currentScrollPosition = el.scrollTop
			let currentPosition = 0;

      el.classList.add('active')

      currentPosition = currentScrollPosition

      setTimeout(() => {
        if(currentPosition === currentScrollPosition) {
          el.classList.remove('active')
        }
      }, 300)
    }


    document?.querySelectorAll('.all-content ').forEach(item => {
      item.addEventListener('scroll', activateScrollbar)
    })

})
