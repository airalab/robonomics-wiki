<template>
    <!-- <script type="application/javascript" :src="'https://asciinema.org/a/'+vid+'.js'" :id="'asciicast-' + vid" async :data-autoplay="autoplay"></script> -->

    <p><g-link :href="'https://asciinema.org/a/'+vid">
      <img :src="'https://asciinema.org/a/'+ vid + '.png'"/>
      <span>Click on picture to view asciinema video</span>
    </g-link></p>
</template>

<script>

export default {

  props: {
    vid: {
        type: String
    },
    autoplay: {
        type: Boolean,
        default: true
    }
  },

};
</script>