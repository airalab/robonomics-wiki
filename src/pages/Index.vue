<template>
  <IntroPage>
    <g-link class="logo" to="/">
      <g-image src="~/assets/images/robonomics-logo.png" :alt="$static.metadata.siteName" class="logo__img"/>
    </g-link>

    <h1>{{ $static.metadata.siteName }}</h1>
    <div class="titleDescription">{{ $static.metadata.siteDescription }}</div>
    <g-link class="button button__primary" to="/docs/">Getting started</g-link>
  </IntroPage>
</template>



<style lang="scss">
  .logo{
    display: inline-block;
    width: 200px;
    height: 200px;
    margin-bottom: calc(var(--space)/2);

    &__img{
      display: block;
      width: 100%;
    }
  }

  .titleDescription{
    font-size: 1.2rem;
    margin-bottom: calc(var(--space)/2);
  }
</style>


<static-query>
query {
  metadata {
    siteName,
    siteDescription
  }
}
</static-query>


<script>

import IntroPage from '~/layouts/IntroPage.vue'

export default {
  components: {
      IntroPage
    }
  }

</script>