<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__list">

      <li class="breadcrumbs__item">
        <g-link  to="https://wiki.robonomics.network" class="breadcrumbs__home-icon">
          <g-image src="../assets/images/robonomics-logo-sign-sm.svg" alt="robonomics logo"></g-image>
        </g-link>
        <div class="breadcrumbs__divider">
        </div>
      </li>

      <li class="breadcrumbs__item" v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id">

        <g-link 
          v-if="breadcrumb.link"
          :to="breadcrumb.link" 
          class="breadcrumbs__link"
        >
          {{breadcrumb.title}}
        </g-link>

        <span class="breadcrumbs__link" v-else>{{breadcrumb.title}}</span>

        <div class="breadcrumbs__divider" v-if="index != breadcrumbs.length-1">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      urlPath: null,
      breadcrumbs: [],
    }
  },

    watch: {
    "$route.path": function(current, old) {
      this.breadcrumbs = [];
      this.urlPath = '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[3];
      this.getParentItem(this.items, this.urlPath);
    },
  },

  computed: {
    locale() {
      return this.$store.state.locale
    }
  },

  methods: {
    getParentItem(root, link) {
      let node = null;
      let t = null;
      for (let i = 0; i < root.length; i++) {
          node = root[i];
          if (node.link === link || node.link === link + '/' || node.items && (t = this.getParentItem(node.items, link))) {
            console.log(node)
            const link = node.link ? this.$path(node.link, this.locale) : null;
            const breadcrumb = {
              id: Math.floor(Math.random() * 1000000),
              title: node[`title_${this.locale}`] ? node[`title_${this.locale}`] : node[`title_en`],
              link
            }
            this.breadcrumbs.unshift(breadcrumb);
            return node;
          }
      }
      return null;
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

  mounted() {
    this.urlPath = '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[3];
    this.getParentItem(this.items, this.urlPath);
  }

}
</script>

<style scoped>
  .breadcrumbs__list {
    display: flex;
    align-items: center;
    list-style: none;
  }

   .breadcrumbs__home-icon {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-dark);
    border-radius: 10px;
   }

  .breadcrumbs__home-icon img {
    width: 15px;
    height: 15px;
  }

  .breadcrumbs__item {
    display: flex;
    align-items: center;
  }

  .breadcrumbs__item:not(:last-child) {
    margin-right: 20px;
  }

  .breadcrumbs__divider {
    margin-left: 20px;
    padding-top: 5px;
    width: 15px;
    height: 15px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'%3E%3Cpath d='M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z'/%3E%3C/svg%3E");
    background-size: 15px 15px;
    background-position: center;
  }


  .breadcrumbs__link {
    padding: 3px 10px;
    border-radius: 1rem;
    font-size: 12px;
    font-weight: 400;
    text-decoration: none;
    color: var(--text-color);
    transition: color 0.33s ease-in-out, background-color 0.33s ease-in-out;
  }

  .breadcrumbs__link.active {
    color: var(--header-color-text);
    background-color: var(--color-dark);
  }

  .breadcrumbs__link:hover {
    color: var(--header-color-text);
    background-color: var(--color-dark);
  }


</style>