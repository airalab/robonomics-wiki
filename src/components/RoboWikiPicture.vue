<template >
  <figure class="robo-wiki-picture">
    <g-link 
      :to="link ? link : picture.src" 
      class="robo-wiki-picture__link"
      target="_blank"
    >
      <g-image 
        v-if="!isGif() && type === 'markdown'" 
        ref="image" 
        v-bind="$attrs"
        :src="picture" 
      />

      <img v-if="isGif() && type === 'markdown'" v-bind="$attrs" :src="pictureSrc && pictureSrc.src" />

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
      picture: require(`!!assets-loader!@imagesMarkdown/${this.src}`),
      darkSrc: '',
    }
  },

  computed: {
    theme() {
      return this.$store.state.theme;
    },

    pictureSrc() {
      if(this.darkSrc && this.$store.state.theme === 'dark') {
        try {
          return require(`!!assets-loader!@imagesMarkdown/${this.darkSrc}`)
        } catch (e) {
          return this.picture
        }
      } else {
        return this.picture
      }
    },
  },

  watch: {
    theme () {
     this.getDarkThemeImage()
    }
  },

  methods: {
    isGif() {
      const dotIndex = this.src.lastIndexOf('.');
      const format = this.src.substring(dotIndex);

      if(format === '.gif') {
        return true
      } else {
        return false
      }
    },

    getDarkThemeImage() {
      if(this.$store.state.theme === 'dark') {
        const dotIndex = this.src.lastIndexOf('.');
        const format = this.src.substring(dotIndex);
        const name = this.src.substring(0, dotIndex);

        this.darkSrc = name + '-dark' + format;
      }       
    }
  },

  mounted() {
    this.getDarkThemeImage();
  }

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