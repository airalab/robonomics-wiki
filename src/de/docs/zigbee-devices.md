---
title: Zigbee-Geräte in Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt/

---

**Wenn Sie während des Installationsprozesses einen ZigBee-Koordinator einfügen, können Sie ZigBee-Geräte zu Ihrem Smart Home hinzufügen. Dieser Artikel wird erklären, wie es geht.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## Gerätekopplung

Öffnen Sie einen Webbrowser und gehen Sie zu `http://%PC_IP_ADDRESS%:8099`. Sie können die IP-Adresse des Raspberry Pi mithilfe der [Fing-Mobil-App](https://www.fing.com/products) oder des [nmap-CLI-Tools](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) finden. Wenn Sie alles auf Ihrem PC eingerichtet haben, verwenden Sie `http://localhost:8099`.

Sie sehen die Web-Benutzeroberfläche von Zigbee2MQTT:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


Es ist Zeit, Ihr intelligentes Gerät anzuschließen.
Drücken Sie zuerst die Schaltfläche `Beitritt erlauben (Alle)` oben in der Web-Benutzeroberfläche von Zigbee2MQTT.

Dann beginnen Sie, Geräte zu koppeln. Der häufigste Weg, ein Gerät in den Verbindungszustand zu versetzen, besteht darin, seine Ein-/Aus-Taste gedrückt zu halten oder sie 5 Mal ein- und auszuschalten. Stellen Sie sicher, dass Zigbee2MQTT läuft.

Wenn das Gerät verbunden ist, sehen Sie es in der Web-Benutzeroberfläche:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

Jetzt sollten Sie diesen Sensor in Ihrer Home Assistant WebUI sehen. Gehen Sie zu `Einstellungen` -> `Geräte & Dienste` -> `Geräte`.

Nachdem Sie alle Sensoren hinzugefügt haben, können Sie die Web-Benutzeroberfläche von Zigbee2MQTT schließen.
