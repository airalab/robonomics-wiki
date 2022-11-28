import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import VueMeta from 'vue-meta'

import '~/assets/style/base.css'
import '~/assets/style/code.css'
import '~/assets/style/forms.css'
import '~/assets/style/layouts.css'
import '~/assets/style/menu.css'
import '~/assets/style/post.css'
import '~/assets/style/reset.css'
import '~/assets/style/typography.css'
import '~/assets/style/utils.css'
import '~/assets/style/variables.css'

import DefaultLayout from '~/layouts/Default.vue'
import SidebarLayout from '~/layouts/Sidebar.vue'
import RoboWikiNote from '~/components/RoboWikiNote.vue';
import RoboWikiPicture from '~/components/RoboWikiPicture.vue';
import RoboWikiVideo from '~/components/RoboWikiVideo.vue';
import RoboWikiTitle from '~/components/RoboWikiTitle.vue';
import RoboWikiFeedback from '~/components/RoboWikiFeedback.vue';
import RoboWikiTabs from '~/components/RoboWikiTabs.vue';
import RoboWikiTab from '~/components/RoboWikiTab.vue';

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient, appOptions }) {

  Vue.component('Layout', DefaultLayout)
  Vue.component('Sidebar', SidebarLayout)
  Vue.component('RoboWikiNote', RoboWikiNote)
  Vue.component('RoboWikiPicture', RoboWikiPicture)
  Vue.component('RoboWikiVideo', RoboWikiVideo)
  Vue.component('RoboWikiTitle', RoboWikiTitle)
  Vue.component('RoboWikiFeedback', RoboWikiFeedback)
  Vue.component('RoboWikiTabs', RoboWikiTabs)
  Vue.component('RoboWikiTab', RoboWikiTab)
  Vue.use(Vuex)
    
  Vue.use(VueCookies)

  Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
  })
  
  appOptions.store = new Vuex.Store({
    state: {
      showSearchbar: true,
    },
    mutations: {
      toggleShowSearchbar(state, showSearchbar) {
        state.showSearchbar = showSearchbar
      }
    }
  });

  // Update the lang attribute on each route change
  if (isClient) {
    router.afterEach(() => {
      window.scrollTo(0, 0);
      head.htmlAttrs = { 'lang' : appOptions.store.state.locale }
    })
  }

}