<template>
  <div id="app" class="layout">

      <div class="footerPusher">
        <header class="header">
          <div class="layout__page flex-line">
            <div class="header__section header__logo">
              <g-link to="/">
                <g-image :alt="$static.metadata.siteName" src="~/assets/images/robonomics-logo-sign-sm.svg"/>
                <span>{{ $static.metadata.siteName }}</span>
              </g-link>
            </div>

            <div class="header__section flex-line header__nav">

              <g-link class="header__nav__logo" to="/">
                <g-image :alt="$static.metadata.siteName" src="~/assets/images/robonomics-logo-sign-sm.svg"/>
              </g-link>
              
              <div class="header__nav__links header__nav__section">
                <g-link to="https://robonomics.network">Website</g-link>
                <g-link to="https://github.com/airalab/robonomics_specs/blob/master/pdf/whitepaper_en.pdf">White Paper</g-link>
              </div>

              <div class="header__nav__search header__nav__section">
                <input
                  id="search"
                  v-model="searchTerm"
                  type="text"
                  placeholder="Search" />


                <div class="searchresults">
                  <g-link
                    v-for="result in searchResults"
                    :key="result.id"
                    :to="result.path"
                    class="searchresults__item">
                    {{ result.title }}
                  </g-link>
                </div>
              </div>

              <div class="header__nav__section">
                <ToggleTheme />
              </div>
            </div>
          </div>
        </header>

        <transition name="fade" appear>
          <main class="main layout__page post">
            <slot/>
          </main>
        </transition>
      </div>

      <footer class="footer">
        <div class="layout__page">
          <nav>
            <g-link to="https://github.com/airalab">Github</g-link>
            <g-link to="https://riot.im/app/#/room/#robonomics:matrix.org">Riot chat</g-link>
            <g-link to="https://twitter.com/AIRA_Robonomics">Twitter</g-link>
          </nav>


          <!-- <div>Copyright © {{ new Date().getFullYear() }} Airalab </div> -->

          
        </div>
      </footer>

    

  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>


<style lang="scss">
.fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter {
    opacity: 0;
  }
  
.header {
  padding: var(--header-padding) 0;
  background-color: var(--header-bg);

  top:0;
  z-index: 10;
  position: sticky;
  width: 100%;
  z-index: 9999;

  color: var(--header-link) !important;

  a {
    color: currentColor;
  }

  &__logo{
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;

    a {
      text-decoration: none;
    }

    img, span {
      display: inline-block;
      vertical-align: middle;
    }

    img{
        // width: 30px;
        height: var(--header-logo-height);
        margin-right: 15px;
      }
    }

  &__nav{
    font-size: 0.8rem;

    &__section {
      margin-right: calc(var(--space) / 2);
      &:last-child{ margin-right: 0; }
    }

    &__logo{
      display: none;
      margin-right: 0.7rem;

      img{
        width: 2rem;
      }
    }


    &__links{
      white-space: nowrap;
      overflow-x: auto;

      a {
        text-transform: uppercase;
        letter-spacing: 1px;
        text-decoration: none;
        font-weight: 700;

        margin-right: calc(var(--space) / 4);
      }
    }


    &__search{
      position: relative;

      input[type="text"]{
        transition: 0.2s ease all;
        background-color: var(--color-dark);
        border-color: rgba(255,255,255,.1);
        color: var(--color-light);
        font-weight: 700;
        width: 100px;

        &:focus{
          border-color: rgba(255,255,255,.2);
          width: 180px;

          & ~ .searchresults{
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
}
}


.searchresults{
  position: absolute;
  top: calc(100% + .5rem);
  right: 0;
  min-width: 200px;

  background-color: var(--color-dark);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: var(--radius);

  transition: 0.4s ease opacity;
  opacity: 0;
  visibility: hidden;

  &__item{
    display: block;
    border-bottom: 1px solid rgba(255,255,255,.1);
    padding: .5rem .8rem;
    text-decoration: none;
    font-weight: 700;
  }
}



.main {
  margin: 0 auto;
  padding-top: var(--space);
  padding-bottom: var(--space);
}

.layout{
  display: flex;
  flex-direction: column;
  height: 100%;

  .footerPusher{
    flex: 1 0 auto;
  }

  .footer{
    flex-shrink: 0;
  }
}



.footer {
  text-align: center;
  font-size: .8rem;

  & > .layout__page {
    border-top: 1px solid currentColor;
    padding-top: calc(var(--space) / 4);
    padding-bottom: calc(var(--space) / 4);
  }

  nav{

    a{
      margin: 0 10px;
      text-transform: uppercase;
      font-weight: 700;
      text-decoration: none;
    }
  }

  a {
    color: currentColor;
  }
}



@media screen and (max-width: 1080px) {
    .header {
      padding: calc(var(--space) / 2) 0;
    }

    .searchresults{
      left: 0;
    }
}


@media screen and (max-width: 860px) {
  .header{
    &__logo{
        display: none;
      }

    &__nav{

      flex-wrap: nowrap;
      
      &__logo{
        display: block;
      }

    }


    & > .flex-line{
      flex-wrap: wrap;

      .header__section{
        min-width: 100%;
        margin-bottom: calc(var(--space)/2);

        &:last-child{
          margin-bottom: 0;
        }
      }
    }

    .header__nav__search{
      flex-grow: 1;

      input[type="text"]{
        width: 100%;
      }
    }
  }

}


@media screen and (max-width: 500px) {
  .header{

    &__nav{

      // flex-wrap: wrap;
    
      // &__search{
      //   order: 10;
      //   min-width: 100%;
      //   margin-top: calc(var(--space)/2);
      // }

      flex-wrap: nowrap;

      &__search{
        display: none;
      }

    }
  }

}
</style>


<script>
import ToggleTheme from '~/components/ToggleTheme.vue'
import Search from 'gridsome-plugin-flexsearch/SearchMixin'

export default {
  components: {
    ToggleTheme
  },
  mixins: [Search]
}
</script>
