---
title: Control de cámara PTZ en Home Assistant
contributors: [nakata5321]
---

Este artículo cubre un proceso de configuración de una cámara PTZ en Home Assistant. 
Se utilizará el protocolo ONVIF. Esto requiere una cuenta de cámara local.

<robo-wiki-note type="warning">
El proceso de configuración de la cuenta de cámara local no se cubre en este artículo.
</robo-wiki-note>

Requisitos:
- Cámara PTZ
- Cuenta de cámara local
- Dirección IP de la cámara
- Home Assistant configurado

## Integración ONVIF

Comencemos con la instalación de la integración de **ONVIF**. 

Ve a "Devices & Services" en "Settings" y presiona el botón "ADD INTEGRATION".
Escribe "ONVIF" y elige la integración. Verás la siguiente ventana.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Presiona el botón "Submit". Intentará buscar automáticamente tu cámara. Si tiene éxito, 
elige tu cámara de la lista y completa los campos vacíos. 
De lo contrario, tendrás que completar todos los campos manualmente. Verás la siguiente ventana.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Completa los espacios en blanco:
- Name - asigna un nombre a tu cámara
- Host - proporciona la dirección IP de tu cámara
- Port - generalmente es común que sea 2020, pero tu proveedor de cámaras puede cambiarlo
- Username - escribe el nombre de usuario de tu cuenta local de la cámara
  - Password - escribe una contraseña para tu cuenta local de la cámara

y presiona "Submit". Elige un área para tu cámara y haz clic en "Finish".

## Agrega el control de la cámara al panel de control

Ahora que has configurado completamente la cámara, puedes agregar su transmisión y botones de control al panel de control.

Ve al panel de control y comienza creando una nueva tarjeta. Elige la opción "Picture Glance".

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Completa los datos:
- Title - elige el título de la imagen de la cámara
- Camera Entity - elige una entidad de cámara de la lista desplegable
- Camera View - elige "live" para obtener menos retraso

A continuación, cambia al modo "Code Editor" presionando el botón en la parte inferior izquierda. Verás el siguiente código:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Reemplaza el contenido de `entities: []` según el ejemplo a continuación (`<TU_ENTIDAD_DE_CÁMARA>` es lo mismo que el parámetro `camera_image`):

<code-helper copy>

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

</code-helper>

Eso es todo. Ahora deberías ver la tarjeta de la cámara PTZ en el panel de control junto con los botones de control..

## Solución de problemas
Si estás utilizando Home Assistant Core y no ves una transmisión de la cámara, debes instalar las integraciones "stream" y "FFMPEG". 
Para hacer esto, debes agregar las cadenas `stream: ` y `ffmpeg: ` al final de configuration.yaml.