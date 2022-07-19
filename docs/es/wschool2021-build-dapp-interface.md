---
title: Construir la interfaz de la DApp, Parte 2
locale: 'es' 
contributors: [positivecrash]
translated: true
---

<!-- ![Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot](../images/build-dapp-interface/sum.gif "Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot") -->
<img src="../images/build-dapp-interface/sum.gif" alt="Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot" />

## Introducción

Este tutorial continúa la lección anterior, donde ya ha creado una aplicación simple y se centró en conectar una cuenta a un nodo, enviar transacciones y otras funciones vitales de la dapp. Ahora **crearemos una interfaz fácil de usar** para esa aplicación.

## Prerrequisitos

Este tutorial está diseñado para personas que están familiarizadas un poco con **HTML, CSS, JavaScript** y quieren aprender a aplicar estas habilidades para aplicaciones descentralizadas.

Para crear la interfaz de su dapp, puede elegir cualquier marco de JavaScript que le resulte cómodo o incluso intentar crear una interfaz sin ningún marco. En Robonomics 2021 usamos [Vue.js](https://vuejs.org) ya que es bastante escalable y fácil de usar.

## Configuración para el Tutorial

Si comienza con este paso y prefiere **aprender con la práctica**, siga esta lista de tareas para iniciar el dapp resultante de la lección anterior:

1. Descargue un nodo Robonomics local v0.22 de la [releases page](https://github.com/airalab/robonomics/releases/tag/v0.22.0) que se adapte a su sistema operativo. Si no encuentra su sistema en la última versión, busque la versión más reciente en las versiones anteriores.

2. Inicie el nodo Robononomics en el modo Desarrollador escribiendo `./robonomics --dev --tmp` en su terminal.

3. Descargue la extensión Polkadot para Chrome o Firefox [here](https://polkadot.js.org/extension/)

4. Clona [this repository](https://github.com/vol4tim/example-robonomics-dapp/).

5. Instale [Yarn](https://yarnpkg.com).

6. Instale [@vue/cli](https://cli.vuejs.org/guide/installation.html)

7. Comience a desarrollar dapp con el comando en su terminal:

```shell
cp src/config.template.json src/config.json
yarn
yarn serve
```


**Debería tener esta pantalla en su navegador:**

![Dapp Start](../images/build-dapp-interface/dapp-start.png "Dapp Start")


<details>

  <summary>Algunos consejos adicionales para el lanzamiento</summary>

  - Asegúrate de que tu **nodo se esté ejecutando**:
    ![Example of running a Robonomics node](../images/build-dapp-interface/robonomics-node-launch.png "Example of running Robonomics node")

  - En **macOS**, es posible que deba cambiar los **permisos de acceso** `chmod +x robonomics`

  - Asegúrese de haber permitido **acceso para Polkadot Extension**:
    ![Polkadot Extension giving access](../images/build-dapp-interface/polkadot-permission.png "Polkadot Extension giving access")

  - Si tiene errores en el registro del nodo en ejecución y dapp no se carga correctamente, intente eliminar la base de datos de la cadena de desarrollo: `sudo rm -rf <YOUR LOCAL PATH>/robonomics/chains/dev/db/` y reinicia el nodo. Si no ayuda, reinicie su máquina.

</details>

## Inspección del Código

Inspeccionemos la estructura de la dapp para aclarar qué y dónde podemos arreglar para cambiar la interfaz de usuario.

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

> **El código de este tutorial está en este [repository](https://github.com/positivecrash/wscool21-ui-dapp)**

## CSS-in-JS VS. Hojas de Estilos Globales

En este tutorial, muestro cómo cambiar la interfaz de una pequeña dapp desde cero sin una biblioteca estable de componentes de UI. Por lo tanto, importaré y crearé no solo diferentes componentes de Vue, sino que también escribiré mis propios estilos.

Si su aplicación es grande o su proyecto tiene un montón de dapps, en el futuro será mejor que busque construir una biblioteca de componentes específicamente para su proyecto para hacer que la interfaz de usuario sea más organizada y eficiente (por ejemplo, [aquí hay una herramienta para organizar componentes](https://storybook.js.org)). O si está de acuerdo con los temas de la interfaz estándar, puede usar cualquier biblioteca de interfaz de usuario de terceros ([por ejemplo](https://vuetifyjs.com/)).

## Primera Importacion o por donde empezar

No tengo ningún diseño específico para este dapp, pero tengo [Brandbook](https://static.robonomics.network/assets/Robonomics-Visual-Identity.pdf) y [tipografia](https://robonomics.network), las fuentes, los estilos de botones, etc. bien establecidos. Así que, para empezar, importaré los siguientes archivos css a nivel mundial:

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

En su lugar, puede escribir el contenido de cualquiera de estos archivos en App.vue, si se ajusta mejor a su percepción. Pero recomiendo importar algunos archivos CSS globalmente para este ejemplo para mantener App.vue un poco más claro.

Importe estos archivos CSS a su aplicación editando el archivo **main.js**:
![Importar CSS global en la Vue app](../images/build-dapp-interface/import-css-vue-1.png "Import global CSS in Vue app")

```JS
import './assets/styles/reset.css'
import './assets/styles/variables.css'
import './assets/styles/typography.css'
import './assets/styles/animation.css'
```

**Compruebe si se han cambiado las fuentes en la dapp:**

![Paso 1 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-1.png "Dapp Interface changing step 1")


## Cambiar el diseño y pretificar el titulo

Cambiemos el diseño de la aplicación. Como mencioné anteriormente, puede escribir sus estilos directamente en App.vue, pero para este ejemplo prefiero separar este proceso.

- Comente o elimine estilos de la etiqueta `<style\` en **App.vue**

- Cree el archivo css **app.css** en la carpeta de estilos para esta aplicación e impórtelo en **main.js**

```JS
import './assets/styles/app.css'
```

<details>

<summary>Escriba en app.css los primeros estilos básicos para la aplicación:</summary>

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

<summary>Cambiar el título de la aplicación [App.vue]</summary>

```html
<div class="top">
    <h1>dApp Robonomics Demo</h1>
    <i>Winter School 2021</i>
    <img class="label" alt="" src="./assets/images/robonomics-winter-school-2021-logo.png"/>
</div>
```

</details>



<details>

<summary>Escribe estilos para el título [app.css]</summary>

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

- Coloque un archivo con el logo de la escuela de invierno de Robonomics Winter School 2021 en la carpeta **./src/assets/images**

**Obtendrá la siguiente pantalla:**
![Paso 2 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-2.png "Dapp Interface changing step 2")

## Definir estilos segun los datos de la Dapp

Ahora envolveré el contenido de la aplicación en el elemento `<div>`. También necesitaré diferentes estilos para diferentes estados de la dapp (cargada o no cargada).

- Abra **App.vue** y escriba un elemento de envoltura:
```html
<div class="content">
  <!--here is everything going after the title-->
</div>
```
- Busque la variable `load`, ya se ha definido en `<script>`.
- Pase un objeto a `v-bind:class` para alternar dinámicamente las clases (yo uso la versión abreviada `:class`):
```html
<div class="content" :class="{ load: load }">
  <!--here is everything going after the title-->
</div>
```
Así es como puede alternar fácilmente los estilos en su aplicación de acuerdo con los datos que obtiene. Verá el uso de esta clase a continuación.

## Definir vistas segun los datos de la Dapp

Cambiemos el cargador de la aplicación.
- Para este propósito, importaré mi componente de otro proyecto de Robonomics

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

- Registre este componente en **App.vue**
```JS
export default {
  components: {
    Loader: () => import("./components/AnimatedRobonomicsLogo")
  }
}
```
- Insértelo con la condicional directiva Vue `v-if`, usando la `load` variable ya conocida:
```HTML
<div class="content" :class="{ load: load }">
  <Loader v-if="load" />
  <template v-else>
    <!-- here will be main content of loaded dapp -->
  </template>
</div>
```
- Mira el resultado en el navegador. Tiene algunos problemas que arreglaremos ahora:

1. Loader aparece con el título (debería estar en el centro). Insertemos estas líneas en **app.css**:
```css
body, html, #app {
  height: 100%;
  position: relative;
}
```
2. Si su conexión va demasiado rápido, verá el cargador parpadeando por un momento. Puede confundir mucho. Establezcamos un tiempo de espera para la respuesta de la aplicación. Para hacer eso, abra **api.js** y busque en la función `initAccount` este código:
```JS
const timeout = new Promise(resolve => {
  setTimeout(resolve, 300);
});
```
Configuré `1700` en lugar de `300` y verifico el resultado:

<!-- ![Dapp Interface changing step 3](../images/build-dapp-interface/dapp-3.gif "Dapp Interface changing step 3") -->
<img src="../images/build-dapp-interface/dapp-3.gif" alt="Dapp Interface changing step 3" />


## Uso componentes reutilizables

Ya ha visto cómo registrar y utilizar un componente en la sección anterior sobre Loader, pero ahora quiero centrarme en él con más atención.

Cambiemos la sección Account. Aquí usaré componentes escritos por mí mismo (box, button, icon) y el de terceros ([from Vue Polkadot Library](https://vue-polkadot.js.org/vue-ui/vue-identicon/#vue-polkadot-vue-identicon )).

### Añadir la Caja  

<details>

<summary>Crear componente Box en archivo ./src/components/Box.vue </summary>

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

Ahora podemos usarlo muchas veces a lo largo de la dapp. Veamos esto en el ejemplo de la sección Cuenta:

-  Componente de registro (**App.vue**):

```JS
export default {
  components: {
    Box: () => import("./components/Box")
  }
}
```

- Úselo para la sección Account con una clase adicional pasada con prop `classList`:

```HTML
<Box :classList="'account'">
  Account: <b>{{ account }}</b> {{ balance }} |
  <button @click="faucet">
    faucet
  </button>
</Box>
```

**Comprueba el resultado:**
![Dapp Interface changing step 4](../images/build-dapp-interface/dapp-4.png "Dapp Interface changing step 4")

### Añadir el Boton

Es posible que ni siquiera note el botón en el cuadro que hemos agregado. Arreglemoslo y agreguemos un componente para los botones, ya que no es el único botón de la aplicación.

<details>

<summary>Crear componente de botón en el archivo ./src/components/Button.vue </summary>

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


- Registre el componente (**App.vue**):

```JS
export default {
  components: {
    Button: () => import("./components/Button")
  }
}
```

- Úselo para el botón ‘Faucet’ con accesorios definidos en el componente 'Button' 

```HTML
<Box :classList="'account'">
  Account: <b>{{ account }}</b> {{ balance }}
  <Button label="Faucet" size="large" @onClick="faucet" />
</Box>
```

**Obtenemos esta vista:**
![Dapp Interface changing step 5](../images/build-dapp-interface/dapp-5.png "Dapp Interface changing step 5")

Para el componente Botón, hemos emitido el clic de prop con `@onClick`, por lo que prestaré atención si la función de faucet está funcionando correctamente ahora (el saldo debería cambiar al hacer clic):

<!-- ![Dapp Interface changing step 6](../images/build-dapp-interface/dapp-6.gif "Dapp Interface changing step 6") -->
<img src="../images/build-dapp-interface/dapp-6.gif" alt="Dapp Interface changing step 6" />

### AAñadir el Icono

Agreguemos un ícono a este botón para atraer más atención a este elemento de la interfaz, ya que el usuario no puede interactuar con la dapp correctamente sin unidades y haciendo clic en este botón.

Para este propósito, puede usar cualquier biblioteca Vue lista para íconos, crearé mi propio componente con el ícono.

- Encontré un ícono apropiado en [el gran archivo de íconos en línea](https://www.flaticon.com).
- Descargué el archivo .svg y lo editó en el editor de gráficos vectoriales para obtener el tamaño adecuado.
- Se insertó svg como texto en el componente Icon.vue.

<details>

<summary>Esto es lo que obtuve como componente Icon.vue</summary>

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

Para usarlo con el botón, edite el componente Botón.

Importe el icono en **Button.vue**:

```JS
components: {
    Icon: () => import("./Icon")
}
```

Objeto de registro:

```JS
props: {
  icon: {
    type: String,
    default: 'none'
  }
}
```

Agregue el ícono al botón (podemos especificar diferentes plantillas con la condición `v-if`):

```HTML
<template v-if="icon != 'none'">
  <Icon :icon="icon" />
  <span v-if="label != ''" class="inline-block">{{ label }}</span>
</template>
<template v-if="icon == 'none' & label != ''">
  {{ label }}
</template>
```

Agregar estilos:

```CSS
.button .icon-fill path {
  fill: var(--color-light);
}

.button > *:not(:last-child) {
  margin-right: calc(var(--space)/2);
}

```

Agregue el icono de apoyo en el botón en **App.vue**:

```HTML
<Button label="Faucet" size="large" icon="faucet" @onClick="faucet" />
```

**Check:**

<!-- ![Dapp Interface changing step 7](../images/build-dapp-interface/dapp-7.png "Dapp Interface changing step 7") -->
<img src="../images/build-dapp-interface/dapp-7.png" alt="Dapp Interface changing step 7" />

### Agregar Polkadot Avatar

- Instalar [@vue-polkadot/vue-identicon](https://vue-polkadot.js.org/vue-ui/vue-identicon/#vue-polkadot-vue-identicon)

- Importar a App.vue:
```JS
components: {
    Identicon: () => import("@vue-polkadot/vue-identicon")
}
```

- Inserte el avatar en lugar de la palabra ‘Account’, pase los accesorios de acuerdo con la documentación, use los datos de la "account' como un valor de apoyo:
```HTML
<Identicon
  :value="account"
  :theme="'polkadot'"
  :size="40"
  :class="'inline-block'"
/>
```

**Cheque:**

![Paso 8 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-8.png "Dapp Interface changing step 8")

## Manipulación de datos para una mejor vista

Cortemos la dirección de la cuenta:

- Envuelva la `account` variable en la propiedad calculada:

```JS
computed: {
  AccountAddress() {
    return this.account.slice(0, 6) + "..." + this.account.slice(-4);
  }
}
```

- Reemplace la `account` variable con `AccountAddress` en la plantilla.

**Cheque:**

![Paso 9 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-9.png "Dapp Interface changing step 9")

## CMagia CSS

Embellezcamos un poco más la sección de la cuenta:

<details>

<summary>Plantilla</summary>

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

<summary>Estilos (en app.css)</summary>

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

<!-- ![Paso 10 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-10.gif "Dapp Interface changing step 10") -->
<img src="../images/build-dapp-interface/dapp-10.gif" alt="Dapp Interface changing step 10" />

Editemos estilos para las pestañas:

<details>

<summary>Estilos (en app.css)</summary>

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

<summary>Cambios mínimos en la plantilla:</summary>

```HTML
<div class="tabs-content">
  <Demo v-if="tab === 'demo'" :api="api" :account="account" />
  <Launch v-if="tab === 'launch'" :api="api" :account="account" />
  <Datalog v-if="tab === 'datalog'" :api="api" :account="account" /> 
</div>
```

</details>

<!-- ![Paso 11 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-11.gif "Dapp Interface changing step 11") -->
<img src="../images/build-dapp-interface/dapp-11.gif" alt="Dapp Interface changing step 11" />

> Permítanme recordarles que el código terminado para este tutorial se encuentra en [este](https://github.com/positivecrash/wscool21-ui-dapp) repositorio. Y pasemos a los siguientes pasos :)

## Registro de Datos (Datalog)

Comience por arreglar elementos de la interfaz de usuario que ya se conocen en los botones dapp: (lo mismo que hemos hecho para el ‘Faucet’, pero con diferentes accesorios).

Luego, envolveré estos elementos en `<fieldset>` para separarlos por significado. Y escribiré mis propios estilos para el conjunto de campos y los elementos de entrada.
<details>

<summary>Plantilla en Datalog.vue:</summary>

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

<summary>Estilos para elementos de entrada en app.css: se supone que es global:</summary>

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

**Comprobemos que todo funciona bien después de las actualizaciones:**

<!-- ![Paso 12 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-12.gif "Dapp Interface changing step 12") -->
<img src="../images/build-dapp-interface/dapp-12.gif" alt="Paso 12 de cambio de interfaz Dapp" />

Tenemos una sección de registro de datos en todo el dapp, así que crearé un componente para él.

<details>

<summary>Tengo el siguiente código para un nuevo componente DatalogSection.vue</summary>

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

A lo que debe prestar atención aquí: pasamos prop `log` como una matriz. Supongo que esta matriz multidimensional contendrá un registro de entradas y cada entrada tiene un título (escribí la fecha para todos los registros en el dapp) y contenido. Necesitamos reformatear las matrices en los componentes **Datalog.vue** y **Launch.vue**.

Ahora edite **Datalog.vue**. Método de búsqueda, donde obtenemos el registro:
```JS
async read() {
  this.log = (await this.api.query.datalog.datalog(this.account)).toArray();
}
```

Ahora tenemos que formatear los datos en **Datalog.vue** y pasar la matriz de registro lista para **DatalogSection.vue**. Así que mapeemos la matriz de registros:
```JS
async read() {
  this.log = (await this.api.query.datalog.datalog(this.account)).toArray().map((item) => {
    return [new Date(Number(item[0])).toLocaleString(), u8aToString(item[1])]
  });
}
```

Ya no necesitamos este código:
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

**Revisemos la sección de registro de datos en la pestaña Datalog:**

<!-- ![Paso 13 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-13.gif "Dapp Interface changing step 13") -->
<img src="../images/build-dapp-interface/dapp-13.gif" alt="Paso 13 de cambio de interfaz Dapp" />

## Lanzamiento

Para este paso, la mayoría de las mejoras ya se han hecho, solo necesitamos aplicarlas a la plantilla: Importar componentes Button y Datalog, eliminar el título excesivo:

<!-- ![Paso 14 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-14.gif "Dapp Interface changing step 14") -->
<img src="../images/build-dapp-interface/dapp-14.gif" alt="Paso 14 de cambio de interfaz Dapp" />

Reemplacemos el elemento de control de `select` con `checkbox`..

En lugar de esto:
```HTML
<select v-model="parameter" :disabled="isWrite">
  <option value="ON">ON</option>
  <option value="OFF">OFF</option>
</select>
```

Escribe esto:
```HTML
<div class="toggler inline-block">
  <input v-model="parameter" :disabled="isWrite" type="checkbox" id="robot-switch" />
  <label for="robot-switch"><span></span></label>
</div>
```

<details>

<summary>Estilos en app.css:</summary>

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

<!-- ![Paso 15 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-15.gif "Dapp Interface changing step 15") -->
<img src="../images/build-dapp-interface/dapp-15.gif" alt="Paso 15 de cambio de interfaz Dapp" />

Quiero aclarar algo con la interfaz: con estos elementos arrancamos algún dispositivo. Visualicémoslo. Elegí un dron, así que alternaré las clases según `item.parameter`.

Cree una nueva propiedad en `data`:
```JS
data() {
  status: false
}
```

Asignar el valor del `parameter` al `status` después de hacer clic en el botón y enviar tx al bloque:
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

Escribe estilos para el dron en Launch.vue. No olvide el `scoped` de la etiqueta `<style>`, para aplicar estilos solo para este componente.

<details>

<summary>CSS para drones:</summary>

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

<!-- ![Paso 16 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-16.gif "Dapp Interface changing step 16") -->
<img src="../images/build-dapp-interface/dapp-16.gif" alt="Paso 16 de cambio de interfaz Dapp" />

Ahora agreguemos el componente **DatalogSection.vue**.

```JS
components: {
  DatalogSection: () => import("./DatalogSection")
}
```

Vuelva a formatear la matriz de registros desde:

```JS
this.log.push({
  sender,
  robot,
  parameter
});
```

a (para estructuras como `[["entry 1 date", "entry 1 content"], ["entry 2 date", "entry 2 content"]]`):

```JS
this.log.push([new Date().toLocaleString(), {
  sender,
  robot,
  parameter
}]);
```

Reemplace el código de la plantilla:

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

con esto:

```HTML
<DatalogSection :log="log"/>
```

**Cheque:**
<!-- ![Paso 17 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-17.gif "Dapp Interface changing step 17") -->
<img src="../images/build-dapp-interface/dapp-17.gif" alt="Paso 17 de cambio de interfaz Dapp" />

A veces tienes algunos errores, es casi inevitable. Algo puede salir mal con la conexión o puede suceder cualquier otra cosa. Entonces tenemos alternativas con mensajes de error en todo el dapp, no los he cambiado desde el principio, en el código se ven así:

```HTML
<div v-if="error" class="error">{{ error }}</div>
```

En la interfaz, los errores se ven de esta manera ahora:

![Paso 18 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-18.png "Dapp Interface changing step 18")

Agregue estilos para el `.error` en **app.css**:

```CSS
.error {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-red);
}
```

Y arreglaré un espacio entre la sección `.tools` y otro contenido desde la parte inferior también en **app.css**:

```CSS
.tools {
  margin-bottom: var(--space);
}
```

Obtendremos:

![Paso 19 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-19.png "Dapp Interface changing step 19")

Ahora en esta página tenemos los botones “primary”. Técnicamente está bien, pero esto no está bien según la experiencia del usuario anterior. Es mejor no utilizar más de un botón predominante en la pantalla. Así que arreglemoslo y agreguemos para el `Button` en **Launch.vue** con la propiedad `type = "secundaria"`:

![Paso 20 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-20.png "Dapp Interface changing step 20")

Genial, ahora solucionaré algunos problemas con mi nodo e iré al paso de demostración.

## Demo

Para empezar, me gustaría intercambiar pestañas, para prestar más atención a la más relevante, pero este no es el primer paso que hacemos para practicar. Invertir pestañas en **App.vue**.

No olvide reemplazar los datos predeterminados:

```JS
data() {
    return {
      ...
      tab: "demo"
    };
},
```

![Paso 21 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-21.png "Dapp Interface changing step 21")

Como de costumbre, comencemos por cambiar lo que ya tenemos.

- EliminaR el título `<h2>Demo</h2>` como en los pasos anteriores
- Encontrar elementos de la interfaz de usuario que ya hemos aprendido: registro de datos, botones, dirección de cuenta. Pero no tan rápido. Ahora cambiaremos solo el registro de datos.

Agregar el componente a **Demo.vue**:

```JS
components: {
  DatalogSection: () => import("./DatalogSection")
}
```

```HTML
<DatalogSection :log="log"/>
```

Tenemos datos sin procesar en el registro, por lo que debemos reformatear la matriz con el registro para pasar los datos de vista lista del componente como en los pasos anteriores. Busque la devolución de línea `return [item[0], item[1]];` in `async created()` y reemplácelo con:

```JS
return [new Date(Number(item[0])).toLocaleString(), JSON.parse(u8aToString(item[1]))];
```

Elimine el código no utilizado del registro:

```HTML
<div v-if="log" class="log">
  <p v-if="log.length === 0" class="error">Not found</p>
  <div v-for="(item, k) in log" :key="k" class="row">
    <b>{{ item[0] | dateFormat }}</b>
    <pre>{{ item[1] | dataFormat }}</pre>
  </div>
</div>
```

y:

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

**Cheque:**
![Paso 22 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-22.png "Dapp Interface changing step 22")

Para la personalización de este ejemplo de demostración con el lanzamiento de un robot, puede proponer cualquier idea. Personalmente, comencé con esta ciudad:

<!-- ![Paso 23 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-23.gif "Dapp Interface changing step 23") -->
<img src="../images/build-dapp-interface/dapp-23.gif" alt="Paso 23 de cambio de interfaz Dapp" />

No mostraré el código completo para que esto no te confunda en absoluto, pero esquemáticamente habrá algo como esto:

```HTML
<div class="demo" :class="[robot.state ? 'play' : 'stop']">
  <div class="demo-back"></div>
  <div class="demo-city"></div>
  <div class="demo-car"></div>
</div>
```

Que dentro del elemento `.demo.play` escriba estilos para mover la ciudad hacia atrás y el automóvil hacia adelante.

Mientras trabajaba en esto, se me ocurrió la idea de realizar la ciudad CyberPunk. Como no tengo ninguna tarea en particular, el automóvil se convirtió en un taxi, el conductor se convirtió en un pasajero, y ahora en la interfaz tenemos un holograma de robot de IA que da la bienvenida al pasajero (todos estos son solo CSS y tweaks&&tricks).

**TEl código de la demostración de Cyberpunk City:**

<details>

<summary>Plantilla</summary>

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

Hay más de una dirección hash que debería acortarse, así que agregué el método:

```JS
methods: {
  addressShort(address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }
}
```

No olvide registrar el componente Button

```JS
components: {
  Button: () => import("./Button")
}
```

<details>

<summary>Estilos</summary>

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

**Resultado:**

<!-- ![Paso 25 de cambio de interfaz Dapp](../images/build-dapp-interface/dapp-25.gif "Dapp Interface changing step 25") -->
<img src="../images/build-dapp-interface/dapp-25.gif" alt="Paso 25 de cambio de interfaz Dapp" />

## Conclusion

Felicidades! Ahora ha rediseñado la dapp y da pistas sobre cómo comenzar a construir la interfaz de su aplicación.

### Enlaces de pago

- [Código completo de este tutorial](https://github.com/positivecrash/wscool21-ui-dapp)
- [Discutir en discordia](https://discord.gg/5UWNGNaAUf)
- [Ver el calendario y resumen de Robonomics Winter School 2021](https://robonomics.network/blog/winter-robonomics-school/)
- [Github de colaborador](https://github.com/positivecrash)

### Practica

Si tiene algo de tiempo extra o quiere practicar sus habilidades, hay algunas ideas de mejoras que podría hacer en esta demostración:

- Adapte la interfaz de usuario para pantallas estrechas, haga que dapp sea compatible con dispositivos móviles.
- Agregue el modo ‘day/night’, editando el archivo **_variables.scss** y el archivo de plantilla de la dapp.
- Agregar botones ‘Copy to clipboard’ para direcciones.
- Haga popus delicados para informar a los usuarios sobre los cambios (por ejemplo, puede mostrar un mensaje emergente de que se reciben las unidades después de hacer clic en el botón ‘Faucet’, o puede mover en la ventana emergente un error que teníamos en la sección ‘Iniciar’).

Por favor, llénate gratis para hacer preguntas y compartir tus resultados en [Discord](https://discord.gg/5UWNGNaAUf), márcame en tu mensaje `@positivecrash`.