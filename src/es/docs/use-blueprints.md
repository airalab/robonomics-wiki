---
title: Cómo usar planos
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

En este artículo aprenderás cómo agregar planos de automatización a tu Home Assistant y configurarlos.

## Automatizaciones de planos

Algunos planos ya están instalados. Las automatizaciones basadas en estos planos solo necesitan ser configuradas. En la interfaz web, puedes encontrar los planos preinstalados en `Configuración/Automatizaciones y Escenas`. Abre `Planos` y encuentra el plano que deseas utilizar. En este ejemplo, se utilizará `Luz activada por movimiento`.

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"Configuración de planos"} %}{% endroboWikiPicture %}

Haz clic en `Crear Automatización` para abrir el editor de automatizaciones. Dale un nombre, elige un plano para usar (`Luz activada por movimiento` en nuestro caso). Después, debes elegir el sensor de movimiento y la lámpara. Cuando la configuración esté lista, haz clic en `Guardar`.

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"Configuración de automatización"} %}{% endroboWikiPicture %}

Si deseas hacer cambios, puedes encontrarlo yendo a `Configuración/Automatizaciones y Escenas` y luego `Automatizaciones`.

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"Lista de automatizaciones"} %}{% endroboWikiPicture %}

## Importar planos

Home Assistant puede importar planos desde los foros de Home Assistant, GitHub y GitHub gists. La lista de todos los Planos se encuentra en [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Después de elegir, ve a `Configuración/Automatizaciones y Escenas` y abre `Planos`. Haz clic en `Importar Plano` e inserta la URL del plano elegido. Luego haz clic en `VISTA PREVIA DEL PLANO`. En este caso, utilizaremos [Detección y notificación de nivel bajo de batería para todos los sensores de batería](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664).

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"Importar plano"} %}{% endroboWikiPicture %}

Esto cargará el plano y mostrará una vista previa en el cuadro de diálogo de importación. Puedes cambiar el nombre y finalizar la importación. Haz clic en `Crear Automatización` para abrir el editor de automatizaciones. Aquí puedes configurar los parámetros de la automatización y agregar acciones para recibir notificaciones.

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"Configurar Plano de Batería"} %}{% endroboWikiPicture %}