// needs changes / updates
import pingIPFS from 'ping-ipfs-gateway';
import gateways from '../../../_data/video_config.js';

document.addEventListener('DOMContentLoaded', async () => {

	const videos = document?.querySelectorAll('.robo-wiki-video--s source');
	const defaultGateways = gateways.gateways;


	if(videos.length) {
		const readyGateway = await pingIPFS(defaultGateways);

		const toggleAutoplay = (video) => {
			video.muted = true;
				let playPromise = video.play();
				if (playPromise && playPromise !== undefined) {
					playPromise.then((_) => {
						let observer = new IntersectionObserver(
							(entries) => {
								entries.forEach((entry) => {
									video.pause();
									if(entry.isIntersecting) {
										if (entry.intersectionRatio !== 1 && !video.paused) {
												video.pause();
										} else  {
											if(video?.paused && 
												video?.currentTime > 0 && !video?.ended) video.play();
										}
									}
								});
							},
							{threshold: 0.8}
						);
						observer.observe(video);
				}).catch(rej => {
					// console.log(rej, ' => ')
				});
			}
		}

		const changeSource = () => {
			videos.forEach((v) => {
				if(readyGateway && !v.getAttribute('data-done')) {
					const src = v.getAttribute('data-source');
					v.src = readyGateway + src + '#t=0.001';
					v.setAttribute('data-done', true);
					v.parentElement.classList.remove('hide');
					v.parentElement.nextSibling.classList.add('hide');
					v.parentElement.load();


					if(v.src.includes(readyGateway)) {
						v.parentElement.play();
						toggleAutoplay(v.parentElement) 
						return;
					}
				} 

			})
		}
		changeSource();
	}

})
