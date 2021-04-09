<template>

  <select v-if="langs" tabindex="0" @change="changelocale($event)">
  
      <template v-for="(item,key) in langs">
        <option v-bind:key="key" :selected="item == locale" v-bind:value="item">{{ item }}</option>
      </template>

  </select>
  
</template>

<static-query>
query {
  metadata {
    locales
  }
}
</static-query>


<script>

export default {

  computed: {
    locale() {
      return this.$store.state.locale
    },

    currentPath(){
      return this.$route.path
    },

    langs() {
      return this.$static.metadata.locales
    }
  },

  methods: {
    changelocale(event) {

      let lang = event.target.value

      //update appOptions for locale
      this.$store.commit('setlocale', lang)

      //redirect to page with chosen locale
      let newpath = this.$path(this.currentPath, lang) //helper from main.js
      this.$router.push(newpath)
      // window.location.href = newpath


    }
  }

}

</script>

<style scoped>
  select:focus { outline: 2px solid var(--color-focus); box-shadow:  none; } /* accessibility */

  select {
    color: var(--text-color);
  }
</style>