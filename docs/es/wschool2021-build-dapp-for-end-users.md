---
title: Lección 6.1, Crear dApps IoT para usuarios finales 
locale: 'es' 
contributors: [vol4tim]
translated: true
---

## Preparándose

### Lanzamiento del nodo de Robonomics

Para el desarrollo y la prueba de dApp, usaremos un nodo local de Robonomics. Para hacer esto, necesita descargar el archivo binario compilado v0.24 [https://github.com/airalab/robonomics/releases](https://github.com/airalab/robonomics/releases). Usaré Ubuntu, así uno descarga la versión apropiada.

Desempaquetar el archivo:
```sh
wget https://github.com/airalab/robonomics/releases/download/v0.24.0/robonomics-ubuntu-0.24.0-x86_64.tar.xz
tar -xvf robonomics-ubuntu-0.24.0-x86_64.tar.xz
chmod +x robonomics
```

Ahora podemos iniciar el nodo en modo de desarrollo. Para hacer esto, use -dev flag.
```sh
./robonomics --dev --tmp
```

> Solución de problemas
```sh
./robonomics purge-chain --dev
```

### Extension del Navegador

Para almacenar claves en un navegador, existe `polkadot{.js} extension`. En dApp lo usaremos para firmar transacciones.

La extensión está disponible actualmente para `Google Chrome` y `Firefox` [https://polkadot.js.org/extension/](https://polkadot.js.org/extension/)

Después de instalar la extensión, cree una nueva cuenta.
![screen1](../images/build-iot-dapps/screen1.png)

> El primer paso esta completado.

## Desarrollo Dapp

### Paso 1

> Escribiremos la dApp usando el marco vue.js, aunque puede usar lo que uno quiera o pueda.

Comencemos a desarrollar la dApp creando una aplicación de inicio con vue.js Y aquí puedes hacerlo de dos maneras.

Camino 1:

Usando la utilidad de consola `Vue cli`.
Para hacer esto, debe [instalarlo] (https://cli.vuejs.org/guide/installation.html)
Also we will need `yarn`. Install it from [here](https://yarnpkg.com)

Después de la instalación, puede ejecutar el comando en la terminal

```sh
vue create mydapp
```

Responda algunas preguntas del asistente de configuración. Usaremos la versión Vue 2, por lo que mantenemos la versión predeterminada `Default ([Vue 2] babel, eslint)`.

Camino 2:

Clone el repositorio de git preparado con el ejemplo y cambie al paso 1

```sh
git clone https://github.com/airalab/example-robonomics-dapp.git mydapp
cd mydapp
git checkout step-1
```

Como resultado, obtendremos un directorio con la aplicación de inicio instalada, que ya se puede iniciar y abrir en el navegador.

```sh
yarn
yarn serve
```

### Paso 2. Comienzo con polkadot.js

#### Instalacion de Dependencias

Para conectar la dApp a Robonomics, existe la biblioteca `@polkadot/api`. Y para la interacción de dApp con una extensión con claves, tenemos la librería `@polkadot/extension-dapp`. Necesitamos instalarlos en nuestra aplicación.
Se pueden encontrar más detalles sobre el uso de esta biblioteca en la documentación https://polkadot.js.org/docs/.

Camino 1:

```sh
yarn add @polkadot/api @polkadot/extension-dapp
```

También debe agregar el archivo `vue.config.js` para admitir la extensión `mjs`.

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

#### Conectarse a Robonomics

Primero, creemos un archivo de configuración con los parámetros para conectarse al nodo de Robonomics. En el repositorio de demostración, hay un ejemplo de este archivo `config.template.json`.

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

En este archivo, indicamos el nodo al que nos vamos a conectar y los tipos personalizados.

Ahora necesitamos escribir un script para conectarnos a nuestro nodo en ejecución.

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

Para que podamos firmar transacciones con la clave de la extensión, agreguemos dos funciones para conectarse a la extensión y la función para inicializar la cuenta.

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

Nuestra cuenta tendrá un saldo de cero, mientras que necesitamos un poco de fondos. Entonces necesitamos crear otra función de faucet. Como lanzamos Robonomics con la `--dev` flag, tenemos una cuenta de `Alice` con un saldo grande, por lo que solicitemos fondos desde allí.

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

La versión completa del script https://github.com/airalab/example-robonomics-dapp/blob/master/src/utils/api.js

Ejecutar la aplicación

```sh
yarn serve
```

Camino 2:

Si inicia la aplicación con la clonación del repositorio, entonces para completar estos pasos, será suficiente con cambiar al paso 2 e instalar el resto de las dependencias.

```sh
git checkout step-2
cp src/config.template.json src/config.json
yarn
yarn serve
```

### Paso 3. Componente de Conexion de Vue

#### Conectando

Ya hemos escrito un guión para conectarse. Ahora podemos usarlo en nuestra interfaz. Basta con llamar a la función `initApi` escrita en el componente raíz `App.vue`. Y mientras el usuario espera una conexión, le mostraremos un pequeño cargador, por ahora en forma de puntos suspensivos.

Camino 1:

Plantilla de componente y estilos base.

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

Existe el código del componente donde se llamará a la función `initApi`

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

#### Cuenta con Saldo

Ahora podemos usar nuestra cuenta, recargar su saldo y mostrarlo en la interfaz.

Agreguemos el marcado apropiado a la plantilla.

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

Agreguemos nuevos campos para la dirección y el saldo de la cuenta.

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

Necesitamos agregar la inicialización de la cuenta a la función init y obtener su saldo

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

Queda por agregar la función de reponer el saldo, al hacer clic en el botón

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

Ejecutar la aplicación

```sh
yarn serve
```

Camino 2:

Si inicia la aplicación con la clonación del repositorio, para completar estos pasos, solo tendrá que pasar al paso 3.

```sh
git checkout step-3
yarn serve
```

Como resultado, obtendremos la siguiente imagen en el navegador

![screen2](../images/build-iot-dapps/screen2.png)

### Paso 4. Datalog

Para guardar y leer cualquier dato en la cadena, usamos el módulo de `datalog`.

Para ver un ejemplo de cómo usar este módulo, creemos un componente `Datalog.vue`.

Camino 1:

En el marcado, tendremos un botón de lectura de datos `read` con un bloque, donde mostraremos una lista en forma de fecha y el propio dato. Y habrá un formulario con una entrada de texto, en el que puede ingresar cualquier dato en forma de cadena y un botón `write`.

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

Código de componente. Aquí el punto principal al enviar una transacción es llamar a la función, a la que transferimos datos y que firmamos con nuestra cuenta, a través de api `this.api.tx.datalog.record(stringToHex(this.data)).signAsync(this.account);`

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

Para cambiar entre componentes, agregue a `App.vue` la salida de nuestro componente.

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

Ejecutar la aplicación

```sh
yarn serve
```

Camino 2:

Si inicia la aplicación con la clonación del repositorio, para completar estos pasos, solo tendrá que pasar al paso 4.

```sh
git checkout step-4
yarn serve
```

Como resultado, obtendremos la siguiente imagen en el navegador:

![screen3](../images/build-iot-dapps/screen3.png)

### Step 5. Lanzamiento

Esta función se utiliza para iniciar y detener el robot. Para demostrar cómo usar este módulo, escribamos el componente `Launch.vue`.

Camino 1:

En la plantilla del componente, tendremos un formulario donde se puede especificar la dirección del robot, el clicker ON / OFF y el botón para enviar.

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

El código se parece al componente `Datalog.vue`. La diferencia está solo en la lectura. El robot recibirá el comando a través de eventos.

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

Para la visualización, agregue un nuevo componente a `App.vue`

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

Camino 2:

Si inicia la aplicación con la clonación del repositorio, para completar estos pasos, solo tendrá que pasar al paso 5.

```sh
git checkout step-5
yarn serve
```

Como resultado, obtendremos la siguiente imagen en el navegador

![screen4](../images/build-iot-dapps/screen4.png)

### Paso 6. Demo

En esta demostración, tendremos un automóvil que se puede iniciar y detener a través de la dApp. El automóvil recoge un tronco durante el viaje y, después de detenerse, lo guarda en la cadena. Aquí usaremos ambos módulos, que probamos por separado, en conjunto.

Para emular el comportamiento de un robot (automóvil), escribiremos una clase Robot. Usaremos la clave `Alice` como una cuenta para este robot. La clase `Robot` observará que los eventos `NewLaunch` se enciendan y apaguen. Después de encenderse, comienza a recopilar datos en el registro, en términos de datos, será solo una marca de tiempo. Y después del apagado, guarda este registro en el módulo `datalog`.

Camino 1:

Cree el archivo `src/utils/robot.js`. El código completo del archivo https://github.com/airalab/example-robonomics-dapp/blob/master/src/utils/robot.js

Para la visualización, crearemos un componente `Demo.vue`, donde tendremos un botón de inicio, una animación de automóvil y una salida de registro.

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

Código de componente. Aquí necesitamos crear una instancia de la clase Robot y una función de inicio y detención.

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

Agreguemos otra imagen de nuestro automóvil a `src/images/build-iot-dapps/car.png`and `src/assets/car.png`. Ejemplo https://github.com/airalab/example-robonomics-dapp/blob/master/src/assets/car.png

Para la visualización, agregue un nuevo componente a `App.vue`

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

Ejecutar la aplicación

```sh
yarn serve
```

Camino 2:

Si inicia la aplicación con la clonación del repositorio, para completar estos pasos, solo tendrá que pasar al paso 6.

```sh
git checkout step-6
yarn serve
```

Como resultado, obtendremos la siguiente imagen en el navegador

![screen5](../images/build-iot-dapps/screen5.png)

Con esto concluye nuestra lección.

Gracias!
