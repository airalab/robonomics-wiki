import plugin_gridsome_vue_remark_5 from "/Users/nicetea/-WORK/Projects/Airalab/FRONT-END/robonomics-wiki/node_modules/@gridsome/vue-remark/gridsome.client.js"
import plugin_gridsome_plugin_flexsearch_6 from "/Users/nicetea/-WORK/Projects/Airalab/FRONT-END/robonomics-wiki/node_modules/gridsome-plugin-flexsearch/gridsome.client.js"

export default [
  {
    run: plugin_gridsome_vue_remark_5,
    options: {"typeName":"DocPage","index":["README"],"baseDir":"./docs","pathPrefix":"/docs","template":"./src/templates/DocPage.vue","plugins":[["remark-highlight.js"],["remark-autolink-headings",{"content":{"type":"text","value":"#"}}],["@noxify/gridsome-plugin-remark-embed",{"enabledProviders":["Youtube","Twitter","Gist"]}]],"includePaths":[],"remark":{},"refs":{}}
  },
  {
    run: plugin_gridsome_plugin_flexsearch_6,
    options: {"pathPrefix":"","siteUrl":"","collections":[{"typeName":"DocPage","indexName":"docs","fields":["title","content"]}],"searchFields":["title","content"],"flexsearch":{"profile":"default"}}
  }
]
