<template>
  <Layout>
    <div class="summary" v-if="title">
      <h2 class="summary-title">{{title}} :</h2>
      <ol  class="menu summary-menu">
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
    <div class="summary__not-exist" v-else>
      Sorry, nothing here :(
    </div>
  </Layout>
</template>


<script>
  import items from '../../../data/sidebar_docs.yaml'
export default {
    components: {
      List: () => import("../../components/SidebarDocs.vue")
    },

    data() {
      return {
          title: null,
          isExist: false,
          items: [],
          allItems: items,
      };
    },

    computed: {
      locale() {
        return this.$store.state.locale
      },
    },

    methods: {
      getItemsForTitle() {
        this.allItems.map(item => {
          const cleanTitle = this.title.replace(/-/g, ' ');
          this.title = cleanTitle;

          if(this.title.toLowerCase() === (item[`title_${this.locale}`] && item[`title_${this.locale}`].toLowerCase()) || this.title.toLowerCase() === item[`title_en`].toLowerCase()) {
            this.items = item.items;
          }
        })
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
        this.getItemsForTitle();
      }
    },

    mounted() {
      const { title } = this.$route.params;
      this.title = title;
      this.getItemsForTitle();
  },
}
</script>

<style scoped>

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
    list-style:decimal;
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
</style>