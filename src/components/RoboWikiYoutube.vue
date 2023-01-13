<template>
  <div class="youtube-embed">
    <div class="youtube-embed__wrapper">
      <div class="youtube-embed__container">
        <iframe width="1060" height="615" :src="this.videoSrc" title="Youtube Video" frameborder="0" :allow="autoplay ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' : 'autoplay; encrypted-media'" allowfullscreen></iframe>
      </div>

    </div>

  </div>
</template>

<script>

export default {

  props: {
    link: {
      type: String,
      default: '',
      required: true
    },

    autoplay: {
      type: Boolean,
      default: false
    },

    loop: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      videoSrc: 'https://www.youtube.com/embed/'
    }
  },

  methods: {
    getURL() {
      let linkCode = '';

      if(this.link.includes('v=')) {
        linkCode = this.link.split('v=')[1];
      } else {
        const n = this.link.lastIndexOf('/');
        linkCode = this.link.substring(n + 1);
      }

      if(this.autoplay && this.loop) {
        this.videoSrc += linkCode + '?autoplay=1&mute=1&loop=1&playlist=' + linkCode
      }

      if(this.autoplay && !this.loop) {
        this.videoSrc += linkCode + '?autoplay=1&mute=1'
      }

      if (!this.autoplay && !this.loop) {
        this.videoSrc += linkCode 
      }

    }
  },

  mounted() {
    this.getURL();
  }

}
</script>

<style scoped>

.youtube-embed__wrapper {
  width: 100%; 
  margin: 0px auto;
}

.youtube-embed__container {
  position: relative; 
  padding-bottom: 56.25%;
  padding-top: 25px; 
  height: 0px;
}

.youtube-embed__container iframe {
  position: absolute; 
  top: 0px; 
  left: 0px; 
  width: 100%; 
  height: 100%;
}

</style>