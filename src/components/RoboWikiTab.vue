<template>
  <div 
    class="robo-wiki-tabs__wrapper" 
    :class="{'robo-wiki-tabs__wrapper--border': border}"
    v-show="isActive"
  >
    <slot/>
  </div>
</template>

<script>
export default {

  props: {
    title: {
      type: String,
      required: true
    },
    border: {
      type: Boolean,
      default: false
    }
  },


  data() {
    return {
      isActive: true,
    }
  },
}
</script>

<style scoped>
  .robo-wiki-tabs__wrapper {
    width: 100%;
    overflow: hidden;
  }

  .robo-wiki-tabs__wrapper--border {
    padding: 10px;
    border: 1px solid var(--text-color);
  }

  .robo-wiki-tabs--vertical .robo-wiki-tabs__wrapper pre{
    margin-bottom: 0;
  }

  .robo-wiki-tabs--vertical .robo-wiki-tabs__wrapper {
    margin-left: 2.5rem;
  }

</style>