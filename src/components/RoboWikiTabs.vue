<template>
  <div class="robo-wiki-tabs"  :class="classList">
    <ul class="robo-wiki-tabs__list">
      <li 
        v-for="(tab, index) in tabs" 
        :key="tab.title" 
        class="robo-wiki-tabs__item"
        :class='{"robo-wiki-tabs__item--selected": (index == selectedIndex)}'
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {

  props: {
    mode: {
      type: String,
      default: 'horizontal'
    }
  },

  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    }
  },

  computed: {
    classList() {
      return {
        [`robo-wiki-tabs--${this.mode}`]: this.mode,
      };
    },
  },

  methods: {
    selectTab (i) {
      this.selectedIndex = i
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
  },

  created () {
    this.tabs = this.$children
  },

  mounted () {
    this.selectTab(0)
  },


}
</script>

<style scoped>

  .robo-wiki-tabs__list {
    margin: 0;
    list-style: none;    
  }

  .robo-wiki-tabs__item {
    position: relative;
    padding: 0 5px;
    margin-bottom: 0;
    font-weight: 600;
    text-align: center;
    transition: color 0.33s ease-in-out;
    cursor: pointer;
    white-space: nowrap;
  }

  .robo-wiki-tabs__item::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 5px;
    height: 5px;
    -moz-border-radius: 7.5px;
    -webkit-border-radius: 7.5px;
    border-radius: 7.5px;
    background-color: var(--text-color);
    transition: background-color 0.33s ease-in-out;
  }

  .robo-wiki-tabs__item--selected {
    color: var(--link-color);
  }

  .robo-wiki-tabs__item--selected::after {
    background-color: var(--link-color);
  }

  .robo-wiki-tabs--horizontal {
    margin-bottom: 1rem;
  }

  .robo-wiki-tabs--horizontal  .robo-wiki-tabs__list {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }

  .robo-wiki-tabs--horizontal  .robo-wiki-tabs__item:not(:last-child) {
    margin-right: 20px;
  }

  .robo-wiki-tabs--horizontal  .robo-wiki-tabs__item::after {
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
   } 

  .robo-wiki-tabs--vertical {
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .robo-wiki-tabs--vertical .robo-wiki-tabs__list{
    margin: 0;
  }

  .robo-wiki-tabs--vertical .robo-wiki-tabs__item{
    text-align: left;
  }


  .robo-wiki-tabs--vertical .robo-wiki-tabs__item::after {
    top: 50%;
    right: -14%;
    transform: translate(-50%, -50%);
  } 


  @media screen and (max-width: 560px) {
      .robo-wiki-tabs__item {
        font-size: 0.8rem;
        white-space: initial;
      }
  }
  
</style>

