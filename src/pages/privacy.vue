<template>
  <Layout>

    <div class="page">
      <div class="layout__content">
        <h1>{{ $st("Privacy policy", $store.state.locale) }}</h1>
      </div>

      <div class="layout__content layout__text hyphens">
        
      <slot></slot>

      </div>
    </div>

  </Layout>
</template>

<script>

  export default {
    metaInfo() {
      return {
        title: this.$st('Privacy policy', this.$store.state.locale)
      }
    },

    // props: {
    //   content: {
    //       type: String
    //   }
    // },
  }
</script>
