<template>
  <div v-if="title || this.$slots.default" :class="classList">
      <div v-if="title" class="robo-wiki-note__title">{{title}}</div>
      <div class="robo-wiki-note__text" v-if="this.$slots.default">
        <slot/>
      </div>
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
      default: 'note',
      required: true,
      validator: function (value) {
        return ['okay', 'warning', 'note'].indexOf(value) !== -1;
      }
    }
  },

  computed: {
    classList() {
      return {
        [`robo-wiki-note`]: true,
        [`robo-wiki-note--${this.type}`]: this.type,
      };
    },
  },

}
</script>

<style scoped>

  .robo-wiki-note {
    --type-color-accent: var(--color-note-accent);
    --type-color-pale: var(--color-note-pale);
    --type-color-text: var(--color-note-text);

    padding: 0.5rem 1rem;
    background-color: var(--type-color-pale);
    border-left: 0.4rem solid var(--type-color-accent);
    color: var(--type-color-text);
  }

  .robo-wiki-note:not(:last-child) {
    margin-bottom: var(--space-text);
  }

  .robo-wiki-note__title {
    color: var(--type-color-accent);
    font-size: 90%;
    font-weight: bold;
    text-transform: uppercase;
  }

  .robo-wiki-note__text p:last-child {
    margin-bottom: 0;
  }

  .robo-wiki-note--okay { 
    --type-color-accent: var(--color-note-accent--okay);
    --type-color-pale: var(--color-note-pale--okay);
  }

  .robo-wiki-note--warning {
    --type-color-accent: var(--color-note-accent--warning);
    --type-color-pale: var(--color-note-pale--warning);
  }

  .robo-wiki-note--note {
    --type-color-accent: var(--color-note-accent);
    --type-color-pale: var(--color-note-pale);
  }

  .robo-wiki-note--note .robo-wiki-note__text :not(pre)>code { 
    background: #fff;
  }   

  .robo-wiki-note--warning .robo-wiki-note__text :not(pre)>code { 
    background: #fff;
  }

  .robo-wiki-note--okay .robo-wiki-note__text :not(pre)>code { 
    background: #fff;
  }

  body[data-theme="dark"]  .robo-wiki-note a {
    color: #78fffd;
  }

</style>