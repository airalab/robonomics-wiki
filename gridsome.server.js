// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// import localeOptions from '@/data/localization.json'
const localeOptions = require('./data/localization.json')
const localeSettings = JSON.parse(JSON.stringify(localeOptions))

const fs = require('fs');
const fsExtra = require('fs-extra');
const createImage = require("node-html-to-image");
const generateHtml = require("./functions/generateHtml");


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
  // api.loadSource(({ addCollection }) => {
  //   // Use the Data store API here: https://gridsome.org/docs/data-store-api/
  // })

  // Keeping this for easy modifications from gridsome-plugin-blog-cover
  const options = { ...defaultOptions };
  api.loadSource(async (actions) => {
    const collection = actions.getCollection(options.typeName);

    collection.data().forEach(function(node) {
      if (node.internal.typeName === options.typeName) {

        fsExtra.ensureDirSync(options.outputDir);

        // Using the same filename as the file for easy frontmatter
        const imgName = node.fileInfo.name;
        const imgLang = node.fileInfo.directory;

        if(imgLang === 'en') {
          const output = `${options.outputDir}${imgName}-${imgLang}.png`;
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
      }
    });


  });

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


}
