// needs changes / updates
const pingIPFS = require('ping-ipfs-gateway')
document.addEventListener('DOMContentLoaded', async () => {

	const videos = document?.querySelectorAll('.robo-wiki-video--s source');
	const readyGateway = await pingIPFS();

	const toggleAutoplay = (video) => {
		video.muted = true;
			let playPromise = video.play();
			if (playPromise !== undefined) {
				playPromise.then((_) => {
					let observer = new IntersectionObserver(
						(entries) => {
							entries.forEach((entry) => {
								video.pause();
								if(entry.isIntersecting) {
									if (entry.intersectionRatio !== 1 && !video.paused) {
											video.pause();
									} else  {
											video.play();
									}
								}
							});
						},
						{threshold: 0.8}
					);
					observer.observe(video);
			});
		}
	}

	const changeSource = () => {
		videos.forEach((v) => {
			if(readyGateway && !v.src.includes(readyGateway)) {
				const src = v.src.substring(v.src.lastIndexOf('/') + 1);
				v.src = readyGateway + src;
				v.parentElement.classList.remove('hide');
				v.parentElement.nextSibling.classList.add('hide');
				v.parentElement.load();

				if(v.src.includes(readyGateway)) {
					toggleAutoplay(v.parentElement)
				}
			} 

		})
	}

	changeSource();

})
