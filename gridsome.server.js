// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// import localeOptions from '@/data/localization.json'
// const localeOptions = require('./data/localization.json')
// const localeSettings = JSON.parse(JSON.stringify(localeOptions))

const fs = require('fs');
const fsExtra = require('fs-extra');
const createImage = require("node-html-to-image");
const generateHtml = require("./functions/generateHtml");
const locales =  ["ru", "zh", "es", "ko", "de", "ja", "pt", "el", "it", "fr", "uk", "ar"];

// for docs ai translations
const translateDoc = require("./functions/translations");

let allPossiblePaths = [];


const defaultOptions = {
  typeName: "DocPage", // This should be the typeName 
  // 👇🏻 Each background will randomly have one of these colors
  backgroundColors: [
    "#FFFFFF"
  ],
  imgWidth: "1920px", // The width of your cover image
  imgHeight: "1080px", // The height of your cover image
  domain: "wiki.robonomics.network", // Edmund includes this in their generated images
  outputDir:  "docs/docsCovers/", // Where the cover images should be generated to
};

module.exports = function (api) {
  // Keeping this for easy modifications from gridsome-plugin-blog-cover
  const options = { ...defaultOptions };
  api.loadSource(async (actions) => {
    const collection = actions.getCollection(options.typeName);

    collection.data().forEach(function(node) {
      if (node.internal.typeName === options.typeName) {

        fsExtra.ensureDirSync(options.outputDir);

        // Using the same filename as the file for easy frontmatter
        const imgName = node.fileInfo.name;
        let locale = '';

        if (node.fileInfo.path.includes('/')) {
          locale = node.fileInfo.path.slice(0,2);
        } else {
          locale = "en";
        }
        
          const output = `${options.outputDir}${imgName}-${locale}.png`;
          // Only generate images for files that don't exist already
          console.log("Generating Missing Cover Images");
          fsExtra.access(output, (error) => {
            if (error) {
              createImage({
                output,
                html: generateHtml(node.title, options),
              }).then(() => {
                console.log('The image was created successfully!')
              })
                .catch(e => console.log(e.message));
            } else {
              console.log(`The image ${imgName} already exists!`)
            }
          });
      }
    });


  });

  api.loadSource(async store => {
    store.addMetadata('defaultLocale', 'en') //set default locale globally
    store.addMetadata('locales', 'en') //set list of locales globally
  })

  
  api.loadSource(async (actions) => {

    const collection = actions.getCollection('DocPage');

    collection.data().filter((e) => {
      if(!e.path.includes('/el/') && !e.path.includes('/es/') && !e.path.includes('/it/') && !e.path.includes('/zh/') && !e.path.includes('/ja/') && !e.path.includes('/ko/') && !e.path.includes('/ru/') && !e.path.includes('/pt/') && !e.path.includes('/uk/') && !e.path.includes('/ar/') && !e.path.includes('/fr/') && !e.path.includes('/de/')) {
        allPossiblePaths.push({path: e.path, name: e.fileInfo.name})
      }
    })
  })

  // for md translations 
  api.createManagedPages( ({ createPage }) => {

    allPossiblePaths.forEach(node => {

      const path = node.path.slice(0, -1).split("/").pop();

      // for docs translations
      // translateDoc(fs, path)
    })
  })


  api.createPages(({createPage}) => {

    allPossiblePaths.forEach(node => {

      const path = node.path.substring(5);
    
      locales.forEach(locale => {
        if (fs.existsSync(`docs/${locale}/${path.slice(0,-1)}.md`)) {
          console.log('exists');
        } else {
          createPage({
            path: `/docs/${locale}/${path}`,
            component: './src/templates/AvailableTranslations.vue',
          })
        }
      })
    })

    createPage({
        path: '/summary/:title',
        component: './src/templates/Summary.vue'
    })

    locales.forEach(l => {
      createPage({
        path: `/${l}/summary/:title`,
        component: './src/templates/Summary.vue'
      })
    })

    createPage(
      {
        path: `/docs/robonomics-coffee`,
        component: 'src/pages/redirect.vue',
        context: {
          redirect: 'https://robonomics.network/cases/blockchain-coffee-machine/'
        }
      }
    )
  })

  api.afterBuild(({ redirects }) => {
    if (redirects) {
      let rules = []
      for (const rule of redirects) {
        rules.push(`/summary/:title\t${rule.to}\t${rule.status}`)
      }
    }
  }) 
}
