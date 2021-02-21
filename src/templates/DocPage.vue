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
      <SidebarDocs :items="items" :current="currenLink" />
      <Banner />
    </div>

  	<div class="page__content">

      <VueRemarkContent />
      <!--<Banner :place="'content'" />-->

      <PageNextPrev :itemsList="itemsList" :current="currentIndex"/>

  	</div>

  	<div id="sidebarContent" class="page__sidebar hiddenMobile">
      <SidebarContent />
      
      <g-link :href="github" target="_blank" class="button button__secondary button__small">
        <IconGithub/>
        <span>Edit this page</span>
      </g-link>
    </div>

  </div>


  </Layout>
</template>

<style lang="scss">

  .page{
      display: grid;
      // grid-template-columns: 250px auto 200px;
      grid-template-columns: minmax(0,var(--width-sidebar-left)) minmax(0,auto) minmax(0,var( --width-sidebar-right));
      gap: var(--space);
      align-items: start;

      h1 { font-weight: 500; }

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

export default {

	components: {
      SidebarDocs: () => import("~/components/SidebarDocs.vue"),
      SidebarContent: () => import("~/components/SidebarContent.vue"),
      Banner: () => import("~/components/Banner.vue"),
      NavIcon: () => import('~/components/NavIcon.vue'),
      IconGithub: () => import('@/assets/images/IconGithub.svg'),
      PageNextPrev: () => import('~/components/PageNextPrev.vue'),
	  },

  data(){
    return {
      items: this.setBranchOpenLabel(this.initOpenLabel(items)),
      github: null
    }
  },
  watch: {
    "$route.path": function(current, old) {
      this.items = this.setBranchOpenLabel(this.initOpenLabel(this.items));
    }
  },

  methods: {
  
    initOpenLabel(list) {
      return list.map(item => {
        if (item.items) {
          item.items = this.initOpenLabel(item.items)
        }
        return {
          ...item,
          isOpen:
            (!Object.prototype.hasOwnProperty.call(item, "link") &&
              item.isOpen) ||
            (Object.prototype.hasOwnProperty.call(item, "link") &&
              this.$route.path === item.link)
        };
      })
    },
    hasOpenChildren(list) {
      return list.find(item =>{
        return item.isOpen
      }) ? true : false
    },
    setBranchOpenLabel(list) {
      return list.map(item => {
        if (item.items && !item.isOpen) {
          item.items = this.setBranchOpenLabel(item.items)
          item.isOpen = this.hasOpenChildren(item.items)
        }
        return {...item}
      })
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

  
    async github_link_api() {
      let doc = this.currentPath
      if((doc.match(new RegExp("/", "g")) || []).length == 1) doc += '/README'
      let url = `https://api.github.com/repos/airalab/robonomics-wiki/contents${doc}.md`;

      let response = await fetch(url);

      if(response.ok){
        let commits = await response.json()
        return commits.html_url
      }
      else return 'https://github.com/airalab/robonomics-wiki/tree/master/docs'
    },


    // async contributorGet(c){
    //   let response = await fetch('https://api.github.com/users/' + c);

    //   if(response.ok){
    //     let user = await response.json()
    //     console.log(user);
    //     return user
    //   }
    // }

  },

  
  computed: {

    currentPath () {
      return this.$route.matched[0].path
    },

    // This is old, but maybe api will not work correctly, do not this delete now
    // github_link() {
    //   let doc = this.currentPath
    //   if((doc.match(new RegExp("/", "g")) || []).length == 1) doc += '/README'
    //   return `https://github.com/airalab/robonomics-wiki/blob/master${doc}.md`
    // },

    itemsList() {
        return this.flatten(this.items)
    },

    currentIndex () {
      return this.itemsList.findIndex(item => {
        return item.link.replace(/\/$/, '') === this.$route.path.replace(/\/$/, '')
      })
    },

    // contributors () {
    //   let c = this.$page.doc.contributors.split(',')
    //   return c;
    // }
  
  },

	metaInfo () {
	    const { title, headings } = this.$page.doc
	    return {
	      title: title || (headings.length ? headings[0].value : undefined)
	    }
	  },

  async beforeUpdate(){
    this.github = await this.github_link_api();
  },

  updated(){

    //Hide popup mobile menu after clickcing (cause - no real page reload in Gridsome)
    document.querySelectorAll('.menu__link').forEach(function(el) {
      
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
