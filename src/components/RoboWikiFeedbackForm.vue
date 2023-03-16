<template>
  <div class="robo-wiki-feedback-form__wrapper">

    <div class="robo-wiki-feedback-form__header">
      <div>
        <span class="robo-wiki-feedback-form__check" v-if="$store.state.currentReaction === text">
          <!-- <font-awesome-icon icon="fa-solid fa-check" aria-hidden="true"/> -->
        </span>
        <h3>{{ $store.state.currentReaction }}</h3>
      </div>

      <span tabindex="0" class="robo-wiki-feedback-form__close" @click="$emit('closeForm')">
        <font-awesome-icon icon="fa-solid fa-xmark" aria-hidden="true"/>
      </span>
    </div>

    <gsp-form v-if="result !== 'success' && $store.state.currentReaction === text" :gscriptID="gscript" :captchaID="captcha" class="robo-wiki-feedback-form__form" :class="result">

      <div>

        <input type="email" placeholder="Your email" required data-gsp-name="Email (optional)" :data-gsp-data="email" v-model="email" />

        <textarea type="text" placeholder="Your comment" data-gsp-name="Feedback (optional)" :data-gsp-data="comment" v-model="comment" />

        <input       
          type="hidden" 
          placeholder="location" 
          data-gsp-name="Location" 
          :data-gsp-data="location" 
          v-model="location"
        />

        <input       
          type="hidden" 
          placeholder="reaction" 
          data-gsp-name="Reaction" 
          :data-gsp-data="$store.state.currentReaction" 
          v-model="$store.state.currentReaction"
        />

        <button class="robo-wiki-feedback-form__btn" @click="form" :disabled="result === 'wait'">
          <div class="robo-wiki-feedback-form__btn-wrapper" v-if="result === 'init' || result === 'error'">
            <font-awesome-icon icon="fa-solid fa-envelope" aria-hidden="true"/>
            <span>Tell us more</span>
          </div>
          <div class="robo-wiki-feedback-form__btn-wrapper" v-if="result === 'wait'">
            <Loader class="loader"/>
            <span>Sending your info...</span>
          </div>
        </button>
      </div>
    </gsp-form>

    <div class="robo-wiki-feedback-form__success" v-if="result === 'success'">
      <font-awesome-icon icon="fa-solid fa-envelope" aria-hidden="true"/>
      <div>Thanks,<br/> we’ll keep in touch!</div>
    </div>

  </div>
</template>

<script>
export default {

  components: {
    Loader: () => import('~/components/Spinner.vue'),
  },

  props: {
    text: {
      type: String,
      required: true,
      default: ''
    },
  },
  

  data() {
    return {

      gscript: process.env.GRIDSOME_GSCRIPTID,
      captcha: process.env.GRIDSOME_CAPTCHAID,

      email: '',
      result: this.$response,
      location: '',
      comment: '',
      interval: null,

    }
  },

  methods: {
    form() {
      this.interval = setInterval(() => {
        this.result = this.$response
        // console.log(this.result)
      }, 1000)

      // if (this.$response === 'success' || this.$response === 'error') {
      //   clearInterval(this.interval)
      // }
    }
  },

  mounted() {
    this.location = 'https://wiki.robonomics.network' + this.$route.path;

    if(this.$response === 'success' || this.$response === 'error') {
      clearInterval(this.interval);
      this.result = 'init';
    }

    document.body.addEventListener('click', (e) => {
      if(this.$store.state.currentReaction && !e.target.closest('form')) {
        this.$emit('closeForm');
      }
    })

  }

}
</script>

