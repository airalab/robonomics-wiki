<template>
  <Layout>

  <div class="sidebarMobileToggle">
    <div class="layout__page flex-line">

      <NavIcon :section="'sidebarDocs'" :icon="'Menu'"/>
      <NavIcon :section="'sidebarContent'" :icon="'Dots'"/>
      
    </div>
  </div>

	<div class="page">
		<div id="sidebarDocs" class="page__sidebar hiddenMobile">
      <SidebarDocs :items="items" />
      <Banner />
    </div>

  	<div class="page__content">

      <div class="layout__content">
        <VueRemarkContent />

        <section class="docContribution" v-if="ghLink">

          <div class="content" v-if="ghLink">
            <h5>Make a contribution</h5>
            <p>Robonomics wiki is open source. See something that's wrong or unclear? Submit a pull request.</p>
            <Button label="Edit this page" :link="ghLink" type="secondary" icon="github" size="small"/>
          </div>

          <div class="head" v-if="ghUpdateName">
            Latest <g-link :to="ghUpdateUrl">commit</g-link> on {{ghUpdateDate}} by {{ghUpdateName}}
          </div>
        </section>

        <PageNextPrev :itemsList="itemsList" :current="currentIndex"/>
      </div>

  	</div>

  	<div id="sidebarContent" class="page__sidebar hiddenMobile">
      <SidebarContent />
    </div>

  </div>


  </Layout>
</template>

<style lang="scss" scoped>

  .page{
      display: grid;
      grid-template-columns: minmax(0,var(--width-sidebar-left)) auto minmax(0,var( --width-sidebar-right));
      gap: var(--space);
      align-items: start;

      &__sidebar{
        word-break: break-word;

        overflow-y: auto;
        max-height: calc(100vh - 80px);
        scrollbar-width: none;  /* Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        &::-webkit-scrollbar { display: none; } /* Hide scrollbar for Chrome, Safari and Opera */
      }

      @media screen and (min-width: 1080px){
        
        &__sidebar {
          position: sticky;
          top: 80px;
        }
      }

      .layout__content {
        padding: 0;
      }
  }

  .sidebarMobileToggle{
    transition: opacity 0.2s ease;
    opacity: 0;
    visibility: hidden;

    position: fixed;
    background-color: var(--header-bg);
    color: var(--header-link);
    top: 65px;
    left: 0;
    right: 0;
    padding: calc(var(--space)/2) 0;
    z-index: 100;

    border-top: 1px solid currentColor;
  }



@media screen and (max-width: 1080px) {

    .page{
      grid-template-columns: minmax(0,1fr);
      padding-top: calc(var(--space)*2);


      &__sidebar{

        position: fixed;
        
        top: calc(2 * 49px);

        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;

        padding: var(--space);
        background-color: var(--body-bg);
      }
    }

    .sidebarMobileToggle {
      opacity: 1;
      visibility: visible;

      top: 49px;

      border-top: 2px solid var(--body-bg);
    }
  }


@media screen and (max-width: 600px) {
  .page__sidebar {
    top: 150px;
  }

  .sidebarMobileToggle {
    top: 95px;
    position: absolute
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

</style>

<page-query>
query ($id: ID!) {
  doc: docPage (id: $id) {
  	id
    title
    headings (depth: h1) {
      value
    }
    subtitles: headings {
      depth
      value
      anchor
    }
    content
  }
}
</page-query>


<script>
import items from '@/data/doc-links.yaml'
import {Octokit} from '@octokit/rest'

export const octokit = new Octokit()

export default {

	components: {
      SidebarDocs: () => import("~/components/SidebarDocs.vue"),
      SidebarContent: () => import("~/components/SidebarContent.vue"),
      Banner: () => import("~/components/Banner.vue"),
      NavIcon: () => import('~/components/NavIcon.vue'),
      PageNextPrev: () => import('~/components/PageNextPrev.vue'),
      Button: () => import('~/components/Button.vue'),
	  },

  data(){
    return {
      items: items,
      ghLink: null,
      ghUpdateDate: null,
      ghUpdateName: null,
      ghUpdateUrl: null,
    }
  },

  watch: {
    "$route.path": function(current, old) {
      this.github_lastupdated()
      this.github_link()
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
      octokit.repos
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
      octokit.repos
        .getContent({
          owner: "airalab",
          repo: "robonomics-wiki",
          path: this.currentDoc
        })
        .then(result => {
          this.ghLink = result.data.html_url
        })
    }

  },

  
  computed: {

    currentDoc () {
      let doc = this.$route.matched[0].path
      if((doc.match(new RegExp("/", "g")) || []).length == 1) doc += '/README'
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

  },

	metaInfo () {
	    const { title, headings } = this.$page.doc
	    return {
	      title: title || (headings.length ? headings[0].value : undefined)
	    }
	  },

  created() {
    this.github_lastupdated()
    this.github_link()
  },

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