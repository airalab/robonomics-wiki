<template>
  <ul class="menu menu-tree">
    <li v-for="(item, key) in list" :key="key" v-if="item.published!=false">
      <!-- <a class="menu__item menu__link" v-if="item.link" :href="link(item.link)" :exact="item.link == '/docs/'">{{item.title}}</a> -->
      <g-link class="menu__item menu__link" v-if="item.link" :to="item.link" :exact="item.link == '/docs/'">{{item.title}}</g-link>
      <template v-else>
        <h4 class="menu__item menu__title" @click="toggle(key)">
          {{item.title}}
          <span>[{{ item.isOpen === true ? '-' : '+' }}]</span>
        </h4>
        <List :items="item.items" v-show="item.isOpen"/>
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
  data(){
    return { list: this.items }
  },
  methods: {
    toggle (index) {
      Vue.set(this.list[index], 'isOpen', !this.list[index].isOpen)
      // console.log(event.currentTarget.innerHTML);
    },
    link (path){
      return window.location.protocol + "//" + window.location.host + path; 
    }
  }
}
</script>
