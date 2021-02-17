# Build Dapp Interface

## Introduction

This tutorial continues the previous lesson where you have built already simple application and focused on connecting account to node, sending transactions and other vital functions of dapp. Now we will **build user-friendly interface** for this application.

## Prerequisites

This tutorial is designed for people who have some familiarity with **HTML, CSS, JavaScript** and who wants to know how to apply these skills for decentralized applications.

For building your dapp's interface you can choose any JavaScript framework comfortable for you or even try to build interface without any framework. In Robonomics 2021 we use [Vue.js](https://vuejs.org) as it is quite scalable and easy to use.

## Set up for this tutorial

If you connected at this step and prefer to **learn by doing**, please, follow this to-do list for lunching resulting dapp from previous lesson:

1. Download local Robonomics node from [releases page](https://github.com/airalab/robonomics/releases/) that fits your OS. If you have not found your system in the latest release, please, find the most recent version in previous releases.

2. Launch Robononomics node in Developer mode by typing `./robonomics --dev` in your terminal.

3. Download Polkadot Extension for Chrome or Firefox [here](https://polkadot.js.org/extension/)

4. Clone [this repository](https://github.com/vol4tim/example-robonomics-dapp/).

5. Install [Yarn](https://yarnpkg.com).

6. Install [@vue/cli](https://cli.vuejs.org/guide/installation.html)

7. Start developing dapp with `yarn serve` command in your terminal.


**You should get this screen in your browser:**

![Dapp Start](./images/build-dapp-interface/dapp-start.png "Dapp Start")


<details>

  <summary>Some additional tips for launching</summary>

  - Make sure your **node is running**:
    ![Example of running Robonomics node](./images/build-dapp-interface/robonomics-node-launch.png "Example of running Robonomics node")

  - In **macOS** you may need to change the **access permissions** `chmod +x robonomics`

  - Make sure you allowed **access for Polkadot Extension**:
    ![Polkadot Extension giving access](./images/build-dapp-interface/polkadot-permission.png "Polkadot Extension giving access")

  - If you have errors in log of running node and dapp is not loading correctly, please, try to delete data base of dev chain: `sudo rm -rf <YOUR LOCAL PATH>/robonomics/chains/dev/db/` and restart node. If it not helped, restart your machine.

</details>

## Inspecting the code

Let's inspect the structure of dapp to clear up what and where we can fix in order to change UI.

```
.
├── public/
│   ├── favicon.ico           # Icon for your dapp
│   └── index.html            # The template file (injects icons links, JavaScript and CSS files for the app)
├── src/
│   ├── assets/               # Folder for images and global styles
│   ├── components/           # Folder with components
│   │   ├── Datalog.vue       # Tab 'Datalog' in dapp
│   │   ├── Demo.vue          # Tab 'Demo' in dapp
│   │   ├── Launch.vue        # Tab 'Launch' in dapp
│   ├── utils/                # Folder with important for app js functions (we will touch api.js in this tutorial)
│   ├── App.vue               # The root of our app, contains HTML, CSS, JS for the whole page. In fact it is Vue Component also
│   ├── main.js               # The app’s entry file, we will import here global styles
├── ...                       # There are config files and dependencies files, that we will not change mannually
├── README.md                 # You can write here any instructions for your dapp

```

> **The code of this tutorial in this [repository](https://github.com/positivecrash/wscool21-ui-dapp)**

## CSS-in-JS VS. Global stylesheets

In this tutorial I show how to change the interface of small dapp from scratch without any stable library of UI components. So I will import and create not only different Vue components, but also write my own styles.

If your application is big or your project has whole bunch of dapps, in the future you'd better look for building library of components specifically for your project to make UI more organized and efficient ([for example, here is a tool for organizing components](https://storybook.js.org)), or if you are okay with standart interface themes, you can use any third party UI Libraries ([for example](https://vuetifyjs.com/)).

## First import or where to start

I don't have any specific design for this dapp, but I have [Brandbook](https://static.robonomics.network/assets/Robonomics-Visual-Identity.pdf) and [quit well-established](https://robonomics.network) typography, fonts, button styles etc. So for the start I will import the following css files globally:

```
...
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── reset.css         # The goal is to reduce browser inconsistencies
│   │   │   ├── variables.css     # Contains specific values to be reused such as colors, font-names, space values etc.
│   │   │   ├── typography.css    # Global typography for the whole dapp
│   │   │   ├── animation.css     # Keyframe animations used throughout the dapp
...

```

The content of any of these files you can write in App.vue instead, if it fits your perception better. But I recommend to import some CSS files globally for this example to keep App.vue a little bit more clear.

Import these CSS files in your app by editing **main.js** file:

![Import global CSS in Vue app](./images/build-dapp-interface/import-css-vue-1.png "Import global CSS in Vue app")

```JS
import './assets/styles/reset.css'
import './assets/styles/variables.css'
import './assets/styles/typography.css'
import './assets/styles/animation.css'
```

**Check if fonts changed in the dapp:**

![Dapp Interface changing step 1](./images/build-dapp-interface/dapp-1.png "Dapp Interface changing step 1")


<!-- ## Prettify layout -->

## Change layout and prettify the title

Let's change layout of application. As I mentioned earlier, you can write your styles directly in App.vue, but I prefer for this example to separate it.

- Comment or delete styles from tag `<style>` in **App.vue**

- Create css file **app.css** in styles folder for this application and import it in **main.js**

```JS
import './assets/styles/app.css'
```

<details>

<summary>Write in app.css first basic styles for the app:</summary>

```css
#app {
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: stretch;

  text-align: center;
}

body {
  background-color: var(--color-gray-light);
}
```

</details>


<details>

<summary>Change the title of the app [App.vue]</summary>

```html
<div class="top">
    <h1>dApp Robonomics Demo</h1>
    <i>Winter School 2021</i>
    <img class="label" alt="" src="./assets/images/robonomics-winter-school-2021-logo.png"/>
</div>
```

</details>



<details>

<summary>Write styles for the title [app.css]</summary>

```css
.top {
  position: relative;
  padding-top: var(--space);
  padding-bottom: calc(var(--space)*2);

  border-bottom: 2px solid var(--color-dark);
  background-color: var(--color-light);
}

.top h1 {
  font-size: 1.8rem;
}

.top i {
  display: block;
}

.top .loader-label {
  display: block;
  margin: calc(var(--space)/3) auto;
  max-width: 150px;

  visibility: hidden;
  opacity: 0;
  animation: 0.5s FadeIn 0.3s ease forwards, 0.5s ScaleDown 0.1s ease forwards;
}

.top .label {
  position: absolute;
  width: 100px;
  bottom: -50px;
  left: calc(50% - 50px);
  display: block;

  transform: translateY(1rem);
  visibility: hidden;
  opacity: 0;
  animation: 0.7s FadeIn 0.5s ease forwards, 1s ScaleUp 0.5s ease forwards;
}
```

</details>

- Place file with logo of Robonomics winter school 2021 in the folder **./src/assets/images**

**You will get the following screen:**
![Dapp Interface changing step 2](./images/build-dapp-interface/dapp-2.png "Dapp Interface changing step 2")

## Define styles according to the dapp's data

Now I will wrap the app's content in `<div>` element and I need different styles for different states of dapp (loaded or not loaded).

- Open the **App.vue** and write wrapping element:
```html
<div class="content">
  <!--here is everything going after the title-->
</div>
```
- Find the variable `load`, it is already defined in `<script>`.
- Pass an object to `v-bind:class` to dynamically toggle classes (I use shortened version `:class`):
```html
<div class="content" :class="{ load: load }">
  <!--here is everything going after the title-->
</div>
```
Thats how you can easily toggle styles in your app according to the data you get. You will see the usage of this class below.

## Define views according to the dapp's data

Lets change the loader for the app.
- For this purpose I will import my component from another Robonomics project 

<details>

<summary>./src/components/AnimatedRobonomicsLogo.vue</summary>

```HTML
<template>
  <div class="logo-animated" :style="{transform: 'scale('+scale+')'}">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="196.9px" height="170.3px" viewBox="0 0 196.9 170.3" style="enable-background:new 0 0 196.9 170.3;" xml:space="preserve">
		<g transform="translate(2530 155)">
            <path class="line" d="M-2523.4,7.9l184.2,0.5l-91.7-158.1L-2523.4,7.9z"/>

            <circle class="dot" cx="-2339.7" cy="8.7" r="6.6"/>
            <circle class="dot" cx="-2523.4" cy="8.2" r="6.6"/>
            <circle class="dot" cx="-2430.8" cy="-148.4" r="6.6"/>
            
            <path class="triangle-1" d="M-2477.3-18.3l92.1,0.3l-45.8-79L-2477.3-18.3z"/>
            <path class="triangle-2" d="M-2431.2-18.1l46,0.1l-45.8-79L-2431.2-18.1z"/>
            <path class="triangle-3" d="M-2477.3-18.3l92.1,0.3l-46-20.3L-2477.3-18.3z"/>
          </g>
	</svg>
  </div>
</template>

<script>

export default {

  props: {
    scale: {
      type: String,
      default: '1'
    },
  },

};
</script>

<style scoped>
    /*
    Global styles required:
    FadeIn - keyframe animation from animation: .css
    all --color- variables from variables.css
    */

    .logo-animated {
        transform-origin: 0 0;
    }

    .logo-animated .dot {
        fill: var(--color-blue);
        visibility: hidden;
        opacity: 0;
        animation: 1s FadeIn 0.3s ease forwards;
    }

    .logo-animated .line {
        fill: transparent;
        stroke: var(--color-blue);
        stroke-miterlimit:10;
        stroke-dasharray: 700;
        stroke-dashoffset: 700;
        animation: 1s DrawSvgPath 0.5s ease-in-out forwards; 
    }

    .logo-animated .triangle-1 {
        fill: var(--color-blue);
        visibility: hidden;
        opacity: 0;
        animation: 0.5s FadeIn 0.3s ease forwards, 5s logo-triangle-1 0.1s linear infinite;
    }

    .triangle-2 {
        fill: var(--color-violet-light);
        visibility: hidden;
        opacity: 0;
        animation: 0.5s FadeIn 0.3s ease forwards, 5s logo-triangle-2 0.1s linear infinite;
    }

    .triangle-3 {
        fill: var(--color-violet-mid);
        visibility: hidden;
        opacity: 0;
        animation: 0.5s FadeIn 0.3s ease forwards, 5s logo-triangle-3 0.1s linear infinite;
    }


    @keyframes DrawSvgPath
        {
        to {
            stroke-dashoffset: 0;
        }
        }

    @keyframes logo-triangle-1
    {
        0% { fill: var(--color-blue); }
        25% { fill: var(--color-blue); }
        50% { fill: var(--color-blue); }
        75% { fill: var(--color-violet-light); }
        100% { fill: var(--color-blue); }
    }

    @keyframes logo-triangle-2
    {
        0% { fill: var(--color-violet-light); }
        25% { fill: #E0BDED; }
        50% { fill: var(--color-blue); }
        75% { fill: var(--color-blue); }
        100% { fill: var(--color-violet-light); }
    }

    @keyframes logo-triangle-3
    {
        0% { fill: var(--color-violet-mid); }
        25% { fill: var(--color-violet-light); }
        50% { fill: var(--color-violet-light); }
        75% { fill: var(--color-violet-dark); }
        100% { fill: var(--color-violet-mid); }
    }
</style>
```

</details>

- Register component in **App.vue**
```JS
export default {
  components: {
    Loader: () => import("./components/AnimatedRobonomicsLogo")
  }
}
```
- Insert it with conditional Vue directive `v-if`, using already known variable `load`:
```HTML
<div class="content" :class="{ load: load }">
  <Loader v-if="load" />
  <template v-else>
    <!-- here will be main content of loaded dapp -->
  </template>
</div>
```
- Watch result in browser. It has some issues, that we will fix now:

1. Loader pops up to the title (it should be in the center). Lets insert these lines to **app.css**:
```css
body, html, #app {
  height: 100%;
  position: relative;
}
```
2. If your connection goes too fast, you will see just blinking loader for a moment. It may confuse a lot. Lets set timeout for the app's responce. To do that open **api.js** and find in function `initAccount` this code:
```JS
const timeout = new Promise(resolve => {
  setTimeout(resolve, 300);
});
```
I set `1700` instead of `300` and check the result:

![Dapp Interface changing step 3](./images/build-dapp-interface/dapp-3.gif "Dapp Interface changing step 3")


## Using reusable components

You have already watched how to register and use component in previous section about Loader, but now I want to focus on it more carefully.

Lets change the Account section. I will use here self-written components (box, button, icon) and third party one ([from Vue Polkadot Library](https://vue-polkadot.js.org/vue-ui/vue-identicon/#vue-polkadot-vue-identicon )).

### Adding the box

<details>

<summary>Create Box component in ./src/components/Box.vue file </summary>

```HTML
<template>
    <section class="box" :class="classList">
        <slot />
    </section>
</template>

<script>

export default {

  props: {
    classList: {
      type: String
    },
  },

};
</script>

<style>
    /*
    Global styles required for css variables from variables.css
    */

    .box {
        background-color: var(--color-light);
        border: 1px solid var(--color-dark);
        padding: calc(var(--space)*0.5) var(--space);
        box-shadow: 2px 2px 0 var(--color-dark);
        margin-bottom: calc(var(--space)*1.5);
    }
</style>
```
</details>

Now we can use it many times throw out dapp. Lets see it on the Account section example:

- Register component (**App.vue**):

```JS
export default {
  components: {
    Box: () => import("./components/Box")
  }
}
```

- Use it for the Account section with additional class passed with prop `classList`:

```HTML
<Box :classList="'account'">
  Account: <b>{{ account }}</b> {{ balance }} |
  <button @click="faucet">
    faucet
  </button>
</Box>
```

**Check the result:**
![Dapp Interface changing step 4](./images/build-dapp-interface/dapp-4.png "Dapp Interface changing step 4")

### Adding the button

You may even not notice the button in the box that we added. Lets fix it and add component for buttons as it is not the only one button in the app.

<details>

<summary>Create Button component in ./src/components/Button.vue file </summary>

```HTML
<template>
  <button type="button" :class="classList" @click="onClick" :disabled="disabled" class="inline-block">
    {{ label }}
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
    }
  },

  computed: {
    classList() {
      return {
        'button': true,
        [`${this.type}`]: true,
        [`button__${this.size}`]: true,
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
    /*
    Global styles required for css variables from variables.css
    */

    .button {
        appearance: none;
        -webkit-appearance: none;
        outline: 0;
        border: 0;

        transition: 0.1s all linear;

        padding: .15rem 0.6rem;
        border-width: 1px;
        border-style: solid;
        border-radius: .25rem;
  
        cursor: pointer;

        font-family: var(--font-family);
        font-size: calc(var(--font-size)*0.9);
        line-height: 1;
        font-weight: 500;

        text-transform: uppercase;
        letter-spacing: 1px;
    }   

    .button:not([disabled]):hover {
    filter: saturate(1.5);
    }

    .button[disabled] {
        cursor: default;
        opacity: 0.6;
    }

    button.primary {
        border-color: var(--color-green);
        background-color: var(--color-green);
        color: var(--color-light);
    }

    button.secondary {
        border-color: var(--color-blue);
        color: var(--color-blue);
    }

    button.secondary:not([disabled]):hover {
        background-color: var(--color-blue);
        color: var(--color-light);
    }

    .button__small {
        font-size: .85rem;
        padding: .1rem 0.45rem;
    }

    .button__large {
        font-size: 1.2rem;
        padding: .5rem 1.7rem;
    }

</style>
```
</details>


- Register component (**App.vue**):

```JS
export default {
  components: {
    Button: () => import("./components/Button")
  }
}
```

- Use it for 'Faucet' button with props, defined in 'Button' component

```HTML
<Box :classList="'account'">
  Account: <b>{{ account }}</b> {{ balance }}
  <Button label="Faucet" size="large" @onClick="faucet" />
</Box>
```

**We get this view:**
![Dapp Interface changing step 5](./images/build-dapp-interface/dapp-5.png "Dapp Interface changing step 5")

For the Button component we emited the click from prop with `@onClick`, so I will pay attention is faucet function working now correctly (the balance should change on click):

![Dapp Interface changing step 6](./images/build-dapp-interface/dapp-6.gif "Dapp Interface changing step 6")

### Adding the icon

Lets add the icon to this button to attract more attention on this element of interface, as user can't interact with dapp properly without units, without clicking on this button.

For this purpose you can use any ready Vue library for icons, I will create my own component with icon.

- I found appropriate icon on [the big online archive of icons](https://www.flaticon.com).
- Downloaded .svg file and edited it in vector graphics editor to make proper size.
- Inserted svg as text in Icon.vue component.

<details>

<summary>Here what I got as Icon.vue component</summary>

```JS
<template>
  <div class="icon inline-block" :class="classList">
    <svg v-if="icon == 'faucet'" class="icon-fill" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :width="SvgWidth(20)"  viewBox="0 0 20 24.9" style="enable-background:new 0 0 20 24.9;" xml:space="preserve">
      <path d="M2.7,24.9c0.2,0,2.4,0,2.4-2.4c0-2-2.2-5.2-2.2-5.2s-2.5,3.3-2.5,5.3C0.4,24.6,2.4,24.9,2.7,24.9z M20,10.8V7.2V3.1h-2.6v2.6h-3.1V1.5h2.6c0.4,0,0.8-0.3,0.8-0.8S17.3,0,16.9,0h-6.7C9.8,0,9.5,0.3,9.5,0.8s0.3,0.8,0.8,0.8h2.6v4.1H7.9c-4.7,0-6.2,3.2-6.3,4.8c0,0,0,0.1,0,0.1v2.8H0v2.1h6.2v-2.1H4.6v-2.7c0-0.3,0.4-1.9,3.3-1.9h9.6v2.1L20,10.8L20,10.8z"/>
    </svg>

  </div>
</template>

<script>

export default {
  props: {
    icon: {
      type: String
    },
    classList: {
      type: String
    },
    scale: {
      type: String,
      default: '1'
    },
  },

  methods: {
    SvgWidth(SvgWidth) {
      return `${SvgWidth * this.scale}px`;
    }
  }
};
</script>

<style>
.icon {
    line-height: 1;
}
</style>

```

</details>

To use it with button edit the Button component.

Import Icon in **Button.vue**:

```JS
components: {
    Icon: () => import("./Icon")
}
```

Register prop:

```JS
props: {
  icon: {
    type: String,
    default: 'none'
  }
}
```

Add Icon to the button (we can specify different templates with `v-if` condition):

```HTML
<template v-if="icon != 'none'">
  <Icon :icon="icon" />
  <span v-if="label != ''" class="inline-block">{{ label }}</span>
</template>
<template v-if="icon == 'none' & label != ''">
  {{ label }}
</template>
```

Add styles:

```CSS
.button .icon-fill path {
  fill: var(--color-light);
}

.button > *:not(:last-child) {
  margin-right: calc(var(--space)/2);
}

```

Add icon prop in button in **App.vue**:

```HTML
<Button label="Faucet" size="large" icon="faucet" @onClick="faucet" />
```

**Check:**

![Dapp Interface changing step 7](./images/build-dapp-interface/dapp-7.png "Dapp Interface changing step 7")

### Add Polkadot avatar

- Install [@vue-polkadot/vue-identicon](https://vue-polkadot.js.org/vue-ui/vue-identicon/#vue-polkadot-vue-identicon)

- Import to App.vue:
```JS
components: {
    Identicon: () => import("@vue-polkadot/vue-identicon")
}
```

- Insert avatar instead word 'Account', pass props according to documentation, use `account` data as value prop:
```HTML
<Identicon
  :value="account"
  :theme="'polkadot'"
  :size="40"
  :class="'inline-block'"
/>
```

**Check:**

![Dapp Interface changing step 8](./images/build-dapp-interface/dapp-8.png "Dapp Interface changing step 8")

## Data manipulation for better view

Lets cut account address:

- Wrap variable `account` in computed property:

```JS
computed: {
  AccountAddress() {
    return this.account.slice(0, 6) + "..." + this.account.slice(-4);
  }
}
```

- Replace in template variable `account` with `AccountAddress`

**Check:**

![Dapp Interface changing step 9](./images/build-dapp-interface/dapp-9.png "Dapp Interface changing step 9")

## CSS magic

Lets prettify account section more:

<details>

<summary>Template</summary>

```HTML
<Box :classList="'account'">
              
  <div class="account__address">
    <Identicon
      :value="account"
      :theme="'polkadot'"
      :size="40"
      :class="'inline-block'"
    />

    <code class="inline-block">{{ AccountAddress }}</code>
  </div>
  
  <div class="account__balance">{{ balance }}</div>

  <Button label="Faucet" size="large" @onClick="faucet" />
  
</Box>
```

</details>


<details>

<summary>Styles (in app.css)</summary>

```CSS
.account {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: stretch;
  column-gap: var(--space);
}

.account__balance {
    font-size: 150%;
    font-weight: 500;
    font-family: var(--font-family-code);
    white-space: nowrap;
}

.account__address > *:not(:last-child) {
    margin-right: calc(var(--space)/2);
}
```

</details>

![Dapp Interface changing step 10](./images/build-dapp-interface/dapp-10.gif "Dapp Interface changing step 10")

Lets edit styles for tabs:

<details>

<summary>Styles (in app.css)</summary>

```CSS
.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: calc(var(--space)*2.5);
}

.tabs button {
  text-transform: uppercase;
  letter-spacing: 1px;
  border-width: 0 0 1px;
  font-family: var(--font-family);
  font-size: calc(var(--font-size)*1.5);
  font-weight: 300;
  cursor: pointer;
  transition: 0.2s all linear;
}

.tabs button:not(.active) {
  opacity: 0.5;
  border-color: var(--color-gray)
}

.tabs-content {
  padding-top: var(--space);
}
```

</details>

<details>

<summary>Minimal template changes:</summary>

```HTML
<div class="tabs-content">
  <Demo v-if="tab === 'demo'" :api="api" :account="account" />
  <Launch v-if="tab === 'launch'" :api="api" :account="account" />
  <Datalog v-if="tab === 'datalog'" :api="api" :account="account" /> 
</div>
```

</details>

![Dapp Interface changing step 11](./images/build-dapp-interface/dapp-11.gif "Dapp Interface changing step 11")

> Let me remind you that the finished code for this tutorial is in [this](https://github.com/positivecrash/wscool21-ui-dapp) repository. And let's shift to the next steps :)

## Datalog

Start with fixing UI elements that already known in dapp: buttons (same as we did for 'Faucet', but with different props).

Than I will wrap these element in `<fieldset>` to separate them by meaning. And write my own styles for fieldset and input elements.

<details>

<summary>Template in Datalog.vue:</summary>

```HTML
<div class="tools">
  <fieldset>
    <Button label="Read data" size="large" type="secondary" @onClick="read" />
  </fieldset>

  <fieldset>
    <input v-model="data" :disabled="isWrite" class="large" />
    <Button label="Write" :disabled="isWrite" size="large" type="secondary" @onClick="write" />
  </fieldset>
</div>
```

</details>


<details>

<summary>Styles for input elements in app.css - it's supposed to be global:</summary>

```CSS
input, select{
  padding: .3rem 0.6rem;
  border: 1px solid var(--color-gray);
  background-color: var(--color-light);
  border-radius: var(--radius);
  font-size: var(--font-size);
  font-family: var(--font-family-code);
  border-radius: .25rem;
  transition: 0.2s ease all;
}

input:focus {
  border-color: var(--color-dark);
}

input.large, select.large {
  font-size: 1.2rem;
  padding: .35rem 1rem;
}


.tools *, .tools fieldset:not(:last-child):after {
  display: inline-block;
  vertical-align: middle;
  vertical-align: -moz-middle-with-baseline;
  vertical-align: -webkit-baseline-middle;
}

.tools fieldset {
  border: 0;
}

.tools fieldset:not(:last-child):after {
  content: "•";
}

.tools fieldset > *,  .tools > * {
  margin-right: calc(var(--space)/2)
}
```

</details>

**Let's check that everything works fine after updates:**

![Dapp Interface changing step 12](./images/build-dapp-interface/dapp-12.gif "Dapp Interface changing step 12")

We have datalog section through out dapp, so I'll make component for it.

<details>

<summary>I have got the following code for new component DatalogSection.vue</summary>

```HTML
<template>
    <div v-if="log" class="log">
        <h4 class="log-title">Datalog</h4>

        <div class="log-content">

          <p v-if="log.length === 0" class="error">Not found</p>

          <details v-for="(item, k) in log" :key="k" class="box" :open="k === 0">
              <summary>{{ item[0] }}</summary>
              <pre>{{ item[1] }}</pre>
          </details>
        </div>
    </div>
</template>

<script>

export default {

  props: {
    log: {
      type: Array
    }
  },

}

</script>

<style>

.log {
  text-align: left;
  margin: var(--space) auto;
  width: 100%;
}

.log-content {
  border: 1px solid var(--color-gray);
  max-height: 500px;
  overflow-y: auto;
  padding: var(--space);
  background-color: var(--color-gray-middark);
  outline: 1px solid #fff;
  box-shadow: 0 0 60px 20px #fff inset;
}

.log-title {
  color: var(--color-gray-dark);
  font-weight: 300;
  font-family: var(--font-family-code);

  border-bottom: 1px solid var(--color-gray);
}

.log .box {
  margin-bottom: var(--space);
}

details {
  transition: 0.2s all ease;
}

details summary {
  cursor: pointer;
}

details.box {
  padding-top: 0;
  padding-bottom: 0;
}

details.box[open] {
  padding-bottom: calc(var(--space)*0.5);
}

details.box:focus {
  box-shadow: 0 0 5px var(--color-gray)
}

details.box summary {
  padding-top: calc(var(--space)*0.5);
  padding-bottom: calc(var(--space)*0.5);
}

details.box[open] summary {
  border-bottom: 1px solid var(--color-dark);
  margin-bottom: calc(var(--space)*0.5);
  font-weight: 500;
}

.log details.box summary {
  font-family: var(--font-family-code);
}

</style>
```

</details>

What to pay attention on here: we pass prop `log` as array. I assume that this multidimensional array will contain log entries, every entry has title (I wrote there date for all logs in dapp) and content. We need to reformat arrays in components **Datalog.vue** and **Launch.vue**.

Now edit **Datalog.vue**. Find method, where we get log:
```JS
async read() {
  this.log = (await this.api.query.datalog.datalog(this.account)).toArray();
}
```

Now we have to format data in **Datalog.vue**, and pass ready log array for **DatalogSection.vue**. So let's map log array:
```JS
async read() {
  this.log = (await this.api.query.datalog.datalog(this.account)).toArray().map((item) => {
    return [new Date(Number(item[0])).toLocaleString(), u8aToString(item[1])]
  });
}
```

We don't need this code anymore:
```JS
filters: {
  dateFormat: function(v) {
    return new Date(Number(v)).toLocaleString();
  },
  dataFormat: function(v) {
    return u8aToString(v);
  }
}
```

**Let's check datalog section in Datalog tab:**

![Dapp Interface changing step 13](./images/build-dapp-interface/dapp-13.gif "Dapp Interface changing step 13")

## Launch

For this step most of improvements are already done, we just need to apply it in template: import Button and Datalog components, remove excessive title:

![Dapp Interface changing step 14](./images/build-dapp-interface/dapp-14.gif "Dapp Interface changing step 14")

Let's replace `select` control element with `checkbox`.

Instead this:
```HTML
<select v-model="parameter" :disabled="isWrite">
  <option value="ON">ON</option>
  <option value="OFF">OFF</option>
</select>
```

Write this:
```HTML
<div class="toggler inline-block">
  <input v-model="parameter" :disabled="isWrite" type="checkbox" id="robot-switch" />
  <label for="robot-switch"><span></span></label>
</div>
```

<details>

<summary>Styles in app.css:</summary>

```CSS
.toggler input { display: none; }
.toggler label {
  position: relative;
  display: block;
  width: 60px;
  height: 40px;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  background-color: var(--color-gray);
  color: var(--color-light);
  text-align: center;
}

.toggler label:before {
  content: 'Off';
  width: 100%;
  text-align: center;
  line-height: 40px;
}

.toggler label:after {
  content: '';
  display: block;
  width: 6px;
  height: 100%;
  border-radius: 10px;
  background-color: var(--color-gray-dark);

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  transition: 0.3s ease-out all;
}

.toggler input:checked + label {
  background-color: var(--color-green);
}

.toggler input:checked + label:before {
  content: 'On';
}

.toggler input:checked + label:after {
  transform: translateX(54px);
  background-color: #007038;
}
```

</details>

![Dapp Interface changing step 15](./images/build-dapp-interface/dapp-15.gif "Dapp Interface changing step 15")

I want to clarify with interface that with these elements we start some device, let's visualize it. I've chosen drone, and will toggle classes according to `item.parameter`.

Create new property in `data`:
```JS
data() {
  status: false
}
```

Assign value of `parameter` to `status` after button clicked and tx sent to block:
```JS
methods: {
    async launch() {
      try {
        this.error = "";
        this.isWrite = true;

        const tx = await this.api.tx.launch
          .launch(this.robot, this.parameter === "ON")
          .signAsync(this.account);

        await tx.send(result => {
          if (result.status.isInBlock) {
            this.isWrite = false;
            this.status = this.parameter; // new line here
          }
        });
      } catch (error) {
        this.error = error.message;
        this.isWrite = false;
      }
    }
  }
```

Write styles for drone in **Launch.vue**. Don't forget `scoped` for `<style>` tag, to apply styles only for this component.

<details>

<summary>CSS for drone:</summary>

```CSS
<style scoped>
.tools {
  position: relative;
  padding-left: 120px;
  text-align: left;
  display: inline-block;
}

.launch-drone {
  position: absolute;
  width: 100px;
  left: 0;
  filter: grayscale(1);
  transition: 1s all ease-in;
}

.launch-drone.on {
  filter: grayscale(0);
  animation: DroneLaunch 10s linear infinite;
}

@keyframes DroneLaunch {
  0%, 20%, 40%, 60%, 80%, 100% {
    transform: translateY(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-20%);
  }
}
</style>
```

</details>

![Dapp Interface changing step 16](./images/build-dapp-interface/dapp-16.gif "Dapp Interface changing step 16")

Now let's add **DatalogSection.vue** component.

```JS
components: {
  DatalogSection: () => import("./DatalogSection")
}
```

Reformat log array from:

```JS
this.log.push({
  sender,
  robot,
  parameter
});
```

to (for structure like `[["entry 1 date", "entry 1 content"], ["entry 2 date", "entry 2 content"]]`):

```JS
this.log.push([new Date().toLocaleString(), {
  sender,
  robot,
  parameter
}]);
```

Replace code from template:

```HTML
<div v-if="log.length > 0" class="log">
  <div v-for="(item, k) in log" :key="k" class="row">
    sender: <b>{{ item.sender }}</b>
    <br />
    robot: <b>{{ item.robot }}</b>
    <br />
    parameter: <b>{{ item.parameter ? "ON" : "OFF" }}</b>
  </div>
</div>
```

with this:

```HTML
<DatalogSection :log="log"/>
```

**Check:**
![Dapp Interface changing step 17](./images/build-dapp-interface/dapp-17.gif "Dapp Interface changing step 17")

Sometimes you have got some errors, it's almost inevitable, something can go wrong with connection or anything else can happen. So we have fallbacks with error messages through out dapp, I haven't changed it from the start, in code they look like:

```HTML
<div v-if="error" class="error">{{ error }}</div>
```

On interface errors now look this way:

![Dapp Interface changing step 18](./images/build-dapp-interface/dapp-18.png "Dapp Interface changing step 18")

Add styles for the `.error` in **app.css**:

```CSS
.error {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-red);
}
```

And I will fix space between `.tools` section and other content from the bottom also in **app.css**:

```CSS
.tools {
  margin-bottom: var(--space);
}
```

We get:

![Dapp Interface changing step 19](./images/build-dapp-interface/dapp-19.png "Dapp Interface changing step 19")

Now on this page we have to "primary" buttons. Technically it is okay, but this is not okay from above user experience. It's better not to use more than one prevailing button on the screen. So lets fix it and add for the `Button` in **Launch.vue** with property `type="secondary"`:

![Dapp Interface changing step 20](./images/build-dapp-interface/dapp-20.png "Dapp Interface changing step 20")

Great, now I'll fix some issues with my node and go to the Demo step.

## Demo


