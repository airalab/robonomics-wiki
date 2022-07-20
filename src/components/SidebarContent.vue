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

		<ul v-if="subtitles.length" class="menu">
	      <li @click="manualHush = subtitle.anchor" :class="'menu__item-depth-' + subtitle.depth" v-for="subtitle in subtitles" :key="subtitle.value">
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
			}
		},

		watch: {
			'$route.hash': function(curr, old) {
				setTimeout(() => {
					this.scrollToElement();
				}, 200);
			}
		},

		computed: {
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
	 			const allHeads = document.querySelector('.page').querySelectorAll('h2, h3, h4, h5');

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


				const el = document.querySelector(`[id='${hash}']`) || this.manualHush && document.querySelector(`[id='${decodeURIComponent(this.manualHush.substring(1))}']`);


				if (el !== null ) {

					const top = el.offsetTop;
					window.scrollTo(0, top);;

					this.manualHush = `#${el.getAttribute('id')}`;
				}
			},
		},

		mounted () {
			this.scrollToElement();
			window.addEventListener('scroll', this.activateLinkOnScroll)
			this.manualHush = this.$route.hash;
    },
    
    beforeDestroy () {
      window.removeEventListener('scroll', this.activateLinkOnScroll)
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