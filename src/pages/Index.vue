<template>
  <Layout>

    <g-image class="intro-image" src="~/assets/images/robonomics-lab.png"/>

    <div class="intro">
      <h1>{{$st('Enter title', $store.state.locale)}}</h1>
      <div class="intro-description">{{ $st('Site Description', $store.state.locale) }}</div>
    </div>

    <nav class="grid-navigation">
      <g-link :to="$path('/docs/', $store.state.locale)" :aria-label="$st('Menu', $store.state.locale) + ' ' + $st('Enter Nav 1', $store.state.locale)">{{$st('Enter Nav 1', $store.state.locale)}}</g-link>
      <g-link :to="$path('/docs/playground-overview/', $store.state.locale)" :aria-label="$st('Menu', $store.state.locale) + ' ' + $st('Enter Nav 2', $store.state.locale)">{{$st('Enter Nav 2', $store.state.locale)}}</g-link>
      <g-link :to="$path('/docs/robonomics-test-network-manual/', $store.state.locale)" :aria-label="$st('Menu', $store.state.locale) + ' ' + $st('Enter Nav 3', $store.state.locale)">{{$st('Enter Nav 3', $store.state.locale)}}</g-link>
      <g-link :to="$path('/docs/connect-sensor-to-robonomics/', $store.state.locale)" :aria-label="$st('Menu', $store.state.locale) + ' ' + $st('Enter Nav 4', $store.state.locale)">{{$st('Enter Nav 4', $store.state.locale)}}</g-link>
      <g-link :to="$path('/docs/robonomics-js/', $store.state.locale)" :aria-label="$st('Menu', $store.state.locale) + ' ' + $st('Enter Nav 5', $store.state.locale)">{{$st('Enter Nav 5', $store.state.locale)}}</g-link>
      <g-link :to="$path('/docs/contributing/', $store.state.locale)" :aria-label="$st('Menu', $store.state.locale) + ' ' + $st('Enter Nav 6', $store.state.locale)">{{$st('Enter Nav 6', $store.state.locale)}}</g-link>
    </nav>

  </Layout>
</template>



<style lang="scss" scoped>
  .grid-navigation {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space);
    margin-top: var(--space);
    margin-bottom: var(--space);

    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;

    a {
      transition: 0.2s ease all;
      display: block;
      text-decoration: none;
      padding: var(--space);
      border: 1px solid var(--border-color);

      box-shadow: 0.2rem 0.2rem 0 0 var(--link-color);
      border-color: var(--link-color);
      background-color: var(--color-link-background-highlight);

      &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0.2rem 0.2rem 0.8rem var(--link-color);
      }
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 550px) {
      grid-template-columns: 1fr;
    }
  }


  .intro {
    padding-top: calc(var(--space) * 3);
    padding-bottom: calc(var(--space) * 2);
  }

  .intro-description {
    max-width: 60%;
  }

  .intro-image {
    display: block;
      border: 0;
      position: absolute;
      top: 0;
      right: 0;
      width: 40%;
      max-width: 620px;
  }

  @media screen and (max-width: 1080px) {
    .intro-image {
      position: static;
      width: 100%;
      margin: 0 auto;
    }

    .intro-description {
      max-width: 100%;
    }

    .intro {
      text-align: center;
      padding-top: calc(var(--space) * 2);
    }

    .grid-navigation {
      margin-bottom: calc(var(--space) * 2);
    }
  }
</style>


<script>
export default {
  components: {
      Button: () => import('~/components/Button.vue')
    },


  metaInfo() {
    return {
      title: this.$st('Enter title', this.$store.state.locale),
      meta: [
        { name: "description", content: this.$st('Site Description', this.$store.state.locale) }
     ]
   }
  }
}

</script>