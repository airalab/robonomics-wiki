<template>
  <div v-if="title || this.$slots.default" :class="['robo-wiki-note', classList]">
      <h2 v-if="title" class="robo-wiki-note__colorful-title" :style="{marginBottom: this.$slots.default ? '0.5rem' : 0}">{{title}}</h2>
      <p class="robo-wiki-note__text" v-if="this.$slots.default">
        <slot/>
      </p>
  </div>
</template>

<script>

export default {
  
  name: 'RoboWikiNote',
  props: {
    title: {
      type: String,
    },
    type: {
      type: String,
      default: null,
      required: true,
      validator: function (value) {
        return ['okay', 'warning', 'note'].indexOf(value) !== -1;
      }
    }
  },

  computed: {
    classList() {
      return {
        [`robo-wiki-note--${this.type}`]: this.type,
      };
    },
  },

}
</script>

<style scoped>

  .robo-wiki-note {
    --type-color: var(--color-note);

    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--color-note-text);
    background-color: var(--color-note-bg);
    border-top: 1px solid transparent;
    border-left: 0.4rem solid var(--type-color);
    text-transform: none;
  }
  
  .robo-wiki-note--okay { --type-color: var(--color-okay);}
  .robo-wiki-note--warning { --type-color: var(--color-warning);}
  .robo-wiki-note--note { --type-color: var(--color-note);}

  .robo-wiki-note__colorful-title {
    font-size: 1.5rem;
    font-weight: 400;
    text-transform: none;
  }

  .robo-wiki-note__text {
    margin-bottom: 0;
  }

</style>