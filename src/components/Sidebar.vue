<template>
    <div id="sidebarDocs" class="page__sidebar custom-scroll hiddenMobile" :class=" $store.state.showSearchbar ? null : 'menu-without-search'">
      <SidebarDocs :items="items" />
    </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array
    }
  },

  components: {
    SidebarDocs: () => import("~/components/SidebarDocs.vue"),
  }

}
</script>

<style scoped>

  .page__sidebar{
      word-break: break-word;

      overflow-y: auto;
      max-height: calc(100vh - 80px);
      scrollbar-width: none;  /* Firefox */
      -ms-overflow-style: none;  /* IE and Edge */
    }

  
  #sidebarDocs,
  #sidebarContent {
    position: sticky;
    top: 4rem;
  }

  .sidebarMobileToggle{
    transition: opacity 0.2s ease;
    opacity: 0;
    visibility: hidden;

    position: absolute;
    background-color: var(--header-bg);
    color: var(--header-link);
    top: 0;
    left: 0;
    right: 0;
    padding: calc(var(--space)/2) 0;
    z-index: 100;

    border-top: 1px solid currentColor;
  }

  @media screen and (max-width: 1080px) {

    .page__sidebar{

        position: fixed !important;
        
        top: 4rem;

        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;

        padding: var(--space);
        background-color: var(--body-bg);
      }

    .sidebarMobileToggle {
      opacity: 1;
      visibility: visible;
      position: fixed;
      top: 4rem;
      z-index: 1000;
    }

    #sidebarDocs, #sidebarContent {
      max-height: unset;
      height: unset;
      
      /* top: 7rem; */
      bottom: 0;
    }

  }

  @media screen and (max-width: 860px) {

    #sidebarDocs, #sidebarContent {
      
      top: 6rem;
    }

    #sidebarDocs.menu-without-search,
    #sidebarContent.menu-without-search {
      top: 3rem;
    }

  } 

</style>