// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Robonomics Wiki',
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
              value: '#'
            }}],
          [ '@noxify/gridsome-plugin-remark-embed', {
              'enabledProviders' : ['Youtube', 'Twitter', 'Gist']
            }]
        ]
      }
    },

    // {
    //   use: 'gridsome-plugin-flexsearch',
    //     options: {
    //       // chunk: true,
    //       collections: [
    //         {
    //           typeName: 'DocPage',
    //           indexName: 'docs',
    //           fields: ['title', 'path', 'content']
    //         }
    //       ],
    //       searchFields: ['title', 'content'],
    //       flexsearch: {
    //         tokenize: "reverse"
    //         // Не работает для пробелов, не работает case для русского
    //         // tokenize: "reverse",
    //         // encode: false,
    //         // split: /\s+/

    //         // ipfs ok
    //         // Robonomics parachain no
    //         // Тест ok
    //         // тест ok
    //         // платформы Робономика no
    //         // tokenize: "forward",
    //         // split: /\s+/


    //         // ipfs ok
    //         // Robonomics parachain no
    //         // Тест ok
    //         // тест ok
    //         // платформы Робономика no
    //         // tokenize: "reverse",
    //         // split: /\s\w*/

    //         // no
    //         // tokenize: function(str){
    //         //     return str.replace(/[\x00-\x7F]/g, "")
    //         // },
    //         // split: /\s+/
    //       }
    //     }
    //   },
      {
        use: 'gridsome-plugin-yandex-metrika',
        options: {
          id: 68969365,
          options:  {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          }
        }
      },
      {
        use: 'gridsome-plugin-gtm',
        options: {
          id: 'GTM-5ZL8NWB',
          enabled: true,
          debug: true
        }
      },
  ],


  // transformers: {
  //   remark: {
  //     externalLinks: false
  //   }
  // },


  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }


}
