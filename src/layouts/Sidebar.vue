<template>
  <div id="app" class="layout">
    
    <div class="footerPusher">
      <Header />
        <main class="main layout__page post">
          <div class="page">
            <div id="sidebarDocs" class="page__sidebar hiddenMobile" :class=" $store.state.showSearchbar ? null : 'menu-without-search'">
              <SidebarDocs :items="items" />
              <!-- <Banner /> -->
            </div>

            <div>
              <Breadcrumbs :items="items" />
              <slot/>
            </div>
          </div>

        </main>

      </div>

      <Footer/>

  </div>
</template>


<static-query>
query {
  metadata {
    locales
  }
}
</static-query>


<style lang="scss">

  .page-title-meta {
    border-width: 1px 0;
    border-style: solid;
    border-color: var(--border-color);
    font-size: 90%;
    font-family: monospace;

    margin-left: 0;
    display: flex;
    padding: 1rem 0;

    li {
      margin-right: var(--space);
      margin-left: 1rem;
      margin-bottom: 0;
    }
  }

  .page{
      display: grid;
      grid-template-columns: minmax(0,var(--width-sidebar-left)) auto;
      gap: var(--space);
      align-items: start;

      &__sidebar{
        word-break: break-word;

        overflow-y: auto;
        max-height: calc(100vh - 80px);
        scrollbar-width: none;  /* Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        &::-webkit-scrollbar { display: none; } /* Hide scrollbar for Chrome, Safari and Opera */
      }
  }

  #sidebarContent, #sidebarDocs {
    position: sticky;
    top: 7rem;
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

  .page-content {
    display: grid;
    grid-template-columns: minmax(0,var(--content-width)) minmax(0,var(--width-sidebar-left));
    gap: var(--space);
    align-items: start;
    padding-top: calc(var(--space)/2);

    h2, h3 {
      &:first-child {
        padding-top: 0;
      }
    }

    a[target=_blank] {
      &:after {
        padding-left: .2rem;
        display: inline-block;
        content: "↗";
      }

      &:hover:after {
        transform: translateX(0.1rem) translateY(-0.1rem);
      }
    }
  }

  .docContribution {

    border: 1px solid var(--table-thead-bg);
    
    .head {
      background-color: var(--table-thead-bg);
      padding: calc(var(--space)/4);
      font-weight: 500;
    }

    .content {
      padding: calc(var(--space)/4);
      background-color: var(--table-tr-hover);
    }

  }

  @media screen and (max-width: 1080px) {

    .page{
      grid-template-columns: minmax(0,1fr);
      padding-top: calc(var(--space) * 1.3);


      &__sidebar{

        position: fixed !important;
        
        top: 4rem;

        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;

        padding: var(--space);
        background-color: var(--body-bg);
      }
    }

    .sidebarMobileToggle {
      opacity: 1;
      visibility: visible;
      position: fixed;
      top: 4rem;
      z-index: 1000;
    }

    #sidebarDocs, #sidebarContent {
      max-height: 100%;
      height: 100vh;
      
      top: 5rem;
    }

    #sidebarDocs.menu-without-search,
    #sidebarContent.menu-without-search {
      top: 3rem;
    }
  }


  @media screen and (max-width: 720px) {
    .page-title-meta { display: block; }
    .page-content { grid-template-columns: minmax(0, 1fr) }
    // #sidebarContent { display: none; }
  }

</style>


<script>
import items from '../../data/sidebar_docs.yaml'

export default {

	components: {
      SidebarDocs: () => import("~/components/SidebarDocs.vue"),
      Breadcrumbs: () => import("~/components/Breadcrumbs.vue"),
      Banner: () => import("~/components/Banner.vue"),
      NavIcon: () => import('~/components/NavIcon.vue'),
      Button: () => import('~/components/Button.vue'),
      Header: () => import('~/components/Header.vue'),
      Footer: () => import('~/components/Footer.vue'),
	  },

  data(){
    return {
      items: items,
    }
  },

  methods: {

    flatten(o){

      let result = [];
      for (const item of o) {
        if (item.link) {
          result.push(item);
        }
        if (item.items) {
          result = [...result, ...this.flatten(item.items)];
        }
      }
      return result;
    }

  },

  
  computed: {

    itemsList() {
        return this.flatten(this.items)
    },

    currentIndex () {
      return this.itemsList.findIndex(item => {
        return this.$path(item.link, this.locale).replace(/\/$/, '') === this.$route.path.replace(/\/$/, '')
      })
    },

    locale() {
      return this.$store.state.locale
    },

  },

  updated(){

    //Hide popup mobile menu after clickcing (cause - no real page reload in Gridsome)
    document.querySelectorAll('.menu-link').forEach(function(el) {
      
      el.addEventListener('click', function(event){
        event.target.closest('.page__sidebar').classList.add('hiddenMobile');
        document.body.classList.remove('removeScroll');
        
        var id = event.target.closest('.page__sidebar').id;
        
        document.querySelectorAll('.sectionToggler').forEach(function(el) {
          if(el.dataset.show == id) {
            el.classList.add('open');
            el.classList.remove('close');
          }
        });
      })
    });
  }
}

</script>