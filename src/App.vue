<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-to { opacity: 0; }
*:focus { box-shadow: 0 0 0 2px var(--color-focus)}
</style>