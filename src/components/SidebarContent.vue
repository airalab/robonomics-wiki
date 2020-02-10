<template>
	
	 <div v-if="subtitles.length > 0 && subtitles[0].depth !== 4">

	    <ul v-if="subtitles.length" class="menu">
	      <li :class="'menu__item-depth-' + subtitle.depth" v-for="subtitle in subtitles" :key="subtitle.value">
	        <a class="menu__item menu__link" :href="subtitle.anchor">
	          {{ subtitle.value }}
	        </a>
	      </li>
	    </ul>
	  </div>
	</div>

</template>

<script>
	export default {

		computed: {
			subtitles() {
				// Remove h1, h4, h5, h6 titles
				let subtitles = this.$page.doc.subtitles.filter(function(value, index, arr){
				return [2,3,4].includes(value.depth)
			})
			return subtitles
	    }
	  }
	}

</script>