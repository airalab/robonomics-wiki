// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const yaml = require('js-yaml')
const fs   = require('fs')

module.exports = {
  siteName: 'Robonomics Wiki',
  siteUrl: 'https://wiki.robonomics.network/',
  // siteDescription: 'The Robonomics Wiki aims to bring all the knowledge about Robonomics to end users and everyone who is interested in the project.',
  
  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'DocPage',
        index: ['getting-started'],
        baseDir: './docs',
        pathPrefix: '/docs',
        template: './src/templates/DocPage.vue',
        plugins: [
          ['remark-highlight.js'],
          ['remark-autolink-headings', {content: {
              type: 'text',
              value: '#',
            }}],
          [ '@noxify/gridsome-plugin-remark-embed', {
              'enabledProviders' : ['Youtube', 'Twitter', 'Gist']
            }]
        ]
      }
    },

    // {
    //   use: "gridsome-plugin-translateit",
    //   options: {
    //     locales: ["en", "ru", "ja", "ko", "pt", "es"],
    //     defaultLocale: "en",
    //     translations: yaml.load(fs.readFileSync("./data/locales/translations.yaml", 'utf8')),
    //     slugifyDefaultLocale: true,
    //     collections: ["docs"],
    //     exclude: ["/404/", "/sitemap.xml/"],
    //     routes: yaml.load(fs.readFileSync("./data/locales/routes.yaml", 'utf8')),
    //   }
    // },

    {
      use: '@gridsome/plugin-sitemap',
      options: {
        include: ['/docs', '/docs/**']
      }
    },

    {
      use: "gridsome-plugin-google-sheets-post"
    }
  ],


  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    config.resolve.alias.set('@imagesMarkdown', '/docs/images')
    config.resolve.alias.set('@images', '@/assets/images')

    config.mode('development')
  }


}
