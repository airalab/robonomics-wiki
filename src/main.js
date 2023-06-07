import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import VueMeta from 'vue-meta'

import '~/assets/style/base.css'
import '~/assets/style/code.css'
import '~/assets/style/forms.css'
import '~/assets/style/checkbox.css'
import '~/assets/style/layouts.css'
import '~/assets/style/menu.css'
import '~/assets/style/post.css'
import '~/assets/style/reset.css'
import '~/assets/style/typography.css'
import '~/assets/style/utils.css'
import '~/assets/style/variables.css'

// import 'gridsome-remark-katex/node_modules/katex/dist/katex.min.css'

import DefaultLayout from '~/layouts/Default.vue'
import SidebarLayout from '~/layouts/Sidebar.vue'
import RoboWikiButton from '~/components/RoboWikiButton.vue';
import RoboWikiNote from '~/components/RoboWikiNote.vue';
import RoboWikiPicture from '~/components/RoboWikiPicture.vue';
import RoboWikiVideo from '~/components/RoboWikiVideo.vue';
import RoboWikiYoutube from '~/components/RoboWikiYoutube.vue';
import RoboWikiTitle from '~/components/RoboWikiTitle.vue';
import RoboWikiFeedback from '~/components/RoboWikiFeedback.vue';
import RoboWikiFeedbackNew from '~/components/RoboWikiFeedbackNew.vue';
import RoboWikiTabs from '~/components/RoboWikiTabs.vue';
import RoboWikiTab from '~/components/RoboWikiTab.vue';
import RoboWikiGridElementWrapper from '~/components/RoboWikiGridElementWrapper.vue';
import RoboWikiGridElement from '~/components/RoboWikiGridElement.vue';
import PropsTable from '~/components/PropsTable.vue';
import CodeHelper from '~/components/CodeHelper.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { 
  faEnvelope,
  faCheck,
  faXmark
 } from '@fortawesome/free-solid-svg-icons'


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient, appOptions }) {

  Vue.component('Layout', DefaultLayout)
  Vue.component('Sidebar', SidebarLayout)
  Vue.component('RoboWikiButton', RoboWikiButton)
  Vue.component('RoboWikiNote', RoboWikiNote)
  Vue.component('RoboWikiPicture', RoboWikiPicture)
  Vue.component('RoboWikiVideo', RoboWikiVideo)
  Vue.component('RoboWikiYoutube', RoboWikiYoutube)
  Vue.component('RoboWikiTitle', RoboWikiTitle)
  Vue.component('RoboWikiFeedback', RoboWikiFeedback)
  Vue.component('RoboWikiFeedbackNew', RoboWikiFeedbackNew)
  Vue.component('RoboWikiTabs', RoboWikiTabs)
  Vue.component('RoboWikiTab', RoboWikiTab)
  Vue.component('ProbsTable', PropsTable)
  Vue.component('CodeHelper', CodeHelper)
  Vue.component('RoboWikiGridElementWrapper', RoboWikiGridElementWrapper)
  Vue.component('RoboWikiGridElement', RoboWikiGridElement)

  /* add font awesome icon component */
  Vue.component('font-awesome-icon', FontAwesomeIcon)

  Vue.use(Vuex)
    
  Vue.use(VueCookies)

  Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
  })

  /* add icons to the library */
  library.add(
    faEnvelope,
    faCheck,
    faXmark
  )
  
  appOptions.store = new Vuex.Store({
    state: {
      showSearchbar: true,
      theme: 'light',
      currentReaction: '',
    },
    mutations: {
      toggleShowSearchbar(state, showSearchbar) {
        state.showSearchbar = showSearchbar
      },
      toggleTheme(state, theme) {
        state.theme = theme
      },
      SET_CURRENT_REACTION(state, reaction) {
        state.currentReaction = reaction;
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