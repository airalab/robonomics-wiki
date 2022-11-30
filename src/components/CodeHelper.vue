<template>
  <div class="code-helper" :class="{'code-helper--only-copy': !additionalLine}">
    <div class="code__additionalLine" :class="{'code__additionalLine--nobg': !additionalLine}">
      <span v-if="additionalLine">{{additionalLine}}</span>
      <button @click="copyCode" v-if="copy" class="copy-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18.207" height="18.207" viewBox="0 0 18.207 18.207">
          <path id="copy-regular" d="M17.863,2.512,15.685.334A1.135,1.135,0,0,0,14.879,0H9.062A2.276,2.276,0,0,0,6.786,2.276v9.1a2.323,2.323,0,0,0,2.307,2.276h6.828A2.283,2.283,0,0,0,18.2,11.379V3.316A1.139,1.139,0,0,0,17.863,2.512ZM16.49,11.379a.569.569,0,0,1-.569.569H9.062a.569.569,0,0,1-.569-.569V2.28a.569.569,0,0,1,.569-.569h4.552l.032,1.7a1.138,1.138,0,0,0,1.138,1.138h1.675v6.828ZM9.663,15.931a.569.569,0,0,1-.569.569H2.234a.569.569,0,0,1-.569-.569l.031-9.1a.569.569,0,0,1,.569-.569H5.68V4.552H2.266A2.276,2.276,0,0,0-.01,6.828v9.1a2.277,2.277,0,0,0,2.276,2.276H9.094a2.283,2.283,0,0,0,2.276-2.276V14.793H9.695Z" transform="translate(0.01)" fill="#fff" opacity="0.5"/>
        </svg>
        <small v-if="copied">copied!</small>
      </button>
    </div>

    <div class="code-helper__content" ref="code">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    additionalLine: {
      type: String,
      default: ''
    },
    copy: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      copied: false,
    }
  },

  methods: {
    async copyCode() {
      const code = this.$refs.code;
      const text = code.innerText

      try {
        await navigator.clipboard.writeText(text);
        this.copied = true;

        setTimeout(() => {
          this.copied = false;
        }, 3000)
      } catch($e) {
        this.copied = false;
      }
    }
  }

}
</script>

<style scoped>
  .code__additionalLine {
    position: relative;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: -2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #10161A;
    color: #707070;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: var(--font-family-code);
    border-radius: 3px;
  }

  .code__additionalLine--nobg {
    background-color: var(--code-bg);
    padding: 0;
  }

  .code-helper--only-copy .copy-btn {
   position: absolute;
   top: 5px;
   right: 10px;
   padding: 0.5rem;
   background: #283740a1;
  }

  .code-helper--only-copy .copy-btn small {
    top: -10px;
    bottom: unset;
  }

  .copy-btn {
    /* padding: 0.5rem; */
    margin-left: auto;
    border: 1px solid transparent;
    cursor: pointer;
    /* background: #283740a1; */
    border-radius: 5px;
  }

  .copy-btn small {
    position: absolute;
    right: 5px;
    bottom: 2px;
    margin-top: 5px;
    font-size: 0.5rem;
    color: #ececec;
    /* opacity: 0.5; */
    background-color: #10161a71;
    font-family: var(--font-family-code);
  }

  .copy-btn:focus {
    box-shadow: none;
  }

  svg path {
    transition: fill 0.3s ease-in-out;
  }

  .copy-btn:focus svg path {
    fill: rgb(59, 169, 248)
  }

</style>