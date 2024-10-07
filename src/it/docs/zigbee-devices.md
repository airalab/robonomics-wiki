---
title: Dispositivi Zigbee in Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt/

---

**Se, durante il processo di installazione, inserisci un coordinatore ZigBee, puoi aggiungere dispositivi ZigBee alla tua casa intelligente. Questo articolo spiegherà come farlo.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## Accoppiamento del Dispositivo

Apri un browser web e vai su `http://%PC_IP_ADDRESS%:8099`. Puoi trovare l'indirizzo IP del Raspberry Pi
usando [l'app mobile Fing](https://www.fing.com/products) o [lo strumento CLI nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Se hai configurato tutto sul tuo PC, usa `http://localhost:8099`.

Vedrai l'interfaccia web di Zigbee2MQTT:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


È ora di collegare il tuo dispositivo intelligente.
Innanzitutto, premi il pulsante `Permit join (All)` in cima all'interfaccia web di Zigbee2MQTT.

Poi, inizia ad accoppiare i dispositivi. Il modo più comune per mettere un dispositivo in modalità di connessione è tenere premuto il suo pulsante di accensione o accenderli/spegnere 5 volte. Assicurati che Zigbee2MQTT sia in esecuzione.

Quando il dispositivo si connette, li vedrai nell'interfaccia web:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

Ora dovresti vedere questo sensore nella tua interfaccia WebUI di Home Assistant. Vai su `Impostazioni` -> `Dispositivi e Servizi` -> `Dispositivi`.

Dopo aver aggiunto tutti i sensori, puoi chiudere l'interfaccia web di Zigbee2MQTT.