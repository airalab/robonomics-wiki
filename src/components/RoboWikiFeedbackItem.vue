<template>
  <div tabindex="0"  class="robo-wiki-feedback__wrapper" :class="{'active': $store.state.currentReaction === text}">
    <button class="robo-wiki-feedback__item" @click.stop="showForm()">
      <div class="robo-wiki-feedback__checkbox">
        <input id="checkbox" type="checkbox" name="checkbox" class="custom-checkbox__field" :checked="$store.state.currentReaction === text ? true : false">
        <span class="custom-checkbox__content"></span>
      </div>
      <div class="robo-wiki-feedback__content">
        <g-image :src="require(`!!assets-loader!@/assets/images/${imgSrc}`)" :alt="text" />
        <span>{{text}}</span>
      </div>
    </button>

    <LessonReactionForm v-if="showFormComp && $store.state.currentReaction === text" :text="text" :lessonTitle="lessonTitle" @closeForm="closeForm"/>
  </div>
</template>

<script>
export default {

  props: {
    text: {
      type: String,
      required: true,
      default: ''
    },

    imgSrc: {
      type: String,
      required: true,
      default: 'reaction-1.png'
    },
    
    lessonTitle: {
      type: String,
      default: ''
    }
  },

  components: {
    LessonReactionForm: () => import('~/components/RoboWikiFeedbackForm.vue'),
  },

  data() {
    return {
      showFormComp: false
    }
  },

  watch: {
    '$route.path': function() {
      this.showFormComp = false;
      this.$store.commit('SET_CURRENT_REACTION', '');
    }
  },

  methods: {
    showForm() {
      this.showFormComp = false;
      this.$store.commit('SET_CURRENT_REACTION', this.text);
      this.showFormComp = !this.showFormComp;
    },
    closeForm() {
      this.showFormComp = false;
      this.$store.commit('SET_CURRENT_REACTION', '');
    }
  }

}
</script>

<style scoped>

  .robo-wiki-feedback__wrapper {
    /* position: relative; */
    width: 100%;
    height: 224px;
    background-color: var(--color-light);
    border: 2px solid var(--link-color);
    /* border-radius: 30px; */
    transition:background-color 0.33s ease-in-out;
    overflow: hidden;
    transition: border-color 0.33s ease-in-out;
  }

  .robo-wiki-feedback__wrapper:hover {
    border-color: var(--code-text-inline);
  }

  .robo-wiki-feedback__wrapper:focus {
    box-shadow: 0.2rem 0.2rem 0 0 var(--link-color);
  }

  .robo-wiki-feedback__item {
    position: relative;
    width: 100%;
    height: 100%;
    font-family: var(--font-family-code);
    justify-content: center;
    background-color: transparent;
    border: 2px solid transparent;
    border-radius: 0;
    cursor: pointer;
  }

  .robo-wiki-feedback__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.4s ease-in-out;
  }

  .robo-wiki-feedback__item:hover   .robo-wiki-feedback__content {
    transform: scale(1.1);
  }

  .robo-wiki-feedback__item:focus {
    box-shadow: none;
  }

  .robo-wiki-feedback__wrapper.active {
    background-color: var(--color-link-background-highlight);
  }

  .robo-wiki-feedback__item.active:hover {
    background-color:var(--color-link-background-highlight) !important;
  }

  .robo-wiki-feedback__item img {
    display: inline-block;
    margin-bottom: 1rem;
    max-width: 108px;
    width: 100%;
  }

  .robo-wiki-feedback__item span{
    font-size: 1rem;
    color: var(--color-brown-dark);
  }

  .robo-wiki-feedback__checkbox {
    position: absolute;
    top: 15px;
    left: 10px;
  }
</style>