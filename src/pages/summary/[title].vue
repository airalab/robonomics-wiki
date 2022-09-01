<template>
  <Layout>
    <h1><g-link to="/">{{ $st('Home', $store.state.locale) }}</g-link> / {{title}}</h1>

    <!-- <GridLinks :links="navLinks" /> -->

    <div class="summary" v-if="title">
      <!-- <h2 class="summary-title">{{title}} :</h2> -->
      <ol  class="menu summary-menu" v-if="items">
        <li v-for="item in items" :key="item.title_en">
          <g-link v-if="item.link" class="menu-link" :to="$path(item.link, locale)" exact>
            {{ item[`title_${locale}`] ? item[`title_${locale}`] : item[`title_en`] }}
          </g-link>

          <template v-else>

            <h4 class="menu-subtitle" @click="toggle" v-if="item.published!=false" :class="hascurrent(item.items) ? 'open' : 'close'">
               {{ item[`title_${locale}`] ? item[`title_${locale}`] : item[`title_en`] }}
            </h4>

            <List :items="item.items" />
          </template>

        </li>
      </ol>
    </div>
    <div class="summary__not-exist" v-if="!items.length">
      Sorry, nothing here :(
    </div>
  </Layout>
</template>


<script>
  import items from '../../../data/sidebar_docs.yaml'

  export default {
    components: {
      List: () => import("../../components/SidebarDocs.vue"),
      GridLinks: () => import('~/components/GridLinks.vue'),
    },

    metaInfo: {
      title: 'Summary',
    },

    data() {
      return {
          title: null,
          items: [],
          allItems: items,
          navLinks: []
      };
    },

    computed: {
      locale() {
        return this.$store.state.locale
      },
    },

    methods: {
        
      getItemsForTitle(elements) {

        if(!this.title) {
          return 
        }
        

        const cleanTitle = this.title.replace(/-/g, ' ');

        this.title = cleanTitle;


        let item = null;
        let t = null;
        for (let i = 0; i < elements.length; i++) {

          item = elements[i];

          if(this.title.toLowerCase() === (item[`title_${this.locale}`] && item[`title_${this.locale}`].toLowerCase().replace(/-/g, ' ')) || this.title.toLowerCase() === item[`title_en`].toLowerCase().replace(/-/g, ' ') || item.items && (t = this.getItemsForTitle(item.items))) {
            if(!this.items.length) {
              this.items = item.items;
            }
            return item;
          }
        }
        return null;
      },

      toggle (event) {
        event.target.classList.toggle('open')
      },  
            
      hascurrent (a) {
        let path = this.$route.matched[0].path + '/'
        let contains = false

        for (var i = 0; i < a.length; i++) {

          if(!a[i].items){
            if(this.$path(a[i].link, this.locale) == path){
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
      },
    },

    watch: {
      '$route.path': function(curr, old) {
        const { title } = this.$route.params;
        this.title = title;
        this.getItemsForTitle(this.allItems);
      }
    },

  created() {
    const { title } = this.$route.params;
    this.title = title;
    this.getItemsForTitle(this.allItems);
  },
}
</script>

<style scoped>

  h1 {
    margin-top: calc(var(--space) * 2)
  }

  .summary {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .summary-title {
    font-size: 2rem;
    font-weight: 600;
  }

  .summary-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: decimal;
  }

  .menu-link,
  .menu-subtitle {
    font-weight: 400;
    color: var(--link-color);
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

  .summary__not-exist {
    text-align: center;
    font-weight: 600;
  }

  @media screen and (max-width: 680px) {
    .summary-menu {
      align-items: flex-start;
    }
  }
</style>