// needs changes / updates

document.addEventListener('DOMContentLoaded', async () => {
	const config = require('../../../_data/video_config');

	const videos = document?.querySelectorAll('.robo-wiki-video--s source');
	const videoLinks = [];
	const readyLinks = [];
	const readyLinksWithoutGateway = [];

	async function fetchWithTimeout(resource, options = {}) {
		const { timeout = 10000 } = options;

		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);

		const response = await fetch(resource, {
			...options,
			signal: controller.signal
		});
		clearTimeout(id);

		return response;
	}

	const convertVideoLinks = () => {
		videos.forEach(vid => {
			config.gateways.map(v => {
				videoLinks.push(v + vid.src.substring(vid.src.lastIndexOf('/') + 1))
			})
		})
	};

	const  checkVideos = async () => {
		for (let i = 0; i < videoLinks.length; i++) {
			if (readyLinks.length !== videos.length) {
				try {
					console.log('here =>', videoLinks[i])
					let res = await fetchWithTimeout(videoLinks[i], {
						timeout: 5000
					});
					if(res.ok) {
						const url = res.url;
						if(!readyLinks.length || url.substring(url.lastIndexOf('/') + 1) !== readyLinks[readyLinks.length - 1].substring(readyLinks[readyLinks.length - 1].lastIndexOf('/') + 1)) {
							readyLinks.push(url);
						}
					}
				} catch (err) {
					console.log(err, ' => video error');
				}
			}
		}
	};

	const checkReadyLinks = () => {
		readyLinks.filter(l => {
			readyLinksWithoutGateway.push(l.substring(l.lastIndexOf('/') + 1) + '#t=0.001')
		})

		videos.forEach((v, index) => {
			if(!readyLinksWithoutGateway.includes(v.src.substring(v.src.lastIndexOf('/') + 1))) {
				readyLinks.splice(index, 0, 'https://ipfs.living/ipfs/' + v.src.substring(v.src.lastIndexOf('/') + 1).replace('#t=0.001', ''))
			}
		})
	}

	const changeSource = () => {
		videos.forEach((v, index) => {
			if(v.src.substring(v.src.lastIndexOf('/') + 1) === readyLinks[index].substring(readyLinks[index].lastIndexOf('/') + 1) + '#t=0.001' ) {
				v.src = readyLinks[index] +'#t=0.001';
				v.parentElement.classList.remove('hide');
				v.parentElement.nextSibling.classList.add('hide');
				v.parentElement.load();
			}
		})
	}

	convertVideoLinks();
	await checkVideos();
	checkReadyLinks()
	changeSource();

})
