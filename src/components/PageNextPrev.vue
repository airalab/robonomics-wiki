<template>

    <section class="pageNextPrev">

      <Button v-if="pagePrev" :label="'← ' + pagePrev.title_en" :link="pagePrev.link" additionalText="previous" type="secondary"/>
      <Button class="second" v-if="pageNext" :label="pageNext.title_en + ' →'" :link="pageNext.link" additionalText="next" type="secondary"/>

    </section>

</template>

<style scoped>

    .pageNextPrev {
        padding: calc(var(--space)/2) 0;

        display: grid;
        gap: calc(var(--space)/2);

        text-transform: uppercase;
    }

    .pageNextPrev a {
        display: inline-flex;
        height: 100%;
        flex-direction: column;
        text-align: right;
        padding: 1rem 1rem;
        grid-column-start: 1;
        grid-column-end: 2;
      }

      .pageNextPrev a.second {
        text-align: left;
        grid-column-start: 2;
        grid-column-end: 3;
        align-self: end;
      }

      @media screen and (min-width:500px){
        .pageNextPrev { grid-template-columns: 1fr 1fr; }
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

      // locale() {
      //   return this.$store.state.locale
      // },
  },

  methods: {
    getTitleLocalazide(item) {

      if (eval(`item.title_${this.locale}`) ){
        return eval(`item.title_${this.locale}`)
      }
      
      if ( eval(`item.title_${this.$static.metadata.defaultLocale}`) ){
        return eval(`item.title_${this.$static.metadata.defaultLocale}`)
      }
    },
  }

}

</script>