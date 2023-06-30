<template>
  <div id="app" class="layout">

    <Header />

    <div class="all-content custom-scroll">
      <div class="footerPusher">
        <main class="main layout__page post">
            <div class="page">
              <SidebarItems :items="items"/>

              <div class="page-content--withBC">
                <Breadcrumbs :items="items" />
                <slot></slot>
              </div>

              <slot name="sidebar"></slot> <!-- Sidebar slot -->
            </div>
            <Support link="https://discord.com/invite/JpaN2XAmqY"/>
        </main>
      </div>
      <Footer/>
    </div>

    <client-only>

      <userTracker
        classCustom="my-tracker"
        @activateTracker="activateTracker"
      />

    </client-only>

  </div>
</template>


<static-query>
query {
  metadata {
    locales
  }
}
</static-query>


<style scoped>

.page{
    display: grid;
    grid-template-columns: minmax(0,var(--width-sidebar-left)) minmax(0,var(--content-width)) minmax(0,var(--width-sidebar-left));
    gap: var(--space);
    align-items: start;
    justify-content: space-between;
  }

  .page::-webkit-scrollbar { display: none; } 
  /* Hide scrollbar for Chrome, Safari and Opera */
  
  .page-title {
    padding-bottom: calc(var(--space)/2);
  }

  .page-title-meta {
    border-width: 1px 0;
    border-style: solid;
    border-color: var(--border-color);
    font-size: 90%;
    font-family: monospace;

    margin-left: 0;
    display: flex;
    padding: 1rem 0;
  }

  .page-title-meta  li {
      margin-right: var(--space);
      margin-left: 1rem;
      margin-bottom: 0;
    }

  .page-content h2:first-child, .page-content h3:first-child {
    padding-top: 0;
  }

  .page-content a[target=_blank]:after {
      padding-left: .2rem;
      display: inline-block;
      content: "↗";
    }

    .page-content a[target=_blank]:hover:after {
      transform: translateX(0.1rem) translateY(-0.1rem);
    }

    @media screen and (max-width: 1080px) {
      .page{
        grid-template-columns: minmax(0,var(--content-width)) minmax(0,var(--width-sidebar-left));
        padding-top: calc(var(--space) * 1.3);
      }

      #sidebarDocs, #sidebarContent {
        max-height: unset;
        /* height: unset; */
        
        /* top: 7rem; */
        bottom: 0;
      }

      #sidebarDocs {
        height: unset;
      }
    }

  @media screen and (max-width: 860px) {

    #sidebarDocs, #sidebarContent {
      
      /* top: 6rem; */
      top: 7rem;
    }

  }   


  @media screen and (max-width: 720px) {
    .page-title-meta { display: block; }
    /* .page-content { grid-template-columns: minmax(0, 1fr) } */

    .page { grid-template-columns: minmax(0, 1fr) }
  }

</style>


<script>
import items from '../../data/sidebar_docs.yaml'

export default {

	components: {
      Breadcrumbs: () => import("~/components/Breadcrumbs.vue"),
      Banner: () => import("~/components/Banner.vue"),
      SidebarItems: () => import("~/components/Sidebar.vue"),
      NavIcon: () => import('~/components/NavIcon.vue'),
      Header: () => import('~/components/Header.vue'),
      Footer: () => import('~/components/Footer.vue'),
      Support: () => import('~/components/Support.vue'),
	  },

  data(){
    return {
      items: items,
      settings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false
      }
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
    },

    activateTracker() {
      if(this.$matomo) {
          this.$matomo && this.$matomo.setConsentGiven();
          this.$matomo && this.$matomo.enableLinkTracking();
          this.$matomo && this.$matomo.trackPageView();
      }
    }
  },
  
  computed: {

    itemsList() {
        return this.flatten(this.items)
    },

    currentIndex () {
      return this.itemsList.findIndex(item => {
        return item.link.replace(/\/$/, '') === this.$route.path.replace(/\/$/, '')
      })
    },

    // locale() {
    //   return this.$store.state.locale
    // },

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
  },

}

</script>