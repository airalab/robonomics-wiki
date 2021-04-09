import langs from '@/data/langs.yaml'

export default {
  data(){
    return {
      langs
    }
  }
}

export const geturl = {
	methods: {
      geturl: function(path, lang) {
          
          let iterator = langs.values();

          //clear '/docs'
          path = path.replace('/docs','')
      
          //clear path from prefixes
          for (let elements of iterator) { 
            if (path.includes('/' + elements['lang'] + '/')){
              path = path.replace(new RegExp('^\/'+ elements['lang']), '');
            }
          }

          if ( lang ){
            return '/docs/' + lang + path
          }
        
        }
    }
}