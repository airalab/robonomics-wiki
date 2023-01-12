<template>
  <Sidebar>

    <client-only>
      <div class="page-content">

        <div class="page-title">
            <h1 class="page__title-main">{{ $page.doc.title }}</h1>
        </div>

          <VueRemarkContent class="docs-content" />

          <PageNextPrev :itemsList="itemsList" :current="currentIndex"/>

          <!-- <robo-wiki-feedback/> -->
          <robo-wiki-feedback-new/>

          <section class="docContribution" v-show="ghLink">

            <div class="page-title-meta" v-if="$page.doc.contributors.length > 0">
              <span>Main contributors: </span>
              <template v-for="(contributor, index) in $page.doc.contributors">
                <span :key="index">
                  <g-link :to="'https://github.com/'+contributor"> @{{contributor}}</g-link>
                  <span v-if="index != $page.doc.contributors.length-1">, </span>
                </span>
              </template>
            </div>

              <div class="content" v-show="ghLink">
                <div class="github-title">
                  <div class="icon">
                    <Icon icon="github"/>
                  </div>
                  <h5>Make a contribution</h5>
                </div>
                <p> Robonomics wiki is open source. See something that's wrong or unclear?
                  <g-link :to="ghLink" class="submit">Submit</g-link>  a pull request.
                </p>
              </div>

              <div class="head" v-show="ghUpdateName">
                Latest <g-link :to="ghUpdateUrl">commit</g-link> on {{ghUpdateDate}} by {{ghUpdateName}}
              </div>
          </section>
        
      </div>

      <template slot="sidebar">
        <div id="sidebarContent" class="page__sidebar hiddenMobile--720 custom-scroll" :class="$store.state.showSearchbar ? null : 'menu-without-search'">
          <robo-wiki-note v-if="$page.doc.tools.length" type="note" title="Tested for">
            <g-link v-for="tool in $page.doc.tools" :href="tool.match(/\bhttps?:\/\/\S+/gi) ||  '#' " :key="tool" class="testedFor__link">
              {{tool.replace(/\bhttps?:\/\/\S+/gi, '')}}
            </g-link>
          </robo-wiki-note>

          <SidebarContent />
          
          <Button label="Create an issue" :link="`https://github.com/airalab/robonomics-wiki/issues/new?${ghIssueTitle}`" size="small" />
        </div>
      </template>
      
    </client-only>

  </Sidebar>
</template>

