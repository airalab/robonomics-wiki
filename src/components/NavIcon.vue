<template>
	<div class="sectionToggler" :class="sectionClass" v-on:click="showBlock(section, $event)">
        <IconMenu v-if="icon == 'Menu'" v-bind="iconOpenAttr" />
        <IconDots v-if="icon == 'Dots'" v-bind="iconOpenAttr" />
        <IconSideLeft v-if="icon == 'SideLeft'" v-bind="iconOpenAttr" />
        <IconSideRight v-if="icon == 'SideRight'" v-bind="iconOpenAttr" />
        <IconClose height="20px" class="sectionTogglerClose" style="display: none;"/>
	</div>
</template>

<style lang="scss">
	.sectionToggler {
		cursor: pointer;
      	// transition: opacity 0.2s ease;

		&:hover{
			opacity: .6;
		}

		svg{
			display: block;
			fill: currentColor;
		}
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
    showBlock: function(bID, event){
      var element = document.getElementById(bID),
          classClose = 'hiddenMobile',
          menuI = event.currentTarget.querySelector('.sectionTogglerOpen'),
          closeI = event.currentTarget.querySelector('.sectionTogglerClose');

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

  },
}
</script>