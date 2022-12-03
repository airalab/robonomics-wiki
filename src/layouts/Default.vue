<template>
    <div id="app" class="layout">
      <Header />

      <div class="all-content custom-scroll">
        <div class="footerPusher">

        <main class="main layout__page post">
          <SidebarItems :items="items" class="sidebar"/>
          <slot/>
        </main>

        </div>

        <Footer/>
      </div>

    </div>

</template>

<script>
  import items from '../../data/sidebar_docs.yaml'
export default {
  components: {
    SidebarItems: () => import("~/components/Sidebar.vue"),
    Header: () => import("~/components/Header.vue"),
    Footer: () => import("~/components/Footer.vue"),
  },

  data() {
    return {
      items: items,
      currentPosition: 0
    }
  },

  methods: {
    activateScrollbar() {
      const el = document.querySelector('.custom-scroll');
      const currentScrollPosition = el.scrollTop

      el.classList.add('active')

      this.currentPosition = currentScrollPosition


      setTimeout(() => {
        if(this.currentPosition === currentScrollPosition) {
          el.classList.remove('active')
        }
      }, 300)

    }
  },


  mounted () {
    // document.querySelector('.custom-scroll').addEventListener('scroll', this.activateScrollbar)

    document.querySelectorAll('.all-content ').forEach(item => {
      item.addEventListener('scroll', this.activateScrollbar)
    })
  },

  beforeDestroy() {
    document.querySelectorAll('.all-content ').forEach(item => {
      item.removeEventListener('scroll', this.activateScrollbar)
    })
  }

}
</script>


<style scoped>

    .sidebar {
     display: none;
     padding-top: 0;
    }
  
    .sidebar::-webkit-scrollbar { display: none; } /* Hide scrollbar for Chrome, Safari and Opera */

    @media screen and (max-width: 1080px) {
      .sidebar {
        display: block;
      }

      .sidebar#sidebarDocs {
        top: 4rem;
      }
    }

    @media screen and (max-width: 860px) {

      .sidebar#sidebarDocs {
        top: 7rem;
      }
    }

  
  </style>