<style>

  .page-title-meta {
    border-width: 1px 0;
    border-style: solid;
    border-color: var(--border-color);
    font-size: 90%;
    font-family: monospace;

    margin-left: 0;
    display: flex;
    padding: 1rem 0;
    margin-bottom: var(--space);
  }

  .page-title-meta a:after {
    display: none !important;
  }

  .page-title-meta li {
    margin-right: var(--space);
    margin-left: 1rem;
    margin-bottom: 0;
  }

  .page-title-meta span {
    margin-right: 5px;
  }

  .page{
      display: grid;
      grid-template-columns: minmax(0,var(--width-sidebar-left)) auto;
      gap: var(--space);
      align-items: start;
  }
  .page__sidebar#sidebarDoc {
      word-break: break-word;

      overflow-y: auto;
      max-height: calc(100vh - 80px);
      scrollbar-width: none;  /* Firefox */
      -ms-overflow-style: none;  /* IE and Edge */
  }
  .page__sidebar#sidebarDoc::-webkit-scrollbar { display: none; } /* Hide scrollbar for Chrome, Safari and Opera */

  #sidebarContent, #sidebarDocs {
    position: sticky;
    top: 4rem;
    /* height: 67vh; */
    /* overflow-y: scroll; */
  }

  #sidebarContent {
    justify-self: end;
  }

  #sidebarDocs {
    height: 80vh;
    /* overflow-y: auto; */
  }

  .sidebarMobileToggle{
    transition: opacity 0.2s ease;
    opacity: 0;
    visibility: hidden;

    position: absolute;
    background-color: var(--header-bg);
    color: var(--header-link);
    top: 0;
    left: 0;
    right: 0;
    padding: calc(var(--space)/2) 0;
    z-index: 100;

    border-top: 1px solid currentColor;
  }

  .page-content {
    max-width: var(--content-width);
    width: 100%;
  }

  .page-content h2:first-child, .page-content h3:first-child {
    padding-top: 0;
  }

  .page-content a[target=_blank]:after {
    padding-left: .2rem;
    display: inline-block;
    content: "↗";
  }

  .page-content a[target=_blank]:hover:after {
      transform: translateX(0.1rem) translateY(-0.1rem);
    }

  .docContribution .head {
    padding: calc(var(--space)/4);
    padding-top: 0;
    font-weight: 600;
  }

  .docContribution .head a {
    color: var(--text-color);
    text-decoration: none;
  }

  .docContribution .head a::after {
    display: none;
  }

  .docs-content {
    text-align: justify !important;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }

  .content {
    padding: calc(var(--space)/4);
    font-weight: 600;
  }

  .content p {
      margin-bottom: 0;
  }

  .content p .submit {
    text-decoration: none;
  }

  .content p .submit::after {
    display: none;
  }

  .github-title {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .github-title svg {
        margin-right: 15px;
        width: 32px;
        height: 32px;
        fill: transparent;
    }

    .github-title svg path {
      fill: var(--ghLogo);
    }

    .github-title h5 {
      margin: 0;
      font-weight: 600;
    }

  .testedFor__link {
    display:inline-block;
    padding: 0 .5rem;
    margin-right: 1rem;
    font-size: 80%;
    font-weight: 600;
    border-radius: 2px;
    background: var(--color-note-accent);
    color: var(--color-testedFor-text) !important;
    text-decoration: none;
    cursor: default;
  }

  a[href^="http"].testedFor__link {
    cursor: pointer;
  }

  @media screen and (max-width: 1080px) {

    .page{
      grid-template-columns: minmax(0,1fr);
      padding-top: calc(var(--space) * 1.3);
    }

    .page__sidebar{

        position: fixed !important;

        /* top: 7rem; */

        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;

        overflow-y:scroll;
        overflow-x:hidden;

        padding: var(--space);
        background-color: var(--body-bg);
    }

    #sidebarDocs, #sidebarContent {
      height: 100svh;
      overflow-x:hidden;
      overflow-y:scroll;
      
    }

    #sidebarDocs {
      height: unset;
    }

    #sidebarContent.page__sidebar {
      position: sticky !important;
      padding: 0;
      background-color: transparent;
      z-index: 0;
    }

    .sidebarMobileToggle {
      opacity: 1;
      visibility: visible;
      position: fixed;
      top: 4rem;
      z-index: 1000;
    }

    #sidebarDocs, #sidebarContent {
      max-height: unset;
      height: 120svh;
      
      /* top: 6rem; */
      top: 7rem;
      bottom: 0;
    }

    #sidebarDocs.menu-without-search,
    #sidebarContent.menu-without-search {
      /* top: 3rem; */
      /* top: 4rem; */
      top: 3.6rem;
    }
  }

  @media screen and (max-width: 860px) {

    #sidebarDocs, #sidebarContent {
      max-height: unset;
      height: 120svh;
      
      /* top: 6rem; */
      top: 7rem;
    }

  }


  @media screen and (max-width: 720px) {
    .page-title {
      width: 100%;
    }
    .page-title-meta { display: block; }
    .page-content { grid-template-columns: minmax(0, 1fr) }

    #sidebarContent.page__sidebar {
      position: fixed !important;
      padding: var(--space);
      background-color: var(--body-bg);
      z-index: 99;
      overflow-y: scroll;
    }

    #sidebarContent {
      height: unset;
    }
  }

</style>

<page-query>
query ($id: ID!) {
  doc: docPage (id: $id) {
  	id
    title
    description
    contributors

    headings (depth: h1) {
      value
    }
    subtitles: headings {
      depth
      value
      anchor
    }
    content
    tools
    fileInfo {
      path
      name
    }
  }
}
</page-query>

<static-query>
query {
  metadata {
    locales
  }
}
</static-query>



