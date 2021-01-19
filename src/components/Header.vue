<template>
  <header class="header">
    <div class="layout__page">

      <div class="header__section header__logo">
        <g-link to="/">
          <g-image :alt="$static.metadata.siteName" src="~/assets/images/robonomics-logo-sign-sm.svg"/>
          <span>{{ $static.metadata.siteName }}</span>
        </g-link>
      </div>
      
      <div class="header__section header__nav">  
        
        <Search/>

        <NavIcon :section="'headerNav'" :sectionClass="'hiddenDesktop'"/>

        <div id="headerNav" class="header__nav__links header__nav__section hiddenMobile">
          <g-link to="https://discourse.robonomics.network">Forum</g-link>
          <g-link to="https://github.com/airalab/">Github</g-link>
          <ToggleTheme />
        </div>

      </div>


    </div>
    
  </header>
</template>

<style lang="scss">
  .header {
    .search-container {
      input[type="text"]{
        // background-color: var(--color-dark);
        background-color: var(--header-link);
        border-color: rgba(255,255,255,.1);
        // color: var(--color-light);
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


  .header__nav {
    .sectionToggler svg {
        float: right;
    }
  }

  .header__nav__links {
    @media screen and (max-width: 1080px) {
      background: var(--header-link);

      width: 100%;
      position: absolute;
      top: 65px;
      left: 0;
      height: 53px;

      color: var(--color-dark);

      &:not(.hiddenMobile) { display: flex; }
      align-items: center;
      justify-content: center;

      svg { stroke: var(--color-dark) }
      &> *:not(:last-child) { margin-right: calc(var(--space) / 2); }
      
    }
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