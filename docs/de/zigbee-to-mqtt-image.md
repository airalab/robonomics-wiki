---
title: Zigbee-Adapter mit Zigbee2MQTT für vorinstalliertes Image

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**In diesem Artikel werden intelligente Geräte gekoppelt.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Öffnen Sie einen Webbrowser und gehen Sie zu `http://%RASPBERRY_IP_ADDRESS%:8099`. Sie können die IP-Adresse des Raspberry Pi mit der [Fing Mobile App](https://www.fing.com/products) oder dem [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) finden.

Sie sehen die Web-Benutzeroberfläche von Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




Es ist Zeit, Ihr intelligentes Gerät zu verbinden. 
Drücken Sie zuerst die Schaltfläche `Permit join (All)` oben in der Web-Benutzeroberfläche von Zigbee2MQTT. 

Dann beginnen Sie, Geräte zu koppeln. Die häufigste Methode, ein Gerät in den Verbindungsmodus zu versetzen, besteht darin, die Ein-/Aus-Taste gedrückt zu halten oder sie 5-mal ein- und auszuschalten. Stellen Sie sicher, dass Zigbee2MQTT läuft.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

Wenn das Gerät verbunden ist, sehen Sie es in der Web-Benutzeroberfläche:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Jetzt sollten Sie diesen Sensor in Ihrer Home Assistant WebUI sehen. Gehen Sie zu `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

Nachdem Sie alle Sensoren hinzugefügt haben, können Sie die Web-Benutzeroberfläche von Zigbee2MQTT schließen.
