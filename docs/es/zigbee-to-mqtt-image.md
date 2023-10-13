---
title: Adaptador Zigbee con Zigbee2MQTT para imagen preinstalada

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**En este artículo emparejarás dispositivos inteligentes.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Abre un navegador web y ve a `http://%DIRECCIÓN_IP_DE_RASPBERRY%:8099`. Puedes encontrar la dirección IP de Raspberry Pi usando la [aplicación móvil Fing](https://www.fing.com/products) o la [herramienta de línea de comandos nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Verás la interfaz web de Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




Es hora de conectar tu dispositivo inteligente. 
Primero, presiona el botón `Permit join (All)` en la parte superior de la interfaz web de Zigbee2MQTT. 

Luego, comienza a emparejar los dispositivos. La forma más común de poner un dispositivo en modo de conexión es mantener presionado su botón de encendido o encender/apagarlo 5 veces. Asegúrate de que Zigbee2MQTT esté en ejecución.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

Cuando el dispositivo se conecte, los verás en la interfaz web:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Ahora deberías ver este sensor en tu interfaz web de Home Assistant. Ve a `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

Después de agregar todos los sensores, puedes cerrar la interfaz web de Zigbee2MQTT.
