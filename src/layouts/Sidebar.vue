<template>
  <div id="app" class="layout">

    <Header />

    <div class="all-content custom-scroll">
      <div class="footerPusher">
        <main class="main layout__page post">
            <div class="page">
              <SidebarItems :items="items"/>
              <div>
                <Breadcrumbs :items="items" />
                <slot/>
              </div>
              </div>
        </main>
      </div>
      <Footer/>
    </div>

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
    grid-template-columns: minmax(0,var(--width-sidebar-left)) auto;
    gap: var(--space);
    align-items: start;
  }

  .page::-webkit-scrollbar { display: none; } 
  /* Hide scrollbar for Chrome, Safari and Opera */
  


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

  .page-content {
    display: grid;
    grid-template-columns: minmax(0,var(--content-width)) minmax(0,var(--width-sidebar-left));
    gap: var(--space);
    align-items: start;
    padding-top: calc(var(--space)/2);
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
        grid-template-columns: minmax(0,1fr);
        padding-top: calc(var(--space) * 1.3);
      }

      #sidebarDocs, #sidebarContent {
        max-height: unset;
        height: unset;
        
        top: 7rem;
        bottom: 0;
      }
    }


  @media screen and (max-width: 720px) {
    .page-title-meta { display: block; }
    .page-content { grid-template-columns: minmax(0, 1fr) }
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
      Button: () => import('~/components/Button.vue'),
      Header: () => import('~/components/Header.vue'),
      Footer: () => import('~/components/Footer.vue'),
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

    activateScrollbar() {
      const el = document.querySelector('.custom-scroll');
      const currentScrollPosition = el.scrollTop

      el.classList.add('active')

      this.currentPosition = currentScrollPosition


      setTimeout(() => {
        if(this.currentPosition === currentScrollPosition) {
          el.classList.remove('active')
        }
      }, 150)

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

    mounted () {
      document.querySelector('.all-content').addEventListener('scroll', this.activateScrollbar)
    },
      
    beforeDestroy () {
      document.querySelector('.all-content').removeEventListener('scroll', this.activateScrollbar)
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