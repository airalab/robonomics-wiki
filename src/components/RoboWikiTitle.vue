<script>

export default {
  name: "robo-wiki-title",
  props: {
    
    type: {
      type: Number | String,
      required: true,
      validator: function (value) {
        return [ 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6'].indexOf(value) !== -1;
      }
    },
    anchor: String
  },
  render(createElement) {
    return createElement(
      'h' + this.type,
      {
        attrs: {
          id: this.anchor && this.anchor.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g, '-').toLowerCase(),
          class: 'robo-wiki-title'
        }
      }, 
      [
        createElement('a', {
          attrs: {
            href: this.anchor && '#' + this.anchor.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g, '-').toLowerCase(),
            'aria-hidden': true,
            class: !this.anchor ? 'hide' : null
          }
        }, '#'),
        this.$slots.default
      ],
    )
  }
}

</script>

<style scoped>
  .hide {
    display: none;
  }
</style>