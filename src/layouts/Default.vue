<template>
  <div id="app" class="layout">

      <div class="footerPusher">
      
        <Header />

        <main class="main layout__page post">
          <slot/>
        </main>

      </div>

      <Footer/>

  </div>
</template>

<script>

export default {
  components: {
    Header: () => import('~/components/Header.vue'),
    Footer: () => import('~/components/Footer.vue'),
  },

}
</script>
