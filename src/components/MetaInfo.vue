<template></template>
  
<static-query>
query {
  metadata {
    siteName
    siteUrl
    siteDescription
  }
}
</static-query>


<script>
export default {
  props: {
      pageTitle: { type: String, default: '' },
      pageDescription: { type: String, default: '' },
      pageImage: { type: String, default: '' },
      pageImageWidth: { type: String, default: '1280' },
      pageImageHeight: { type: String, default: '765' },
  },

  mounted() {
    this.url = window.location.href
  },

  computed: {
    image() {
      if(this.pageImage != '') {
        return this.$static.metadata.siteUrl + this.pageImage
      }
      else{
        return this.$static.metadata.siteUrl + '/og_cover.png'
      }
    },

    title() {
      return this.pageTitle + ' / ' + this.$static.metadata.siteName
    },

    description() {
      if(this.pageDescription != '') {
        return this.pageDescription
      }
      else{
        return this.$static.metadata.siteDescription
      }
    }
  },

  metaInfo() {
    return {
      title: this.title,
      meta: [
        { key: 'description', name: 'description', content: this.pageDescription },

        // Some Open Graph Tags
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: this.$static.metadata.siteName },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.description },
        { property: "og:image", content: this.image },
        { property: "og:image:width", content: this.pageImageWidth },
        { property: "og:image:height", content: this.pageImageHeight },
        { property: "og:url", content: this.$static.metadata.siteUrl },
        // {
        //   property: "og:url",
        //   content: window.location.href
        // },
        // {
        //   property: "og:url",
        //   content: this.$static.metadata.siteUrl + window.location.pathname
        // },


        // Some Twitter Cards Tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.title },
        { name: "twitter:image", content: this.image },
        { name: "twitter:description", content: this.pageDescription },
        { name: "twitter:site", content: '@AIRA_Robonomics' },
        { name: "twitter:creator", content: '@AIRA_Robonomics' }
      ]

      // //Some ld+json tags
      // script: [
      //   {
      //     type: "application/ld+json",
      //     json: {
      //       "@context": "http://schema.org",
      //       "@type": "BlogPosting",
      //       description: this.$page.post.description,
      //       datePublished: this.$page.post.date,
      //       author: {
      //         name: this.$page.post.author
      //       },
      //       headline: this.$page.post.title,
      //       image: this.$page.post.cover_image,
      //     }
      //   }
      // ]
    };
  }
};
</script>