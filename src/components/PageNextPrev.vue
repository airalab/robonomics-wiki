<template>

    <section class="pageNextPrev">

        <a v-if="pagePrev" class="button button__primary" :href="pagePrev.link">
            &larr; {{ pagePrev.title }}
        </a>

        <a v-if="pageNext" class="button button__primary" :href="pageNext.link">
            {{ pageNext.title }} &rarr;
        </a>

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


<script>

export default {
  props: {
    current: null,
    itemsList: null
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

    //   pageCurrent() {
    //     return Object.values(this.itemsList).findIndex(function(item) {
    //         if(item.isOpen == true)
    //         return true;
    //     })
    //   }
  },

}

</script>