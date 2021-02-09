<template>
    <script type="application/javascript" :src="'https://asciinema.org/a/'+vid+'.js'" :id="'asciicast-' + vid" async :data-autoplay="autoplay"></script>
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