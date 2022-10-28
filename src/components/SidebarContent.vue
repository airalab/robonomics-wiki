<template>
<!-- 
	<ul v-if="subtitles.length" class="menu">
		<li :class="'menu__item-depth-' + subtitle.depth" v-for="subtitle in subtitles" :key="subtitle.value">
			<a class="menu__item menu-link" :href="subtitle.anchor">
				{{ subtitle.value }}
			</a>
		</li>
	</ul> -->

	<!-- <details v-if="subtitles.length > 0 && subtitles[0].depth !== 4" open>
		<summary>{{$st('In this article', $store.state.locale)}}</summary> -->

		<ul v-if="allSubtitles.length" class="menu">
	      <li @click="(e) => deactivateButtons(e, subtitle)" :class="'menu__item-depth-' + subtitle.depth" v-for="subtitle in allSubtitles" :key="subtitle.id">
	        <a 
						:class="['menu__item', ' menu-link', {active: manualHush === subtitle.anchor }]" 
						:href="subtitle.anchor"
					>
	          {{ subtitle.value }}
	        </a>
	      </li>
		</ul>
	<!-- </details> -->
</template>

<script>
	export default {

		data() {
			return {
				manualHush: null,
				allSubtitles: [],
			}
		},

		watch: {
			'$route.hash': function(curr, old) {
				setTimeout(() => {
					this.scrollToElement();
				}, 200);
			},
			
			'$route.path': function(curr, old) {
				setTimeout(() => {
					if(this.allSubtitles.length) {
						this.getSubtitlesWithCustom()
					}
				}, 300);
			},

		},

		computed: {
			// subtitles without custom component
			subtitles() {
				// Remove h1, h5, h6 titles
				let subtitles = this.$page.doc.subtitles.filter(function(value, index, arr){
				return [2,3,4].includes(value.depth)
			})
			return subtitles
	    },

			locale() {
				return this.$store.state.locale
			},
	  },

		methods: {
			activateLinkOnScroll() {
	 			const allHeads = document.querySelector('.docs-content').querySelectorAll('h2, h3, h4, h5');

					allHeads.forEach(ha => {
						const rect = ha.getBoundingClientRect();

						if(rect.top > 0 && rect.top < 150) {
							const location = window.location.toString().split('#')[0];
							if(ha.getAttribute('id') === null) {
								return
							} else {
								history.replaceState(null, null, location + '#' + ha.getAttribute('id'));
								this.manualHush = `#${ha.getAttribute('id')}`;
							}
						}

					});
			},

			scrollToElement() {
				
				if (this.$route.hash == '') {
					return false;
				}

				const hash = decodeURIComponent(this.$route.hash.substring(1));


				const el = document.querySelector(`[id='${hash}']`) || this.manualHush && document.querySelector(`[id='${hush}']`);


				if (el !== null ) {

					const top = el.offsetTop;
					window.document.querySelector('.all-content').scrollTo(0, top);;

					this.manualHush = `#${el.getAttribute('id')}`;
				}
			},

			// subtitles with custom component
			getSubtitlesWithCustom() {

				if (!document) {
					return
				}

				setTimeout(() => {
					if (document.querySelector('.docs-content')) {
						const allHeads = document.querySelector('.docs-content').querySelectorAll('h2, h3, h4, h5');

						if(this.allSubtitles.length) {
							this.allSubtitles = [];
						}

						allHeads.forEach(title => {
							const titleObj = {
								id: Date.now() + Math.floor(Math.random() * 100000),
								anchor: '#' + title.getAttribute('id'),
								depth: +title.tagName.match(/\d+/)[0],
								value: title.textContent.substring(1)
							}
							
							this.allSubtitles.push(titleObj);

						})

						if(this.allSubtitles.length === 0) {
							this.allSubtitles.push('');
						}
					}
				}, 150);
				
			},

			deactivateButtons(e, subtitle) {

				this.manualHush = subtitle.anchor

				document.body.removeEventListener('touchmove', this.preventDefault);

				if(document.querySelector('.sectionToggler')) {

					if (e.target.href) {

						const docs = document.querySelector('[data-show="sidebarDocs"]');
						const content = document.querySelector('[data-show="sidebarContent"]');

						if(docs.classList.contains('close')) {
							docs.classList.remove('close')
							docs.classList.add('open')
						}

						if(content.classList.contains('close')) {
							content.classList.remove('close')
							content.classList.add('open')
						}
					}

				}

			}
		},

		mounted () {
			document.querySelector('.all-content').addEventListener('scroll', this.activateLinkOnScroll)
			this.manualHush = this.$route.hash;
			this.scrollToElement()
			this.allSubtitles.push('mounted')
			this.getSubtitlesWithCustom()
    },
    
    beforeDestroy () {
      document.querySelector('.all-content').removeEventListener('scroll', this.activateLinkOnScroll)
    }
	}

</script>

<style scoped>
.menu a {
	font-weight: 600;
}

.menu-link.active {
	padding: 2px 5px;
	background-color: var(--code-bg-inline);
	border-radius: 5px;
}
</style>