import Vue from 'vue'
import Vuex from 'vuex'

import '~/assets/style/index.scss'
import DefaultLayout from '~/layouts/Default.vue'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient, appOptions }) {

  // Load and parse options for localization
  const localeOptions = require('../data/localization.json')
  const localeSettings = JSON.parse(JSON.stringify(localeOptions))

  Vue.component('Layout', DefaultLayout);
  Vue.use(Vuex)
  
  appOptions.store = new Vuex.Store({
    state: {
      locale: isClient ? (localStorage.lang || localeSettings.defaultLocale) : localeSettings.defaultLocale
      // locale: localeSettings.defaultLocale
    },
    mutations: {
      setlocale (state, lang) {
        state.locale = lang
        if(isClient) {
          localStorage.setItem('lang', lang)
        }
      }
    }
  });

  function translatePath(pathToResolve, targetLocale) {
    
    if (!targetLocale) {
      return pathToResolve
    }

    // Check path segments
    if (!pathToResolve.startsWith('/')) {
      pathToResolve = '/' + pathToResolve
    }

    if (!pathToResolve.endsWith('/')) {
      pathToResolve = pathToResolve + '/'
    }

    const pathToResolveSegments = pathToResolve.split('/')

    // delete all possible locales from path
    const newPathSegments = pathToResolveSegments.filter(el => !localeSettings.locales.includes(el))

    // Insert locale before page path
  
    //If path contains one of 'goesAfter' option, push locale after that
    // expected /'goesAfter'/path-to-page -> /'goesAfter'/locale/path-to-page
    let i
    if( i = newPathSegments.findIndex(el => localeSettings.goesAfter.includes(el)) > 0 ) {
      newPathSegments.splice(i+1, 0, targetLocale);
    }
    // Else insert at the end
    // expected /path-to-page -> /locale/path-to-page
    else {
      newPathSegments.splice(newPathSegments.length-1, 0, targetLocale)
    }

    return newPathSegments.join('/')
  }

  // Add translate path helper
  Vue.prototype.$path = translatePath;


  function translateString(alias, targetLocale) {
    const strings = require('../data/localazation_strings.yaml')

    for (const item of strings) {
      if (item.alias == alias){
        return eval(`item.${targetLocale}`)
      }
    }
  }

  // Add translate string helper
  Vue.prototype.$st = translateString;




  //Rewrite route according to locale
  if (process.isClient) {
    router.beforeEach((to, from, next) => {

      const enterpath = translatePath(to.path || '/', appOptions.store.state.locale)

      console.log('to.path ' + to.path)
      console.log('enterpath ' + enterpath)

      if (enterpath === to.path) {
        console.log('enterpath === to.path')
        return next()
      }
      else {
        return next({
          path: enterpath
        })
      }

      // return next({
      //   path: enterpath
      // })

    })
  }

  // Update the lang attribute on each route change
  if (process.isClient) {
    router.afterEach(() => {
      head.htmlAttrs = { 'lang' : appOptions.store.state.locale }
    })
  }

}