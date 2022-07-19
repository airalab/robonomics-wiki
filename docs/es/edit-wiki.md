---
title: Cómo editar WIKI
locale: 'es' 
contributors: [positivecrash, arinaml]
translated: false
---

**Robonomics WIKI es de código abierto. Cualquier corrección es bienvenida: corrección de errores, errores tipográficos, información poco clara o desactualizada, traducción a cualquier idioma. Necesitará una cuenta de [GitHub](https://github.com/).** 

## Editar documento existente

1. Elija la página
2. Haga clic en el botón "Editar página" marcado con el logotipo de Github en la página que desea editar.
3. Al hacer clic en el botón, accederá al archivo .md.
4. Por favor, siga las reglas comunes para editar [archivos Markdown](https://en.wikipedia.org/wiki/Markdown), teniendo en cuenta algunas características del WIKI:

### Frontmatter
Los documentos de Robonomics WIKI contienen un bloque de frontmatter. Debe estar en la parte superior del archivo Markdown y debe tener la forma de un YAML válido establecido entre líneas de tres puntos. Entre las líneas de tres puntos, puede configurar o editar las siguientes opciones:

```YAML
---
title: How to contribute # Title for the page, you do not need to duplicate it in text
contributors: [positivecrash] # Main contributors (who actively curates this page). GitHub nickname required, without any additional symbols
translated: true # "true" if it has been translated in current language (see locale folder name of doc)
---
```

### Imágenes
1. Cargue la imagen en la carpeta `/docs/images/url-of-your-doc`
* Si la imagen necesita ser localizada, insértelas todas en una carpeta
* Use el apéndice de configuración regional en el nombre de las imágenes si está localizado, p. Ej. `image_en.jpg`
* Asegúrese de que su imagen esté optimizada para la web y, al mismo tiempo, se vea bien
2. Inserte imágenes de forma estándar para archivos Markdown.

### Videos de Youtube
Puede incrustar cualquier video de YouTube en el documento insertando el enlace para compartir como un párrafo separado sin comillas o etiquetas adicionales, por ejemplo: `https://youtu.be/kQaSwNYHJQ8`

### Asciinema
Robonomics WIKI tiene soporte para Asciinema. Para insertar Asciinema, siga estas instrucciones:
* Importar componente después del bloque de frontmatter `importar Asciinema desde '~/components/Asciinema.vue'`
* Insertar como párrafo separado `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, donde vid es el ID de una asciicast 

> Puede obtener el script del widget para una asciicast específica haciendo clic en el enlace "Insertar" en la página de asciicast.
> Se parece a esto:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Asciinema docs](https://asciinema.org/docs/embedding)

En el ejemplo anterior, vid es 14.

## Agregar nuevo documento

Si necesita agregar una nueva página en los documentos de Robonomics WIKI, siga estos pasos:

1. Busque la carpeta con la configuración regional que coincida con el idioma del artículo que está agregando, p. Ej. `/docs/en/`
2. 2. Cree un archivo .md, utilizando caracteres latinos en el nombre y siga las reglas comunes para [estructura de URL](https://developers.google.com/search/docs/advanced/guidelines/url-structure)
3. Edite el archivo como se describe arriba
4. Duplique el archivo en otras carpetas de configuración regional, incluso si no planea traducirlas. No olvide marcar en la parte delantera las páginas no traducidas como `translated: false`
5. Agregar documento en el menú:
* Abra el archivo `/data/sidebar_docs.yaml`
* Decide dónde colocar tu documento
* Si desea crear una nueva sección, proporcione el título con el apéndice de configuración regional, utilizando solo las configuraciones regionales, su sección está traducida
* Agregue un documento con un enlace. El enlace debe ser solo uno y no debe contener caracteres de configuración regional. Correcto es `/docs/url-of-your-doc`, incorrecto es `/docs/en/url-of-your-doc`
* Use YAML válido para  `/data/sidebar_docs.yaml` y confíe en la estructura de archivo existente

## Enviar solicitud de extracción

[Hacer solicitud de extracción](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) para cualquier contenido que haya cambiado, incluidos errores tipográficos, traducciones, información desactualizada o enlaces rotos.

Decisiones sobre Solicitudes de extracción individuales tomadas por el equipo central de Robonomics. Las subvenciones especiales en [XRT](https://robonomics.network/community#token) también son posibles para contribuciones extendidas 🤖💙💛💚💎🍭🎉🔌
