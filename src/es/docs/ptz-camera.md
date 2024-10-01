---
title: Control de cámara PTZ en Home Assistant
contributors: [nakata5321]
---

Este artículo cubre el proceso de configuración de una cámara PTZ en Home Assistant.
Se utilizará el protocolo ONVIF. Esto requiere una cuenta de cámara local.

{% roboWikiNote {type: "warning"}%} El proceso de configuración de la cuenta de cámara local no está cubierto en este artículo.
{% endroboWikiNote %}


Requisitos:
- Cámara PTZ
- Cuenta de cámara local
- Dirección IP de la cámara
- Home Assistant configurado

## Integración ONVIF

Comencemos con la instalación de la **integración ONVIF**.

Ve a "Dispositivos y Servicios" en "Configuración" y presiona el botón "AGREGAR INTEGRACIÓN".
Escribe "ONVIF" y elige la integración. Verás la siguiente ventana.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"configuración onvif"} %}{% endroboWikiPicture %}

Presiona el botón "Enviar". Intentará buscar automáticamente tu cámara. Si tiene éxito,
elige tu cámara de la lista y completa los campos vacíos.
De lo contrario, tendrás que completar todos los campos manualmente. Verás la siguiente ventana.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"configuración onvif"} %}{% endroboWikiPicture %}

Completa los espacios en blanco:
- Nombre - asigna un nombre a tu cámara
- Host - proporciona la dirección IP de tu cámara
- Puerto - comúnmente es 2020, pero tu proveedor de cámara puede cambiarlo
- Nombre de usuario - escribe el nombre de usuario de tu cuenta local de cámara
  - Contraseña - escribe la contraseña de tu cuenta local de cámara

y presiona "Enviar". Elige un Área para tu cámara y haz clic en "Finalizar".

## Agregar control de cámara al panel de control

Ahora que has configurado completamente la cámara, puedes agregar su transmisión y botones de control al panel de control.

Ve al panel de control y comienza creando una nueva tarjeta. Elige la tarjeta "Vista de Imagen".

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"vista"} %}{% endroboWikiPicture %}

Completa los datos:
- Título - elige el título de la imagen de la cámara
- Entidad de Cámara - elige una entidad de cámara de la lista desplegable
- Vista de Cámara - elige "en vivo" para tener menos retraso

Luego, cambia a modo "Editor de Código" presionando el botón en la parte inferior izquierda. Verás el siguiente código:
```shell
camera_view: live
type: picture-glance
title: Cocina
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Reemplaza el contenido de `entities: []` según el ejemplo a continuación (`<TU_ENTIDAD_DE_CÁMARA>` es lo mismo que el parámetro `camera_image`):

{% codeHelper { copy: true}%}

```
entities:
  - entity: <TU_ENTIDAD_DE_CÁMARA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <TU_ENTIDAD_DE_CÁMARA>
        pan: IZQUIERDA
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Girar a la Izquierda
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <TU_ENTIDAD_DE_CÁMARA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <TU_ENTIDAD_DE_CÁMARA>
        tilt: ARRIBA
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Inclinar Arriba
    icon: 'mdi:arrow-up'
  - entity: <TU_ENTIDAD_DE_CÁMARA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <TU_ENTIDAD_DE_CÁMARA>
        tilt: ABAJO
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Inclinar Abajo
    icon: 'mdi:arrow-down'
  - entity: <TU_ENTIDAD_DE_CÁMARA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <TU_ENTIDAD_DE_CÁMARA>
        pan: DERECHA
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Girar a la Derecha
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

Eso es todo. Ahora deberías ver la tarjeta de cámara PTZ en el panel de control junto con los botones de control.

## Solución de problemas
Si estás utilizando Home Assistant Core y no ves una transmisión de la cámara, debes instalar las integraciones "stream" y "FFMPEG".
Para hacer esto, debes agregar las cadenas `stream: ` y `ffmpeg: ` al final de configuration.yaml.