<style scoped>

  .robo-wiki-feedback-form__wrapper {
    position: absolute;
    bottom: -270px;
    right: 0;
    width: 100%;
    height: 244px;
    padding: calc(var(--space) * 0.3) calc(var(--space) * 1);
    background-color:  var(--color-link-background-highlight);
    transform: translateY(-100%);
    overflow: hidden;
    z-index: 30;
  }

  .robo-wiki-feedback__wrapper.active .robo-wiki-feedback-form__wrapper  {
    border: 2px solid var(--link-color);
    /* border-radius: 30px; */
    animation: moveToBottom 0.5s linear forwards;
  }

  .robo-wiki-feedback-form__header {
    display: flex;
    justify-content: space-between;
    /* margin-bottom: calc(var(--gap) * 0.3); */
    margin-bottom: 10px;
  }

  .robo-wiki-feedback-form__header > div {
    display: flex;
    align-items: center;
  }

  .robo-wiki-feedback-form__header h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.3rem;
    text-align: left;
    font-weight: 600;
  }

  .robo-wiki-feedback-form__check  {
    margin-right: 8px;
    font-size: 1.4rem;
  }

  .robo-wiki-feedback-form__close {
    font-size: 2rem;
    cursor: pointer;
  }

  .robo-wiki-feedback-form__form input,
  .robo-wiki-feedback-form__form textarea {
    width: 94%;
    display: block;
    padding-left: 5px;
    margin-bottom: 15px;
    border-color: var(--link-color);
    font-size: 0.7rem;
    font-weight: 400;
    text-overflow: ellipsis;
    color: var(--text-color);
    background: transparent;
    border-radius: 0;
    border: solid var(--link-color);
    border-width: 0 0 2px;
  }

  .robo-wiki-feedback-form__form textarea  {
    resize: none;
    max-width: 100%;
    max-height: 35px;
    padding: 10px 17px;
    padding-bottom: 0;
    padding-left: 5px;
    margin-bottom: 1rem;
    text-align: left;
  }

  .robo-wiki-feedback-form__form input::placeholder,
  .robo-wiki-feedback-form__form textarea::placeholder {
    color: var(--color-note-accent);
    font-size: 0.7rem;
  }

  .robo-wiki-feedback-form__form input:focus {
    box-shadow: none;
    border-color: var(--color-bg);
  }

  .robo-wiki-feedback-form__form textarea:focus {
    box-shadow: none;
    border-color: var(--color-bg);
  }

  .robo-wiki-feedback-form__btn {
    color: var(--color-light);
    padding: calc( var(--space) * 0.3) calc( var(--space) * 0.5);
    font-size: 1.3rem;
    background: var(--code-text-inline);
    border: 1px solid var(--code-text-inline);
    border-radius: 0;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
  }

  .robo-wiki-feedback-form__btn:hover {
    background-color: var(--color-emoji-pink);
  }

  .robo-wiki-feedback-form__btn:focus {
    box-shadow: none;
    color: var(--link-color)
  }

  .robo-wiki-feedback-form__form.wait .robo-wiki-feedback-form__btn {
    padding: 0;
    font-size: 0.8rem;
    opacity: 0.7;
    cursor: none;
    width: auto;
  }

  .robo-wiki-feedback-form__form.wait .loader {
    width: 30px;
    height: 30px;
  }

  .robo-wiki-feedback-form__form.wait .robo-wiki-feedback-form__btn:hover {
    color: var(--text-color);
  }


  .robo-wiki-feedback-form__btn-wrapper {
    display: flex;
    align-items: center;
    /* justify-content: center; */
  }

  .robo-wiki-feedback-form__btn span {
    display: inline-block;
    margin-left: 10px;
    font-size: 1rem;
    font-family: var(--font-family-code);
  }

  .robo-wiki-feedback-form__success {
    font-size: 1.3rem;
    font-family: var(--font-family-code);
    color: var(--color-brown-dark);
  }

  .robo-wiki-feedback-form__success svg {
    font-size: 2rem;
  }

  @keyframes moveToBottom {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  body[data-theme="dark"] .robo-wiki-feedback-form__form input::placeholder,
  body[data-theme="dark"] .robo-wiki-feedback-form__form textarea::placeholder {
    color: var(--color-testedFor-text);
  }


  body[data-theme="dark"] .robo-wiki-feedback-form__form input,
  body[data-theme="dark"] .robo-wiki-feedback-form__form textarea {
    color: var(--color-testedFor-text);
    font-weight: 600;
  }

</style>