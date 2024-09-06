---
title: Configuración de Piñata

contributors: [tubleronchik, LoSk-p]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Integración de Robonomics Home Assistant 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Este artículo te guía a través del proceso de configuración de [Piñata](https://www.pinata.cloud/) para anclar archivos desde la integración de Robonomics. Esto mejora la accesibilidad de los archivos de respaldo y telemetría.**

Para poder anclar tus archivos en Piñata, primero necesitas crear una cuenta. Luego, navega hasta la sección de `Claves API` y crea una nueva clave con los siguientes permisos:

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

Luego, copia la `Clave API` y el `Secreto API` y mantenlos privados.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Si ya has configurado la integración de Robonomics, navega hasta `Configuración` -> `Dispositivos y Servicios` y presiona `configurar` en la integración de Robonomics. Ingresa tus credenciales de Piñata.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}