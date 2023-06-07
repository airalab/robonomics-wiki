<template>

  <g-link v-if="link" :class="classList" class="inline-block" :to="link">
    <template v-if="icon != 'none'">
      <Icon :icon="icon" />
      <span v-if="label != ''" class="inline-block">{{ label }}</span>
    </template>
    <span class="additional-text"  v-if="icon == 'none' & label != '' & additionalText != ''">  {{ additionalText }}</span>
    <template v-if="icon == 'none' & label != ''">
      {{ label }}
    </template>
  </g-link>

  <button v-else type="button" :class="classList" @click="onClick" :disabled="disabled" class="inline-block">
    <template v-if="icon != 'none'">
      <Icon :icon="icon" />
      <span v-if="label != ''" class="inline-block">{{ label }}</span>
    </template>
    <template v-if="icon == 'none' & label != ''">
      {{ label }}
    </template>
  </button>

</template>

<script>

export default {

  components: {
    Icon: () => import("./Icon")
  },

  props: {
    label: {
      type: String,
    },
    link: {
      type: String,
    },
    type: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary'].indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      }
    },
    icon: {
      type: String,
      default: 'none'
    },

    additionalText: {
      type: String,
      default: '',
    },

    block: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classList() {
      return {
        'button': true,
        [`${this.type}`]: true,
        [`button__${this.size}`]: true,
        [`button__block`]: this.block,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },

};
</script>

<style>

  /* Some variables in /assets/style/_variables.scss */

  body {
    --color-btn-bg: #5D9DEB;
    --color-btn-text: var(--color-light);
  }

  /* body[data-theme="dark"] {

  } */

  .button {
      appearance: none;
      -webkit-appearance: none;
      outline: 0;

      transition: 0.1s color linear, background-color 0.1s linear;

      display: inline-block;
      padding: .6rem 1rem;
      border-width: 1px;
      border-style: solid;
      border-radius: .2rem;

      cursor: pointer;

      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: 500;

      text-transform: uppercase;
      letter-spacing: 1px;

      text-decoration: none;
      text-align: center;
  }

  .button:not(:last-child) {
    margin-bottom: calc(var(--space) * 0.5);
  }

  .button:not([disabled]):hover {
    filter: saturate(1.5);
  }

  .button[disabled] {
      cursor: default;
      opacity: 0.6;
  }

  .button.primary {
      border-color: var(--color-btn-bg);
      background-color: var(--color-btn-bg);
      color: var(--color-btn-text);
  }

  .button.secondary {
      border-color: var(--color-btn-bg);
      color: var(--color-btn-bg);
  }

  .button.secondary:not([disabled]):hover {
      background-color: var(--color-btn-bg);
      color: var(--color-btn-text);
  }

  .button__small {
      font-size: calc(var(--font-size)*0.8);
      padding: 0.2rem 0.5rem;
  }

  .button__large {
      font-size: calc(var(--font-size)*1.2);
  }


  .button > *:not(:last-child) {
    margin-right: calc(var(--space)/4);
  }

  .button .icon {
    height: 30px;
  }
  
  .button__small .icon {
    height: 20px;
  }

  .button .icon-fill path {
    fill: var(--color-btn-text);
  }

  .button.secondary .icon-fill path {
    fill: var(--color-btn-bg);
  }

  .button.secondary:hover .icon-fill path {
    fill: var(--color-btn-text);
  }

  .button .additional-text {
    display: inline-block;
    font-size: 0.8rem;
    margin-bottom: 10px;
  }

  .button__block {
    display: block;
  }

  @media screen and (max-width: 800px) {
    .button {
      font-size: 80%;
    }
  }

</style>