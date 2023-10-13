<template>

    <section class="pageNextPrev">

      <robo-wiki-button v-if="pagePrev && !itemsList[current].withoutNav && !itemsList[current].withoutPrev" :label="'← ' + (itemsList[current].prev ? $t(itemsList[current].prev[0].title) : ($t(pagePrev.title_en)))" :link=" itemsList[current].prev ? itemsList[current].prev[0].link : pagePrev.link" :additionalText="$t('previous')" type="secondary"/>
      <robo-wiki-button class="second" v-if="pageNext && !itemsList[current].withoutNav && !itemsList[current].withoutNext" :label="(itemsList[this.current].next ? $t(itemsList[this.current].next[0].title) : ($t(pageNext.title_en))) + ' →'" :link="itemsList[this.current].next ? itemsList[this.current].next[0].link : pageNext.link" :additionalText="$t('next')" type="secondary"/>

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
    itemsList: null,
  },

  data() {
    return {
      prevObj: null,
      nextObj: null
    }
  },

  computed: {
    pagePrev() {
      this.prevObj = {...this.itemsList[this.current - 1]}
      if(this.current > -1)  {
          const splitLink = this.prevObj.link && this.prevObj.link.split("/");
          const docName = splitLink && splitLink[splitLink.length - 1];

          if(this.itemsList[this.current - 1] && this.itemsList[this.current - 1].topic && !this.itemsList[this.current - 1].link.includes('topic')) {
            if(this.$locale === 'en') {
              this.prevObj.link =  this.prevObj.link + '/?topic=' + this.prevObj.topic;
            } else {
              this.prevObj.link = this.prevObj.link && `/docs/${this.$locale}/${docName}/?topic=${this.prevObj.topic}` 
            }
            return this.prevObj
          }

          if(this.$locale === 'en') {
            return this.prevObj
          } else {
            this.prevObj.link = this.prevObj.link && `/docs/${this.$locale}/${docName}` 
            return this.prevObj
          }
        }
      },

      pageNext() {
        this.nextObj = {...this.itemsList[this.current + 1]}

        if(this.current > -1)  {

          const splitLink = this.nextObj.link && this.nextObj.link.split("/");
          const docName = splitLink && splitLink[splitLink.length - 1];

          if(this.itemsList[this.current + 1] && this.itemsList[this.current + 1].topic && !this.itemsList[this.current + 1].link.includes('topic')) {
            if(this.$locale === 'en') {
              this.nextObj.link =  this.nextObj.link + '/?topic=' + this.nextObj.topic;
            } else {
              this.nextObj.link = this.nextObj.link && `/docs/${this.$locale}/${docName}/?topic=${this.nextObj.topic}` 
            }
            return this.nextObj
          }

          if(this.$locale === 'en') {
            return this.nextObj
          } else {
            this.nextObj.link = this.nextObj.link && `/docs/${this.$locale}/${docName}` 
            return this.nextObj
          }
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
  }
}

</script>