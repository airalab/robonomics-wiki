<template>
  <header class="header">
    <div class="layout__page">

      <div class="header-top">

        <g-link to="/" class="header-logo">
          <g-image :alt="$st('Robonomics WIKI', $store.state.locale)" src="~/assets/images/robonomics-logo-sign-sm.svg" class="inline-block"/>
          <span class="inline-block">{{ $st('Robonomics WIKI', $store.state.locale) }}</span>
        </g-link>

        <div class="header-center">
          <Search/>
        </div>

        <div class="header-nav">
          <ToggleTheme class="inline-block" />
          <ToggleLang class="inline-block" />
          <NavIcon class="inline-block hiddenDesktop" :section="'sidebarDocs'" :icon="'Menu'" v-if="!homePage"/>
        </div>

      </div>

    </div>
    
  </header>
</template>

<style lang="scss">

  .header {

    --header-padding: 1rem;
    --width-logo-sign: 2rem;

    padding: var(--header-padding) 0;
    background-color: var(--header-color-bg);

    position: sticky;
    top:0;
    z-index: 9999;


    a {
      text-decoration: none;
      color: var(--header-color-text);
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
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;

    img { max-width: var(--width-logo-sign) }
  }

  .header-logo, .header-nav {
    & > *:not(:last-child) {
      margin-right: 1rem;
    }
  }

  .header-nav { text-align: right; }


  @media screen and (max-width: 860px) {
    .header-top {
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      gap: calc( var(--space)/2 )
    }

    .header-center {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;

      .searchresults {
        top: 7rem !important
      }
    }

  }

  @media screen and (max-width: 620px) {
    .header-top { grid-template-columns: var(--width-logo-sign) auto; }
    .header-logo span { display: none; }
  }

   @media screen and (max-width: 340px) {
    .header-nav { font-size: 50%; }
  }

  body[data-theme="dark"] {
    select {
      background-image: url("data:image/svg+xml;utf8,<svg fill='#ced8de' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    }
  }

  html[lang="ru"] .header-logo { font-size: 1rem; }
</style>


<script>

export default {

  components: {
    NavIcon: () => import("~/components/NavIcon.vue"),
    Search: () => import("~/components/Search.vue"),
    ToggleTheme: () => import("~/components/ToggleTheme.vue"),
    ToggleLang: () => import("~/components/ToggleLang.vue"),
},

  computed:{
    homePage(){
      return this.$route.path == "/" || this.$route.path == "/" + this.$store.state.locale || this.$route.path == "/" + this.$store.state.locale + "/"
    }
  }
}
</script>