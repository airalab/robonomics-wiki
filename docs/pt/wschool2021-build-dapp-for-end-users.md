---
title: Lesson 6.1, Build IoT Dapps For End Users
locale: 'pt' 
contributors: [vol4tim]
translated: true
---

Having organized the connection of devices to the blockchain and set up their work, the next stage is the actual creation of a convenient and user-friendly application that performs the main functionality for the user, which would wrap the basic functions of Robonomics. For blockchain systems, the human-machine interface is provided by decentralized applications (dapps).

In this lesson, you will learn how to create a basic dapp for Robonomics Parachain, provide main functionality and connect the application to the parachain.

## Getting ready

### Robonomics node launch

For dApp development and testing, we will use a local Robonomics node. To do this, you need to download the compiled binary file v0.24 from https://github.com/airalab/robonomics/releases. I will be using Ubuntu, so I download the appropriate version.

Unpack the archive
```sh
wget https://github.com/airalab/robonomics/releases/download/v0.24.0/robonomics-ubuntu-0.24.0-x86_64.tar.xz
tar -xvf robonomics-ubuntu-0.24.0-x86_64.tar.xz
chmod +x robonomics
```

Now we can start the node in development mode. To do this, use the --dev flag
```sh
./robonomics --dev --tmp
```

> Troubleshooting
```sh
./robonomics purge-chain --dev
```

### Browser extension

To store keys in a browser, there is a `polkadot{.js} extension`. In dApp we will use it to sign transactions.

The extension is currently available for `Google chrome` and `Firefox` https://polkadot.js.org/extension/

After installing the extension, create a new account.
![screen1](../images/build-iot-dapps/screen1.png)

> The first step is completed.

## DApp development

### Step 1

> We will write the dApp using the vue.js framework, although you can use whatever you like/can.

Let's start developing the dApp by creating a startup application with vue.js And here you can do it in two ways.

Way 1:

