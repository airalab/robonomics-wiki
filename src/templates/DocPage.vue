<template>
  <Layout>

  <div class="sidebarMobileToggle">
    <div class="layout__page flex-line">

      <NavIcon :section="'sidebarDocs'" :icon="'SideLeft'"/>
      <NavIcon :section="'sidebarContent'" :icon="'SideRight'"/>
      
    </div>
  </div>

	<div class="page">
		<div id="sidebarDocs" class="page__sidebar hiddenMobile">
      <SidebarDocs :items="items" />
      <Banner />
    </div>

  	<div class="page__content">
  		<VueRemarkContent />
      <Banner :place="'content'" />
  	</div>

  	<div id="sidebarContent" class="page__sidebar hiddenMobile">
      <SidebarContent />
    </div>

  </div>


  </Layout>
</template>

<style lang="scss">

  #sidebarContent.page__sidebar {
    padding-left: calc( var(--space) / 2);
    flex: 0 0 220px;
  }

  #sidebarDocs.page__sidebar {
    padding-right: var(--space);
    flex: 0 0 300px;

    .menu .menu:hover{
      border-color: var(--link-color);
    }

  }

  .page{
      display: flex;
      flex-flow: row nowrap;
      height: 100%;

      &__sidebar{
        flex: 0 0 260px;
        word-break: break-word;
      }

      &__content{
        flex: 1 auto;
        min-width: 0;
        max-width: 100%;
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
      flex-wrap: wrap;
      padding-top: calc(var(--space)*2);

      &__content{
        flex: 1;
        order: 3;
        min-width: 100%;
      }

      &__sidebar{

        position: fixed;
        top: calc( (1rem + (var(--header-padding))*2 ) *2 );
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        overflow: auto;

        padding: var(--space);
        background-color: var(--body-bg);

      }
    }

    .sidebarMobileToggle{
      opacity: 1;
      visibility: visible;

      top: calc( 2rem + (var(--header-padding))*2 );

      border-top: 2px solid var(--body-bg);
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
	  },

  data(){
    return {
      items: this.setBranchOpenLabel(this.initOpenLabel(items))
    }
  },

  methods: {
    initOpenLabel(list) {
      return list.map(item => {
        if (item.items) {
          item.items = this.initOpenLabel(item.items)
        }
        return {...item, isOpen: Object.prototype.hasOwnProperty.call(item, 'link') && this.$route.path === item.link}
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

  },
	metaInfo () {
	    const { title, headings } = this.$page.doc
	    return {
	      title: title || (headings.length ? headings[0].value : undefined)
	    }
	  },

  updated: function(){


    //Hide popup mobile menu after clickcing (cause - no real page reload in Gridsome)
    document.querySelectorAll('.menu__link').forEach(function(el) {
      
      el.addEventListener('click', function(event){
        event.target.closest('.page__sidebar').classList.add('hiddenMobile');
        var id = event.target.closest('.page__sidebar').id;
        console.log(id);
        
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
