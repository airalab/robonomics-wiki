<template>
  <Layout>

  <div class="sidebarMobileToggle">
    <div class="layout__page flex-line">
      <div class="sidebarMobileToggle__tog" v-on:click="showBlock('sidebarDocs', $event)">
        <IconMenu height="20px" class="mobileMenu"/>
        <IconClose height="20px" class="mobileMenuClose" style="display: none;"/>
      </div>
      <div class="sidebarMobileToggle__tog" v-on:click="showBlock('sidebarContent', $event)">
        <IconDots height="20px" class="mobileMenu"/>
        <IconClose height="20px" class="mobileMenuClose" style="display: none;"/>
      </div>
    </div>
  </div>

	<div class="page">
		<div id="sidebarDocs" class="page__sidebar mobileClosed">
      <SidebarDocs :items="items" />
    </div>

  	<div class="page__content">
  		<VueRemarkContent />
  	</div>

  	<div id="sidebarContent" class="page__sidebar mobileClosed">
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

    // h4 ~ .menu { display: none; }
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

    &__tog{
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover{
        opacity: .6;
      }

      svg{
        display: block;
        fill: currentColor;
      }
    }
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
        top: calc( (2rem + (var(--header-padding))*2 ) *2 );
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        overflow: auto;

        padding: var(--space);
        background-color: var(--body-bg);

        &.mobileClosed{
          display: none;
        }
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

import SidebarDocs from '~/components/SidebarDocs.vue'
import SidebarContent from '~/components/SidebarContent.vue'
import IconMenu from '@/assets/images/IconMenu.svg'
import IconDots from '@/assets/images/IconDots.svg'
import IconClose from '@/assets/images/IconClose.svg'

import items from '@/data/doc-links.yaml'

export default {
	components: {
	    SidebarDocs,
	    SidebarContent,
      IconMenu,
      IconDots,
      IconClose
	  },
  computed: {
    items () {
      return items
    }
  },
  // mounted: function(){
  //       this.hideTitles();
  // },
  methods: {
    showBlock: function(bID, event){
      var element = document.getElementById(bID),
          classClose = 'mobileClosed',
          menuI = event.currentTarget.querySelector('.mobileMenu'),
          closeI = event.currentTarget.querySelector('.mobileMenuClose');

      if (element.classList.contains(classClose)) {
        element.classList.remove(classClose);
        closeI.style.display = 'block';
        menuI.style.display = 'none';
      } else {
        element.classList.add(classClose);
        closeI.style.display = 'none';
        menuI.style.display = 'block';
      }
    },

    // hideTitles: function(){
    //   var titles = document.getElementById('#sidebarDocs .menu__title');

    //   titles
    // }
  },
	metaInfo () {
	    const { title, headings } = this.$page.doc
	    return {
	      title: title || (headings.length ? headings[0].value : undefined)
	    }
	  }
  // updated: function(){
    

  //   //open current menu in SidebarDocs
  //    var links = document.querySelectorAll('.menu-tree a'),
  //    currentPath = this.$route.path,
  //    path;


  //    links.forEach(function(item, i, arr) {

  //       path = item.href.replace(/.*\/\/[^\/]*/, '');

  //       if (path == currentPath){

  //         for ( ; item && item !== document; item = item.parentNode ) {
  //           if(item.classList.contains('menu-tree')){
  //             item.style.display = "block";
  //           }
  //         }
  //       }

  //     });
  //   //end of open current menu in SidebarDocs


  // }
}


</script>