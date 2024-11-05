---
title: Cómo editar Wiki
contributors: [positivecrash]
description: Formas de ayudarnos a mejorar nuestra wiki
---

**Robonomics Wiki es de código abierto. ¡Cualquier corrección es bienvenida: corregir errores, erratas, información confusa u obsoleta, traducción a cualquier idioma. Necesitarás una cuenta de [GitHub](https://github.com/).**


## Cómo editar

Si necesitas editar documentos de Robonomics Wiki, por favor, sigue estos pasos

Asegúrate de tener [Node.js](https://nodejs.org/en/download/package-manager/) instalado.

### 1. Clonar repositorio

En primer lugar, necesitas clonar el repositorio de la wiki:

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

### 2. Servir localmente (desarrollar, desarrollar-m1)

`la versión de node debe ser 20 || >=22`

Luego despliega el proyecto localmente:

```
npm run start
```

> puede ser necesario crear un archivo .env con las mismas variables que en el archivo .env.example

### 3. Hacer PR

[Hacer solicitud de extracción](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) a [wiki repo](https://github.com/airalab/robonomics-wiki)

## Componentes

{% roboWikiNote {title:"COMPONENTES PERSONALIZADOS", type: "advertencia"}%} Un **consejo** al agregar componentes personalizados:
Si hay algo mal con el diseño después de agregar un componente, es posible que desee verificar los espacios. Debería ayudar a **ELIMINAR** los espacios después de la etiqueta de apertura y de cierre (como en el ejemplo a continuación){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"prueba", type: "bien"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Código

Puede agregar extras útiles a su código:

`código con botón de copia`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

algún texto de código
	otra línea de prueba
		otra cosa

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

o `código con línea adicional`

```bash
{% raw %}{% codeHelper { additionalLine: "línea adicional"}%}{% endraw %}

algún texto de código
	otra línea de prueba
		otra cosa

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Propiedades para code-helper**

| Propiedad         | Tipo| Requerido | Predeterminado | Descripción                                               |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | agregar un botón de copia para tu código                           |
| `additionalLine` | `String`  | `false`  | ''       | línea adicional para tu código que se mostrará arriba |


{% codeHelper { additionalLine: "línea adicional", copy: true}%}

```bash
algún texto de código
	otra línea de prueba
		otra cosa
```

{% endcodeHelper %}


### Frontmatter
Los documentos en el Wiki de Robonomics contienen un bloque de frontmatter. Debe estar en la parte superior del archivo Markdown y debe tener la forma de YAML válido entre líneas de tres guiones. Entre las líneas de tres guiones, puedes establecer o editar las siguientes opciones:

```YAML
---
title: Cómo contribuir # Título de la página, no es necesario duplicarlo en el texto
contribuyentes: [positivecrash] # Principales contribuyentes (quienes curan activamente esta página). Se requiere el apodo de GitHub, sin ningún símbolo adicional
herramientas:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # Herramientas que se utilizaron para probar la tecnología
---
```

### Grid
Ayuda a agregar un diseño de cuadrícula a los elementos:

- Utilice primero el componente de contenedor de cuadrícula:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Y luego use tantos componentes de elementos de cuadrícula como desee dentro del contenedor:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} primer elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} segundo elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} tercer elemento {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**Propiedades para robo-wiki-grid-wrapper**

| Propiedad   | Tipo      | Requerido | Predeterminado | Descripción                                                            |
|-------------|-----------|-----------|----------------|------------------------------------------------------------------------|
| `columns`   | `Número`  | `falso`   | 4              | puede elegir el número de columnas:   <br/> - de `1 a 5`               |
| `align`     | `Cadena`  | `falso`   |                | alinea los elementos en el eje del bloque:   <br/> - opciones: `start, center, end` |
| `justify`   | `Cadena`  | `falso`   |         | alinear elementos en el eje en línea:  <br/> - opciones: `inicio, centro, fin` |
| `textAlign` | `String` | `falso`  | `izquierda`  | alinear texto dentro de la cuadrícula:  <br/> - opciones: `izquierda, centro, derecha`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'centro', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"necesidad"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (mínimo 2 GB de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"necesidad"} %}{% endroboWikiPicture %}
	<b>Tarjeta SD de 16 GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"necesidad"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptador Zigbee (Opcional) </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivos inteligentes Zigbee (Opcionalmente) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Escritorio para la configuración</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Imágenes

#### Cómo cargar
Cargue la imagen en la carpeta `src/assets/docs/images/url-of-your-doc`
* Si la imagen necesita ser localizada, insértelas todas en una carpeta
* Utilice un apéndice de localización en el nombre de las imágenes si está localizado, por ejemplo, `imagen_en.jpg`
* Asegúrese de que su imagen esté optimizada para la web y al mismo tiempo se vea bien

#### Cómo insertar

Hay dos formas de insertar imágenes en sus documentos:

{% roboWikiNote {type: 'warning'}%} Se recomienda insertar imágenes con la etiqueta incorporada `<robo-wiki- imagen>`, sin embargo, también puedes usar la forma estándar para archivos Markdown. {% endroboWikiNote %}

`con subtítulo`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki de robomomics", link: '/docs/overview', caption: "EXPLORAR"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`o sin subtítulo`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki de robomomics", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`o imagen simple`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki de robomomics"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`o imagen simple con subtítulo`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki de robomomics", caption: "EXPLORAR"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Propiedades para robo-wiki-picture:**

| Propiedad | Tipo | Requerido | Predeterminado | Descripción ||----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | ruta de la imagen:  <br/> - si subiste tu imagen directamente a `/src/assets/images/docs/` usa: `url-de-tu-doc` <br/> - si subiste la imagen en una de las carpetas, usa: `nombre-de-la-carpeta/url-de-tu-doc` |
| `link`    | `String`  | `false`  |         | alinea los elementos en el eje del bloque:   <br/> - opciones: `inicio, centro, fin`                                                                                                                                  |
| `caption` | `String`  | `false`  |         | alinea los elementos en el eje en línea:  <br/> - opciones: `inicio, centro, fin`                                                                                                                                     |
| `alt`     | `String`  | `true`   | imagen  | proporciona información alternativa para una imagen si un usuario por alguna razón no puede verla                                                                                                                    |
| `zoom`    | `Boolean` | `false`  |         | ampliar imagen                                                                                                                                         |
| `loading` | `String`  | `false`  | lazy    | hay dos opciones: lazy y eager                                                                                                                         |

### Notas y advertencias
Puedes agregar notas y darles tipos específicos:
* advertencia (<span style="color:#f08432">**con imagen**</span>)
* bien (<span style="color:#3eaf7c">**color verde**</span>)
* nota (<span style="color:#90a4b7">**color gris**</span>)

`nota con título`

```c
{% raw %} {% roboWikiNote {title:"TÍTULO DE EJEMPLO", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`nota con contenido`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`nota con título y contenido`

```c
{% raw %} {% roboWikiNote {title: "TÍTULO", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Únete a Discord", type: "okay"}%} [Únete a Discord de Desarrolladores de Robonomics](https://discord.gg/jTxqGeF5Qy) para conectarte con la comunidad y obtener soporte técnico. {% endroboWikiNote %}

{% roboWikiNote {title: "Únete a Discord"}%} [Únete a Discord de Desarrolladores de Robonomics](https://discord.gg/jTxqGeF5Qy) para conectarte con la comunidad y obtener soporte técnico. {% endroboWikiNote %}

{% roboWikiNote {title: "Únete a Discord", type: "warning"}%} [Únete a Discord de Desarrolladores de Robonomics](https://discord.gg/jTxqGeF5Qy) para conectarte con la comunidad y obtener soporte técnico. {% endroboWikiNote %}

**Propiedades para la nota de wiki de robots**

| Propiedad | Tipo     | Requerido | Por defecto | Descripción                                                 |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `false`  |         | - hay tres tipos en total: `nota`, `advertencia`, `bien` |
| `title`  | `String` | `false`  |         | agrega un título a tu nota                                     |


### Pestañas
Puedes agregar pestañas al documento:

- Usa el componente de envoltura de pestañas:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Y luego usa tantos componentes de elementos de pestaña como desees dentro del envoltorio:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}{% endraw %}
```

<br/>

`pestañas horizontales`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`pestañas verticales`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`elemento de pestaña con borde`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Propiedades para robo-wiki-tabs (envoltorio)**

| Propiedad | Tipo     | Requerido | Por defecto | Descripción                                                       |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - Array con títulos para cada pestaña                              |
| `mode`   | `String` | `false`  | horizontal | puedes elegir el modo de pestañas: <br/> - `horizontal` <br/> - `vertical` |

**Propiedades para robo-wiki-tab (elemento)**

| Propiedad | Tipo      | Requerido | Predeterminado | Descripción                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - añadir borde al contenedor de contenido |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Título con anclas
Puedes crear títulos personalizados con anclas y asignarles un valor específico`Título con ancla`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

o `Título sin ancla`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (título personalizado) {% endroboWikiTitle %}

<br/>

**Propiedades para robo-wiki-title**

| Propiedad | Tipo                   | Requerido | Predeterminado | Descripción          |
|-----------|------------------------|-----------|----------------|----------------------|
| `type`    | `Número (de 2 a 6)`    | `verdadero`|                | elige el nivel del encabezado |
| `anchor`  | `Cadena`               | `falso`   |                | valor para el ancla |

### Videos

Hay dos formas de insertar videos en tus documentos:

{% roboWikiNote {type: "warning"}%} Se recomienda insertar videos con la etiqueta integrada `<robo-wiki-video>`, sin embargo, también puedes usar la forma estándar para archivos Markdown. {% endroboWikiNote %}

#### IPFS / Servidor
Necesitas especificar el formato del video

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"Acerca de las pasarelas"}%} La pasarela para el enlace se elige automáticamente desde el archivo de configuración - `src/_data/video_config.js`. Puedes agregar o eliminar algunas pasarelas cambiando el archivo. {% endroboWikiNote %}


#### Local

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Propiedades

- Si estás agregando un archivo con un tamaño de más de <span style="color:#af1c1c">10MB</span>, por favor, súbelo al servidor, no al repositorio.

- Puedes usar cualquier propiedad para la [etiqueta de video de HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Formatos aceptables - mp4, webm, ogg.

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | Array de objetos [{src: `ruta al video`, type: `tipo de video`}] |


#### YouTube
Puedes incrustar cualquier video de YouTube en el documento insertando el enlace de compartir como un párrafo separado sin comillas ni etiquetas adicionales, por ejemplo: `https://youtu.be/kQaSwNYHJQ8`

Sin embargo, si necesitas que se reproduzca automáticamente, debes usar un componente especial:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**Propiedades para robo-wiki-youtube**

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|---|---|---|---|---|
| `link` | `String` | `true` |  | enlace al video de YouTube |
| `autoplay` | `Boolean` | `false` | `false` | reproduce automáticamente el video de YouTube |
| `loop` | `Boolean` | `false` | `false` | repite el video de YouTube |


## Cómo editar la navegación de la barra lateral

Si necesitas editar la navegación de la barra lateral de Robonomics Wiki, por favor, sigue estos pasos:

* Edita el archivo `src/_data/sidebar_docs.json`.

* Decide dónde colocar tu documento

* Utiliza JSON válido para `src/_data/sidebar_docs.json` y confía en elestructura de archivo existente

* Debe agregar nuevas líneas al archivo de traducción `translations/pages/en.json` también, si no ha traducido nuevo contenido previamente, por ejemplo:

```json
{"Lanzar Robot desde la Nube": "Lanzar Robot desde la Nube"}
```

</br>

* **NOTA IMPORTANTE:** si está utilizando el mismo documento en diferentes secciones/subsecciones, por ejemplo:

```

{
	"title": "Actualizar Home Assistant OS",
	"children": [
	{
		"title": "Activar Suscripción",
		"url": "/docs/sub-activate",
	}],
	"title": "Actualizar Home Assistant Docker para OS tipo Unix",
		"children": [
	{
		"title": "Activar Suscripción",
		"url": "/docs/sub-activate",
	}],
}

```

ASEGÚRESE DE AGREGAR EL PARÁMETRO `topic` DE ESTA MANERA:

(para que la navegación funcione correctamente)

```
{
	"title": "Actualizar Home Assistant OS",
	"children": [
	{
		"title": "Activar Suscripción",
		"url": "/docs/sub-activate",
		"topic": "Actualizar Home Assistant OS"
	}],
	"title": "Actualizar Home Assistant Docker para OS tipo Unix",
		"children": [
	{
		"title": "Activar Suscripción",
		"url": "/docs/sub-activate",
		"topic": "Actualizar Home Assistant Docker para OS tipo Unix"
	}],
}

```

## Cómo agregar navegación personalizada para documentos

* Editar archivo`src/_data/sidebar_docs.json`.

* Encuentra el documento correcto y agrega los parámetros `prev` y `next` de esta manera:

```
	{
		"title": "Visión general",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Agregar usuario",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Agregar usuario",
				"url": "/docs/add-user"
			}
		],
	},

```

* Si deseas eliminar la navegación por completo, agrega el parámetro `withoutNav`:

```
{
	"title": "Visión general",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Si deseas eliminar solo la navegación de `página anterior` o `página siguiente`, agrega los parámetros `withoutPrev` o `withoutNext`:

```
{
	"title": "Visión general",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

o

```
{
	"title": "Visión general",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## Cómo traducir un documento

{% roboWikiNote {title: 'Importante', type: 'warning'}%} Debes crear ****.env** archivo y agregar la variable *OPENAI_KEY* con tu clave {% endroboWikiNote %}

Si deseas traducir tu documento md, necesitas ejecutar el comando:

```bash
npm run translate-md
```

{% roboWikiNote {title: 'Traducción fácil', type: 'warning'}%} Para traducir todo de una vez, cada nueva línea en páginas, nuevo documento o documento cambiado, ahora solo necesitas un comando {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> Además, asegúrate de estar traduciendo solo los archivos modificados que son **necesarios** traducir. Por ejemplo, necesitas cambiar 5 archivos. Tres de ellos incluyen cambios de texto y eliminación de información obsoleta. Y los otros dos necesitan actualizar enlaces para algunas imágenes o simplemente cambiar un enlace externo. En este caso, sería prudente cambiar los primeros tres archivos y traducirlos y luego cambiar los enlaces en los otros dos.

> La traducción se aplica a todos los archivos modificados, pero no es necesaria para los enlaces actualizados, especialmente si el archivo es grande y, por lo tanto, la traducción lleva algo de tiempo.

Después de ejecutar el comando necesario, todo lo que tienes que hacer es esperar y tal vez verificar los archivos (las traducciones de IA tienen algunas fallas). Para verificar los archivos, ejecute `npm run build` y vea si hay algún error.

### Solución de problemas de traducción

Puedes encontrarte con algunos problemas con las traducciones.

1. Intenta ejecutar el comando nuevamente y verifica si funcionó.

2. A veces las etiquetasEn los archivos md se pueden escribir incorrectamente, por ejemplo:

```
{%raw %}
	[11ty] 1. Teniendo problemas para renderizar la plantilla njk ./src/de/docs/edit-wiki.md (a través de TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Línea 168, Columna 96]
	[11ty]   etiqueta de bloque desconocida: endroboWiki (a través de error de renderización de plantilla)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}{% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}
{% endraw %}
```

Luego, solo necesitas corregir la etiqueta.