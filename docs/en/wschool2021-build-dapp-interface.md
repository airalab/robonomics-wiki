---
title: Lesson 6.2, Build IoT Dapps For End Users
locale: 'en' 
contributors: [positivecrash]
translated: true
---

This lesson continues the previous one, where you have already built simple application and were focused on connecting an account to a node, sending transactions and other vital functions of the dapp. Now we will **build user-friendly interface** for this application.

<!-- ![Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot](../images/build-dapp-interface/sum.gif "Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot") -->

<img src="../images/build-dapp-interface/sum.gif" alt="Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot" />

## Prerequisites

This lesson is designed for people who are familiar with **HTML, CSS, JavaScript** a bit and want to learn how to apply these skills for decentralized applications.

For building your dapp's interface you can choose any JavaScript framework which is comfortable for you or even try to build interface without any framework. In Robonomics 2021 we use [Vue.js](https://vuejs.org) as it is quite scalable and easy to use.

## Set up

If you start with this step and prefer to **learn by doing**, please, follow this to-do list to launch the resulting dapp from the previous lesson:


1. Download a local Robonomics node v 0.22 from [releases page](https://github.com/airalab/robonomics/releases/tag/v0.22.0) that fits your OS. If you do not find your system in the latest release, please, find the most recent version in the previous releases.

2. Launch the Robononomics node in the Developer mode by typing `./robonomics --dev --tmp` in your terminal.

3. Download the Polkadot Extension for Chrome or Firefox [here](https://polkadot.js.org/extension/)

4. Clone [this repository](https://github.com/vol4tim/example-robonomics-dapp/).

5. Install [Yarn](https://yarnpkg.com).

6. Install [@vue/cli](https://cli.vuejs.org/guide/installation.html)

7. Start developing dapp with  commands in your terminal:
```shell
cp src/config.template.json src/config.json
yarn
yarn serve
```


**You should get this screen in your browser:**

![Dapp Start](../images/build-dapp-interface/dapp-start.png "Dapp Start")


<details>

  <summary>Some additional tips for launching</summary>

  - Make sure your **node is running**:
    ![Example of running a Robonomics node](../images/build-dapp-interface/robonomics-node-launch.png "Example of running Robonomics node")

  - In **macOS** you may need to change the **access permissions** `chmod +x robonomics`

  - Make sure you allowed **access for Polkadot Extension**:
    ![Polkadot Extension giving access](../images/build-dapp-interface/polkadot-permission.png "Polkadot Extension giving access")

  - If you have errors in log of the running node and dapp is not loading correctly, please, try to delete data base of dev chain: `sudo rm -rf <YOUR LOCAL PATH>/robonomics/chains/dev/db/` and restart the node. If it does not help, restart your machine.

</details>

## Inspecting the code

Let's inspect the structure of the dapp to clear up what and where we can fix in order to change UI.

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
│   ├── utils/                # Folder with important for app js functions (we will touch api.js in this lesson)
│   ├── App.vue               # The root of our app, contains HTML, CSS, JS for the whole page. In fact it is Vue Component also
│   ├── main.js               # The app’s entry file, we will import here global styles
├── ...                       # There are config files and dependencies files, that we will not change mannually
├── README.md                 # You can write here any instructions for your dapp

```

> **The code of the lesson is in this [repository](https://github.com/positivecrash/wscool21-ui-dapp)**

## CSS-in-JS VS. Global stylesheets

In this lesson I show how to change the interface of a small dapp from scratch without any stable library of UI components. So I will import and create not only different Vue components, but also write my own styles.

If your application is big or your project has the whole bunch of dapps, in future you'd better look for building library of components specifically for your project to make UI more organized and efficient ([for example, here is a tool for organizing components](https://storybook.js.org)). Or if you are okay with standart interface themes, you can use any UI Libraries of third party ([for example](https://vuetifyjs.com/)).

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

Import these CSS files into your app by editing **main.js** file:

![Import global CSS in Vue app](../images/build-dapp-interface/import-css-vue-1.png "Import global CSS in Vue app")

```JS
import './assets/styles/reset.css'
import './assets/styles/variables.css'
import './assets/styles/typography.css'
import './assets/styles/animation.css'
```

**Check if fonts have been changed in the dapp:**

![Dapp Interface changing step 1](../images/build-dapp-interface/dapp-1.png "Dapp Interface changing step 1")


## Change layout and prettify the title

Let's change layout of the application. As I mentioned earlier, you can write your styles directly in App.vue, but for this example I prefer to separate this process.

- Comment or delete styles from tag `<style>` in **App.vue**

- Create css file **app.css** in styles folder for this application and import it into **main.js**

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

- Place a file with the logo of the Robonomics winter school 2021 in the folder **./src/assets/images**

**You will get the following screen:**
![Dapp Interface changing step 2](../images/build-dapp-interface/dapp-2.png "Dapp Interface changing step 2")

## Define styles according to the dapp's data

Now I will wrap the app's content in `<div>` element. Also I will need different styles for different states of the dapp (loaded or not loaded).

- Open the **App.vue** and write a wrapping element:
```html
<div class="content">
  <!--here is everything going after the title-->
</div>
```
- Find the variable `load`, it has already been defined in `<script>`.
- Pass an object to `v-bind:class` to dynamically toggle classes (I use shortened version `:class`):
```html
<div class="content" :class="{ load: load }">
  <!--here is everything going after the title-->
</div>
```
That's how you can easily toggle styles in your app according to the data you get. You will see the usage of this class below.

## Define views according to the dapp's data

Let's change the loader for the app.
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

- Register this component in **App.vue**
```JS
export default {
  components: {
    Loader: () => import("./components/AnimatedRobonomicsLogo")
  }
}
```
- Insert it with conditional Vue directive `v-if`, using the already known variable `load`:
```HTML
<div class="content" :class="{ load: load }">
  <Loader v-if="load" />
  <template v-else>
    <!-- here will be main content of loaded dapp -->
  </template>
</div>
```
- Watch the result in browser. It has some issues that we will fix now:

1. Loader pops up to the title (it should be in the center). Let's insert these lines to **app.css**:
```css
body, html, #app {
  height: 100%;
  position: relative;
}
```
2. If your connection goes too fast, you will see just blinking loader for a moment. It may confuse a lot. Let's set a timeout for the app's responce. To do that open **api.js** and find in the function `initAccount` this code:
```JS
const timeout = new Promise(resolve => {
  setTimeout(resolve, 300);
});
```
I set `1700` instead of `300` and check the result:

<!-- ![Dapp Interface changing step 3](../images/build-dapp-interface/dapp-3.gif "Dapp Interface changing step 3") -->
<img src="../images/build-dapp-interface/dapp-3.gif" alt="Dapp Interface changing step 3" />


## Using reusable components

You have already watched how to register and use a component in the previous section about Loader, but now I want to focus on it more carefully.

Let's change the Account section. Here I will use self-written components (box, button, icon) and the third party's one ([from Vue Polkadot Library](https://vue-polkadot.js.org/vue-ui/vue-identicon/#vue-polkadot-vue-identicon )).

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

Now we can use it many times throught out the dapp. Let's see this on the Account section example:

- Register component (**App.vue**):

```JS
export default {
  components: {
    Box: () => import("./components/Box")
  }
}
```

- Use it for the Account section with an additional class passed with prop `classList`:

```HTML
<Box :classList="'account'">
  Account: <b>{{ account }}</b> {{ balance }} |
  <button @click="faucet">
    faucet
  </button>
</Box>
```

**Check the result:**
![Dapp Interface changing step 4](../images/build-dapp-interface/dapp-4.png "Dapp Interface changing step 4")

### Adding the button

You may even not notice the button in the box that we have added. Let's fix it and add a component for buttons as it is not the only button in the app.

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


- Register the component (**App.vue**):

```JS
export default {
  components: {
    Button: () => import("./components/Button")
  }
}
```

- Use it for the 'Faucet' button with props defined in the 'Button' component

```HTML
<Box :classList="'account'">
  Account: <b>{{ account }}</b> {{ balance }}
  <Button label="Faucet" size="large" @onClick="faucet" />
</Box>
```

**We get this view:**
![Dapp Interface changing step 5](../images/build-dapp-interface/dapp-5.png "Dapp Interface changing step 5")

For the Button component we have emited the click from prop with `@onClick`, so I will pay attention if the faucet function is working correctly now (the balance should change on click):

<!-- ![Dapp Interface changing step 6](../images/build-dapp-interface/dapp-6.gif "Dapp Interface changing step 6") -->
<img src="../images/build-dapp-interface/dapp-6.gif" alt="Dapp Interface changing step 6" />

### Adding the icon

Let's add an icon to this button to attract more attention to this element of the interface, as user can't interact with the dapp properly without units and clicking on this button.

For this purpose you can use any ready Vue library for icons, I will create my own component with the icon.

- I found an appropriate icon on [the big online archive of icons](https://www.flaticon.com).
- Downloaded .svg file and edited it in the vector graphics editor to make the proper size.
- Inserted svg as a text in the Icon.vue component.

<details>

<summary>Here is what I got as the Icon.vue component</summary>

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

To use it with the button, edit the Button component.

Import the Icon in **Button.vue**:

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

Add the Icon to the button (we can specify different templates with `v-if` condition):

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

Add the icon prop into the button in **App.vue**:

```HTML
<Button label="Faucet" size="large" icon="faucet" @onClick="faucet" />
```

**Check:**

![Dapp Interface changing step 7](../images/build-dapp-interface/dapp-7.png "Dapp Interface changing step 7")

### Add the Polkadot avatar

- Install [@vue-polkadot/vue-identicon](https://vue-polkadot.js.org/vue-ui/vue-identicon/#vue-polkadot-vue-identicon)

- Import to App.vue:
```JS
components: {
    Identicon: () => import("@vue-polkadot/vue-identicon")
}
```

- Insert the avatar instead of the word 'Account', pass props according to the documentation, use `account` data as a value prop:
```HTML
<Identicon
  :value="account"
  :theme="'polkadot'"
  :size="40"
  :class="'inline-block'"
/>
```

**Check:**

![Dapp Interface changing step 8](../images/build-dapp-interface/dapp-8.png "Dapp Interface changing step 8")

## Data manipulation for the better view

Let's cut the account address:

- Wrap the variable `account` in the computed property:

```JS
computed: {
  AccountAddress() {
    return this.account.slice(0, 6) + "..." + this.account.slice(-4);
  }
}
```

- Replace the variable `account` with `AccountAddress` in the template

**Check:**

![Dapp Interface changing step 9](../images/build-dapp-interface/dapp-9.png "Dapp Interface changing step 9")

## CSS magic

Let's prettify the account section a little bit more:

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

<!-- ![Dapp Interface changing step 10](../images/build-dapp-interface/dapp-10.gif "Dapp Interface changing step 10") -->
<img src="../images/build-dapp-interface/dapp-10.gif" alt="Dapp Interface changing step 10" />

Let's edit styles for the tabs:

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

<!-- ![Dapp Interface changing step 11](../images/build-dapp-interface/dapp-11.gif "Dapp Interface changing step 11") -->
<img src="../images/build-dapp-interface/dapp-11.gif" alt="Dapp Interface changing step 11" />

> Let me remind you that the finished code for this lesson is in [this](https://github.com/positivecrash/wscool21-ui-dapp) repository. And let's shift to the next steps :)

## Datalog

Start with fixing UI elements that are already known in the dapp: buttons (same as we have done for the 'Faucet', but with different props).

Then I will wrap these elements in `<fieldset>` to separate them by meaning. And I will write my own styles for the fieldset and input elements.

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

<!-- ![Dapp Interface changing step 12](../images/build-dapp-interface/dapp-12.gif "Dapp Interface changing step 12") -->
<img src="../images/build-dapp-interface/dapp-12.gif" alt="Dapp Interface changing step 12" />

We have a datalog section through out the dapp, so I'll make a component for it.

<details>

<summary>I have got the following code for a new component DatalogSection.vue</summary>

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

What you should pay attention to here: we pass prop `log` as an array. I assume that this multidimensional array will contain log of entries and every entry has a title (I wrote there date for all logs in the dapp) and content. We need to reformat arrays in components **Datalog.vue** and **Launch.vue**.

Now edit **Datalog.vue**. Find method, where we get the log:
```JS
async read() {
  this.log = (await this.api.query.datalog.datalog(this.account)).toArray();
}
```

Now we have to format data in **Datalog.vue**, and pass ready log array for **DatalogSection.vue**. So let's map the log array:
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

**Let's check the datalog section in Datalog tab:**

<!-- ![Dapp Interface changing step 13](../images/build-dapp-interface/dapp-13.gif "Dapp Interface changing step 13") -->
<img src="../images/build-dapp-interface/dapp-13.gif" alt="Dapp Interface changing step 13" />

## Launch

For this step, most of improvements have already been done, we just need to apply them to the template: import Button and Datalog components, remove the excessive title:

<!-- ![Dapp Interface changing step 14](../images/build-dapp-interface/dapp-14.gif "Dapp Interface changing step 14") -->
<img src="../images/build-dapp-interface/dapp-14.gif" alt="Dapp Interface changing step 14" />

Let's replace `select` control element with `checkbox`.

Instead of this:
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

<!-- ![Dapp Interface changing step 15](../images/build-dapp-interface/dapp-15.gif "Dapp Interface changing step 15") -->
<img src="../images/build-dapp-interface/dapp-15.gif" alt="Dapp Interface changing step 15" />

I want to clarify something with the interface: with these elements we start some device. Let's visualize it. I've chosen a drone, so I will toggle classes according to `item.parameter`.

Create a new property in `data`:
```JS
data() {
  status: false
}
```

Assign value of `parameter` to `status` after button is clicked and tx is sent to the block:
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

Write styles for the drone in **Launch.vue**. Don't forget `scoped` for `<style>` tag, to apply styles only for this component.

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

<!-- ![Dapp Interface changing step 16](../images/build-dapp-interface/dapp-16.gif "Dapp Interface changing step 16") -->
<img src="../images/build-dapp-interface/dapp-16.gif" alt="Dapp Interface changing step 16" />

Now let's add the **DatalogSection.vue** component.

```JS
components: {
  DatalogSection: () => import("./DatalogSection")
}
```

Reformat the log array from:

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

Replace the code from the template:

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
<!-- ![Dapp Interface changing step 17](../images/build-dapp-interface/dapp-17.gif "Dapp Interface changing step 17") -->
<img src="../images/build-dapp-interface/dapp-17.gif" alt="Dapp Interface changing step 17" />

Sometimes you get some errors, it's almost inevitable. Something can go wrong with the connection or anything else can happen. So we have fallbacks with error messages through out the dapp, I haven't changed them from the start, in the code they look like:

```HTML
<div v-if="error" class="error">{{ error }}</div>
```

On the interface errors look this way now:

![Dapp Interface changing step 18](../images/build-dapp-interface/dapp-18.png "Dapp Interface changing step 18")

Add styles for the `.error` in **app.css**:

```CSS
.error {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-red);
}
```

And I will fix a space between the `.tools` section and other content from the bottom as well in **app.css**:

```CSS
.tools {
  margin-bottom: var(--space);
}
```

We get:

![Dapp Interface changing step 19](../images/build-dapp-interface/dapp-19.png "Dapp Interface changing step 19")

Now on this page we have to "primary" buttons. Technically it is okay, but this is not okay from the above user experience. It's better not to use more than one prevailing button on the screen. So let's fix it and add for the `Button` in **Launch.vue** with property `type="secondary"`:

![Dapp Interface changing step 20](../images/build-dapp-interface/dapp-20.png "Dapp Interface changing step 20")

Great, now I'll fix some issues with my node and go to the Demo step.

## Demo

For the start, I'd like to swap tabs, to pay more attention to the most relevant one, but this is not the first step that we do to practice. Reverse tabs in **App.vue**.

Don't forget to replace the default data:

```JS
data() {
    return {
      ...
      tab: "demo"
    };
},
```

![Dapp Interface changing step 21](../images/build-dapp-interface/dapp-21.png "Dapp Interface changing step 21")

As usual let's start with changing what we have already got.

- Remove the title `<h2>Demo</h2>` as in the previous steps
- Find UI elements that we have already learn – datalog, buttons, account address. But not so fast. Now we'll change the datalog only.

Add the component to **Demo.vue**:

```JS
components: {
  DatalogSection: () => import("./DatalogSection")
}
```

```HTML
<DatalogSection :log="log"/>
```

We've got raw data in the log, so we need to reformat the array with the log to pass in the component ready-view data as in the previous steps. Find the line `return [item[0], item[1]];` in `async created()` and replace it with:

```JS
return [new Date(Number(item[0])).toLocaleString(), JSON.parse(u8aToString(item[1]))];
```

Remove the unused code from the log:

```HTML
<div v-if="log" class="log">
  <p v-if="log.length === 0" class="error">Not found</p>
  <div v-for="(item, k) in log" :key="k" class="row">
    <b>{{ item[0] | dateFormat }}</b>
    <pre>{{ item[1] | dataFormat }}</pre>
  </div>
</div>
```

and:

```JS
filters: {
  dateFormat: function(v) {
    return new Date(Number(v)).toLocaleString();
  },
  dataFormat: function(v) {
    return JSON.parse(u8aToString(v));
  }
},
```

**Check:**
![Dapp Interface changing step 22](../images/build-dapp-interface/dapp-22.png "Dapp Interface changing step 22")

For customization of this demo example with launching a robot, you are free to come up with any idea. Personally, I started with this town:

<!-- ![Dapp Interface changing step 23](../images/build-dapp-interface/dapp-23.gif "Dapp Interface changing step 23") -->
<img src="../images/build-dapp-interface/dapp-23.gif" alt="Dapp Interface changing step 23" />

I won't show the whole code for this not to confuse you at all, but schematically there will be something like this:

```HTML
<div class="demo" :class="[robot.state ? 'play' : 'stop']">
  <div class="demo-back"></div>
  <div class="demo-city"></div>
  <div class="demo-car"></div>
</div>
```

Than within the element `.demo.play` write styles for moving the city backward, and the car forward.

While working on this, I came up with the idea of realization the CyberPunk city. As I have no any particullar task, so the car became a taxi, driver became a passenger, and now on the interface we have an AI robot hologram welcoming the passenger (these all are just CSS and graphics tweaks&&tricks).

**The code for the Cyberpunk city demo:**

<details>

<summary>Template</summary>

```HTML
<div class="demo" :class="[robot.state ? 'play' : 'stop']">
  <div class="demo-back-1"></div>
  <div class="demo-back-2"></div>
  <div class="demo-city-1"></div>
  <div class="demo-car"></div>

  <div class="demo-data">
    <div class="demo-data-driver inline-block">
      <img alt="Driver's avatar" src="../assets/images/cabman.png" v-if="robot.state"/>
    </div>
    <div class="demo-data-lines inline-block">
      <div class="demo-data-line">
          <div>Robot</div>
          <div>[ {{ addressShort(robot.address) }} ]</div>
      </div>

      <div class="demo-data-line" v-if="robot.state">
          <div>Passenger</div>
          <div>[ {{ addressShort(robot.driver) }} ]</div>
      </div>

      <div class="demo-data-welcome" v-if="robot.state">
          <span>Hello, passenger. </span>
          <span>I've linked to the vehicle. </span>
          <span>Your ride begins, congrats! </span>
      </div>
    </div>

  </div>

  <Button :label="robot.state ? 'stop' : 'run'" :disabled="isWrite" size="large" @onClick="run" />
</div>
```

</details>

There are more than one hash address that should be shortenned, so I added the method:

```JS
methods: {
  addressShort(address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }
}
```

Don't forget to register the Button component

```JS
components: {
  Button: () => import("./Button")
}
```

<details>

<summary>Styles</summary>

```CSS
<style scoped>
.demo {
    --h: 120px;
    --color-yellow: #F2F209;

    background-color: #AFCCD3;

    background: linear-gradient(#010123, #4baac7);

    position: relative;
    height: 500px;
    overflow: hidden;

    border-width: 2px 2px 2px 15px;
    border-style: solid;
    border-color: var(--color-yellow);
    
}

.demo:before {
    content: '[ Delamain cabs rental DEMO ]';
    background-color: var(--color-yellow);
    color: #000;

    position: absolute;
    top: 0;
    left: 0;
    padding: .5rem 1rem;

    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 300;

    border-width: 0 6px 2px 0;
    border-style: solid;
    border-color: #7B186E;
}

div[class^=demo-back-], div[class^=demo-city-] {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 2;
}

div[class^=demo-back-]{
    border-top: 1px solid #364444;
}

div[class^=demo-city-] {
    background-repeat: repeat-x;
    background-size: cover;
    background-position: 100% 0;

    height: 300px;
    bottom: var(--h);

    animation: 50s MoveCity infinite linear 1.5s;
}

div.demo-back-1 {
    background-color: #060236;
    background: linear-gradient(#7B186E, #060236);
    height: var(--h);
    bottom: 0;
}

div.demo-back-2 {
    background-color: #c515ae;
    border-width: 2px 0;
    border-style: solid;
    border-color: #69045c;

    height: 20px;
    bottom: var(--h);
    z-index: 10;
}

div.demo-city-1 {
    background-image: url(../assets/images/city-1.png);
}

.demo-car {
    background-image: url(../assets/images/car.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 100% 0;

    width: calc(508px * 0.5);
    height: calc(257px * 0.5);
    position: absolute;
    bottom: calc(var(--h) + 4px);
    z-index: 10;

    transform: translateX(-100px);
    animation: MoveCar 50s infinite 1.5s linear;
}

.demo.play div[class^=demo-city-], .demo.play .demo-car { animation-play-state: running; }
.demo.stop div[class^=demo-city-], .demo.stop .demo-car { animation-play-state: paused; }

.demo.play .demo-car {
    background-image: url(../assets/images/car-ride.png);
}


.demo button {
    background-color: var(--color-yellow);
    border-color: var(--color-yellow);
    color: #000;

    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
}

.demo-data {
    position: absolute;
    bottom: 30px;
    left: 30px;
    z-index: 1000;

    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    padding: .5rem;
    font-family: var(--font-family-code);

    transition: 0.2s all ease;
}

.demo-data-lines {
    max-width: 400px;
}

.demo-data-line {
    display: grid;
    grid-template-columns: 100px auto;
    gap: .5rem;
    text-align: left;
}

.demo-data-line div:first-child {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
}

.demo-data-driver {
    margin-right: 1rem;
}

.demo-data-driver img {
    display: block;
    max-width: 100px;

    visibility: hidden;
    opacity: 0;
    animation: FadeInBlink .3s cubic-bezier(0.075, 0.82, 0.165, 1) 0.6s forwards;
}

.demo-data-welcome {
    text-align: left;
    padding-top: .5rem;
}

.demo-data-welcome span {
    visibility: hidden;
    opacity: 0;

    animation-name: FadeIn;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-duration: 0.6s;
    animation-fill-mode: forwards;
}

.demo-data-welcome span:nth-child(1) { animation-delay: 1.5s; }
.demo-data-welcome span:nth-child(2) { animation-delay: 2.5s; }
.demo-data-welcome span:nth-child(3) { animation-delay: 3.2s; }


@keyframes MoveCity
{
  100% {
    background-position: -1000px 0;
  }
}

@keyframes MoveCar
{
    0% {
        transform: translateX(-100px);
    }
    100% {
        transform: translateX(960px);
    }
}
</style>

```

</details>

**Result:**

<!-- ![Dapp Interface changing step 25](../images/build-dapp-interface/dapp-25.gif "Dapp Interface changing step 25") -->

## Conclusion

Congratulations! Now you have redesigned the dapp and clues how to start building your application's interface.

### Checkout links

- [Full code of this lesson](https://github.com/positivecrash/wscool21-ui-dapp)
- [Discuss in Discord](https://discord.gg/5UWNGNaAUf)
- [View the Robonomics Winter School 2021 schedule and summary](https://robonomics.network/blog/winter-robonomics-school/)
- [Github of contributor](https://github.com/positivecrash)

### Practice

If you have some extra time or want to practice your skills, there are some ideas for improvements that you could make to this demo:

- Adapt UI for narrow screens, make the dapp mobile-friendly
- Add the 'day/night' mode, by editing the **_variables.scss** file and the template file of the dapp
- Add 'Copy to clipboard' buttons for addresses
- Make delicate popus to inform users about changes (e.g. you can popup a message that units are received after clicking the 'Faucet' button, or you can move in the popup an error that we had in the 'Launch' section).

Please, fill free to ask questions and share your results in [Discord](https://discord.gg/5UWNGNaAUf), mark me in your message `@positivecrash`