Using the `Vue cli` console utility.
To do this, you need to install [it](https://cli.vuejs.org/guide/installation.html)
Also we will need `yarn`. Install it from [here](https://yarnpkg.com)

After installation, you can run the command in the terminal

```sh
vue create mydapp
```

Answer a few questions of the setup wizard. We will be using version Vue 2, so we keep the default version `Default ([Vue 2] babel, eslint)`.

Way 2:

Clone the prepared git repository with the example and switch to step 1

```sh
git clone https://github.com/airalab/example-robonomics-dapp.git mydapp
cd mydapp
git checkout step-1
```

As a result, we will get a directory with the installed startup application, which can already be launched and opened in the browser.

```sh
yarn
yarn serve
```

### Step 2. Getting started with polkadot.js

#### Installing dependencies

To connect the dApp to the Robonomics chain, there is the `@polkadot/api` library. And for interaction of dApp with an extension with keys, we have the `@polkadot/extension-dapp` library. We need to install them into our application.
More details on using this library can be found in the documentation https://polkadot.js.org/docs/.

Way 1:

```sh
yarn add @polkadot/api @polkadot/extension-dapp
```

You also need to add the `vue.config.js` file to support `mjs` extension.

`vue.config.js`
```js
module.exports = {
  publicPath: "",
  configureWebpack: {
    resolve: {
      extensions: ["*", ".mjs", ".js", ".vue", ".json", ".gql", ".graphql"]
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  }
};
```

#### Connecting to Robonomics

First, let's create a configuration file with the parameters for connecting to the Robonomics node. In the demo repository, there is an example of this file `config.template.json`.

`src/config.json`
```json
{
  "endpoint": "ws://localhost:9944",
  "types": {
    "Record": "Vec<u8>",
    "Parameter": "Bool",
    "Address": "AccountId",
    "LookupSource": "AccountId"
  }
}
```

In this file, we indicate the node, which we are going to connect to, and custom types.

Now we need to write a script to connect to our running node.

`src/utils/api.js`
```js
import { ApiPromise, WsProvider } from "@polkadot/api";
import config from "../config.json";

let api;
export async function initApi() {
  const provider = new WsProvider(config.endpoint);
  api = await ApiPromise.create({
    provider,
    types: config.types
  });
  return api;
}

export function getApi() {
  return api;
}
```

So that we can sign transactions with the key from the extension, let’s add two functions for connecting to the extension and the function for initializing the account.

`src/utils/api.js`
```js
...OTHER_CODE...

import {
  web3Accounts,
  web3Enable,
  web3FromAddress
} from "@polkadot/extension-dapp";

async function getExtension() {
  const extensions = await web3Enable("demo");
  if (extensions.length === 0) throw new Error("no extension");
  return extensions[0];
}

export async function initAccount(index = 0) {
  const timeout = new Promise(resolve => {
    setTimeout(resolve, 300);
  });
  await timeout;
  await getExtension();
  const accounts = await web3Accounts();
  if (accounts.length > 0) {
    const injector = await web3FromAddress(accounts[index].address);
    api.setSigner(injector.signer);
    return accounts[index].address;
  }
  throw new Error("no accounts");
}

...OTHER_CODE...
```

Our account will have a zero balance, while we need a little funds. So we need to create another faucet function. As we launched Robonomics with the `--dev` flag, we have `Alice` account with a large balance, so we will request funds from there.

`src/utils/api.js`
```js
...OTHER_CODE...

import { Keyring } from "@polkadot/keyring";

export function getBalance(account, cb) {
  api.query.system.account(account, ({ data: { free: currentFree } }) => {
    cb(currentFree);
  });
}

export const keyring = new Keyring({ type: "sr25519" });

export async function faucet(address) {
  keyring.setSS58Format(api.registry.chainSS58);
  const account = keyring.addFromUri("//Alice");
  const tx = api.tx.balances.transfer(address, 1000000000000000);
  await tx.signAndSend(account);
}

...OTHER_CODE...
```

The full version of script https://github.com/airalab/example-robonomics-dapp/blob/master/src/utils/api.js

Run app

```sh
yarn serve
```

Way 2:

If you start the application with cloning the repository, then in order to complete these steps, it will be enough to switch to step 2 and install the rest of the dependencies.

```sh
git checkout step-2
cp src/config.template.json src/config.json
yarn
yarn serve
```

### Step 3. Vue connecting component

#### Connecting

We have already written a script for connecting. Now we can use it on our interface. It is enough to call the written `initApi` function in  the root component `App.vue`. And while the user is waiting for a connection, we will show him a small loader, for now in the form of an ellipsis.

Way 1:

Component template and base styles.

`src/App.vue`
```js
<template>
  <div id="app">
    <h1>Robonomics dApp</h1>
    <div v-if="load">...</div>
    <template v-else>
      <div v-if="error" class="error">{{ error }}</div>
      <template v-else-if="api">
        connected
      </template>
    </template>
  </div>
</template>

...OTHER_CODE...

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  font-size: 14px;
  padding: 5px 12px;
}
button:hover {
  cursor: pointer;
}
input {
  font-size: 14px;
  padding: 5px;
}
select {
  font-size: 14px;
  padding: 5px;
}
button:focus,
input:focus {
  outline: none;
}
.error {
  color: rgb(151, 31, 31);
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
}
</style>
```

There is the component code where the  `initApi` function will be called

`src/App.vue`
```js
<script>
import { initApi } from "./utils/api";

export default {
  name: "App",
  data() {
    return {
      load: false,
      api: null,
      error: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      try {
        this.load = true;
        this.api = await initApi();
        this.load = false;
      } catch (error) {
        this.error = error.message;
        this.load = false;
      }
    }
  }
};
</script>
```

#### Account with balance

Now we can use our account, top up its balance and show it on the interface.

Let’s add the appropriate markup to the template

`src/App.vue`
```js
<template>

  ...OTHER_CODE...

    <template v-else>
      <div v-if="error" class="error">{{ error }}</div>
      <template v-else-if="api && account">
        <p>
          Account: <b>{{ account }}</b> {{ balance }} |
          <button @click="faucet">
            faucet
          </button>
        </p>
      </template>
    </template>

  ...OTHER_CODE...

</template>
```

Let’s add new fields for account address and balance

`src/App.vue`
```js

...OTHER_CODE...

data() {
  return {

    ...OTHER_CODE...

    account: null,
    balance: 0,

    ...OTHER_CODE...

  };
}

...OTHER_CODE...
```

We need to add the account initialization to the `init` function and get its balance

`src/App.vue`
```js
<script>
import { initApi, initAccount, getBalance, faucet } from "./utils/api";
import { formatBalance } from "@polkadot/util";

...OTHER_CODE...

async init() {

  ...OTHER_CODE...

  this.api = await initApi();
  this.account = await initAccount();
  getBalance(this.account, balance => {
    this.balance = formatBalance(balance);
  });

  ...OTHER_CODE...

}

...OTHER_CODE...
</script>
```

It remains to add the function of replenishing the balance, when clicking on the button

`src/App.vue`
```js

...OTHER_CODE...

  methods: {
    faucet() {
      faucet(this.account);
    },

...OTHER_CODE...
```

https://github.com/airalab/example-robonomics-dapp/blob/step-3/src/App.vue

Run app

```sh
yarn serve
```

Way 2:

If you start the application with cloning the repository, then to complete these steps, you will just need to switch to step 3.

```sh
git checkout step-3
yarn serve
```

As a result we will get this picture in the browser

![screen2](../images/build-iot-dapps/screen2.png)

### Step 4. Datalog

To save and read any data in the chain, we use the `datalog` module.

For an example of how to use this module, let's make a `Datalog.vue` component.

Way 1:

In the markup, we will have a button for reading data `read` with a block, where we will display a list in the form of a date and the data itself. And there will be a form with a text input, into which you can enter any data in the form of a string, and a `write` button.

`src/components/Datalog.vue`
```js
<template>
  <div>
    <h2>Datalog</h2>
    <button @click="read">read</button> |
    <input v-model="data" :disabled="isWrite" />
    <button @click="write" :disabled="isWrite">write</button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="log" class="log">
      <p v-if="log.length === 0" class="error">Not found</p>
      <div v-for="(item, k) in log" :key="k" class="row">
        date: <b>{{ item[0] | dateFormat }}</b>
        <br />
        data: <b>{{ item[1] | dataFormat }}</b>
      </div>
    </div>
  </div>
</template>

...OTHER_CODE...

<style scoped>
.log {
  border: 1px solid #eee;
  text-align: left;
  width: 800px;
  margin: 20px auto;
}
.log .row {
  margin: 10px;
}
</style>
```

Component code. Here the main point in sending a transaction is to call the function, into which we transfer data and which we sign with our account, via api `this.api.tx.datalog.record(stringToHex(this.data)).signAsync(this.account);`

`src/components/Datalog.vue`
```js
<script>
import { stringToHex, u8aToString } from "@polkadot/util";

export default {
  props: ["api", "account"],
  data() {
    return {
      data: "data string",
      log: null,
      isWrite: false,
      error: ""
    };
  },
  filters: {
    dateFormat: function(v) {
      return new Date(Number(v)).toLocaleString();
    },
    dataFormat: function(v) {
      return u8aToString(v);
    }
  },
  methods: {
    async read() {
      this.log = (await this.api.query.datalog.datalog(this.account)).toArray();
    },
    async write() {
      try {
        this.error = "";
        this.isWrite = true;
        const tx = await this.api.tx.datalog
          .record(stringToHex(this.data))
          .signAsync(this.account);
        await tx.send(result => {
          if (result.status.isInBlock) {
            this.read();
            this.isWrite = false;
          }
        });
      } catch (error) {
        this.error = error.message;
        this.isWrite = false;
      }
    }
  }
};
</script>
```

https://github.com/airalab/example-robonomics-dapp/blob/master/src/components/Datalog.vue

To switch between components, added to `App.vue` the output of our component

`src/App.vue`
```js
...OTHER_CODE...

<template v-else-if="api && account">
  <p>
    Account: <b>{{ account }}</b> {{ balance }} |
    <button @click="faucet">faucet</button>
  </p>

  <div>
    <div class="tabs">
      <button
        @click="tab = 'datalog'"
        :class="{ active: tab === 'datalog' }"
      >
        datalog
      </button>
    </div>
    <Datalog v-if="tab === 'datalog'" :api="api" :account="account" />
  </div>
</template>

...OTHER_CODE...

<script>
import Datalog from "./components/Datalog";

...OTHER_CODE...

export default {
  name: "App",
  components: {
    Datalog
  },
  data() {
    return {
      tab: "datalog"

...OTHER_CODE...
</script>

<style>
...OTHER_CODE...

.tabs button {
  font-size: 14px;
  padding: 10px 20px;
  font-weight: bold;
  background: #ececec;
  border: 1px solid #aaa;
}
.tabs button:hover {
  background: #bfbfbf;
}
.tabs button:last-child {
  border-left: none;
}
.tabs button.active {
  background: #ced5e2;
}
</style>
```

Run app

```sh
yarn serve
```

Way 2:

If you start the application with cloning the repository, then to complete these steps, you will just need to switch to step 4.

```sh
git checkout step-4
yarn serve
```

As a result we will get this picture in the browser

![screen3](../images/build-iot-dapps/screen3.png)

### Step 5. Launch

This function is used to start and stop the robot. To demonstrate how to use this module, let's write the `Launch.vue` component.

Way 1:

In the component template, we will have a form where you can specify the address of the robot, the ON/OFF clicker and the button for sending.

`src/components/Launch.vue`
```js
<template>
  <div>
    <h2>Launch</h2>
    <input v-model="robot" :disabled="isWrite" placeholder="Robot address" />
    <select v-model="parameter" :disabled="isWrite">
      <option value="ON">ON</option>
      <option value="OFF">OFF</option>
    </select>
    <button @click="launch" :disabled="isWrite">launch</button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="log.length > 0" class="log">
      <div v-for="(item, k) in log" :key="k" class="row">
        sender: <b>{{ item.sender }}</b>
        <br />
        robot: <b>{{ item.robot }}</b>
        <br />
        parameter: <b>{{ item.parameter ? "ON" : "OFF" }}</b>
      </div>
    </div>
  </div>
</template>

...OTHER_CODE...

<style scoped>
.log {
  border: 1px solid #eee;
  text-align: left;
  width: 800px;
  margin: 20px auto;
}
.log .row {
  margin: 10px;
}
</style>
```

The code looks like the `Datalog.vue` component. The difference is just in reading. The robot will receive the command through events.

`src/components/Launch.vue`
```js
<script>
export default {
  props: ["api", "account"],
  data() {
    return {
      robot: this.account,
      parameter: "ON",
      log: [],
      isWrite: false,
      error: "",
      unsubscribe: null
    };
  },
  async created() {
    this.unsubscribe = await this.api.query.system.events(events => {
      events.forEach(record => {
        const { event } = record;
        if (event.section === "launch" && event.method === "NewLaunch") {
          const sender = event.data[0].toString();
          const robot = event.data[1].toString();
          const parameter = event.data[2].toHuman();
          this.log.push({
            sender,
            robot,
            parameter
          });
        }
      });
    });
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
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
          }
        });
      } catch (error) {
        this.error = error.message;
        this.isWrite = false;
      }
    }
  }
};
</script>
```

https://github.com/airalab/example-robonomics-dapp/blob/master/src/components/Launch.vue

For display, add a new component to `App.vue`

`src/App.vue`
```js
<template>
...OTHER_CODE...

  <div>
    <div class="tabs">
      <button
        @click="tab = 'datalog'"
        :class="{ active: tab === 'datalog' }"
      >
        datalog
      </button>
      <button
        @click="tab = 'launch'"
        :class="{ active: tab === 'launch' }"
      >
        launch
      </button>
    </div>
    <Datalog v-if="tab === 'datalog'" :api="api" :account="account" />
    <Launch v-if="tab === 'launch'" :api="api" :account="account" />
  </div>

...OTHER_CODE...
</template>

...OTHER_CODE...

<script>
import Datalog from "./components/Datalog";
import Launch from "./components/Launch";

...OTHER_CODE...

components: {
  Datalog,
  Launch
},

...OTHER_CODE...
```

Run app

```sh
yarn serve
```

Way 2:

If you start the application with cloning the repository, then to complete these steps, you will just need to switch to step 5.

```sh
git checkout step-5
yarn serve
```

As a result we will get this picture in the browser

![screen4](../images/build-iot-dapps/screen4.png)

### Step 6. Demo

In this demo, we will have a car that can be started and stopped through the dApp. The car collects a log during the trip, and after stopping, saves it to the chain. Here we will use both modules, which we tried separately, in conjunction.

To emulate the behavior of a robot (car), we will write a Robot class. We will use the `Alice` key as an account for this robot. The `Robot` class will watch for `NewLaunch` events to turn itself on and off. After turning on, it starts collecting data into the log, in terms of data it will be just a timestamp. And after shutdown, it saves this log to the `datalog` module.

Way 1:

Create file `src/utils/robot.js`. The full code of the file https://github.com/airalab/example-robonomics-dapp/blob/master/src/utils/robot.js

For visualization, we will create a `Demo.vue` component, where we will have a start button, car animation and log output.

`src/components/Demo.vue`
```js
<template>
  <div>
    <h2>Demo</h2>
    <template v-if="robot">
      <h3>Robot: {{ robot.address }}</h3>
      <p v-if="robot.state">Driver: {{ robot.driver }}</p>
      <button @click="run" :disabled="isWrite">
        <template v-if="!robot.state">run</template>
        <template v-else>stop</template>
      </button>
      <div class="road">
        <div
          class="robot"
          :class="[robot.state ? 'robot-play' : 'robot-stop']"
        ></div>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="log" class="log">
        <p v-if="log.length === 0" class="error">Not found</p>
        <div v-for="(item, k) in log" :key="k" class="row">
          <b>{{ item[0] | dateFormat }}</b>
          <pre>{{ item[1] | dataFormat }}</pre>
        </div>
      </div>
    </template>
  </div>
</template>

...OTHER_CODE...

<style scoped>
.log {
  border: 1px solid #eee;
  text-align: left;
  width: 800px;
  margin: 20px auto;
  height: 500px;
  overflow-y: auto;
}
.log .row {
  margin: 10px;
  border-bottom: 1px solid #eee;
}
.road {
  width: 1000px;
  margin: 20px auto;
  background-color: #eee;
  padding: 20px 0;
  border: 5px solid #a5a5a5;
  border-left: 0;
  border-right: 0;
  position: relative;
}
.road::before {
  content: " ";
  width: 1000px;
  border-top: 5px dashed #a5a5a5;
  position: absolute;
  top: 50%;
  left: 0;
}
@keyframes move {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
.robot {
  height: 100px;
  width: 100px;
  color: #fff;
  font-weight: bold;
  font-style: 14px;
  animation: move 30s linear infinite;
  border-radius: 0 10px 10px 0;
  background: url("../images/build-iot-dapps/car.png") no-repeat 0 0;
  background-size: cover;
}
.robot-play {
  animation-play-state: running;
}
.robot-stop {
  animation-play-state: paused;
}
</style>
```

Component code. Here we need to create an instance of the `Robot` class and a launch/stop function.

`src/components/Demo.vue`
```js
...OTHER_CODE...

<script>
import { u8aToString } from "@polkadot/util";
import Robot from "../utils/robot";

export default {
  props: ["api", "account"],
  data() {
    return {
      isWrite: false,
      error: "",
      robot: null,
      log: []
    };
  },
  filters: {
    dateFormat: function(v) {
      return new Date(Number(v)).toLocaleString();
    },
    dataFormat: function(v) {
      return JSON.parse(u8aToString(v));
    }
  },
  async created() {
    this.robot = new Robot("//Alice", this.api);
    await this.robot.subscribeLog(r => {
      this.log = r.reverse().map(item => {
        return [item[0], item[1]];
      });
    });
  },
  destroyed() {
    this.robot.destroy();
  },
  methods: {
    async run() {
      try {
        this.error = "";
        this.isWrite = true;
        const tx = await this.api.tx.launch
          .launch(this.robot.account.address, !this.robot.state)
          .signAsync(this.account);
        await tx.send(result => {
          if (result.status.isInBlock) {
            this.isWrite = false;
          }
        });
      } catch (error) {
        this.error = error.message;
        this.isWrite = false;
      }
    }
  }
};
</script>

...OTHER_CODE...
```

https://github.com/airalab/example-robonomics-dapp/blob/master/src/components/Demo.vue

    Let's add another picture of our car to `src/images/build-iot-dapps/car.png` and to `src/assets/car.png`. Example https://github.com/airalab/example-robonomics-dapp/blob/master/src/assets/car.png

For display, add a new component to `App.vue`

`src/App.vue`
```js
<template>

...OTHER_CODE...

  <div>
    <div class="tabs">
      <button
        @click="tab = 'datalog'"
        :class="{ active: tab === 'datalog' }"
      >
        datalog
      </button>
      <button
        @click="tab = 'launch'"
        :class="{ active: tab === 'launch' }"
      >
        launch
      </button>
      <button @click="tab = 'demo'" :class="{ active: tab === 'demo' }">
        demo
      </button>
    </div>
    <Datalog v-if="tab === 'datalog'" :api="api" :account="account" />
    <Launch v-if="tab === 'launch'" :api="api" :account="account" />
    <Demo v-if="tab === 'demo'" :api="api" :account="account" />
  </div>

...OTHER_CODE...

</template>

...OTHER_CODE...

<script>
import Datalog from "./components/Datalog";
import Launch from "./components/Launch";
import Demo from "./components/Demo";

...OTHER_CODE...

components: {
  Datalog,
  Launch,
  Demo
},

...OTHER_CODE...
```

Run app

```sh
yarn serve
```

Way 2:

If you start the application with cloning the repository, then to complete these steps, you will just need to switch to step 6.

```sh
git checkout step-6
yarn serve
```

As a result we will get this picture in the browser

![screen5](../images/build-iot-dapps/screen5.png)

This concludes our lesson.

Thanks!
