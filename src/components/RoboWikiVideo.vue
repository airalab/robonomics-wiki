<template>
  <video :autoplay="autoplay" :muted="muted" :loop="loop" :controls="controls" v-bind="$attrs">
    <source v-if="!local" :type="`video/${this.videoType}`" :src="src" />
    <source v-else :type="this.videoType" :src="videoLink.src" />
  </video>
</template>

<script>
export default {
  name: 'RoboWikiVideo',

  props: {
    src: {
      type: String,
      required: true
    },
    controls: {
      type: Boolean,
      default: true,
    },
    muted: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    loop: {
      type: Boolean,
      default: true
    },
    local: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: null
    }
  },

  data()  {
    return {
      type: ''
    }
  },

  computed: {
    videoLink() {
      if(this.local) {
        return require(`!!assets-loader!@videosMarkdown/${this.src}`)
      }
    },

    videoType() {
      if(this.format) {
        return this.format
      } else {
        const dotIndex = this.src.lastIndexOf('.');
        const format = this.src.substring(dotIndex);
        return format.substring(1)
      }
    }
  }

}
</script>

<style scoped>
  video {
    /* max-width: 760px; */
    width: 100%;
    display: block;
    margin: 0 auto;
    margin-bottom: var(--space);
  }
</style>