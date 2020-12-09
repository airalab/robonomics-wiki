<template>
  <div id="app" class="layout screen">
      <ToggleTheme />

      <div class="layout__content">
        <slot/>
      </div>

  </div>
</template>


<style lang="scss">

  .screen .toggle-theme{
    color: currentColor;
    position: absolute;
    top: var(--space);
    right: var(--space);
  }

  .layout.screen{
    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;
  }
</style>


<script>
import ToggleTheme from '~/components/ToggleTheme.vue'

export default {
  
  components: {
    ToggleTheme
  },

  mounted: function(){

    if( localStorage.intro == 'skip' ){
      document.location.href = '/docs/'
    }
    else{
      localStorage.intro = 'skip';
    }

  }
}
</script>