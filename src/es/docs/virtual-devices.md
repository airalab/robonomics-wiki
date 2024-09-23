---
title: Dispositivos Virtuales

contributors: [nakata5321]
---

**Este artículo te mostrará cómo crear dispositivos virtuales en un hogar inteligente, para que puedas ver cómo se ve la plataforma real.**

{% roboWikiPicture {src:"docs/home-assistant/virtual-sensors.png", alt:"sensor virtual"} %}{% endroboWikiPicture %}

## Instalar integración

Para usar dispositivos virtuales, necesitas instalar la [integración "demo"](https://www.home-assistant.io/integrations/demo/).
Para hacer esto, debes editar tu archivo de configuración.

Ve a la carpeta de configuración que proporcionaste durante el proceso de configuración. En esta carpeta, encontrarás una carpeta
llamada "homeassistant". Entra en ella. Abre el archivo `configuration.yaml` con un editor de texto bajo el usuario **root** e inserta la siguiente línea en él:

{% codeHelper { copy: true}%}

```
...
# Ejemplo de entrada en configuration.yaml
demo:
...
```

{% endcodeHelper %}


Después de eso, reinicia Home Assistant a través de la interfaz web. Cuando el hogar inteligente se reinicie, podrás encontrar todos los dispositivos virtuales en las entidades "demo".
Encuéntralos en `Configuración -> Dispositivos y servicios -> Demo`. Todas estas entidades se pueden agregar a tu panel de control.

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"entidades-demo"} %}{% endroboWikiPicture %}
