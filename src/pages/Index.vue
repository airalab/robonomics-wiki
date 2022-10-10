<template>
  <Layout>
<!-- 
    <g-image class="intro-image" src="~/assets/images/robonomics-lab.png"/> -->

    <div class="intro">
      <h1>{{$st('Enter title', $store.state.locale)}}</h1>
      <div class="intro-description">{{ $st('Site Description', $store.state.locale) }}</div>
    </div>

    <div class="intro-main-link" >
      <Button :label="smartHome.name" :link="smartHome.to" size="large" />
    </div>
    
    <GridLinks :links="navLinks" />

  </Layout>
</template>



<style scoped>
  .intro {
    padding-top: calc(var(--space) * 3);
    padding-bottom: calc(var(--space) * 2);
    text-align: center;
  }

  .intro-description {
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
  }

  .intro-image {
    display: block;
      border: 0;
      position: absolute;
      top: 0;
      right: 0;
      width: 40%;
      max-width: 620px;
  }

  .intro-main-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: calc(var(--space) * 4);
  }

  .intro-main-link a {
    padding: 1rem 4rem;
  }

  @media screen and (max-width: 1080px) {
    .intro-image {
      position: static;
      width: 100%;
      margin: 0 auto;
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
      Button: () => import('~/components/Button.vue'),
      GridLinks: () => import('~/components/GridLinks.vue'),
  },

  data() {
    return {
      navLinks: [
        // {
        //   to: '/summary/meet-robonomics/',
        //   name: 'Enter Nav 1'
        // },
        // {
        //   to: '/summary/basics/',
        //   name: 'Enter Nav 7'
        // },
        // {
        //   to: '/summary/playground/',
        //   name: 'Enter Nav 2'
        // },
        {
          to: '/docs/',
          name: 'Enter Nav 5'
        },
        {
          to: '/docs/how-to-build-collator-node//',
          name: 'Enter Nav 3'
        },
        {
          to: '/docs/sensors-network-introduction',
          name: 'Enter Nav 4'
        },
        // {
        //   to: '/summary/learn/',
        //   name: 'Enter Nav 5'
        // },
        // {
        //   to: '/docs/contributing/',
        //   name: 'Enter Nav 6'
        // },
      ],

      smartHome: {
          to: '/docs/home-assistant-begin/',
          name: 'Start Smart home'
      },
    }
  },

  metaInfo() {
    return {
      title: this.$st('Enter title', this.$store.state.locale),
      meta: [
        { name: "description", content: this.$st('Site Description', this.$store.state.locale) },
        {
          property: "og:url",
          content: 'https://wiki.robonomics.network/'
        },
        {
          property: "og:title",
          content: this.$st('Enter title', this.$store.state.locale),
        },
        {
          property: "og:description",
          content:  this.$st('Site Description', this.$store.state.locale)
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
          content: this.$st('Enter title', this.$store.state.locale),
        },
        {
          name: "twitter:description",
          content:  this.$st('Site Description', this.$store.state.locale)
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