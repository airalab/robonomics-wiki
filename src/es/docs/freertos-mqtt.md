---
title: Conectar un dispositivo Amazon FreeRTOS a Robonomics mediante MQTT

contributors: [khssnv]
---

Aquí se muestra la demostración de cómo un microcontrolador que ejecuta [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) puede conectarse a la Red de Robonomics a través de MQTT. Por favor, consulta [este repositorio](http://github.com/khssnv/freertos_mqtt_robonomics_example) para ver el código fuente del proyecto.

Utilizamos [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) con la distribución FreeRTOS e implementación MQTT proporcionada por el [Marco de Desarrollo IoT de Espressif](https://github.com/espressif/esp-idf) mientras que Espressif es un proveedor del microcontrolador utilizado.

También hay un sensor [PMS-3003](http://www.plantower.com/en/content/?107.html) con fines de demostración. El sensor mide la presencia de partículas en el aire y se puede utilizar para estimar la calidad del aire.

La calidad del aire no es el tema del artículo, puedes encontrar más información al respecto en el sitio web de la OMS: [Contaminación del aire ambiente (exterior)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). El objetivo del sistema es publicar las mediciones del sensor en la red de Robonomics de Airalab.

## Configuración de hardware

Conectamos el PIN5 TXD del PMS3003 al IO17 del ESP32 DevKitC para transferir las mediciones mediante UART.
Además, ambos dispositivos requieren alimentación y tierra común.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Diagrama de conexión"} %}{% endroboWikiPicture %}

## Flujo de datos

Para enviar las mediciones del sensor a la red de Robonomics, en un nivel de firmware nuestro objetivo es obtener datos de un sensor mediante el protocolo de comunicación integrado que soporta (UART en nuestro caso) y pasarlo a una instancia de AIRA mediante MQTT / TCP.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Envío"} %}{% endroboWikiPicture %}

En nuestro ejemplo, utilizamos la implementación en la nube de AIRA disponible mediante una dirección IP pública y un nombre de dominio asignado.
En la instancia de AIRA configuramos el broker MQTT `mosquitto` y nos suscribimos a `/freertos_mqtt_robonomics_example/98:F4`:AB:72:23:C4` tema para recibir mensajes de MQTT.

Luego pasamos los mensajes al escritor `robonomics io` mediante una tubería.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Receiving"} %}{% endroboWikiPicture %}

Ahora los datos están disponibles en la Red de Robonomics y podemos leerlos de nuevo con `robonomics io`.

## Firmware

Utilizamos la [aplicación de muestra ESP-MQTT con transporte TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) como base.

Solo modificamos `main/app_main.c` para la conexión UART al sensor, la sincronización de tiempo SNTP y la rutina periódica de publicación MQTT.

Si estás intentando repetir el proyecto y es tu primer proyecto basado en ESP IDF, por favor sigue primero la [guía de programación de ESP-IDF de Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) para familiarizarte con las operaciones del firmware como configuración, compilación y carga con la herramienta `idf.py`.

### Configuración de Wi-Fi

Para comunicarnos con la instancia de AIRA desplegada en la nube, nuestro microcontrolador requiere conexión a Internet.
Utilizamos el Wi-Fi del ESP32 para esto.
Espressif proporciona utilidades para configurar el Wi-Fi integrado.
En nuestro ejemplo, utilizamos un entorno de desarrollo con Ubuntu 20.04 GNU/Linux.
Para configurar el Wi-Fi, vamos a la carpeta del proyecto y ejecutamos la herramienta de configuración del SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Luego configuramos el SSID y la contraseña del punto de acceso Wi-Fi en la sección `Example Connection Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Menuconfig Wi-Fi"} %}{% endroboWikiPicture %}

### Configuración del Punto Final MQTT

Hay dos cosas que configurar para MQTT.
La primera es la dirección del broker MQTT.
Se puede configurar con la herramienta de configuración del SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Establece la `URL del Broker` en la sección `Example Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Menuconfig MQTT"} %}{% endroboWikiPicture %}

La segunda cosa es un tema MQTT..
Lo configuramos en el firmware con el prefijo del nombre del proyecto seguido de nuestra dirección MAC ESP32.
Nos da `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` para nuestro microchip en particular.

## De MQTT a Robonomics

Primero verifiquemos si recibimos datos por MQTT.
Podemos suscribirnos al tema del publicador del dispositivo en nuestro broker MQTT de Mosquitto.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Aquí traemos el paquete `mosquitto` a nuestro entorno para usar la utilidad `mosquitto_sub`.
Luego nos suscribimos al tema establecido en el firmware.
Obtuvimos nuestras mediciones, lo que significa que AIRA recibe datos por MQTT correctamente.
Ahora vamos a enviar estos mensajes a la Red de Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Aquí usamos la utilidad `robonomics` para publicar mensajes en el canal pubsub `/freertos_mqtt_robonomics_example`.
Especificamos `bootnodes` para asegurarnos de que se establezca al menos una conexión.

Ahora vamos a leer estos mensajes desde el mismo canal pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  Nuevo par conectado: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Enlace de malla agregado para el par: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") en el tema: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Recursos Originales Utilizados

* Esquema de pines de ESP32 DevKitC de GoJimmy's blog https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Estructura de datos y decodificador de PSM3003 de OpenAirProject https://github.com/openairproject/sensor-esp32

**¡Gracias a todos!**