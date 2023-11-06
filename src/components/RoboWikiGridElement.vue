<template>
  <div 
    class="robo-wiki-grid-item"
  >
   <slot/>
  </div>
</template>

<script>
export default {
  name: 'RoboWikiGridElement',
}
</script>

<style scoped>
 .robo-wiki-grid-item {
  padding: 0.5rem 0.8rem;
  /* height: 100%; */
 }
</style>