<template>
  <ul class="menu menu-tree">
    <li v-for="(item, key) in items" :key="key">
      <g-link class="menu-link" v-if="item.link && item.published!=false" :to="item.link" :exact="item.link == '/docs/'">{{item.title}}</g-link>
      <template v-else>
        <h4 class="menu-subtitle" @click="toggle(key)" v-if="item.published!=false">
          {{item.title}}
          <span>[{{ item.isOpen ? '-' : '+' }}]</span>
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
    },
    current: null
  },
  components: {
    List: () => import("./SidebarDocs.vue")
  },
  methods: {
    toggle (index) {
      Vue.set(this.items[index], 'isOpen', !this.items[index].isOpen)
    },
    link (path){
      return window.location.protocol + "//" + window.location.host + path; 
    },
  },
}
</script>
