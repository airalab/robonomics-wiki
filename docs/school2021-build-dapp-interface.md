# Build Dapp Interface

## Introduction

This tutorial continues the previous lesson where you have built already simple application and focused mostly on technical questions. Now we will **build user-friendly interface** for this application.

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

  - If you have errors in log of running node and dapp is not loading correctly, please, try to delete data base of dev chain: `sudo rm -rf <YOUR LOCAL PATH>/robonomics/chains/dev/db/` and restart node.

</details>

## Inspecting the code

Let's inspect the structure of dApp to clear up what and where we can fix in order to change UI.

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

<!-- ## Small Dapp and Bunch of interfaces -->

## CSS-in-JS VS. Global stylesheets

In this tutorial I show how to change the interface of small dapp from scratch without any stable library of UI components. So I will import not only different Vue components, but also global styles. If your application is big or your project has whole bunch of dapps, in the future you'd better look for making library of components specifically for your project.

## First import or where to start

I don't have any specific design for this dapp, but I have [Brandbook](https://static.robonomics.network/assets/Robonomics-Visual-Identity.pdf) and [well-established](https://robonomics.network) typography, fonts, button styles etc. So for the start I will import the following css files globally:

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

**Check if fonts changed in the dapp:**

![Dapp Interface changing step 1](./images/build-dapp-interface/dapp-1.png "Dapp Interface changing step 1")


<!-- ## Prettify layout -->

## Change layout and prettify the title

Lets change layout of application. As I mentioned earlier, you can write your styles directly in App.vue, but I prefer for this example to separate it.

- Comment or delete styles from tag `<style>` in **App.vue**

- Create css file **app.css** in styles folder for this application and import it in **main.js**

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

<summary>Change the title of the app: App.vue</summary>

```html
<div class="top">
    <h1>dApp Robonomics Demo</h1>
    <i>Winter School 2021</i>
    <img class="label" alt="" src="./assets/images/robonomics-winter-school-2021-logo.png"/>
</div>
```

</details>



<details>

<summary>Write styles for the title: app.css</summary>

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

Now I will wrap the app's content in element and I need different styles for different states of dapp (loaded or not loaded).

- Write wrapping element:
```html
<div class="content">
  <!--here is everything going after the title-->
</div>
```
- Open the **App.vue** and find the variable `load` that already defined in `<script>`.
- Pass an object to `v-bind:class` to dynamically toggle classes (I use shortened version `:class`):
```html
<div class="content" :class="{ load: load }">
  <!--here is everything going after the title-->
</div>
```
Thats how you can easily toggle styles in your app according to the data you get.

## Define views according to the dapp's data

Lets change the loader for the app.
- For this purpose I will import my component from another Robonomics project **./src/components/AnimatedRobonomicsLogo.vue**
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
  <template v-else></template>
</div>
```
- Watch result in browser. It has some issues, that we will fix now:

1. Loader pops up to the title (it should be in the center). Lets insert these lines to **app.css**:
```css
body, html, #app {
  min-height: 100%;
  height: 100%;
  position: relative; /* this style for the future, just place it at the same time */
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

</details>