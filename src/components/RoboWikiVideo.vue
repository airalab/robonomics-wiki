<template>
  <video :autoplay="autoplay" :muted="muted" :loop="loop" :controls="controls">
    <source v-if="!local" :type="`video/${this.type}`" :src="src" />
    <source v-else :type="videoLink.mimeType" :src="videoLink.src" />
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
      default: false,
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

    }
  },

  methods: {
    getType() {
      const dotIndex = this.src.lastIndexOf('.');
      const format = this.src.substring(dotIndex);
      this.type = format.substring(1)
    }
  },

  mounted() {
    this.getType();
  }

}
</script>

<style scoped>
  video {
    max-width: 760px;
    width: 100%;
    display: block;
    margin: 0 auto;
    margin-bottom: var(--space);
  }
</style>