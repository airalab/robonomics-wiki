---
title: Adaptateur Zigbee avec Zigbee2MQTT pour l'image préinstallée

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**Dans cet article, vous allez associer des appareils intelligents.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Ouvrez un navigateur Web et allez à l'adresse `http://%RASPBERRY_IP_ADDRESS%:8099`. Vous pouvez trouver l'adresse IP du Raspberry Pi en utilisant l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Vous verrez l'interface Web de Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




Il est temps de connecter votre appareil intelligent. 
Tout d'abord, appuyez sur le bouton `Permit join (All)` en haut de l'interface Web de Zigbee2MQTT. 

Ensuite, commencez à associer les appareils. La manière la plus courante de passer un appareil en mode de connexion est de maintenir enfoncé son bouton d'alimentation ou de les allumer/éteindre 5 fois. Assurez-vous que Zigbee2MQTT est en cours d'exécution.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

Lorsque l'appareil se connecte, vous les verrez dans l'interface Web:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Maintenant, vous devriez voir ce capteur dans votre interface utilisateur Web Home Assistant. Allez dans `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

Après avoir ajouté tous les capteurs, vous pouvez fermer l'interface Web de Zigbee2MQTT.
