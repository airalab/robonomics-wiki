<template>
  <Layout>

    <div class="page-404">

      <div class="page-404__image">
        <div class="page-404__image-wrapper">
          <g-image class="page-404__main-img" aria-hidden="true" src="../assets/images/404/404-img-bg.png" />
          <g-image class="page-404__sub-image code-img" aria-hidden="true" src="../assets/images/404/404-code.png" />
          <g-image class="page-404__sub-image left-arm" aria-hidden="true" src="../assets/images/404/404-left-arm.png" />
          <g-image class="page-404__sub-image left-hand" aria-hidden="true" src="../assets/images/404/404-left-hand.png" />
          <g-image class="page-404__sub-image right-arm" aria-hidden="true" src="../assets/images/404/404-right-arm.png" />
          <g-image class="page-404__sub-image right-hand" aria-hidden="true" src="../assets/images/404/404-right-hand.png" />
        </div>
      </div>

      <h1>404</h1>

      <p>Page disappeared, we are sorry</p>

      <div class="page-404__wrapper">
        <p>Some content moved to <g-link to="https://robonomics.academy">academy</g-link> or try to find updated content here on <g-link to="https://wiki.robonomics.network">wiki</g-link>.</p>
      </div>
    </div>

  </Layout>
</template>

<script>
import redirects from '../../data/redirects_docs.yaml'
export default {

  components: {
    Button: () => import('~/components/Button.vue'),
  },

  data() {
    return {
      redirectLink: null
    }
  },

  metaInfo() {
    return {
      title: 'This page not found',
      meta: [
        this.movedPage,
        { name: "description", content: 'There can be many reasons for this, for example'},
        {
          property: "og:url",
          content: 'https://wiki.robonomics.network/'
        },
        {
          property: "og:title",
          content: 'This page not found'
        },
        {
          property: "og:description",
          content:  'There can be many reasons for this, for example'
        },
        {
          property: "og:image",
          content: `https://wiki.robonomics.network${require('@images/wiki-og-image-index.png')}`
        },
        {
          property: "og:image:width",
          content: 1280
        },
        {
          property: "og:image:height",
          content: 765
        },
        {
          property: "og:url",
          content: "https://wiki.robonomics.network"
        },
        {
          property: "og:site_name",
          content: "WIKI ROBONOMICS"
        },

        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: 'This page not found'
        },
        {
          name: "twitter:description",
          content:  "Learn Robonomics through tutorials and practically useful experimenting. This documentation is designed to help you connect robots or code dApps within Robonomics Network."
        },
        {
          name: "twitter:image",
          content: `https://wiki.robonomics.network${require('@images/wiki-og-image-index.png')}`
        },
        {
          name: "twitter:site",
          content: "@AIRA_Robonomics"
        },
        {
          name: 'twitter:creator',
          content: "@AIRA_Robonomics"
        },
     ],
     link: this.metaRedirectLink
   }
  },

  computed: {
    redirects() {
      return redirects
    },

    movedPage() {
      if(this.redirectLink) {
        return { 'http-equiv': 'refresh', content:`2; URL=https://wiki.robonomics.network${this.redirectLink}`}
      } else {
        return []
      }

  },

  metaRedirectLink() {
    if(this.redirectLink) {
      return [{ rel: 'canonical', href: this.redirectLink }]
    } else {
      return []
    }
  },
  },

  methods: {
    checkIfPageMoved() {
      const title = this.$route.path.match(/\/([^\/]+)[\/]?$/)[0]
      const route = '/docs' + title;

      this.redirects.map(item => {
        item.options.map(link => {
          if(link === route) {
            this.redirectLink = item.current_link;
          }
        })
      })
    },

    removeLocale() {
      const title = this.$route.path;
      const locales = ['en/', 'ru/', 'es/', 'ja/', 'pt/', 'ko/'];
      locales.map(local => {
        const l = title.replace(local, "");
        if(title.includes(local)) {
          console.log(title)
          window.location.href = `https://wiki.robonomics.network${l}`;
        }
      })
    }
  },

  created() {
    setTimeout(() => {
      this.checkIfPageMoved();
    }, 500)

    this.removeLocale();
    
  }
}
</script>

