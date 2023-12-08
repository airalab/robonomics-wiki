<template>

  <Sidebar>

    <MetaInfo
        pageTitle = "Available Translations"
        pageDescription = "This doc has no translation yet. Please see another available translations"
      />

    <section class="page-content">

      <p class="no-translations__text">
        This article has no translation for <b>{{ $locale && $locale}}</b>. Please see another available translations:
      </p>

      <div class="no-translations__wrapper">

        <a 
        v-for="edge in docsList" :key="edge.node.id" :href="edge.node.path"
        class="no-translations__link btn__outline"
        @click="redirectToChosenLocale(edge.node.path, edge.node.locale)"
        >
        
          {{edge.node.title}}

        </a>

      </div>

    </section>

  </Sidebar>
  
</template>

<page-query>
  
  query {

    docs: allDocPage {
      edges {
        node {
          title
          description
          path
        }
      }
    }

  }
</page-query>

<script>
export default {

  components: {
    MetaInfo: () => import('~/components/MetaInfo.vue'),
  },

  data() {
    return {
      postTitle: '',
    }
  },

  computed: {
    docsList() {
     return this.$page.docs.edges.filter((e) => {
        const path =  e.node.path; 
        const title = path.match(/\/([^\/]+)[\/]?$/);
        if(path.split('/').length > 4) {
          if(title[1] === this.postTitle) {
            e.node.locale = path.split('/')[2]
            return e
          }
        } else {
          if(title[1] === this.postTitle) {
            e.node.locale = 'en';
            return e
          }
        }

      })
    },

    locales() {
      return this.$localesList
    }
  },

  methods: {
    redirectToChosenLocale(path, locale) {
      if(locale === 'en') {
        const enPath = '/en' + path;
        this.$setLocale('en')
        let newpath = this.$tp(enPath, 'en')
        window.location.href = newpath
      } else {
        window.location.href =  path;
      }
    },
  },

  created() {
    const path = this.$route.path; 

    const title = path.match(/\/([^\/]+)[\/]?$/);
    this.postTitle = title[1];

  }

}
</script>


<style scoped>

  .no-translations__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .no-translations__link {
    width: 60%;
    text-align: center;
  }


  .no-translations__link:hover {
    color: var(--code-text-inline);
    transition: color 0.33s ease-in-out, background-color 0.33s ease-in-out;
  }

  .no-translations__link:not(:last-of-type) {
    margin-bottom: var(--gap)
  }

  .no-translations__text {
    text-align: center;
  }

    @media screen and (max-width: 600px) {
    .no-translations__link {
      width: 100%;
      text-align: center;
    }
  }
</style>