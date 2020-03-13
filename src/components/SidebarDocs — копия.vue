<template>
  <ul class="menu">
    <li v-for="(item, key) in items" :key="key">
      <g-link class="menu__item menu__link" v-if="item.link" :to="item.link" :exact="item.link == '/docs/'">{{item.title}}</g-link>
      <template v-else>
      	<h4 class="menu__item menu__title" @click="toggle">
          {{item.title}}
          <span>[{{ isOpen ? '-' : '+' }}]</span>
        </h4>
      	<List v-if="item.items" :items="item.items" v-show="isOpen"/>
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
	  },
  data: function () {
    return {
      isOpen: false
    }
  },
  // computed: {
  //   isFolder: function () {
  //     return this.items &&
  //       this.items.length
  //   }
  // },
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen
    }
  },
  mounted: function(){
       // console.log(this.items.length);
  },
}	
</script>
