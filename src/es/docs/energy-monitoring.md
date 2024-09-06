---
title: Monitoreo de Energía
contributors: [nakata5321]
---
Este artículo te mostrará el proceso de configuración del Monitoreo de Energía.

{% roboWikiNote {type: "warning"}%} Todos los dispositivos de Robonomics se pueden adquirir en el sitio web oficial [website](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Paso 1 — Flasheo {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Todos los dispositivos de Robonomics vienen pre-flasheados de fábrica. Sin embargo, dado que todos los dispositivos son kits de desarrollo, las instrucciones cubrirán la opción de flashear el dispositivo desde cero. Si no deseas hacerlo ahora, continúa a [**Paso 2 - Punto de Acceso**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Saca el dispositivo de la caja y conéctalo a la computadora. Luego ve al sitio web [webflasher.robonomics.network](https://webflasher.robonomics.network/). Este es el flasheador web.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} ¡Atención! El flasheador web solo funciona con los navegadores Google Chrome o Microsoft Edge.
{% endroboWikiNote %}

En el menú desplegable "Firmware" elige la opción **"ENERGY MONITOR"** y luego en "SELECT CHIP" elige **"ESP32-S3"**. Presiona el botón **"CONNECT"**.
Aparecerá una ventana emergente donde debes seleccionar el puerto serie al que está conectado el dispositivo (generalmente es `/ttyUSB0`). Luego elige **"INSTALL ENERGY-MONITOR_EN"**.
En la siguiente ventana, puedes hacer una **INSTALACIÓN LIMPIA** marcando **ERASE DEVICE**. Presiona Siguiente y luego Instalar. Espera hasta que el firmware se cargue en el dispositivo de Monitoreo de Energía.

Después de finalizar el proceso de instalación, aparecerá una ventana emergente de configuración de Wi-Fi. Proporciona las credenciales de Wi-Fi.

Después de configurar el Wi-Fi, puedes visitar el dispositivo a través del botón **VISIT DEVICE**. Más tarde, puedes visitar el dispositivo a través de su dirección IP en la red. Para encontrarla, puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Salta el **Paso 2 — Punto de Acceso** y ve a [**Paso 3 — Configuración**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Paso 2 — Punto de Acceso {% endroboWikiTitle %}

Si sacas el monitor de energía de la caja y lo conectas a la fuente de alimentación, creará un hotspot con el nombre "robonomics-XXXXXXX". Conéctate a él. Debería abrirse la ventana de configuración. Si no, abre un navegador web e ingresa a la página `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Proporciona las credenciales de Wi-Fi. Después de eso, el dispositivo de Monitoreo de Energía se conectará a la red Wi-Fi. Verifica el dispositivo a través de su dirección IP en la red. Para encontrarla, puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Paso 3 — Configuración {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Ve a **"Configuración"** -> **"Configurar otro"**. En la cadena **"Template"** inserta lo siguiente:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

Verifica que las casillas **"Activate"** y **"MQTT Enable"** estén habilitadas. Si no, actívalas y presiona el botón Guardar.

Regresa al "menú principal" y ve a **"Configuración"** -> **"Configurar MQTT"**.
Proporciona aquí tus credenciales MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Eso es todo por ahora con ESP. El siguiente paso es instalar la integración con Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Paso 4 — Configuración de la Integración {% endroboWikiTitle %}

Este artículo asume que tienes Home Assistant. Para conectar el dispositivo de Monitoreo de Energía a Home Assistant, necesitas instalar la integración "Tasmota".

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Básicamente, Home Assistant descubrirá automáticamente la integración "Tasmota". Pero si no lo hace, agrégala manualmente.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

Eso es todo. Ahora puedes agregar entidades de energía al panel de control.

{% roboWikiNote {type: "warning"}%} Todos los dispositivos de Robonomics se pueden adquirir en el sitio web oficial [website](https://robonomics.network/devices/).
{% endroboWikiNote %}