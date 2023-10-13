<template>

    <ul class="menu">

      <li v-for="(item, key) in items" :key="key">

        <g-link class="menu-link" v-if="item.link && item.published!=false" :to="!item.topic ? item.link : addQuery(item)" :class="{'active': $locale !== 'en' && item.link === getCleanPath().slice(0, -1) && !item.topic || $locale !== 'en' && (item.topic && item.topic === $route.query.topic && item.link === getCleanPath().slice(0, -1))}" exact>
          {{ $t(getTitle(item)) }}
        </g-link>
        
        <template v-else>

          <h4 class="menu-subtitle" @click="toggle" v-if="item.published!=false" :class="hascurrent(item.items, item.title_en) ? 'open' : 'close'">
            {{  $t(item['title_en']) }}
          </h4>

          <List :items="item.items" />
        </template>

      </li>

    </ul>


</template>


<static-query>
query {
  metadata {
    defaultLocale
  }
}
</static-query>


<script>

export default {
  props: {
    items: {
      default: []
    }
  },

  components: {
    List: () => import("./SidebarDocs.vue")
  },

  // computed: {
  //   locale() {
  //     return this.$store.state.locale
  //   },
  // },

  methods: {

    toggle (event) {
       event.target.classList.toggle('open')
    },


    hascurrent (a, title) {

      let path = this.$route.matched[0].path 

      let filteredPath = path.split('/').filter(el => !this.$localesList.includes(el))
      let clearedPath = filteredPath.join('/')

      let topic = this.$route.query.topic ?? this.$route.query.topic;

      if((clearedPath.match(new RegExp("/", "g")) || []).length == 1) {
        clearedPath += '/';
      }

      let contains = false

      for (var i = 0; i < a.length; i++) {

        if(!a[i].items){
          if(a[i].link == clearedPath && !topic){
            contains = true;

          } else if(a[i].topic && topic == title) {
            contains = true;
          }
        }
        else{

          if(this.hascurrent(a[i].items, a[i].title_en) ){
            contains = true;
          }
        }
      }
      return contains;
    },

    getTitle(item){
      if (eval(`item.title_${this.locale}`) ){
        return eval(`item.title_${this.locale}`)
      }
      
      if ( eval(`item.title_${this.$static.metadata.defaultLocale}`) ){
        return eval(`item.title_${this.$static.metadata.defaultLocale}`)
      } 
    },

    getCleanPath() {
      let filteredPath = this.$route.path.split('/').filter(el => !this.$localesList.includes(el))
      return filteredPath.join('/')
    },

    addQuery(item) {


      if(!item.link.includes('topic')) {
        const splitLink = item.link.split("/");
        const docName = splitLink[splitLink.length - 1];
        if(this.$locale !== 'en') {
          return `/docs/${this.$locale}/${docName}/?topic=${item.topic}`
        } else {
          return `${item.link}/?topic=${item.topic}`
        }

      } else {
        const splitTopic = item.link.split("?")[0];

        if(this.$locale !== 'en') {
          return `/docs/${this.$locale}/${splitTopic.split('/')[2]}/?topic=${item.topic}`
        } else {
          return `${splitTopic}/?topic=${item.topic}`
        }

      }
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
