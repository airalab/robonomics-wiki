---
title: Contribuir
contributors: [positivecrash, ensrationis]
---

Robonomics es un proyecto de código abierto, y queremos que a cualquiera le resulte fácil contribuir. Puedes informar de un problema, proponer un cambio o mejorar el código o esta documentación. Abre un issue o un pull request en el repositorio al que pertenece el cambio.

## Repositorios principales

- [airalab/robonomics](https://github.com/airalab/robonomics): el runtime y sus pallets. Tiene sus propios CONTRIBUTING.md y SECURITY.md.
- [airalab/robins](https://github.com/airalab/robins): herramientas, entre ellas la herramienta de línea de comandos `cps` y pasarelas para dispositivos.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): la biblioteca de Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): la aplicación web en [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): esta wiki.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): el sitio web principal.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): el sitio web de Robonomics Academy.

## Informar de problemas

1. Elige el repositorio al que pertenece el problema.
2. Si es un error, comprueba que nadie lo haya notificado ya.
3. Pon un título y una descripción claros, con toda la información relevante que puedas.
4. Para esta wiki, usa la plantilla de issue e indica la página que hay que corregir.

No informes de vulnerabilidades de seguridad en issues públicos. Sigue el SECURITY.md de [airalab/robonomics](https://github.com/airalab/robonomics): usa notificación privada a través de GitHub Security Advisories.

## Proponer cambios en la red

Los cambios en el runtime y sus parámetros los deciden los poseedores de XRT. Primero describe la idea en un issue en [airalab/robonomics](https://github.com/airalab/robonomics/issues) y después llévala a un referéndum. Consulta [XRT y gobernanza](/docs/xrt-and-governance/#how-to-propose-a-change).

## Pull requests

1. Para correcciones pequeñas, como erratas, es mejor un pull request que un issue.
2. Describe el problema y la solución en el pull request. Enlaza el issue relacionado si lo hay.
3. No envíes pull requests que solo corrijan espacios en blanco o formato.
4. Sigue el estilo, el idioma y la estructura del texto que lo rodea.

## Editar esta wiki

La wiki se construye con Eleventy. Necesitas Node.js 20, o 22 y posteriores.

1. Clona [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki) y ejecuta `npm install` y `npm run start` para servirla en local.
2. Las páginas son archivos Markdown en `src/docs/`. Cada una empieza con un frontmatter: `title`, `contributors` (nombres de usuario de GitHub) y, opcionalmente, `tools`.
3. La barra lateral está en `src/_data/sidebar_docs.json`. Cuando añadas una entrada, añade también su título en `translations/pages/en.json`.

El [README](https://github.com/airalab/robonomics-wiki#readme) explica los componentes de página y el flujo de traducción.
