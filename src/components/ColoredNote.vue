<template>
  <h2 v-if="title" class="colorful-title" :style="{borderLeftColor: getColor}">{{title}}</h2>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    type: {
      type: String
    }
  },

  computed: {
    getColor() {
      switch(this.type) {
        case 'okay': 
          return '#3eaf7c';
        case 'warning':
          return '#f08432';
        case 'note':
          return '#90a4b7';
        default: 
          return 'none'
      }
    }
  },

}
</script>

<style lang="scss">
  .post {
    .colorful-title {
      display: inline-block;
      padding: 0.35rem 1rem;
      font-size: 1.2rem;
      font-weight: 400;
      color: #2c3e50;
      background-color: #f2f2f2;
      border-top: 1px solid transparent;
      border-left: 0.4rem solid transparent;
      text-transform: none;
    }
  }

</style>