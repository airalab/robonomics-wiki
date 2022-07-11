<script>

export default {
  name: "robo-wiki-title",
  props: {
    type: Number,
    anchor: String
  },
  render(createElement) {
    return createElement(
      'h' + this.type,
      {
        attrs: {
          id: this.anchor.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g, '-'),
          class: 'robo-wiki-title'
        }
      }, 
      [
        createElement('a', {
          attrs: {
            href: '#' + this.anchor.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g, '-'),
            'aria-hidden': true
          }
        }, '#'),
        this.$slots.default
      ],
    )
  }
}

</script>
