<template>

    <section class="pageNextPrev">

      <Button v-if="pagePrev" :label="'← ' + getTitleLocalazide(pagePrev)" :link="pagePrev.link"/>
      <Button v-if="pageNext" :label="getTitleLocalazide(pageNext) + ' →'" :link="pageNext.link"/>

    </section>

</template>

<style lang="scss" scoped>

    .pageNextPrev {
        padding: calc(var(--space)/2) 0;

        display: grid;
        gap: calc(var(--space)/2);

        @media screen and (min-width:500px){
          grid-template-columns: 1fr 1fr;
        }

        text-transform: uppercase
    }

</style>

<static-query>
query {
  metadata {
    defaultLocale
  }
}
</static-query>


<script>

export default {
  
  props: {
    current: null,
    itemsList: null
  },

  components: {
    Button: () => import('~/components/Button.vue'),
  },

  computed: {
      pagePrev() {
        if(this.current > -1)
          return this.itemsList[this.current - 1]
      },

      pageNext() {
        if(this.current > -1)
          return this.itemsList[this.current + 1]
      },

      locale() {
        return this.$store.state.locale
      },
  },

  methods: {
    getTitleLocalazide(item) {

      if (eval(`item.title_${this.locale}`) ){
        return eval(`item.title_${this.locale}`)
      }
      
      if ( eval(`item.title_${this.$static.metadata.defaultLocale}`) ){
        return eval(`item.title_${this.$static.metadata.defaultLocale}`)
      }
    }
  }

}

</script>