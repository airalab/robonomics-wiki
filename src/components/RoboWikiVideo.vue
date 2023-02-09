<template>
  <video v-bind="$attrs" v-if="videos">
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

  // computed: {
  //   videosList () {
  //     if(this.local) {
  //       return this.videos.map((item) => ({
  //               ...item, 
  //               src: require(`!!assets-loader!@videosMarkdown/${item.src}`)
  //       }))
  //     } else {
  //       return this.videos
  //     }
  //   }
  // }

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