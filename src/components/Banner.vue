<template>
	<div class="banners">
		<g-link class="banner" :class="place" :to="'https://share.hsforms.com/1rlIfFL6ZSriaOjtf4NAGPw535vx?'+place">
			<g-image v-if="place==='sidebar'" alt="" src="~/assets/images/banner_sidebanner_RWS.jpg"/>
			<g-image v-if="place==='content'" alt="" src="~/assets/images/banner-content-RWSbeta.png"/>
		</g-link>

		<g-link class="banner" :class="place" :to="'https://robonomics.network/blog/winter-robonomics-school/?'+place">
			<g-image v-if="place==='sidebar'" alt="" src="~/assets/images/banner_sidebanner_winter_school.jpg"/>
		</g-link>
	</div>
</template>

<style lang="scss">
	.banners {
		margin-top: var(--space);
	}

	.banner {
		display: block;
		width: 100%;
		margin-top: calc(var(--space)/2);

		img {
			display: block;
			max-width: 100%;
			border: 0;
		}

		&:hover {
			opacity: .9 !important;
		}

		&.sidebar {
			max-width: 300px;
		}
	}
</style>

<script>

export default {
  props: {
    place: {
      type: String,
      default: 'sidebar'
    }
  }
}
</script>