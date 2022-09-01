<template>
	<div class="sectionToggler open" :class="sectionClass" v-on:click="showBlock(section, $event)" :data-show="section">
        <IconMenu v-if="icon == 'Menu'" v-bind="iconOpenAttr" />
        <IconDots v-if="icon == 'Dots'" v-bind="iconOpenAttr" />
        <IconSideLeft v-if="icon == 'SideLeft'" v-bind="iconOpenAttr" />
        <IconSideRight v-if="icon == 'SideRight'" v-bind="iconOpenAttr" />
        <IconClose height="20px" class="sectionTogglerClose"/>
	</div>
</template>

<style>
	.sectionToggler {
		cursor: pointer;
    min-width: 26px;
	}


  .sectionToggler:hover{
			opacity: .6;
		}

		.sectionToggler svg{
			fill: var(--header-color-text);
      display: none;
      margin: 0 auto;
		}

    .sectionToggler.open .sectionTogglerOpen {
        display: block;
    }

    .sectionToggler.open .sectionTogglerClose {
        display: none;
    }

    .sectionToggler.close .sectionTogglerOpen {
         display: none;
      }

      .sectionToggler.close .sectionTogglerClose {
        display: block;
      }
	
</style>

<script>

export default {
  props: {
    icon: {
      type: String,
      default: 'Menu'
    },

	section: {
      type: String,
      default: false
    },

	sectionClass: {
      type: String,
      default: ''
    },
  },

  computed: {
    iconOpenAttr() {
      return {
        height: `20px`,
		class: `sectionTogglerOpen`
      };
    },
  },

  components: {
    IconMenu: () => import('@/assets/images/IconMenu.svg'),
    IconDots: () => import('@/assets/images/IconDots.svg'),
    IconSideLeft: () => import('@/assets/images/IconSideLeft.svg'),
    IconSideRight: () => import('@/assets/images/IconSideRight.svg'),
    IconClose: () => import('@/assets/images/IconClose.svg'),
  },

  methods: {

    preventDefault(e){
      e.preventDefault();
    },
    
    disableScroll(){
      document.body.addEventListener('touchmove', this.preventDefault, { passive: false });
    },

    enableScroll(){
      document.body.removeEventListener('touchmove', this.preventDefault);
    },

    showBlock: function(bID, event){
      var element = document.getElementById(bID),
          classClose = 'hiddenMobile',
          classClose_720 = 'hiddenMobile--720';

      this.enableScroll()

      if (element.classList.contains(classClose) || element.classList.remove(classClose_720)) {
        element.classList.remove(classClose);
        element.classList.remove(classClose_720);
        event.currentTarget.classList.add('close');
        event.currentTarget.classList.remove('open');
        document.body.classList.add('removeScroll')
      } else if (element.classList.contains(classClose_720)) {
        element.classList.remove(classClose_720);
        event.currentTarget.classList.add('close');
        event.currentTarget.classList.remove('open');
        document.body.classList.add('removeScroll')
        this.disableScroll()
      } else {
        element.classList.add(classClose);
        element.classList.add(classClose_720);
        event.currentTarget.classList.add('open');
        event.currentTarget.classList.remove('close');
        document.body.classList.remove('removeScroll')
        this.enableScroll()

      }
    },

  },

  
}
</script>