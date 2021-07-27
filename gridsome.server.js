// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// import localeOptions from '@/data/localization.json'
const localeOptions = require('./data/localization.json')
const localeSettings = JSON.parse(JSON.stringify(localeOptions))

const fs = require('fs')

module.exports = function (api) {
  // api.loadSource(({ addCollection }) => {
  //   // Use the Data store API here: https://gridsome.org/docs/data-store-api/
  // })

  api.loadSource(async store => {
    store.addMetadata('defaultLocale', localeSettings.defaultLocale) //set default locale globally
    store.addMetadata('locales', localeSettings.locales) //set list of locales globally
  })

  // use it for plugin
  // api.createPages(({ createPage }) => {
  //   createPage({
  //     path: '/ru/',
  //     component: './src/pages/Index.vue'
  //   })
  // })

  api.afterBuild(({ redirects }) => {
    console.log(redirects);
  });

}
