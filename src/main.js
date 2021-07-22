import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

import '~/assets/style/index.scss'
import DefaultLayout from '~/layouts/Default.vue'
import SidebarLayout from '~/layouts/Sidebar.vue'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient, appOptions }) {

  // Load and parse options for localization
  const localeOptions = require('../data/localization.json')
  const localeSettings = JSON.parse(JSON.stringify(localeOptions))

  Vue.component('Layout', DefaultLayout)
  Vue.component('Sidebar', SidebarLayout)
  Vue.use(Vuex)
    
  Vue.use(VueCookies)
  
  appOptions.store = new Vuex.Store({
    state: {
      // locale: isClient ? (window.navigator.language.split('-')[0] || localeSettings.defaultLocale) : localeSettings.defaultLocale
      locale: localeSettings.defaultLocale
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

  // function that splits path to segments, e.g. to check locales within path
  function splitPath(path) {
    if (!path.startsWith('/')) {
      path = '/' + path
    }

    if (!path.endsWith('/')) {
      path = path + '/'
    }

    return path.split('/')
  }


  // Initialize locale different from default, if applyable
  function initLocale() {
    if(isClient) {
      // Check if we have saved preferences of user
      if( localStorage.lang ) {
        appOptions.store.state.locale = localStorage.lang
      }
      else {
        // If no preferences, try get locales from url
        const browserUrl = splitPath(window.location.href)
        const localeFromBrowser = browserUrl.filter(el => localeSettings.locales.includes(el))[0] // in case there are several locales in url, we get first
        appOptions.store.state.locale = localeFromBrowser
        localStorage.setItem('lang', localeFromBrowser) // set as preference
      }

      //if non of these conditions are worked, locale will remain default
    }
  }


  function translatePath(pathToResolve, targetLocale) {
    
    if (!targetLocale) {
      return pathToResolve
    }

    const pathToResolveSegments = splitPath(pathToResolve)

    // delete all possible locales from path
    const newPathSegments = pathToResolveSegments.filter(el => !localeSettings.locales.includes(el))
    const pathWithoutLocale = newPathSegments.join('/')

    // Check if the path need to be translated
    if( localeSettings.exclude.includes(pathWithoutLocale) ){
      return pathWithoutLocale
    }
    else {
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
          newPathSegments.splice(1, 0, targetLocale)
          // newPathSegments.splice(newPathSegments.length-1, 0, targetLocale)
        }

        return newPathSegments.join('/')
    }

   
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
  if (isClient) {
    router.beforeEach(async (to, from, next) => {

      initLocale()

      const enterpath = translatePath(to.path || '/', appOptions.store.state.locale)

      // do not rewrite build paths
      if (process.isServer) {
        return next()
      }

      if (enterpath !== to.path) {
        return next({
          path: enterpath
        })
      }
      else{
       
        // const response = await fetch(window.location.origin + to.path)
        // console.log(response)

        return next()
      }
    })
  }

  // Update the lang attribute on each route change
  if (isClient) {
    router.afterEach(() => {
      head.htmlAttrs = { 'lang' : appOptions.store.state.locale }
    })
  }

}