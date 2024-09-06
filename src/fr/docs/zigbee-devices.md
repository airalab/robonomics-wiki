---
title: Appareils Zigbee dans Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt/

---

**Si, pendant le processus d'installation, vous insérez un coordinateur ZigBee, vous pouvez ajouter des appareils ZigBee à votre maison connectée. Cet article expliquera comment le faire.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## Appairage de l'appareil

Ouvrez un navigateur web et allez sur `http://%PC_IP_ADDRESS%:8099`. Vous pouvez trouver l'adresse IP du Raspberry Pi en utilisant l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Si vous avez tout configuré sur votre PC, utilisez `http://localhost:8099`.

Vous verrez l'interface web de Zigbee2MQTT :

{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}

Il est temps de connecter votre appareil intelligent.
Tout d'abord, appuyez sur le bouton `Permit join (All)` en haut de l'interface web de Zigbee2MQTT.

Ensuite, commencez à appairer les appareils. La manière la plus courante de passer un appareil en mode de connexion est de maintenir enfoncé son bouton d'alimentation ou de les allumer/éteindre 5 fois. Assurez-vous que Zigbee2MQTT est en cours d'exécution.

Lorsque l'appareil se connecte, vous les verrez dans l'interface web :

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

Maintenant, vous devriez voir ce capteur dans votre interface Web Home Assistant. Allez dans `Paramètres` -> `Appareils et services` -> `Appareils`.

Après avoir ajouté tous les capteurs, vous pouvez fermer l'interface web de Zigbee2MQTT.