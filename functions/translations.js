// This helps translate md blog posts
module.exports = function (fs, path) {

  // all locales that we need for translations
  const fullLocales = [
    {
      abbr: 'ru',
      full: 'Russian'
    },
    {
      abbr: 'zh',
      full: 'Chinese'
    },
    {
      abbr: 'ja',
      full: 'Japanese'
    },
    {
      abbr: 'ko',
      full: 'Korean'
    },
    {
      abbr: 'de',
      full: 'German'
    },
    {
      abbr: 'es',
      full: 'Spanish'
    },
    {
      abbr: 'it',
      full: 'Italian'
    },
    {
      abbr: 'fr',
      full: 'French'
    },
    {
      abbr: 'pt',
      full: 'Portuguese'
    },
    {
      abbr: 'uk',
      full: 'Ukrainian'
    },
    {
      abbr: 'ar',
      full: 'Arabic'
    },
    {
      abbr: 'el',
      full: 'Greek'
    }
  ];

    // NOTE - before post translation you need to copy default (english) post to all locales folders. 
  
    // code below translates blog post (if translation exists) for specific locale 
    fullLocales.map(l => {

      if(!fs.existsSync(`docs/${l.abbr}/${path}.md`, 'utf-8')) {
        console.log('file not exists')
      } else {
        let data = fs.readFileSync(`docs/${l.abbr}/${path}.md`, 'utf-8');
        const post = JSON.parse(fs.readFileSync(`./translations/docs/${l.full}.json`));
        const strings = Object.keys(post);
    
        // this part replaces english text with the needed one 
        strings.forEach(el => {
          if(data.includes(el)) {
            data = data.replace(el, post[el]);
          }
        });
    
        // and this part rewrites file and adding translated text instead of default one
        fs.writeFile(`docs/${l.abbr}/${path}.md`, data, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      }
    })
}