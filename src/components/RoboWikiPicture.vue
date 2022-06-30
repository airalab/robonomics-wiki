<template>
  <div class="robo-wiki-picture">
    <g-link v-if="link" :to="link" class="robo-wiki-picture__link">
      <g-image v-if="type === 'markdown'" ref="image" :src="require(`!!assets-loader!@imagesMarkdown/${src}`)" width="500"/> 
      <g-image v-else :src="require(`!!assets-loader!@images/${src}`)" width="500"/> 
    </g-link>
    <div v-else>
        <g-image v-if="type === 'markdown'" ref="image" :src="require(`!!assets-loader!@imagesMarkdown/${src}`)" width="500"/> 
        <g-image v-else :src="require(`!!assets-loader!@images/${src}`)" width="500"/> 
    </div>
    <span v-if="caption" class="robo-wiki-picture__text">{{caption}}</span>
  </div>
</template>

<script>
export default {
  name: 'RoboWikiPicture',

  props: {
    caption: {
      type: String,
      default: null
    },
    src: {
      type: String,
      default: null,
      required: true
    },
    link: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'markdown'
    }
  },

}
</script>

<style scoped>
  .robo-wiki-picture{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

</style>