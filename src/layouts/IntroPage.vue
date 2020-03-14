<template>
  <div id="app" class="layout screen">
      <ToggleTheme />
      
      <transition name="fade" appear>
        <div class="layout__content">
          <slot/>
        </div>
      </transition>
  </div>
</template>


<style lang="scss">
  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter {
    opacity: 0;
  }

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