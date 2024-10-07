---
title: Interruptor inteligente de 2 vías
contributors: [nakata5321]
---
Este artículo te mostrará el proceso de configuración del Interruptor inteligente de 2 vías.

{% roboWikiNote {type: "warning"}%}Todos los dispositivos de Robonomics se pueden adquirir en la página web oficial [website](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmQiq21yPEJbysPgvv35uJmG9rHQqbUSySu8za8BqA1kcZ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Paso 1 — Flasheo {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Todos los dispositivos de Robonomics vienen pre-flasheados de fábrica. Sin embargo, dado que todos los dispositivos son kits de desarrollo, las instrucciones cubrirán la opción de flashear el dispositivo desde cero. Si no deseas hacerlo ahora, continúa a [**Paso 2 - Punto de Acceso**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Saca el dispositivo de la caja y conéctalo a la computadora. Luego ve al sitio web [webflasher.robonomics.network](https://webflasher.robonomics.network/). Este es el flasheador web.

{% roboWikiVideo {videos:[{src: 'QQmZ6kYAusdjH3Yq7L9UzorZdfXAa4awD1twp5SB5z57z9R', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}¡Atención! El flasheador web solo funciona con los navegadores Google Chrome o Microsoft Edge.{% endroboWikiNote %}

En el menú desplegable "Firmware" elige la opción **"SWS-2G-E-11-23"** y luego en "SELECT CHIP" elige **"ESP32"**. Presiona el botón **"CONNECT"**.
Aparecerá una ventana emergente donde debes seleccionar el puerto serie al que está conectado el dispositivo (generalmente es `/ttyUSB0`). Luego elige **"INSTALL SWS-2G-E-11-23"**.
En la siguiente ventana, puedes hacer una **INSTALACIÓN LIMPIA** marcando **ERASE DEVICE**. Presiona Siguiente y luego Instalar. Espera hasta que el firmware se cargue en el dispositivo del interruptor inteligente.

Después de finalizar el proceso de instalación, aparecerá una ventana emergente de configuración de Wi-Fi. Proporciona las credenciales de Wi-Fi.

Después de configurar el Wi-Fi, puedes visitar el dispositivo presionando el botón **VISIT DEVICE**. Más tarde, puedes visitar el dispositivo a través de su dirección IP en la red. Para encontrarla, puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Salta el **Paso 2 — Punto de Acceso** y ve a [**Paso 3 — Configuración**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Paso 2 — Punto de Acceso {% endroboWikiTitle %}

Si sacas el interruptor inteligente de la caja y lo conectas a la fuente de alimentación, creará un punto de acceso con el nombre "robonomics-XXXXXXX". Conéctate a él.
Debería abrirse una ventana de configuración. Si no, abre un navegador web e ingresa a la página `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"imagen"} %}{% endroboWikiPicture %}

Proporciona las credenciales de Wi-Fi. Después de eso, el dispositivo del interruptor inteligente se conectará a la red Wi-Fi. Verifica el dispositivo a través de su dirección IP en la red. Para encontrarla, puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Paso 3 — Configuración {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

Ve a **"Configuración"** -> **"Configurar otro"**. En la cadena **"Template"** inserta lo siguiente:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-2L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,224,225,0,0,320,1,321,0,0,0,0,33,1,32,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Verifica que las casillas de verificación **"Activate"** y **"MQTT Enable"** estén habilitadas. Si no lo están, actívalas y presiona el botón Guardar.

Regresa al menú principal y ve a **"Configuración"** -> **"Configurar MQTT"**.
Proporciona aquí tus credenciales MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"imagen"} %}{% endroboWikiPicture %}

Eso es todo por ahora con ESP. El siguiente paso es instalar la integración con Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Paso 4 — Configuración de la integración {% endroboWikiTitle %}

Este artículo asume que tienes Home Assistant. Para conectar el dispositivo del interruptor inteligente a Home Assistant, necesitas instalar la integración Tasmota.

{% roboWikiVideo {videos:[{src: 'QmXLSLSFJKrrEtQXVQbpeFAvsKFSgW15J9ZFaSH1pteMXR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Básicamente, Home Assistant descubrirá automáticamente la integración Tasmota. Pero si no lo hace, agrégala manualmente.
Eso es todo. Ahora puedes agregar la entidad del interruptor al panel de control.

{% roboWikiNote {type: "warning"}%}Todos los dispositivos de Robonomics se pueden adquirir en la página web oficial [website](https://robonomics.network/devices/).
{% endroboWikiNote %}