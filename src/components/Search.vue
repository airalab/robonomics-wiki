<template>

  <div v-if="isShown" class="search-container"  :class="toggleClasses" tabindex="0" @focusin="focusIn" @focusout="focusOut">

      <!-- v-on:keyup.down="SearchLinksFocus" -->
      <input v-model="search" type="search" :aria-label="$st('Search', $store.state.locale)" :placeholder="$st('Search', $store.state.locale)"/>

      <div v-if="searchResults.length > 0" role="listbox" class="searchresults">

        <div class="layout__content">
          <div class="search-msg-count" aria-hidden="true">{{$st('Search Found', $store.state.locale)}}: {{searchResults.length}}</div>

          <nav>
            <g-link @focusout="SearchLinksNextFocus" v-for="post in searchResults" :key="post.node.id" :to="post.node.path">{{ post.node.title }}</g-link>
          </nav>
        </div>

        <!-- <ol>
          <li v-for="post in searchResults" :key="post.node.id"><g-link :to="post.node.path">{{ post.node.title }}</g-link></li>
        </ol> -->

      </div>

  </div>
</template>


<static-query>
query{
  allDocPage{
    edges{
      node{
        id
        title
        path
        content
      }
    }
  }
}
</static-query>

<style lang="scss" scope>

  .search-container {
    --background-active: var(--color-focus-light);
    --border-bottom: var(--color-focus);
    --border-separates: var(--color-focus);

    position: relative;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    &, a, input[type="search"], input[type="search"]::placeholder {
      color: var(--text-color);
    }

    .layout__content {
      max-width: 950px;
    }

    input[type="search"] {
      transition: 0.2s ease all;
      width: 100%;
      text-transform: none;
      letter-spacing: 0;
    }

    .searchresults {
      position: fixed;
      top: 4rem;
      left: 0;
      right: 0;
      z-index: 1000;

      min-height: 150px;
      max-height: 650px;
      overflow: scroll;

      background-color: var(--background-active);
      border-top: 1rem solid var(--border-bottom);
      border-bottom: 1rem solid var(--border-bottom);

      transition: 0.4s ease opacity;
      opacity: 0;
      visibility: hidden;

      nav a {
        transition: 0.2s ease all;
        display: block;
        padding: 1rem;
        border-top: 1px dashed var(--border-separates);

        &:hover {
          background-color: var(--table-tr-hover);
        }
      }
    }

    &.active{
      .searchresults{
          opacity: 1;
          visibility: visible;
        }

      input[type="search"] {
        background-color: var(--background-active);
        border-color: var(--border-bottom)
      }

    }
  }

  .search-msg-count {
    padding: 1rem;
    font-weight: bold;
  }


</style>

<script>

  export default {
    props: {
      isShown: {
        type: Boolean,
        required: true
      }
    },

    data () {
      return {
        isActive: false,
        isFocused: false,
        search: '',
        lastScrollPosition: 0,
      }
    },

    computed: {
      toggleClasses() {

        return { 'active': this.isActive }

      },

      searchResults() {

        if ( this.search.length > 2 ) {
          return this.$static.allDocPage.edges.filter(post => {
            return (post.node.title.toLowerCase().includes(this.search.toLowerCase().trim()) || post.node.content.toLowerCase().includes(this.search.toLowerCase().trim())) & post.node.path.includes('/'+ this.$store.state.locale +'/') & (post.node.path != this.$route.matched[0].path+'/')
          })
        }

        else return ''

      }
    },

    methods: {
      focusIn() {
        this.isActive = true;
      },

      focusOut() {
        this.isActive = false;
      },

      // SearchLinksFocus() {
      //   document.querySelector('.search-container nav a:first-child').focus()
      // }

    },

    watch: {
      "$route.path": function() {
        this.isActive = false;
      }
    },
  }
</script>
