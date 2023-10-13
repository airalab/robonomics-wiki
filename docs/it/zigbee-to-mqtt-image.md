---
title: Adattatore Zigbee con Zigbee2MQTT per immagine preinstallata

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**In questo articolo accoppierai dispositivi intelligenti.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Apri un browser web e vai su `http://%RASPBERRY_IP_ADDRESS%:8099`. Puoi trovare l'indirizzo IP del Raspberry Pi utilizzando [l'app mobile Fing](https://www.fing.com/products) o [lo strumento CLI nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Vedrai l'interfaccia web di Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




È ora di collegare il tuo dispositivo intelligente. 
Prima, premi il pulsante `Permit join (All)` in alto nell'interfaccia web di Zigbee2MQTT. 

Quindi, inizia ad accoppiare i dispositivi. Il modo più comune per mettere un dispositivo in modalità di connessione è tenere premuto il suo pulsante di accensione o accenderlo/spegnere 5 volte. Assicurati che Zigbee2MQTT sia in esecuzione.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

Quando il dispositivo si connette, li vedrai nell'interfaccia web:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Ora dovresti vedere questo sensore nella tua interfaccia web di Home Assistant. Vai su `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

Dopo aver aggiunto tutti i sensori, puoi chiudere l'interfaccia web di Zigbee2MQTT.
