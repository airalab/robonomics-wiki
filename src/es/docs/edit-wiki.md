---
title: Cómo editar Wiki
contributors: [positivecrash]
description: Formas de ayudarnos a mejorar nuestra wiki
---

**La Wiki de Robonomics es de código abierto. ¡Cualquier corrección es bienvenida: corregir errores, erratas, información confusa u obsoleta, traducción a cualquier idioma. Necesitarás una cuenta de [GitHub](https://github.com/).**


## Cómo editar

Si necesitas editar documentos de la Wiki de Robonomics, por favor, sigue estos pasos

Asegúrate de tener [Node.js](https://nodejs.org/en/download/package-manager/) instalados.

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

`node debe ser >= v18`

Luego despliega el proyecto localmente:

```
npm run start
```

### 3. Hacer PR

[Hacer solicitud de extracción](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)a [wiki repo](https://github.com/airalab/robonomics-wiki)

## Componentes

{% roboWikiNote {title:"COMPONENTES PERSONALIZADOS", type: "advertencia"}%} Un **consejo** al agregar componentes personalizados:
Si hay algo mal con el diseño después de agregar un componente, es posible que desees revisar los espacios. Debería ayudar a **ELIMINAR** los espacios después de la etiqueta de apertura y de cierre (como en el ejemplo a continuación){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}

```

### Código

Puedes agregar extras útiles a tu código:

`código con botón de copiar`

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

| Propiedad        | Tipo      | Requerido | Por defecto | Descripción                                               |
|------------------|-----------|-----------|-------------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`   | `false`     | agregar un botón de copiar para tu código                 |
| `additionalLine` | `String`  | `false`   | ''          | línea adicional para tu código que se mostrará arriba     |


{% codeHelper { additionalLine: "línea adicional", copy: true}%}

```bash
algún texto de código
	otra línea de prueba
		otra cosa
```

{% endcodeHelper %}### Frontmatter
Los documentos en Robonomics Wiki contienen un bloque de metadatos. Debe estar en la parte superior del archivo Markdown y debe tener la forma de YAML válido entre líneas de tres guiones. Entre las líneas de tres guiones, puedes establecer o editar las siguientes opciones:

```YAML
---
title: Cómo contribuir # Título de la página, no es necesario duplicarlo en el texto
contributors: [positivecrash] # Principales colaboradores (quienes curan activamente esta página). Se requiere el apodo de GitHub, sin símbolos adicionales
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # Herramientas que se utilizaron para pruebas tecnológicas
---
```

### Grid
Ayuda a agregar un diseño de cuadrícula a los elementos:

- Utiliza primero el componente de contenedor de cuadrícula:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Y luego usa tantos componentes de elementos de cuadrícula como desees dentro del contenedor:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} primer elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} segundo elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} tercer elemento {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} 
```

<br/>

**Propiedades para robo-wiki-grid-wrapper**

| Propiedad    | Tipo      | Requerido | Por defecto | Descripción                                                            |
|--------------|-----------|-----------|-------------|------------------------------------------------------------------------|
| `columns`    | `Número`  | `false`   | 4           | puedes elegir el número de columnas:   <br/> - de `1 a 5`               |
| `align`      | `Cadena`  | `false`   |             | alinea los elementos en el eje del bloque:   <br/> - opciones: `start, center, end` |
| `justify`    | `Cadena`  | `false`   |             | alinea los elementos en el eje en línea:  <br/> - opciones: `start, center, end` |
| `textAlign`  | `Cadena`  | `false`   | `left`      | alinea el texto dentro de la cuadrícula:  <br/> - opciones: `left, center, right` |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (al menos 2 GB de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"necesidad"} %}{% endroboWikiPicture %}
	<b>Tarjeta SD de 16 GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"necesidad"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptador Zigbee (opcional) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"necesidad"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivos inteligentes Zigbee (opcional) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"necesidad"} %}{% endroboWikiPicture %}
	<b>Escritorio para configuración</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Imágenes

#### Cómo subir
Sube la imagen en la carpeta `src/assets/docs/images/url-of-your-doc`
* Si la imagen necesita ser localizada, insértalas todas en una carpeta
* Utiliza un apéndice de localización en el nombre de las imágenes si está localizado, por ejemplo, `imagen_en.jpg`
* Asegúrate de que tu imagen esté optimizada para la web y al mismo tiempo se vea bien

#### Cómo insertar

Hay dos formas de insertar imágenes en tus documentos:

{% roboWikiNote {type: 'warning'}%} Se recomienda insertar imágenes con la etiqueta integrada `<robo-wiki-picture>`, sin embargo, también puedes usar la forma estándar para archivos Markdown. {% endroboWikiNote %}

`con leyenda`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki de robomómica", link: '/docs/overview', caption: "EXPLORAR"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`o sin leyenda`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki de robomómica", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
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

| Propiedad | Tipo      | Requerido | Predeterminado | Descripción                                                                                                                                                                                                          |
|-----------|-----------|-----------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`    |                | ruta de la imagen:  <br/> - si subiste tu imagen directamente a `/src/assets/images/docs/` usa: `url-de-tu-doc` <br/> - si subiste la imagen en una de las carpetas, usa: `nombre-de-la-carpeta/url-de-tu-doc` |
| `link`    | `String`  | `false`   |                | alinear elementos en el eje del bloque:   <br/> - opciones: `inicio, centro, fin`                                                                                                                                    |
````caption` | `String` | `false` | | alinear elementos en el eje en línea: <br/> - opciones: `start, center, end`
| `alt` | `String` | `true` | imagen | proporciona información alternativa para una imagen si por alguna razón un usuario no puede verla
| `zoom` | `Boolean` | `false` | | hacer zoom en la imagen
| `loading` | `String` | `false` | lazy | hay dos opciones: lazy y eager

### Notas y advertencias
Puedes agregar notas y darles tipos específicos:
* advertencia (<span style="color:#f08432">**con imagen**</span>)
* bien (<span style="color:#3eaf7c">**color verde**</span>)
* nota (<span style="color:#90a4b7">**color gris**</span>)

`nota con título`

```c
{% raw %} {% roboWikiNote {title:"TÍTULO DE EJEMPLO", type: "bien"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`nota con contenido`

```c
{% raw %} {% roboWikiNote {type: "bien"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br>/>

`nota con título y contenido`

```c
{% raw %} {% roboWikiNote {title: "TÍTULO", type: "bien"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Únete a Discord", type: "bien"}%} [Únete a Discord de Desarrolladores de Robonomics](https://discord.gg/jTxqGeF5Qy) para conectarte con la comunidad y obtener soporte técnico. {% endroboWikiNote %}

{% roboWikiNote {title: "Únete a Discord"}%} [Únete a Discord de Desarrolladores de Robonomics](https://discord.gg/jTxqGeF5Qy) para conectarte con la comunidad y obtener soporte técnico. {% endroboWikiNote %}

{% roboWikiNote {title: "Únete a Discord", type: "advertencia"}%} [Únete a Discord de Desarrolladores de Robonomics](https://discord.gg/jTxqGeF5Qy) para conectarte con la comunidad y obtener soporte técnico. {% endroboWikiNote %}

**Propiedades para la nota de la wiki de robots**

| Propiedad | Tipo      | Requerido | Predeterminado | Descripción                                                 |
|-----------|-----------|-----------|----------------|-------------------------------------------------------------|
| `type`    | `String`  | `falso`   |                | - hay tres tipos en total: `nota`, `advertencia`, `bien`    |
| `title`   | `String`` | `falso`  |         | agrega título a tu nota                                     |


### Pestañas
Puedes agregar pestañas al documento:

- Utiliza el componente de contenedor de pestañas:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Y luego usa tantos componentes de elementos de pestañas como desees dentro del contenedor:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
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
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],modo: 'vertical'} %}
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
|-----------|----------|-----------|-------------|-------------------------------------------------------------------|
| `tabs`    | `Array`  | `true`    |             | - Array con títulos para cada pestaña                             |
| `mode`    | `String` | `false`   | horizontal  | Puedes elegir el modo de pestañas: <br/> - `horizontal` <br/> - `vertical` |

**Propiedades para robo-wiki-tab (elemento)**

| Propiedad | Tipo      | Requerido | Por defecto | Descripción                         |
|-----------|-----------|-----------|-------------|-------------------------------------|
| `border`  | `Boolean` | `false`   | `false`     |falso` | - agregar borde al contenedor de contenido |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Título con anclas
Puedes crear títulos personalizados con anclas y darles cierto valor

`título con ancla`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

o `título sin ancla`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (título personalizado) {% endroboWikiTitle%}

<br/>

**Propiedades para el título del wiki del robot**

| Propiedad | Tipo                   | Requerido | Predeterminado | Descripción          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Número (de 2 a 6)` | `verdadero`   |         | elige el nivel del encabezado |
| `anchor` | `Cadena`               | `falso`  |         | valor para el ancla |

### Videos

Hay dos formas de insertar videos en tus documentos:

{% roboWikiNote {type: "warning"}%} Se recomienda insertar videos con la etiqueta integrada `<robo-wiki-video>`, sin embargo, también puedes usar la forma estándar para archivos Markdown. {% endroboWikiNote %}

#### IPFS / Servidor
Necesitas especificar el formato del video

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"Acerca de las pasarelas"}%} La pasarela para el enlace se elige automáticamente desde el archivo de configuración - `src/_data/video_config.js`. Puedes agregar o eliminar algunas pasarelas cambiando laarchivo. {% endroboWikiNote %}


#### Local

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Propiedades

- Si estás agregando un archivo con un tamaño superior a <span style="color:#af1c1c">10MB</span>, por favor, súbelo al servidor, no al repositorio.

- Puedes utilizar cualquier propiedad para la [etiqueta de video de HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Formatos aceptables: mp4, webm, ogg.

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | Array de objetos [{src: `ruta al video`, type: `tipo de video`}] |


#### YouTube
Puedes incrustar cualquier video de YouTube en el documento insertando el enlace de compartir como un párrafo separado sin comillas adicionales o etiquetas, por ejemplo: `https://youtu.be/kQaSwNYHJQ8`

Sin embargo, si necesitas reproducción automática, debes utilizar un componente especial:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%```yaml
---
title: Propiedades para robo-wiki-youtube
---

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|---|---|---|---|---|
| `link` | `String` | `true` |  | enlace al video de YouTube |
| `autoplay` | `Boolean` | `false` | `false` | reproduce automáticamente el video de YouTube |
| `loop` | `Boolean` | `false` | `false` | repite el video de YouTube |


## Cómo editar la navegación de la barra lateral

Si necesita editar la navegación de la barra lateral de Robonomics Wiki, siga estos pasos:

* Edite el archivo `src/_data/sidebar_docs.json`.

* Decida dónde colocar su documento

* Utilice JSON válido para `src/_data/sidebar_docs.json` y confíe en la estructura de archivos existente

* **NOTA IMPORTANTE:** si está utilizando el mismo documento en diferentes secciones/subsecciones, por ejemplo:

```yaml
{
	"title": "Actualizar Home Assistant OS",
	"children": [
	{
		"title": "Activar suscripción",
		"url": "/docs/sub-activate",
	}],
	"title": "Actualizar Home Assistant Docker para sistemas operativos tipo Unix",
		"children": [
	{
		"title": "Activar suscripción",
		"url": "/docs/sub-activate",
	}],
}
```

ASEGÚRESE DE AGREGAR EL PARÁMETRO `topic` DE ESTA MANERA:

(para que la navegación funcione correctamente)
``````
{
	"title": "Actualizar Home Assistant OS",
	"children": [
	{
		"title": "Activar Suscripción",
		"url": "/docs/sub-activate",
		"topic": "Actualizar Home Assistant OS"
	}],
	"title": "Actualizar Home Assistant Docker para sistemas operativos tipo Unix",
		"children": [
	{
		"title": "Activar Suscripción",
		"url": "/docs/sub-activate",
		"topic": "Actualizar Home Assistant Docker para sistemas operativos tipo Unix"
	}],
}

```

## Cómo agregar navegación personalizada para documentos

* Edite el archivo `src/_data/sidebar_docs.json`.

* Encuentre el documento correcto y agregue los parámetros `prev` y `next` de esta manera:

```
	{
		"title": "Visión general",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Agregar Usuario",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Agregar Usuario",
				"url": "/docs/add-user"
			}
		],
	},

```

* Si desea eliminar la navegación por completo, agregue el parámetro `withoutNav`:

```
{
	"title": "Visión general",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Si desea eliminarSolo navegación de `página anterior` o `página siguiente` que agregar el parámetro `withoutPrev` o `withoutNext`:

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

{% roboWikiNote {title: 'Importante', type: 'advertencia'}%} Debes crear el archivo **.env** y agregar la variable *OPENAI_KEY* con tu clave {% endroboWikiNote %}

Si deseas traducir tu documento md, debes ejecutar el siguiente comando: 
 
```bash
npm run translate-md
```

Después de ejecutar el comando, todo lo que tienes que hacer es esperar y tal vez revisar los archivos (las traducciones de IA pueden tener algunos errores).

### Solución de problemas de traducción

Puedes encontrarte con algunos problemas con las traducciones.

1. Intenta ejecutar el comando nuevamente y verifica si funcionó.

2. A veces las etiquetas en los archivos md pueden estar escritas incorrectamente, por ejemplo: 


```
{%raw %}
	[11ty] 1. Having trouble rendering njk template ./src/de/docs/edit-wiki.md (via TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Line 168, Column 96]
	[11ty]   unknown block tag: endroboWiki (via Template render error)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

Luego, solo necesitas corregir la etiqueta.