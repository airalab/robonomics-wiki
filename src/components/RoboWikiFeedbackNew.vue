<template>
  <section class="robo-wiki-feedback">
    <div class="grid-4">
      <RoboWikiFeedbackItem v-for="reaction in reactions" :key="reaction.id" :text="reaction.text" :imgSrc="reaction.img" />
    </div>
  </section>
</template>

<script>

export default {

  components: {
    RoboWikiFeedbackItem: () => import('~/components/RoboWikiFeedbackItem.vue')
  },

  data() {
    return {
      reactions: [
        {
          text: "Couldn't complete",
          img: 'reaction-1.svg',
          id: 0
        },
        {
          text: "It was hard",
          img: 'reaction-2.svg',
          id: 1
        },
        {
          text: "It was ok",
          img: 'reaction-3.svg',
          id: 2
        },
        {
          text: "It was easy",
          img: 'reaction-4.svg',
          id: 3
        },
      ],
    }
  }

}
</script>

<style scoped>
  .grid-4 {
    display: grid;
    gap: calc(var(--space) * 0.5);
    grid-template-columns: repeat(auto-fill, minmax(calc(var(--content-width) / 4 - var(--grid-space)), 1fr));
    grid-template-rows: 1fr min-content ;
    align-items: center;
    /* margin-bottom: var(--space); */
  }

</style>