<template>

    <section class="pageNextPrev">

      <robo-wiki-button v-if="pagePrev && !itemsList[current].withoutNav && !itemsList[current].withoutPrev" :label="'← ' + (itemsList[current].prev ? itemsList[current].prev[0].title : pagePrev.title_en)" :link=" itemsList[current].prev ? itemsList[current].prev[0].link : pagePrev.link" additionalText="previous" type="secondary"/>
      <robo-wiki-button class="second" v-if="pageNext && !itemsList[current].withoutNav && !itemsList[current].withoutNext" :label="(itemsList[this.current].next ? itemsList[this.current].next[0].title : pageNext.title_en) + ' →'" :link="itemsList[this.current].next ? itemsList[this.current].next[0].link : pageNext.link" additionalText="next" type="secondary"/>

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

  computed: {
    pagePrev() {
      if(this.current > -1)  {
          if(this.itemsList[this.current - 1] && this.itemsList[this.current - 1].topic && !this.itemsList[this.current - 1].link.includes('topic')) {
             this.itemsList[this.current - 1].link = this.itemsList[this.current - 1].link + '?topic=' + this.itemsList[this.current - 1].topic
            return this.itemsList[this.current - 1]
          }
          return this.itemsList[this.current - 1]
        }
      },

      pageNext() {
        if(this.current > -1)  {
          if(this.itemsList[this.current + 1] && this.itemsList[this.current + 1].topic && !this.itemsList[this.current + 1].link.includes('topic')) {
             this.itemsList[this.current + 1].link = this.itemsList[this.current + 1].link + '?topic=' + this.itemsList[this.current + 1].topic
            return this.itemsList[this.current + 1]
          }
          return this.itemsList[this.current + 1]
        }
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
  },
}

</script>