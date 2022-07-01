<template>
  <figure class="robo-wiki-picture">
    <g-link 
      :to="link ? link : picture.src" 
      class="robo-wiki-picture__link"
      target="_blank"
    >
      <g-image 
        v-if="type === 'markdown'" 
        ref="image" 
        v-bind="$attrs"
        :src="picture" 
      />

      <g-image 
        v-else 
        v-bind="$attrs"
        :src="require(`!!assets-loader!@images/${src}`)" 
      /> 
    </g-link>
    <figcaption v-if="caption" class="robo-wiki-picture__text">{{caption}}</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'RoboWikiPicture',
  inheritAttrs: false,

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

  data(){
    return {
      picture: require(`!!assets-loader!@imagesMarkdown/${this.src}`)
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

  .robo-wiki-picture__link[target=_blank]:after {
    display: none;
  }

</style>