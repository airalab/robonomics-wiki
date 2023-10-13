---
title: Cómo editar Wiki
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics Wiki es de código abierto. Se aceptan correcciones: corregir errores, errores tipográficos, información confusa o desactualizada, traducción a cualquier idioma. Necesitarás una [GitHub](https://github.com/) cuenta.**


## Cómo editar

Si necesitas editar los documentos de Robonomics Wiki, por favor, sigue estos pasos

Make sure, you have [Node.js](https://nodejs.org/en/download/package-manager/) y [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool) instalado.

### 1. Clonar repositorio

Primero, necesitas clonar el repositorio de la wiki:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Ve al directorio del repositorio y ejecuta los siguientes comandos:

`usando npm`
```
cd robonomics-wiki
npm install 
```

`usando yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Servir localmente (desarrollo, desarrollo-m1)

Luego despliega el proyecto localmente: 

```
gridsome develop
```

> Si tienes el error `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`, ejecuta el siguiente comando:
```
gridsome develop-m1
```

### 3. Hacer PR

[Hacer pull request](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) a [repositorio de la wiki](https://github.com/airalab/robonomics-wiki)

## Componentes

### Asciinema
Robonomics Wiki tiene soporte para Asciinema. Para insertar Asciinema, por favor, sigue estas instrucciones:
* Importa el componente después del bloque frontmatter `import Asciinema from '~/components/Asciinema.vue'`
* Inserta como párrafo separado `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, donde vid es el ID del asciicast específico

> Puedes obtener el script del widget para un asciicast específico haciendo clic en el enlace “Embed” en la página del asciicast.
> Se verá así:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Documentación de Asciinema](https://asciinema.org/docs/embedding)

En el ejemplo anterior, vid es 14.

### Código

Puede agregar extras útiles a su código:

`código con botón de copia`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

o `código con línea adicional`

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**Propiedades para code-helper**

<probs-table :items="[{ id: 0, items: [{ name: 'copy', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add a copy button for your code'}]}, { id: 1, items: [{ name: 'additional line', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `additional line for you code that will be displayed above`}]}]" />

<code-helper copy>

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>

<code-helper copy additionalLine="your@helper">

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>


### Frontmatter
Los documentos en Robonomics Wiki contienen un bloque frontmatter. Debe estar en la parte superior del archivo Markdown y debe tener la forma de un YAML válido entre líneas de guiones triples. Entre las líneas de guiones triples, puedes establecer o editar las siguientes opciones:

```YAML
---
title: How to contribute # Título de la página, no es necesario duplicarlo en el texto
contributors: [positivecrash] # Principales colaboradores (quienes curan activamente esta página). Se requiere el nombre de usuario de GitHub, sin ningún símbolo adicional
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Instalaration
    # Herramientas que se utilizaron para probar la tecnología
---
```

### Grid 
Ayuda a agregar un diseño de cuadrícula a los elementos:

- Usa primero el componente de envoltura de cuadrícula: 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- Y luego usa tantos componentes de elementos de cuadrícula como desees dentro del envoltorio:

```c
  <robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_6.png" /> 
      <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
      <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
    </robo-wiki-grid-element/>
  </robo-wiki-grid-element-wrapper>
```

**Propiedades para robo-wiki-grid-element-wrapper**

<probs-table :items="[{ id: 0, items: [{ name: 'columns', code: true}, {name: 'Number', code: true}, {name: false, code: true}, {name: 4, code: true}, {name: [{text: 'you can choose column number:'}, {text: `from`, codeText: ' 1 to 5'}]}]}, { id: 1, items: [{ name: 'align', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the block axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 2, items: [{ name: 'justify', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the inline axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 3, items: [{ name: 'textAlign', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'left', code: true}, {name: [{text: 'align text inside grid'}, {text: `options:`, codeText: 'left, center, right'}]}]}, ]" />


<robo-wiki-grid-element-wrapper textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_1.png" /> 
    <p><a href="https://www.home-assistant.io/">Home Assistant</a> as control system software</p> 
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_2.png" /> 
    <p>Raspberry Pi 4 (at least 2 GB RAM)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_3.png" /> 
    <p>SD card (minimum 16 GB)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_4.png" /> 
    <p>SD adapter</p>
  </robo-wiki-grid-element>
</robo-wiki-grid-element-wrapper>

<robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_5.png" />
    <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_6.png" /> 
    <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
    <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
  </robo-wiki-grid-element/>
</robo-wiki-grid-element-wrapper>


### Imágenes

#### Cómo subir 
Sube la imagen en la carpeta `/docs/images/url-de-tu-doc`
* Si la imagen necesita ser localizada, insértalas todas en una carpeta
* Usa un apéndice de localización en el nombre de las imágenes si está localizado, por ejemplo, `image_en.jpg`
* Asegúrate de que tu imagen esté optimizada para la web y al mismo tiempo se vea bien

#### Cómo insertar 

Hay dos formas de insertar imágenes en tus documentos:

<robo-wiki-note type="warning">

Se recomienda insertar imágenes con la etiqueta incorporada `<robo-wiki-picture>`, sin embargo, también puedes usar la forma estándar para archivos Markdown.

</robo-wiki-note>

`con subtítulo`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`o sin subtítulo` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`o imagen simple` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`o imagen simple con subtítulo`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`imagen con texto alternativo`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**Propiedades para robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### Notas y advertencias
Puedes agregar notas y darles tipos específicos:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`nota con título`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`nota con contenido`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`nota con título y contenido`

```c
<robo-wiki-note type="okay" title="Robonomics for you">
  Fascinating information about robonomics here only
</robo-wiki-note>
```

<robo-wiki-note type="okay" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="note" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="warning" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

**Propiedades para robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
Puedes agregar pestañas al documento:

- Usa el componente de envoltura de pestañas: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- Y luego usa tantos componentes de elementos de pestañas como desees dentro del envoltorio:

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```


`pestañas horizontales`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`pestañas verticales`

```c
  <robo-wiki-tabs mode="vertical">
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      <pre>ifconfig</pre>
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`elemento de pestaña con borde`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX" border>
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

**Propiedades para robo-wiki-tabs (envoltorio)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**Propiedades para robo-wiki-tab (elemento)**

<probs-table :items="[{ id: 0, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'title for the tab'}]}, { id: 1, items: [{ name: 'border', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add border to the content wrapper'}]}]" />


<robo-wiki-tabs>
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX" border >
      ifconfig 
  </robo-wiki-tab>
</robo-wiki-tabs>


<robo-wiki-tabs mode="vertical">
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX">
    <pre>ifconfig</pre>
  </robo-wiki-tab>
</robo-wiki-tabs>


### Título con anclas
Puedes crear títulos personalizados con anclas y darles un valor específico

`título con ancla`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

o

`título sin ancla`

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**Propiedades para robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### Videos

Hay dos formas de insertar videos en tus documentos:

<robo-wiki-note type="warning">

Se recomienda insertar videos con la etiqueta incorporada `<robo-wiki-video>`, sin embargo, también puedes usar la forma estándar para archivos Markdown.

</robo-wiki-note>

#### IPFS / Server
Debes especificar el formato del video

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'https://cloudflare-ipfs.com/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### Propiedades

- Si agregas un archivo con un tamaño mayor a <span style="color:#af1c1c">10MB</span>, please, upload it on server, not in repo.

- Puedes usar cualquier propiedad para [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- Formatos aceptables: mp4, webm, ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
Puedes incrustar cualquier video de YouTube en el documento insertando el enlace de compartir como párrafo separado sin comillas ni etiquetas adicionales, por ejemplo: `https://youtu.be/kQaSwNYHJQ8`

Sin embargo, si necesitas una reproducción automática, debes usar un componente especial:

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**Propiedades para robo-wiki-youtube**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## Cómo editar la navegación de la barra lateral

Si necesitas editar la navegación de la barra lateral de Robonomics Wiki, por favor, sigue estos pasos:

* Editar archivo `/data/sidebar_docs.yaml`.

* Decidir dónde colocar tu documento

* Utilizar YAML válido para `/data/sidebar_docs.yaml` y confiar en la estructura de archivos existente

* **NOTA IMPORTANTE:** si estás utilizando el mismo documento en diferentes secciones/subsecciones, por ejemplo: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Imagen preinstalada para Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

ASEGÚRATE DE AGREGAR EL PARÁMETRO `topic` DE ESTA MANERA: 

(para que la navegación funcione correctamente)

```
    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Upgrade Home Assistant OS
    - title_en: Pre-installed Image For Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Pre-installed Image For Raspberry Pi

```

## Cómo agregar navegación personalizada para documentos

* Edite el archivo `/data/sidebar_docs.yaml`.

* Busque el documento correcto y agregue los parámetros `prev` y `next` como este:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      prev: 
        - title: title of the previous page
          link: /docs/prev_page_url
      next: 
        - title: title of the next page
          link: /docs/next_page_url

```

* Si deseas eliminar completamente la navegación, agrega el parámetro `withoutNav`:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* Si deseas eliminar solo la navegación de `página anterior` o `página siguiente`, agrega el parámetro `withoutPrev` o `withoutNext`:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

o

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```