<template>
	<g-link class="banner" :class="place" :to="'https://share.hsforms.com/1rlIfFL6ZSriaOjtf4NAGPw535vx?'+place">
		<g-image v-if="place==='sidebar'" alt="" src="~/assets/images/banner-sidebar-RWSbeta.png"/>
		<g-image v-if="place==='content'" alt="" src="~/assets/images/banner-content-RWSbeta.png"/>
	</g-link>
</template>

<style lang="scss">
	.banner {
		display: block;
		width: 100%;
		margin-top: var(--space);

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