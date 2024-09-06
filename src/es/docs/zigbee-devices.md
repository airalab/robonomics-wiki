---
title: Dispositivos Zigbee en Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt/

---

**Si, durante el proceso de instalación, insertas un coordinador ZigBee, puedes agregar dispositivos ZigBee a tu hogar inteligente. Este artículo explicará cómo hacerlo.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## Emparejamiento de Dispositivos

Abre un navegador web y ve a `http://%PC_IP_ADDRESS%:8099`. Puedes encontrar la dirección IP de Raspberry Pi
usando la [aplicación móvil Fing](https://www.fing.com/products) o la [herramienta de línea de comandos nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Si configuraste todo en tu PC, usa `http://localhost:8099`.

Verás la interfaz web de Zigbee2MQTT:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


Es hora de conectar tu dispositivo inteligente.
Primero, presiona el botón `Permitir unirse (Todos)` en la parte superior de la interfaz web de Zigbee2MQTT.

Luego, comienza a emparejar dispositivos. La forma más común de poner un dispositivo en modo de conexión es mantener presionado su botón de encendido o encenderlos/apagarlos 5 veces. Asegúrate de que Zigbee2MQTT esté en funcionamiento.

Cuando el dispositivo se conecte, los verás en la interfaz web:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

Ahora deberías ver este sensor en tu interfaz web de Home Assistant. Ve a `Configuración` -> `Dispositivos y Servicios` -> `Dispositivos`.

Después de agregar todos los sensores, puedes cerrar la interfaz web de Zigbee2MQTT.