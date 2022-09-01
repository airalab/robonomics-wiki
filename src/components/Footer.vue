<template>
  <footer class="footer">
    <div class="layout__page">

      <div>
        <h4>Main Links</h4>

        <ul>
          <li><g-link to="https://robonomics.network/">Website</g-link></li>
          <li><g-link to="https://dapp.robonomics.network/#/">Robonomics dApp</g-link></li>
          <li><g-link to="https://robonomics.cloud">Robonomics Web Services</g-link></li>
          <li><g-link to="https://github.com/airalab/">Github</g-link></li>
        </ul>
      </div>

      <div>
        <h4>Ways to contribute</h4>

        <ul>
          <li><g-link to="https://robonomics.network/land/support-academia/">Academia Support Program</g-link></li>
          <li><g-link to="https://robonomics.network/blog/community-incentive-program/">Community Incentive Program</g-link></li>
          <li><g-link to="https://robonomics.network/blog/rewards-for-ambassadors-and-influencers/">For ambassadors and influencers</g-link></li>
          <li><g-link to="https://robonomics.network/blog/rewards-for-researchers-developers-and-engineers/">For researchers, developers and engineers</g-link></li>
        </ul>
      </div>

      <div>
        <h4>Announcement channels</h4>

        <ul>
          <li><g-link to="https://twitter.com/AIRA_Robonomics">Twitter</g-link></li>
          <li><g-link to="https://t.me/robonomics">Telegram International</g-link></li>
          <li><g-link to="https://t.me/robonomicsru">Telegram Русский</g-link></li>
          <li><g-link to="https://t.me/robonomicsfr">Telegram Français</g-link></li>
          <li><g-link to="https://t.me/RobonomicsESP">Telegram Español</g-link></li>
        </ul>
      </div>

      <div>
        <h4>Ask your questions</h4>

        <ul>
          <li><g-link to="https://discord.gg/5UWNGNaAUf">Discord</g-link></li>
          <li><g-link to="https://riot.im/app/#/room/#robonomics:matrix.org">Riot</g-link></li>   
          <li><g-link to="https://discourse.robonomics.network">Forum</g-link></li>   
        </ul>
      </div>
      
    </div>
  </footer>
</template>

<style scoped>
  .footer {
    padding-top: var(--space);
    padding-bottom: var(--space);
    border-top: 1px solid var(--border-color)
  }

  .layout__page {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space);
  }

  @media screen and (max-width: 880px) {
    .layout__page { grid-template-columns: repeat(2, 1fr); }
  }

  @media screen and (max-width: 480px) {
    .layout__page { grid-template-columns: 1fr; }
  }

  ul {
    list-style-type: circle;
  }
</style>


<script>

</script>