<style scoped>
  .page-404 {
    position: relative;
    min-height: 350px;
    height: calc(100vh - 345px);
    padding-top: var(--space);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .page-404 h1 {
    font-size: 5rem;
    margin-bottom: 0;
  }

  .page-404 p {
    font-weight: 300;
    font-size: 1.5rem;
    font-style: italic;
    margin-bottom: calc( var(--space) * 2);
  }

  .page-404 p.small {
    margin-top: 0;
    font-size: 0.8rem;
    font-family: var(--font-family-code);
    margin-bottom:0;
  }

  .page-404__wrapper {
    max-width: 460px;
    width: 100%;
  }

  .page-404__wrapper p {
    font-weight: 600;
    font-size: 1.2rem;
    font-style: normal;
    text-align: center;
  }

  .page-404__image {
    position: absolute;
    top: 80px;
    right: 240px;
  }

  .page-404__image::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 8px;
    top: 91px;
    right: 171px;
    background-color: #F6DF8B;
    animation: blink 2s linear infinite alternate;
    border-radius: 100%;
  }

  .page-404__image::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 8px;
    top: 96px;
    right: 190px;
    background-color: #F6DF8B;
    animation-delay: 0.1;
    animation: blink 2s linear infinite alternate;
    border-radius: 100%;
  }

  .page-404__image-wrapper {
    width: 300px;
  }

  .page-404__sub-image {
    position: absolute;
  }

  .page-404__sub-image.code-img {
    width: 40px;
    top: 75px;
    left: 70px;
    animation: fading 3s linear infinite alternate;
  }

  .page-404__sub-image.left-arm {
    width: 39px;
    bottom: 28px;
    left: 171px;
    z-index: -1;
    animation: wave 1.5s linear infinite alternate;
  }

  .page-404__sub-image.left-hand {
    width: 37px;
    bottom: 51px;
    left: 142px;
    animation-delay: 0.5;
    animation: wave2 1.5s linear infinite forwards;
  }

  .page-404__sub-image.right-arm {
    width: 39px;
    bottom: 28px;
    right: 2px;
    z-index: -1;
    animation: wave 1.5s linear infinite alternate;
  }

  .page-404__sub-image.right-hand {
    width: 35px;
    bottom: 65px;
    right: -26px;
    animation-delay: 0.5;
    animation: wave2 1.5s linear infinite forwards;
  }

  @keyframes wave {
    10% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(-10deg);
    }
  }

  @keyframes wave2 {
    10% {
      transform: rotate(5deg) translateX(0) translateY(0);
    }
    50% {
      transform: rotate(10deg) translateX(-5%) translateY(-5%);
    }
  }

  @keyframes blink {
    0% {
      height: 0;
    }
    20% {
      height: 8px;
    }
    40% {
      height: 0;
    }
  }

  @keyframes fading {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1450px) {
    .page-404__image {
      right: 0;
    }
  }

  @media screen and (max-width: 950px) {
    .page-404 {
      min-height: calc(100vh - 345px);
      height: 100%;
      overflow: hidden;
    }
    .page-404__image {
      position: relative;
      top: unset;
      right: unset;
    }
  }

  @media screen and (max-width: 800px) {
    .page-404 a {
      font-size: 100%;
    }
  }

  @media screen and (max-width: 420px) {
    .page-404__image-wrapper {
      width: 210px;
    }

    .page-404__image::after {
      top: 62px;
      right: 119px;
    }

    .page-404__image::before {
      top: 67px;
      right: 132px;
    }

    .page-404__sub-image.code-img {
      top: 48px;
      left: 50px;
    }

    .page-404__sub-image.left-arm {
      width: 32px;
      bottom: 16px;
      left: 117px;
    }

    .page-404__sub-image.left-hand {
      width: 30px;
      bottom: 34px;
      left: 94px;
    }

    .page-404__sub-image.right-arm {
      width: 32px;
      bottom: 28px;
      right: 2px;
    }

    .page-404__sub-image.right-hand {
      width: 27px;
      bottom: 60px;
      right: -18px;
    }

    .page-404 a {
      font-size: 80%;
    }

    
    .page-404 p {
      font-size: 1.2rem;
      text-align: center;
    }

    .page-404__wrapper p {
      font-size: 1rem;
    }
  } 

  
</style>
