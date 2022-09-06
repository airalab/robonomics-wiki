<template>
  <Layout>
    <h1><g-link to="/">{{ $st('Home', $store.state.locale) }}</g-link> / {{titleLocal || title}}</h1>

    <GridLinks v-if="navLinks" :links="navLinks" />

    <div class="summary__not-exist" v-if="!items.length">
      Sorry, nothing here :(
    </div>
  </Layout>
</template>


<script>
  import items from '../../data/sidebar_docs.yaml'

  export default {
    components: {
      List: () => import("~/components/SidebarDocs.vue"),
      GridLinks: () => import('~/components/GridLinks.vue'),
    },

    data() {
      return {
          title: null,
          items: [],
          allItems: items,
          navLinks: [],
          titleLocal: null,
          metaTitle: 'Summary'
      };
    },

    metaInfo() {
      return {
        title: this.titleLocal && `Summary: ${this.titleLocal}` || this.title && `Summary: ${this.title}` || this.metaTitle,
      }

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
            if(!this.titleLocal) {
              this.titleLocal = item[`title_${this.locale}`];
            }
            if(!this.items.length) {
              this.items = item.items;
              this.getNavLinks();
            }
            return item;
          }

        }

        return null;
      },

      getNavLinks() {
        if(this.items.length) {
          this.items.forEach(i => {
            const obj = {
              to: i.link || `/summary/${i[`title_en`].toLowerCase().replace(/ /g, '-')}`,
              name: i[`title_${this.locale}`] || i[`title_en`]
            };
            
            this.navLinks.push(obj);
          })
        }
      },

      toggle (event) {
        event.target.classList.toggle('open')
      },  
    },

    watch: {
      '$route.path': function(curr, old) {
        const { title } = this.$route.params;
        this.title = title;
        this.items = [];
        this.navLinks = [];
        this.titleLocal = null;
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