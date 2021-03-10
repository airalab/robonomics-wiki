<template>
	<div class="sectionToggler open" :class="sectionClass" v-on:click="showBlock(section, $event)" :data-show="section">
        <IconMenu v-if="icon == 'Menu'" v-bind="iconOpenAttr" />
        <IconDots v-if="icon == 'Dots'" v-bind="iconOpenAttr" />
        <IconSideLeft v-if="icon == 'SideLeft'" v-bind="iconOpenAttr" />
        <IconSideRight v-if="icon == 'SideRight'" v-bind="iconOpenAttr" />
        <IconClose height="20px" class="sectionTogglerClose"/>
	</div>
</template>

<style lang="scss">
	.sectionToggler {
		cursor: pointer;
    min-width: 26px;

		&:hover{
			opacity: .6;
		}

		svg{
			fill: currentColor;
      display: none;
      margin: 0 auto;
		}

    &.open {
      .sectionTogglerOpen {
         display: block;
      }

      .sectionTogglerClose {
         display: none;
      }
    }

    &.close {
      .sectionTogglerOpen {
         display: none;
      }

      .sectionTogglerClose {
        display: block;
      }
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
          classClose = 'hiddenMobile';

      if (element.classList.contains(classClose)) {
        element.classList.remove(classClose);
        event.currentTarget.classList.add('close');
        event.currentTarget.classList.remove('open');
      } else {
        element.classList.add(classClose);
        event.currentTarget.classList.add('open');
        event.currentTarget.classList.remove('close');
      }

    },

  },

  
}
</script>