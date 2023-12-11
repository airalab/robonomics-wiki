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

let allPossiblePaths = [];

// all docs locales for translation
let arDocsFile = fs.readFileSync('./translations/docs/Arabic.json');
let arDocs = JSON.parse(arDocsFile);

let zhDocsFile = fs.readFileSync('./translations/docs/Chinese.json');
let zhDocs = JSON.parse(zhDocsFile);

let ruDocsFile = fs.readFileSync('./translations/docs/Russian.json');
let ruDocs = JSON.parse(ruDocsFile);

let frDocsFile = fs.readFileSync('./translations/docs/French.json');
let frDocs = JSON.parse(frDocsFile);

let esDocsFile = fs.readFileSync('./translations/docs/Spanish.json');
let esDocs = JSON.parse(esDocsFile);

let itDocsFile = fs.readFileSync('./translations/docs/Italian.json');
let itDocs = JSON.parse(itDocsFile);

let jaDocsFile = fs.readFileSync('./translations/docs/Japanese.json');
let jaDocs = JSON.parse(jaDocsFile);

let koDocsFile = fs.readFileSync('./translations/docs/Korean.json');
let koDocs = JSON.parse(koDocsFile);

let ukDocsFile = fs.readFileSync('./translations/docs/Ukrainian.json');
let ukDocs = JSON.parse(ukDocsFile);

let elDocsFile = fs.readFileSync('./translations/docs/Greek.json');
let elDocs = JSON.parse(elDocsFile);

let deDocsFile = fs.readFileSync('./translations/docs/German.json');
let deDocs = JSON.parse(deDocsFile);

let ptDocsFile = fs.readFileSync('./translations/docs/Portuguese.json');
let ptDocs = JSON.parse(ptDocsFile);


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
        // const imgLang = 'ar';
        let locale = node.fileInfo.path.slice(0,2);

        if(!locales.includes(locale)) {
          locale = "en";
        }

        // creating images for only one locale at a time so it won't crash
        // if(imgLang === 'en') {
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
        // }
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
      // keys for all locales for translation
      const allAr = Object.keys(arDocs);
      const allDe = Object.keys(deDocs);
      const allEl = Object.keys(elDocs);
      const allEs = Object.keys(esDocs);
      const allFr = Object.keys(frDocs);
      const allIt = Object.keys(itDocs);
      const allJa = Object.keys(jaDocs);
      const allKo = Object.keys(koDocs);
      const allPt = Object.keys(ptDocs);
      const allRu = Object.keys(ruDocs);
      const allUk = Object.keys(ukDocs);
      const allZh = Object.keys(zhDocs);

      const path = node.path.slice(0, -1).split("/").pop();

      // code below translates blog post (if translation exists) for specific locale (e.g arabic)
      // change path and object for another locale to crate translation
      // let data = fs.readFileSync(`docs/ar/${path}.md`, 'utf-8');
      // this part replaces english text with the needed one 
      // allAr.forEach(el => {
      //   if(data.includes(el)) {
      //     data = data.replace(el,arDocs[el]);
      //   }
      // });

      // and this part rewrites file and adding translated text instead of default one
      // fs.writeFile(`docs/ar/${path}.md`, data, 'utf8', function (err) {
      //   if (err) return console.log(err);
      // });

      // to automatically cope files to all locales
      // locales.forEach(l => {
      //   fs.copyFile(`docs/${path}.md`, `docs/${l}/${path}.md`, (err) => {
      //     if (err) throw err;
      //     console.log('file ws copied');
      //   });
      // })
    })
  })

  // use it for plugin
  // api.createPages(({ createPage }) => {
  //   createPage({
  //     path: '/ru/',
  //     component: './src/pages/Index.vue'
  //   })
  // })




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
      // fs.appendFileSync('./dist/_redirects', rules.join('\n'))
    }
  }) 
}
