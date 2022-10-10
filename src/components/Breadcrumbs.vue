<template>
  <div class="breadcrumbs" v-if="breadcrumbs.length">
    <nav  aria-label="breadcrumbs" class="breadcrumbs__list">

      <li class="breadcrumbs__item">
        <g-link to="https://wiki.robonomics.network" class="breadcrumbs__home-icon">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 50 44.4" style="enable-background:new 0 0 50 44.4;" xml:space="preserve">
            <g>
              <polygon class="st0" points="25.3,18.8 16.2,33.4 33.8,33.4 	"/>
              <polygon class="st1" points="25.3,3.1 2.8,41.2 47.2,41.2 	"/>
              <circle class="st0" cx="25" cy="3.1" r="3.1"/>
              <g>
                <circle class="st0" cx="46.9" cy="41.2" r="3.1"/>
                <circle class="st0" cx="3.1" cy="41.2" r="3.1"/>
              </g>
            </g>
          </svg>
        </g-link>
      </li>

      <li class="breadcrumbs__item" v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id">

        <g-link 
          v-if="breadcrumbs[breadcrumbs.length - 1] !== breadcrumb"
          :to="$path('/summary/' + getCleanTitleLink(breadcrumb.title_en), locale)" 
          class="breadcrumbs__link"
          :aria-current="index === breadcrumbs.length-1 ? 'location' : ''"
        >
          {{breadcrumb.title}} 
        </g-link>

        <g-link 
          v-if="breadcrumb.link"
          :to="breadcrumb.link" 
          class="breadcrumbs__link"
          :aria-current="index === breadcrumbs.length-1 ? 'location' : ''"
        >
          {{breadcrumb.title}}
        </g-link>

      </li>
    </nav>
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
    },
  },

  methods: {
    getParentItem(root, link) {
      let node = null;
      let t = null;
      for (let i = 0; i < root.length; i++) {
          node = root[i];
          if (node.link === link || node.link === link + '/' || node.items && (t = this.getParentItem(node.items, link))) {
            const link = node.link ? this.$path(node.link, this.locale) : null;
            const breadcrumb = {
              id: Math.floor(Math.random() * 1000000),
              title: node[`title_${this.locale}`] ? node[`title_${this.locale}`] : node[`title_en`],
              link,
              title_en: node[`title_en`],
            }
            this.breadcrumbs.unshift(breadcrumb);
            return node;
          }
      }
      return null;
    },

    getCleanTitleLink(title) {
      return title.split(" ").join("-").toLowerCase();
    }
  },

  mounted() {
    this.urlPath = '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[3];
    this.getParentItem(this.items, this.urlPath);
  }

}
</script>

<style scoped>

  .breadcrumbs {
    word-break: inherit;
  }

  .breadcrumbs__list {
    display: flex;
    align-items: center;
    list-style: none;
    margin-left: initial;
  }

   .breadcrumbs__home-icon {
    padding: 10px 10px 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
   }

  .breadcrumbs__home-icon svg {
    width: 20px;
    height: 20px;
  }

  .st0 {
    fill: var(--title-color)
  }

  .st1 {
    fill: none;
    stroke: var(--title-color);
    stroke-width: 2;
    stroke-miterlimit: 10;
  }

  .breadcrumbs__item {
    position: relative;
    display: flex;
    align-items: center;
    margin: initial;
  }

  .breadcrumbs__item:not(:last-child) {
    margin-right: 10px;
  }

  .breadcrumbs__item:not(:last-child)::after {
    content: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 595.28 841.89' style='enable-background:new 0 0 595.28 841.89;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bdisplay:none;%7D .st1%7Bdisplay:inline;fill:transparent;stroke:%23000000;stroke-miterlimit:10;%7D .st2%7Bfill:transparent;stroke:%23162128;stroke-width:5;stroke-miterlimit:10;%7D%0A%3C/style%3E%3Cg id='Layer_1' class='st0'%3E%3Cline class='st1' x1='86.49' y1='256.21' x2='86.49' y2='307.02'/%3E%3C/g%3E%3Cg id='Layer_2'%3E%3Cpolyline class='st2' points='90.06,256.21 121.72,281.62 90.06,305.74 '/%3E%3C/g%3E%3C/svg%3E%0A");
    position: absolute;
    top: -44px;
    right: -102px;
    width: 119px;
  }

  body[data-theme="dark"] .breadcrumbs__item:not(:last-child)::after {
    content: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 595.28 841.89' style='enable-background:new 0 0 595.28 841.89;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bdisplay:none;%7D .st1%7Bdisplay:inline;fill:%23FFFFFF;stroke:%23FFF;stroke-miterlimit:10;%7D .st2%7Bfill:transparent;stroke:%23FFF;stroke-width:5;stroke-miterlimit:10;%7D%0A%3C/style%3E%3Cg id='Layer_1' class='st0'%3E%3Cline class='st1' x1='86.49' y1='256.21' x2='86.49' y2='307.02'/%3E%3C/g%3E%3Cg id='Layer_2'%3E%3Cpolyline class='st2' points='90.06,256.21 121.72,281.62 90.06,305.74 '/%3E%3C/g%3E%3C/svg%3E%0A");
  }

  .breadcrumbs__item:first-child::after {
    top: -36px;
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
    font-weight: 600;
    color: var(--text-color);
  }

  a.breadcrumbs__link:hover {
    color: var(--link-color);
  }

  @media screen and (max-width : 640px) {

    .breadcrumbs {
      margin-bottom: 1rem;
    }

    .breadcrumbs__list {
      align-items: flex-start;
      flex-direction: column;
      margin-left: 0;
    }

    .breadcrumbs__link {
      padding: 5px 0;
    }

    .breadcrumbs__item:first-child {
      position: relative;
      width: 100%;
      border-bottom: 4px solid var(--text-color);
      margin-bottom: 10px;
    }

    .breadcrumbs__item::after {
      display: none;
    }
    
  }


</style>