<script>
import items from '../../data/sidebar_docs.yaml'
import {Octokit} from '@octokit/rest'
// import M from 'minimatch';
export default {

	components: {
    SidebarDocs: () => import("~/components/SidebarDocs.vue"),
    SidebarContent: () => import("~/components/SidebarContent.vue"),
    Banner: () => import("~/components/Banner.vue"),
    NavIcon: () => import("~/components/NavIcon.vue"),
    PageNextPrev: () => import("~/components/PageNextPrev.vue"),
    Button: () => import("~/components/Button.vue"),
    Icon: () => import("~/components/Icon.vue")
  },

  data(){
    return {
      items: items,
      ghLink: null,
      ghUpdateDate: null,
      ghUpdateName: null,
      ghUpdateUrl: null,
      octokit: null,
      ghIssueTitle: null,
      ogImageSrc: null,
      allLocales: ["ru", "es", "ja", "ko", "pt"],
      localeForMeta: 'en',
    }
  },

  watch: {
    "$route.path": function(current, old) {
      this.github_lastupdated()
      this.github_link()
      this.getTitleForIssue()
      this.getLocaleForMetaInfo();
      this.ogImageSrc =  `${this.$page.doc.fileInfo.name}-${this.localeForMeta}.png`;

      setTimeout(() => {
        this.scrollToTop();
      }, 150)
    }
  },

  

  methods: {

    scrollToTop() {
      if (process.isClient) {
        if(document.querySelector('.custom-scroll')) {
          document.querySelector('.all-content.custom-scroll').scrollTo(0, 0)
        }
      }
    },

    flatten(o){

      let result = [];
      for (const item of o) {
        if (item.link) {
          result.push(item);
        }
        if (item.items) {
          result = [...result, ...this.flatten(item.items)];
        }
      }
      return result;
    },

    github_lastupdated() {
      if (!this.octokit) {
        return
      }
      this.octokit.repos
        .listCommits({
          owner: "airalab",
          repo: "robonomics-wiki",
          path: this.currentDoc
        })
        .then(({ data }) => {

          let d = new Date(data[0].commit.author.date)
          this.ghUpdateDate = d.toLocaleDateString()

          this.ghUpdateName = data[0].commit.author.name

          this.ghUpdateUrl = data[0].html_url
        });
    },

    github_link() {
      if (!this.octokit) {
        return
      }
      this.octokit.repos
        .getContent({
          owner: "airalab",
          repo: "robonomics-wiki",
          path: this.currentDoc
        })
        .then(result => {
          this.ghLink = result.data.html_url
        }).catch(e =>{
          console.error(e.message)
        })

    },

    isCurrent(url){
      //delete all possible locales
      let filteredPath = this.$route.path.split('/').filter(el => !this.$static.metadata.locales.includes(el))
      let clearedPath = filteredPath.join('/')
      return clearedPath == url
    }, 

    getTitleForIssue() {
      const url = new URL('https://github.com/airalab/robonomics-wiki/issues/new?assignees=&labels=documentation&template=doc-issue.md&');
      const params = new URLSearchParams(url.search);
      params.append('title', `issue for document page - ${this.$page.doc.title}`);
      this.ghIssueTitle = params.toString()
    },

    getLocaleForMetaInfo() {
      this.allLocales.map(locale => {
        if(this.$route.path.includes(`/${locale}/`)) {
          this.localeForMeta = locale;
        } 
      })
    }
  },


  computed: {

    //seems to be broken, needs checks
    currentDoc () {
      let doc = this.$route.matched[0].path
      if((doc.match(new RegExp("/", "g")) || []).length == 1) doc += '/getting-started'
      return doc+'.md';
    },

    itemsList() {
        return this.flatten(this.items)
    },

    currentIndex () {
      return this.itemsList.findIndex(item => {
        return item.link.replace(/\/$/, '') === this.$route.path.replace(/\/$/, '')
      })
    },

    locale() {
      return this.$store.state.locale
    },

  },

	metaInfo () {
	    const { title, headings, description, content, } = this.$page.doc;
      const locale = this.localeForMeta;
	    return {
	      title: title  || (headings.length ? headings[0].value : undefined),
        htmlAttrs: {
          lang: locale,
          amp: true
        },
        meta: [
          {
            name: "description",
            content: description || `${content.slice(0,100).replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)/, " ").replace(/[/\{L}/]/g, " ").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g,' ').trim()}...`
          },
          {
            property: "og:url",
            content: 'https://wiki.robonomics.network/'
          },
          {
            property: "og:title",
            content: title  || (headings.length ? headings[0].value : undefined)
          },
          {
            property: "og:description",
            content: description || `${content.slice(0,100).replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)/, " ").replace(/[/\{L}/]/g, " ").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g,' ').trim()}...`
          },
          {
            property: "og:image",
            content: `https://wiki.robonomics.network${require('/docs/docsCovers/'+ this.ogImageSrc)}`  
          },
          {
            property: "og:image:width",
            content: 1280
          },
          {
            property: "og:image:height",
            content: 765
          },
          {
            property: "og:url",
            content: "https://wiki.robonomics.network"
          },
          {
            property: "og:site_name",
            content: "WIKI ROBONOMICS"
          },
          
          {
            name: "twitter:card",
            content: "summary_large_image"
          },
          {
            name: "twitter:title",
            content: title || (headings.length ? headings[0].value : undefined),
          },
          {
            name: "twitter:description",
            content: description || `${content.slice(0,100).replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)/, " ").replace(/[/\{L}/]/g, " ").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g,' ').trim()}...`
          },
          {
            name: "twitter:image",
            content: `https://wiki.robonomics.network${require('/docs/docsCovers/'+ this.ogImageSrc)}`
          },
          {
            name: "twitter:site",
            content: "@AIRA_Robonomics"
          },
          {
            name: 'twitter:creator',
            content: "@AIRA_Robonomics"
          },
        ]
	    }
	  },

  created() {
    this.getTitleForIssue()
    this.getLocaleForMetaInfo();
    this.ogImageSrc =  `${this.$page.doc.fileInfo.name}-${this.localeForMeta}.png`;
  },

  mounted() {
    this.octokit = new Octokit({
    })
    this.github_lastupdated()
    this.github_link();
  },

  // mounted(){
  //   // if( !localStorage.getItem('lang') ){
  //   //   localStorage.setItem('lang', 'en')
  //   // }
  // },

  updated(){
    //Hide popup mobile menu after clickcing (cause - no real page reload in Gridsome)
    document.querySelectorAll('.menu-link').forEach(function(el) {

      el.addEventListener('click', function(event){
        event.target.closest('.page__sidebar').classList.add('hiddenMobile');
        var id = event.target.closest('.page__sidebar').id;

        document.querySelectorAll('.sectionToggler').forEach(function(el) {
          if(el.dataset.show == id) {
            el.classList.add('open');
            el.classList.remove('close');
          }
        });
      })
    });
  }
}

</script>
