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

      <Button label="GO HOME" link="/" size="large" />
    </div>

  </Layout>
</template>

<script>
export default {

  components: {
    Button: () => import('~/components/Button.vue'),
  },

  metaInfo() {
    return {
      title: 'This page not found',
      meta: [
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
     ]
   }
  },

  created() {
    const path = this.$route.path; 
    const title = path.match(/\/([^\/]+)[\/]?$/);

    if(path.includes('summary')) {
      window.location.href = `https://wiki.robonomics.network/summary/${title[1]}/`;
    }
    
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
    font-weight: 600;
    font-size: 1.5rem;
  }

  .page-404 a {
    padding: 0.6rem 6rem;
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
  } 

  
</style>
