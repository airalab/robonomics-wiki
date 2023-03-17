<template>
  <div @click="$emit('click')">

    <div v-if="(title || this.$slots.default) && type !== 'warning'" :class="classList">
      <div v-if="title" class="robo-wiki-note__title">{{title}}</div>
      <div class="robo-wiki-note__text" v-if="this.$slots.default">
        <slot/>
      </div>
    </div>

    <div v-if="(title || this.$slots.default) && type === 'warning'" :class="classList">
      <g-image src="@/assets/images/disclaimer-guy.png" alt="pic" aria-hidden="true"/>
      <div class="robo-wiki-note__wrapper">
        <div v-if="title" class="robo-wiki-note__title">{{title}}</div>
        <div class="robo-wiki-note__text" v-if="this.$slots.default">
          <slot/>
        </div>
      </div>
    </div>


  </div>

</template>

<script>

export default {
  
  name: 'RoboWikiNote',
  props: {
    title: {
      type: String,
    },
    type: {
      type: String,
      default: 'note',
      required: true,
      validator: function (value) {
        return ['okay', 'warning', 'note'].indexOf(value) !== -1;
      }
    }
  },

  computed: {
    classList() {
      return {
        [`robo-wiki-note`]: true,
        [`robo-wiki-note--${this.type}`]: this.type,
      };
    },
  },

}
</script>

<style scoped>

  .robo-wiki-note {
    --type-color-accent: var(--color-note-accent);
    --type-color-pale: var(--color-note-pale);
    --type-color-text: var(--color-note-text);

    padding: 0.5rem 1rem;
    background-color: var(--type-color-pale);
    border-left: 0.4rem solid var(--type-color-accent);
    color: var(--type-color-text);
  }

  .robo-wiki-note:not(:last-child) {
    margin-bottom: var(--space-text);
  }

  .robo-wiki-note__title {
    color: var(--type-color-accent);
    font-size: 90%;
    font-weight: bold;
    text-transform: uppercase;
  }
  

  .robo-wiki-note__text p:last-child {
    margin-bottom: 0;
  }

  .robo-wiki-note--okay { 
    --type-color-accent: var(--color-note-accent--okay);
    --type-color-pale: var(--color-note-pale--okay);
  }

  .robo-wiki-note--warning {
    --type-color-accent:  var(--color-dark);
    display: flex;
    align-items: center;
    border: none;
    --type-color-pale: var(--color-note-pale--warning);
    background-color: transparent;
  }

  .robo-wiki-note--warning img {
    max-width: 155px;
    width: 100%;
    margin-right: var(--space);
  }

  .robo-wiki-note__wrapper {
    position: relative;
    padding: calc(var(--space) * 0.4);
    z-index: 10;
    border: 2px solid var(--footer-border-color);
  }

  .robo-wiki-note__wrapper::after  {
    content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="54.516" height="39.999" viewBox="0 0 54.516 39.999"%3E%3Cpath id="Контур_7208" data-name="Контур 7208" d="M50.917,113.414,1.755,150.052l49.162-5.082Z" transform="translate(1.754 -111.422)" fill="none" stroke="%23000" stroke-miterlimit="10" stroke-width="2"/%3E%3Cg id="Контур_7208-2" data-name="Контур 7208" transform="translate(50.977 3.241)" fill="%23fff"%3E%3Cpath d="M 1.13579535484314 28.92228507995605 L 1.190554141998291 1.048982381820679 L 2.950088262557983 0.2446928322315216 L 3.037598848342896 28.83303260803223 L 1.13579535484314 28.92228507995605 Z" stroke="none"/%3E%3Cpath d="M 2.452462673187256 1.021923065185547 L 1.689924478530884 1.370481491088867 L 1.636826753616333 28.39822006225586 L 2.536134243011475 28.35601615905762 L 2.452462673187256 1.021923065185547 M 3.447713851928711 -0.53253173828125 L 3.539063930511475 29.31004905700684 L 0.6347637176513672 29.44634819030762 L 0.6911838054656982 0.7274875640869141 L 3.447713851928711 -0.53253173828125 Z" stroke="none" fill="%23fff"/%3E%3C/g%3E%3C/svg%3E ');
    position: absolute;
    top: 35%;
    left: -54px;
  }

  .robo-wiki-note--warning  .robo-wiki-note__title {
    font-size: calc(var(--font-size) * 1.2);
    font-weight: 500;
    margin-bottom: calc(var(--space) * 0.2);
    color: var(--color-text);
  }

  .robo-wiki-note--warning  .robo-wiki-note__text ol {
    margin-bottom: 0;
  }

  .robo-wiki-note--note {
    --type-color-accent: var(--color-note-accent);
    --type-color-pale: var(--color-note-pale);
  }

  .robo-wiki-note--note .robo-wiki-note__text :not(pre)>code { 
    background: #fff;
  }   

  .robo-wiki-note--warning .robo-wiki-note__text :not(pre)>code { 
    background: #fff;
  }

  .robo-wiki-note--okay .robo-wiki-note__text :not(pre)>code { 
    background: #fff;
  }

  body[data-theme="dark"]  .robo-wiki-note a {
    color: #78fffd;
  }

  body[data-theme="dark"] .robo-wiki-note__wrapper::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='54.516' height='39.999' viewBox='0 0 54.516 39.999'%3E%3Cpath id='Контур_7208' data-name='Контур 7208' d='M50.917,113.414,1.755,150.052l49.162-5.082Z' transform='translate(1.754 -111.422)' fill='none' stroke='%23fff' stroke-miterlimit='10' stroke-width='2'/%3E%3Cg id='Контур_7208-2' data-name='Контур 7208' transform='translate(50.977 3.241)' fill='%0A%23213039'%3E%3Cpath d='M 1.13579535484314 28.92228507995605 L 1.190554141998291 1.048982381820679 L 2.950088262557983 0.2446928322315216 L 3.037598848342896 28.83303260803223 L 1.13579535484314 28.92228507995605 Z' stroke='none'/%3E%3Cpath d='M 2.452462673187256 1.021923065185547 L 1.689924478530884 1.370481491088867 L 1.636826753616333 28.39822006225586 L 2.536134243011475 28.35601615905762 L 2.452462673187256 1.021923065185547 M 3.447713851928711 -0.53253173828125 L 3.539063930511475 29.31004905700684 L 0.6347637176513672 29.44634819030762 L 0.6911838054656982 0.7274875640869141 L 3.447713851928711 -0.53253173828125 Z' stroke='none' fill='%23213039'/%3E%3C/g%3E%3C/svg%3E");
  }

  @media screen and (max-width: 1300px) {
    .robo-wiki-note--warning  {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
    }

    .robo-wiki-note--warning img {
      margin-right: 0;
      margin-bottom: calc(var(--space) * 0.5);
    }

    .robo-wiki-note__wrapper {
      position: static;
      padding: 0;
      border: none;
      z-index: 0;
    }

    .robo-wiki-note__wrapper::before  {
      display: none;
    }

    .robo-wiki-note__wrapper::after  {
      display: none;
    }

    .border-gap {
      display: none;
    }

    .robo-wiki-note--warning  .robo-wiki-note__title {
      position: absolute;
      top: 170px;
      left: 140px;
    }

    .robo-wiki-note--warning  .robo-wiki-note__text {
      padding: calc(var(--space) * 0.5);
      border: 2px solid var(--footer-border-color);
    }
  }

</style>