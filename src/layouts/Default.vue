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

<style lang="scss">  

.main {
  margin: 0 auto;
  padding-bottom: var(--space);
  position: relative;
}

.layout{
  display: flex;
  flex-direction: column;
  height: 100%;

  .footerPusher{
    flex: 1 0 auto;
  }

  .footer{
    flex-shrink: 0;
  }
}
</style>


<script>

export default {
  components: {
    Header: () => import('~/components/Header.vue'),
    Footer: () => import('~/components/Footer.vue'),
  },

}
</script>
