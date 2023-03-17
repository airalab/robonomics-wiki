<template>
    <video ref="video" mute playsinline v-bind="$attrs" v-if="videos">
      <template v-for="video in videos">
        <source :src="video.src" :type="`video/${video.type}`" :key="video.id" />
    </template>
    </video>
</template>

<script>
export default {
  name: 'RoboWikiVideo',

  props: {
    videos: {
      type: Array,
      default: null,
      required: true
    }
  },

  data() {
    return {
      offsetTop: 0,
      showDisclaimer: false
      
    }
  },

  watch: {
    offsetTop (val) {
      this.toggleAutoplay()
    }
  },

  methods: {
    handelScroll() {
      this.offsetTop = document.querySelector('.custom-scroll').pageYOffset || document.querySelector('.custom-scroll').scrollTop
    },

    toggleAutoplay() {
      const video = this.$refs.video;
      video.muted = true;
        let playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then((_) => {
            let observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                    if (
                        entry.intersectionRatio !== 1 &&
                        !video.paused
                    ) {
                        video.pause();
                    } else if (video.paused) {
                        video.play();
                    }
                });
              },
              { threshold: 0.2 }
            );
            observer.observe(video);
        });
      }
    },
  },

  mounted() {

    if(this.$refs.video.getAttribute('autoplay')) {
      document.querySelectorAll('.all-content ').forEach(item => {
        item.addEventListener('scroll', this.handelScroll)
      })
    }
  },

  beforeDestroy () {
    if(this.$refs.video.getAttribute('autoplay')) {
      document.querySelectorAll('.all-content ').forEach(item => {
        item.removeEventListener('scroll', this.handelScroll)
      })
    }

  },

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

  .box {
    height: 0;
    width: 0;
  }
</style>