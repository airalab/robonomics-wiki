<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<style lang="scss">
.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>