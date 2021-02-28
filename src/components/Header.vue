<template>
  <header class="header">
    <div class="layout__page">

      <div class="header-top">

        <g-link to="/" class="header-logo">
          <g-image :alt="$static.metadata.siteName" src="~/assets/images/robonomics-logo-sign-sm.svg" class="inline-block"/>
          <span class="inline-block">{{ $static.metadata.siteName }}</span>
        </g-link>

        <Search/>

        <div class="header-nav">
          <g-link class="inline-block" to="https://discord.gg/5UWNGNaAUf">Discord</g-link>
          <g-link class="inline-block" to="https://discourse.robonomics.network">Forum</g-link>
          <g-link class="inline-block" to="https://github.com/airalab/">Github</g-link>
          <ToggleTheme class="inline-block" />
        </div>
      </div>

    </div>
    
  </header>
</template>

<style lang="scss" scoped>

  .header {
    --logo-w: 30px;

    padding: var(--header-padding) 0;
    background-color: var(--header-bg);

    top:0;
    z-index: 10;
    position: sticky;
    width: 100%;
    z-index: 9999;

    color: var(--header-link);

    a {
      color: currentColor;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      text-align: left;
      text-decoration: none;
    }
  }

  .header-top {
    display: grid;
    grid-template-columns: minmax(0,var(--width-sidebar-left)) auto minmax(0,var( --width-sidebar-right));
    gap: var(--space);
    align-items: center;
    justify-items: stretch;
    grid-auto-flow: column;
  }

  .header-logo {
    display: block;

    img {
      max-width: var(--logo-w);
    }

    > *:not(:last-child) {
      margin-right: 15px;
    }
  }

  .header-nav {
    font-size: 70%;

    & > *:not(:last-child) {
      margin-right: 15px;
    }
  }



  .header {
    .search-container {
      input[type="text"]{
        background-color: var(--header-link);
        border-color: rgba(255,255,255,.1);
        color: var(--color-dark);
        font-weight: 700;

        &::placeholder {
          color: var(--color-dark);
        }

        &:focus::placeholder {
          color: var(--header-link);
        }
      }

      &.active{
          input[type="text"] {
            border-color: rgba(255,255,255,.2);
          }
      }

      .searchresults{
        background-color: var(--color-dark);
        border-radius: var(--radius);

        &__item{
          border-color: rgba(255,255,255,.1);
        }
      }
    }
  }

  @media screen and (max-width: 780px) {
    .header-logo span { display: none; }
    .header-top {
      grid-template-columns: var(--logo-w) auto auto;
    }
    .header-nav {grid-column-start: 2; text-align: left; }
    .search-container {grid-column-start: 3;}
  }

  @media screen and (max-width: 600px) {
    .header {
      position: static;
    }
    
    .header-top {
      grid-template-columns: var(--logo-w) 1fr;
      grid-template-rows: repeat(1fr,2);
      row-gap: calc(var(--space)/2);
    }

    .search-container {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;
    }

    .header-nav { text-align: right; font-size: 60%; }
  }

   @media screen and (max-width: 340px) {
    .header-nav { font-size: 50%; }
  }
</style>


<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>


<script>

export default {
  components: {
      NavIcon: () => import('~/components/NavIcon.vue'),
      Search: () => import('~/components/Search.vue'),
      ToggleTheme: () => import('~/components/ToggleTheme.vue'),
  },
}
</script>