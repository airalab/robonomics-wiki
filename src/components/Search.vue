<template>
 
  <div class="search-container"  :class="toggleClasses" >
    
      <input id="search" v-model="searchTerm" type="text" placeholder="Search" tabindex="0" @focusin="isFocused = true; isActive = true"/>
      
      <div class="searchresults" tabindex="0" @focusin="isFocused = true; isActive = true" @focusout="isFocused = false; isActive = false">
        <g-link v-for="result in searchResults" :key="result.id" :to="result.path" class="searchresults__item">
          {{ result.title }}
        </g-link>
      </div>

  </div>
</template>

<style lang="scss">
  .search-container {
    position: relative;

    input[type="text"]{
        width: 100%;
        font-weight: 700;
    }

    .searchresults {
      position: absolute;
      top: calc(100% + .5rem);
      width: 100%;
      
      transition: 0.4s ease opacity;
      opacity: 0;
      visibility: hidden;

      &__item{
        display: block;
        border-bottom: 1px solid rgba(0,0,0,.1);
        padding: .5rem .8rem;
        text-decoration: none;
        font-weight: 700;
      }
    }

    &.active{
      .searchresults{
          opacity: 1;
          visibility: visible;
        }
    }
  }
</style>

<script>
  import Search from 'gridsome-plugin-flexsearch/SearchMixin'

  export default {
    data () {
      return {
        isActive: false,
        isFocused: false
      }
    },

    computed: {
      toggleClasses() {
        
        return { 'active': this.isActive }

      },
    },

    mixins: [Search]
  }
</script>