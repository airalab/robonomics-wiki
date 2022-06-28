<template>
  <div class="picture-with-link">
    <g-link :to="link" class="picture-with-link__link">
      <g-image v-if="type === 'markdown'" ref="image" :src="require(`!!assets-loader!@imagesMarkdown/${src}`)" width="500"/> 
      <g-image v-else :src="require(`!!assets-loader!@images/${src}`)" width="500"/> 
    </g-link>
    <span v-if="caption" class="picture-with-link__text">{{caption}}</span>
  </div>
</template>

<script>
export default {
  props: {
    caption: {
      type: String
    },
    src: {
      type: String
    },
    link: {
      type: String
    },
    type: {
      type: String,
      default: 'markdown'
    }
  },

}
</script>

<style lang="scss">
  .picture-with-link {
    display: flex;
    align-items: center;
    flex-direction: column;

    &__link {
      width: 500px;
    }
  }
</style>