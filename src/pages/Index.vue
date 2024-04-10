<template>
  <Layout>
    <g-image class="intro-image" src="~/assets/images/robonomics-lab.png"/>

    <div class="intro">
      <h1>{{ $t('Explore Robonomics with guides') }}</h1>
      <div class="intro-description">{{ $t('Learn Robonomics through tutorials and practically useful experimenting. This documentation is designed to help you connect robots or code dApps within Robonomics Network.') }}</div>
    </div>
    
    <div class="nav-links">
      <GridLinks :links="navLinks" />
    </div>

  </Layout>
</template>



<style scoped>
  .intro {
    padding-bottom: var(--space);
    text-align: center;
  }

  .intro-description {
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
  }

  .nav-links .grid-navigation a {
    padding: calc(var(--space) * 1.5);
  }

  .intro-wrapper {
    position: relative;
    min-height: 497px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* margin-bottom: calc(var(--space) * 4); */
    overflow: hidden;
  }

  .intro-main-link {
    position: relative;
    z-index: 10;
  }

  .intro-main-link a {
    padding: 1rem 4rem;
    border-color: var(--body-bg);
  }

  .intro-image {
    display: block;
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
  }

  @media screen and (max-width: 1080px) {

    .intro-wrapper {
      /* min-height: calc(100vh - 651px); */
      min-height: unset;
      height: 16rem;
      margin-bottom: calc(var(--space) * 2)
    }

    .intro-description {
      max-width: 100%;
    }

    .intro {
      text-align: center;
      padding-top: calc(var(--space) * 2);
    }
  }
</style>


<script>
export default {
  components: {
      GridLinks: () => import('~/components/GridLinks.vue'),
  },

  data() {
    return {
      navLinks: [
        {
          to: '/docs/robonomics-smart-home-overview/',
          name: 'Home Assistant integration'
        },
        {
          to: '/docs/ir-controller/',
          name: 'Robonomics smart devices'
        },
        {
          to: '/docs/glossary/',
          name: 'Working with parachain'
        }
      ],

      smartHome: {
          to: '/docs/robonomics-smart-home-overview/',
          name: 'Start Smart home'
      },
    }
  },

  metaInfo() {
    return {
      title: 'Explore Robonomics with guides',
      meta: [
        { name: "description", content: 'Learn Robonomics through tutorials and practically useful experimenting. This documentation is designed to help you connect robots or code dApps within Robonomics Network.' },
        {
          property: "og:url",
          content: 'https://wiki.robonomics.network/'
        },
        {
          property: "og:title",
          content: 'Explore Robonomics with guides'
        },
        {
          property: "og:description",
          content:  'Learn Robonomics through tutorials and practically useful experimenting. This documentation is designed to help you connect robots or code dApps within Robonomics Network.'
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
          content: 'Explore Robonomics with guides'
        },
        {
          name: "twitter:description",
          content: 'Learn Robonomics through tutorials and practically useful experimenting. This documentation is designed to help you connect robots or code dApps within Robonomics Network.'
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
}

</script>