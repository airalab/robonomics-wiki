<template>
  <ul class="menu menu-tree">
    <li v-for="(item, key) in items" :key="key">
      <!-- <a class="menu__item menu__link" v-reload v-if="item.link && item.published!=false" :href="link(item.link)">{{item.title}}</a> -->
      <g-link class="menu__item menu__link" v-if="item.link && item.published!=false" :to="item.link" :exact="item.link == '/docs/'">{{item.title}}</g-link>
      <template v-else>
        <h4 class="menu__item menu__title" @click="toggle(key)" v-if="item.published!=false">
          {{item.title}}
          <span>[{{ item.isOpen === "true" ? '-' : '+' }}]</span>
        </h4>

        <!-- {{ test(item.items) }} -->

        <List :items="item.items" v-show="item.isOpen"/>
      </template>
    </li>
  </ul>

</template>


<script>

import Vue from 'vue'

export default {
  props: {
    allList: null,
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
      // console.log(event.currentTarget.innerHTML);
    },
    link (path){
      return window.location.protocol + "//" + window.location.host + path; 
    },
    // test(o) {
    //   return o.some(i => i.link === this.current)
    // }
  },


  // directives: {
  //     reload: {
  //       inserted: function (el, binding, vnode) {
  //         el.addEventListener('click', (evt) => {
  //           // the URL we want to go to will be in el.href for g-link, a, b-button.
  //           // it will be in evt.target.href for b-nav-item and b-navbar-brand (because those are composite components
  //           // that render as <li><a></li>, or something like that)
  //           if (process.isClient) {
  //             evt.preventDefault();
  //             window.location.href = evt.target.href || el.href;
  //           }
  //         });
  //       }
  //     }
  //   },
}
</script>
