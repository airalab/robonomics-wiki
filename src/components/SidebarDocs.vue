<template>
  <ul class="menu">
    <li v-for="(item, key) in items" :key="key">
      <g-link class="menu-link" v-if="item.link && item.published!=false" :to="item.link" :exact="item.link == '/docs/'">{{item.title}}</g-link>
      <template v-else>

        <h4 class="menu-subtitle" @click="toggle" v-if="item.published!=false" :class="hascurrent(item.items) ? 'open' : 'close'">
          {{item.title}}
        </h4>

        <List :items="item.items" />
      </template>
    </li>
  </ul>

</template>


<script>
import Vue from 'vue'

export default {
  props: {
    items: {
      default: []
    }
  },

  components: {
    List: () => import("./SidebarDocs.vue")
  },

  methods: {

    toggle (event) {
       event.target.classList.toggle('open')
    },


    hascurrent (a) {
      let path = this.$route.matched[0].path;
      let contains = false;

      for (var i = 0; i < a.length; i++) {
        if(!a[i].items){
          
          if(a[i].link == path + '/'){
            contains = true;
          }
        }
        else{
          if( this.hascurrent(a[i].items) ){
            contains = true;
          }
        }
      }
      return contains;
    }
  }

  
}
</script>

<style scoped>

.menu:not(:first-child) {
  padding-left: calc( var(--space) / 4);
}

::selection {
  background-color: transparent;
}

.menu-subtitle + .menu {
  display: none;
}

.menu-subtitle:after {
  content: "[+]"
}

.menu-subtitle.open + .menu {
  display: block;
}

.menu-subtitle.open:after {
  content: "[-]"
}

</style>
