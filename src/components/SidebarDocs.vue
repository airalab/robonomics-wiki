<template>
  <ul class="menu">
    <li v-for="(item, key) in items" :key="key">
      <g-link class="menu__item menu__link" v-if="item.link" :to="item.link" :exact="item.link == '/docs/'">{{item.title}}</g-link>
      <template v-else>
      	<h4 class="menu__item menu__title">{{item.title}}</h4>
      	<List v-if="item.items" :items="item.items"/>
      </template>
    </li>
  </ul>

</template>



<script>

export default {

	props: {
	    items: Array
	  },
	components: {
	    List: () => import("./SidebarDocs.vue")
	  }
}	
</script>
