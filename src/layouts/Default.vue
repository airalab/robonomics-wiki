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
</style>


<script>
export default {
  components: {
    Header: () => import('~/components/Header.vue'),
  },
}
</script>
