import langs from '@/data/langs.yaml'

export default {
  data(){
    return {
      langs
    }
  }
}

export const setlocale = {
	methods: {
        setlocale: function(lang) {
          
          let path = window.location.pathname
          let iterator = langs.values()
      
          for (let elements of iterator) {

            // by agent, check if language is supported
            if(window.navigator.language.split("-")[0] == elements['lang'])
              localStorage.setItem('lang', window.navigator.language.split("-")[0])

            // by path
            if (path.includes('/' + elements['lang'] + '/'))
              localStorage.setItem('lang', elements['lang'])

            // by input parametr, check if language is supported
            if (lang && lang == elements['lang']){
              localStorage.setItem('lang', lang)
              console.log(lang + ' == ' + elements['lang'])
            }
              
          }

          // still if not defined
          if(!localStorage.lang){
            localStorage.setItem('lang', 'en')
            // console.log("!localStorage.getItem('lang')")
          }
            
            

          console.log('setlocale localStorage.lang ' + localStorage.lang);
        
        }
    }
}