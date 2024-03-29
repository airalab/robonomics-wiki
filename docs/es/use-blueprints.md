---
title: Cómo usar los planos
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

En este artículo aprenderás cómo agregar planos de automatización a tu Asistente de Hogar y configurarlo.

## Automatizaciones de planos

Algunos planos ya están instalados. Las automatizaciones basadas en estos planos solo necesitan ser configuradas. En la interfaz web puedes encontrar planos preinstalados en `Settings/Automations & Scenes`. Abre `Blueprints` y encuentra el plano que deseas usar. En este ejemplo se utilizará `Motion-activated Light`. 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

Haz clic en `Create Automation` para abrir el editor de automatización. Dale un nombre, elige un plano para usar (`Motion-activated Light` en nuestro caso). Después de eso, debes elegir el sensor de movimiento y la lámpara. Cuando la configuración esté terminada, haz clic en `Save`.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation Configuración" />

Si deseas realizar cambios, puedes encontrarlo yendo a `Settings/Automations & Scenes` y luego `Automations`.

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## Importación de planos

Home Assistant puede importar planos desde los foros de Home Assistant, GitHub y GitHub gists. La lista de todos los planos se encuentra en [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Después de elegir, ve a `Settings/Automations & Scenes` y abre `Blueprints`. Haz clic en `Import Blueprint` e inserta la URL del plano elegido. Luego haz clic en `PREVIEW BLUEPRINT`. En este caso, utilizaremos [Detección y notificación de nivel de batería baja para todos los sensores de batería](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

Esto cargará el plano y mostrará una vista previa en el cuadro de dilogo de importación. Puedes cambiar el nombre y finalizar la importación. Haz clic en `Create Automation` para abrir el editor de automatización. Aquí puedes configurar los parámetros de la automatización y agregar acciones para recibir notificaciones.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 