<template>
  <div id="app" class="layout">

      <div class="footerPusher">
      
        <Header/>

        <main class="main layout__page post">
          <slot/>
        </main>

      </div>

      <footer class="footer">
        <div class="layout__page">
          <nav>
            <g-link to="https://robonomics.network">Website</g-link>
            <g-link to="https://t.me/robonomics">Telegram</g-link>
            <g-link to="https://riot.im/app/#/room/#robonomics:matrix.org">Riot</g-link>
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
.header {
  padding: var(--header-padding) 0;
  background-color: var(--header-bg);

  top:0;
  z-index: 10;
  position: sticky;
  width: 100%;
  z-index: 9999;

  color: var(--header-link) !important;

  & > div {
    display: grid;
    grid-template-columns: 300px auto; 
  }

  a {
    color: currentColor;
  }

  &__logo{
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
    text-align: left;

    a {
      text-decoration: none;
    }

    img, span {
      display: inline-block;
      vertical-align: middle;
    }

    img{
        width: 30px;
        // max-height: var(--header-logo-height);
        margin-right: 15px;
      }
    }

  &__nav{
    font-size: 0.8rem;
    display: grid;
    grid-template-columns: auto 180px;
    align-items: center;
    gap: 20px;

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
      text-align: right;

      & > *:not(:last-child) {
          margin-right: calc(var(--space) / 4);
      }

      & > * {
        display: inline-block;
        vertical-align: middle;
      }

      a {
        text-transform: uppercase;
        letter-spacing: 1px;
        text-decoration: none;
        font-weight: 700;

        
      }
    }




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

@media screen and (max-width: 880px) {
  .header > div {
    grid-template-columns: 60px auto; 
  }

  .header__logo {
    span {
      display: none;
    }
  }
}


@media screen and (max-width: 480px) {
  .header__nav {
    grid-template-columns: auto 20px;
  }

  // .header__nav__links {
  //   display: none;
  // }
}

</style>


<script>
export default {
  components: {
    Header: () => import('~/components/Header.vue'),
  },
}
</script>
