<template>
  <footer class="footer">
    <div class="layout__page">
      <div class="footer-socials">
        <g-link class="footer-socials__link" to="https://github.com/airalab">
          <Icon class="footer__icon" icon="github"/>
        </g-link>
        <g-link class="footer-socials__link" to="https://discord.gg/JpaN2XAmqY">
          <Icon class="footer__icon" icon="discord"/>
        </g-link>
        <g-link class="footer-socials__link" to="https://twitter.com/AIRA_Robonomics">
          <Icon class="footer__icon" icon="twitter"/>
        </g-link>
      </div>
      <div class="footer__links">
        <ul class="footer__list">
          <li class="footer__item">
            <g-link class="footer__link" to="/docs/edit-wiki/">
              How to edit Wiki
            </g-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style>
  .footer {
    padding-top: var(--space);
  }

  .footer-socials {
    padding-top: var(--space);
    padding-bottom: var(--space);
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--footer-border-color);
    border-bottom: 1px solid var(--footer-border-color);
  }

  .footer-socials__link {
    display: inline-block;
    transition: fill 0.33s ease-in-out;
  }

  .footer-socials__link:focus {
    box-shadow: unset;
  }

  .footer-socials__link:focus .footer__icon > svg path {
    fill: var(--code-text-inline);
  }

  .footer-socials__link:not(:last-child) {
    margin-right: 35px;
  }

  .footer__icon > svg {
    width: 46px;
    height: 35px;
    fill: transparent;
  }

  .footer__icon svg path {
    fill: var(--ghLogo);
  }

  .footer__links {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }


  .footer__list {
    margin: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer__item {
    margin-bottom: 0;
  }

  .footer__item:not(:last-child) {
    margin-right: 35px;
  }

  .footer .footer__link {
    font-family: var(--font-family-code);
    color: var(--title-color);
    text-decoration: none;
    transition: opacity 0.33s ease-in-out;;
  }

  .footer .footer__link:hover {
    opacity: 0.5;
  }

  .footer .footer__link:focus {
    box-shadow: unset;
    color: var(--link-color)
  }

  @media screen and (max-width: 560px) {
    .footer__list {
      flex-direction: column;
      text-align: center;
    }

    .footer__item:not(:last-child) {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
</style>


<script>
  export default {
    components: {
      Icon: () => import("~/components/Icon.vue")
    }
  }
</script>