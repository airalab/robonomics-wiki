<template>
  <Sidebar>

      <div class="page-title">
        <h1>{{ $page.doc.title }}</h1>

        <ul class="page-title-meta" v-if="$page.doc.contributors.length > 0 || !$page.doc.translated">
          <li v-if="$page.doc.contributors.length > 0">
            <span>{{$st('Main contributors', $store.state.locale)}}: </span>
            <template v-for="(contributor, index) in $page.doc.contributors">
              <span :key="index">
                <g-link :to="'https://github.com/'+contributor">@{{contributor}}</g-link>
                <span v-if="index != $page.doc.contributors.length-1">, </span>
              </span>
            </template>
          </li>


          <!-- we do not need to show this if there are no contributors-->
          <li v-if="$page.doc.contributors.length > 0 && !isCurrent('/docs/contributing/')">
            <g-link to="/docs/contributing/">{{$st('How to contribute', $store.state.locale)}}</g-link>
          </li>

          <li v-if="!$page.doc.translated && !isCurrent('/docs/translate-wiki/')">
            <g-link to="/docs/translate-wiki/">{{$st('This page needs translation', $store.state.locale)}}</g-link>
          </li>
        </ul>
      </div>


      <div class="page-content">

        <div>

          <VueRemarkContent />

          <section class="docContribution" v-show="ghLink">

              <div class="content" v-if="ghLink">
                <h5>{{$st('Github Contribution Title', $store.state.locale)}}</h5>
                <p>{{$st('Github Contribution Text', $store.state.locale)}}</p>
                <Button :label="$st('Github Contribution Button', $store.state.locale)" :link="ghLink" type="secondary" icon="github" size="small"/>
              </div>

              <div class="head" v-if="ghUpdateName">
                {{$st('Latest (commit)', $store.state.locale)}} <g-link :to="ghUpdateUrl">{{$st('commit', $store.state.locale)}}</g-link> {{$st('on (date of commit)', $store.state.locale)}} {{ghUpdateDate}} {{$st('by (author of commit)', $store.state.locale)}} {{ghUpdateName}}
              </div>
          </section>

          <Feedback/>

          <PageNextPrev :itemsList="itemsList" :current="currentIndex"/>

        </div>

        <div id="sidebarContent" class="page__sidebar hiddenMobile--720" :class="$store.state.showSearchbar ? null : 'menu-without-search'">
          <robo-wiki-note v-if="$page.doc.tools.length" type="note" title="Tested for">
            <g-link v-for="tool in $page.doc.tools" :href="tool.match(/\bhttps?:\/\/\S+/gi) ||  '#' " :key="tool" class="testedFor__link">
             {{tool.replace(/\bhttps?:\/\/\S+/gi, '')}}
            </g-link>
          </robo-wiki-note>

          <SidebarContent />
          
          <Button label="Create an issue" :link="`https://github.com/airalab/robonomics-wiki/issues/new?${ghIssueTitle}`" size="small" />
        </div>
      </div>

  </Sidebar>
</template>

<style lang="scss">

  .page-title-meta {
    border-width: 1px 0;
    border-style: solid;
    border-color: var(--border-color);
    font-size: 90%;
    font-family: monospace;

    margin-left: 0;
    display: flex;
    padding: 1rem 0;

    li {
      margin-right: var(--space);
      margin-left: 1rem;
      margin-bottom: 0;
    }
  }

  .page{
      display: grid;
      grid-template-columns: minmax(0,var(--width-sidebar-left)) auto;
      gap: var(--space);
      align-items: start;

      &__sidebar#sidebarDoc {
        word-break: break-word;

        overflow-y: auto;
        max-height: calc(100vh - 80px);
        scrollbar-width: none;  /* Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        &::-webkit-scrollbar { display: none; } /* Hide scrollbar for Chrome, Safari and Opera */
      }
  }

  #sidebarContent, #sidebarDocs {
    position: sticky;
    top: 7rem;
    height: 67vh;
    overflow-y: scroll;
  }

  #sidebarDocs {
    height: 80vh;
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
    display: grid;
    grid-template-columns: minmax(0,var(--content-width)) minmax(0,var(--width-sidebar-left));
    gap: var(--space);
    align-items: start;
    padding-top: calc(var(--space)/2);

    h2, h3 {
      &:first-child {
        padding-top: 0;
      }
    }

    a[target=_blank] {
      &:after {
        padding-left: .2rem;
        display: inline-block;
        content: "↗";
      }

      &:hover:after {
        transform: translateX(0.1rem) translateY(-0.1rem);
      }
    }
  }

  .docContribution {

    border: 1px solid var(--table-thead-bg);

    .head {
      background-color: var(--table-thead-bg);
      padding: calc(var(--space)/4);
      font-weight: 500;
    }

    .content {
      padding: calc(var(--space)/4);
      background-color: var(--table-tr-hover);
    }

  }

  .testedFor__link {
    display:inline-block;
    padding: 0 .5rem;
    margin-right: 1rem;
    font-size: 80%;
    font-weight: 600;
    border-radius: 2px;
    background: var(--color-note-accent);
    color: var(--color-note-pale) !important;
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


      &__sidebar{

        position: fixed !important;

        top: 7rem;

        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;

        padding: var(--space);
        background-color: var(--body-bg);
      }
    }

    #sidebarDocs, #sidebarContent {
      height: 100vh;
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
      max-height: 100%;
      height: 120vh;
      
      top: 6rem;
    }

    #sidebarDocs.menu-without-search,
    #sidebarContent.menu-without-search {
      top: 3rem;
    }
  }


  @media screen and (max-width: 720px) {
    .page-title-meta { display: block; }
    .page-content { grid-template-columns: minmax(0, 1fr) }
    // #sidebarContent { display: none; }

    #sidebarContent.page__sidebar {
      position: fixed !important;
      padding: var(--space);
      background-color: var(--body-bg);
      z-index: 99;
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
    translated
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
import M from 'minimatch';

export default {

	components: {
    SidebarDocs: () => import("~/components/SidebarDocs.vue"),
    SidebarContent: () => import("~/components/SidebarContent.vue"),
    Banner: () => import("~/components/Banner.vue"),
    NavIcon: () => import("~/components/NavIcon.vue"),
    PageNextPrev: () => import("~/components/PageNextPrev.vue"),
    Button: () => import("~/components/Button.vue"),
    Feedback: () => import("~/components/Feedback.vue"),
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
    }
  },

  watch: {
    "$route.path": function(current, old) {
      this.github_lastupdated()
      this.github_link()
      this.getTitleForIssue()
      this.ogImageSrc =  `${this.$page.doc.fileInfo.name}-${this.locale}.png`;
    }
  },

  

  methods: {


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
      params.append('title', `issue for document page - ${this.$page.doc.title}(${this.locale})`);
      this.ghIssueTitle = params.toString()
    },
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
        return this.$path(item.link, this.locale).replace(/\/$/, '') === this.$route.path.replace(/\/$/, '')
      })
    },

    locale() {
      return this.$store.state.locale
    },

  },

	metaInfo () {
	    const { title, headings, description, content } = this.$page.doc;
	    return {
	      title: title  || (headings.length ? headings[0].value : undefined),
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
    this.ogImageSrc =  `${this.$page.doc.fileInfo.name}-${this.locale}.png`;
  },

  mounted() {
    this.octokit = new Octokit({
      auth: process.env.GRIDSOME_PERSONAL_TOKEN
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
