---
title: Connecter un appareil Amazon FreeRTOS à Robonomics via MQTT

contributors: [khssnv]
---

Voici la démonstration de comment un microcontrôleur exécutant [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) peut être connecté au réseau Robonomics via MQTT. Veuillez consulter [ce dépôt](http://github.com/khssnv/freertos_mqtt_robonomics_example) pour le code source du projet.

Nous utilisons [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) avec une distribution FreeRTOS et une implémentation MQTT fournies par le [Cadre de développement IoT Espressif](https://github.com/espressif/esp-idf) tandis qu'Espressif est un fournisseur du microcontrôleur utilisé.

Il y a également un capteur [PMS-3003](http://www.plantower.com/en/content/?107.html) à des fins de démonstration. Le capteur mesure la présence de particules dans l'air et peut être utilisé pour estimer la qualité de l'air.

La qualité de l'air n'est pas le sujet de l'article, vous pouvez en savoir plus à ce sujet sur le site de l'OMS : [Pollution de l'air ambiant (extérieur)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). L'objectif du système est de publier les mesures du capteur sur le réseau Robonomics d'Airalab.

## Configuration matérielle

Nous connectons le PIN5 TXD du PMS3003 à l'IO17 de l'ESP32 DevKitC pour transférer les mesures via UART.
Les deux appareils nécessitent également une alimentation et une masse commune.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Schéma de câblage"} %}{% endroboWikiPicture %}

## Flux de données

Pour transmettre les mesures du capteur au réseau Robonomics, notre objectif au niveau du micrologiciel est d'obtenir les données d'un capteur par le protocole de communication intégré qu'il prend en charge (UART dans notre cas) et de les transmettre à l'instance AIRA par MQTT / TCP.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Envoi"} %}{% endroboWikiPicture %}

Dans notre exemple, nous utilisons le déploiement cloud AIRA disponible par une adresse IP publique et un nom de domaine assigné.
Sur l'instance AIRA, nous configurons le courtier MQTT `mosquitto` et nous abonnons à `/freertos_mqtt_robonomics_example/98:F4`: AB: 72: 23: C4 `sujet pour recevoir des messages de MQTT.

Ensuite, nous passons les messages à l'écrivain `robonomics io` par un tuyau.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Réception"} %}{% endroboWikiPicture %}

Maintenant, les données sont disponibles dans le réseau Robonomics et nous pouvons les lire à nouveau avec `robonomics io`.

## Micrologiciel

Nous utilisons [l'application d'exemple ESP-MQTT avec transport TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) comme base.

Nous modifions uniquement `main/app_main.c` pour la connexion UART au capteur, la synchronisation de l'heure SNTP et la routine de publication MQTT périodique.

Si vous essayez de reproduire le projet et que c'est votre premier projet basé sur ESP IDF, veuillez d'abord suivre le [guide de programmation ESP-IDF d'Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) pour vous familiariser avec les opérations du micrologiciel telles que la configuration, la construction et le téléversement avec l'outil `idf.py`.

### Configuration Wi-Fi

Pour communiquer avec l'instance AIRA déployée dans le cloud, notre microcontrôleur nécessite une connexion Internet.
Nous utilisons le Wi-Fi de l'ESP32 pour cela.
Espressif fournit des utilitaires pour configurer le Wi-Fi intégré.
Dans notre exemple, nous utilisons un environnement de développement avec Ubuntu 20.04 GNU/Linux.
Pour configurer le Wi-Fi, nous allons dans le dossier du projet et exécutons l'outil de configuration SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Ensuite, nous définissons le SSID et le mot de passe du point d'accès Wi-Fi dans la section `Configuration de connexion d'exemple`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Menuconfig Wi-Fi"} %}{% endroboWikiPicture %}

### Configuration du point de terminaison MQTT

Il y a deux choses à configurer pour MQTT.
La première est l'adresse du courtier MQTT.
Elle est configurable avec l'outil de configuration SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Définissez l'URL du courtier dans la section `Configuration d'exemple`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Menuconfig MQTT"} %}{% endroboWikiPicture %}

La deuxième chose est un sujet MQTTNous le configurons dans le micrologiciel avec le préfixe du nom du projet suivi de l'adresse MAC de notre ESP32.
Cela nous donne `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` pour notre microprocesseur particulier.

## De MQTT à Robonomics

Tout d'abord, vérifions que nous recevons des données par MQTT.
Nous pouvons nous abonner au sujet de publication de l'appareil sur notre courtier MQTT Mosquitto.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Ici, nous intégrons le package `mosquitto` dans notre environnement pour utiliser l'utilitaire `mosquitto_sub`.
Ensuite, nous nous abonnons au sujet défini dans le micrologiciel.
Nous avons obtenu nos mesures, ce qui signifie qu'AIRA reçoit correctement les données par MQTT.
Maintenant, redirigeons ces messages vers le réseau Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Ici, nous utilisons l'utilitaire `robonomics` pour publier des messages dans le canal pubsub `/freertos_mqtt_robonomics_example`.
Nous spécifions les `bootnodes` pour garantir qu'au moins une connexion est établie.

Maintenant, nous lisons ces messages du même canal pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  Nouveau pair connecté : PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT : Lien de maillage ajouté pour le pair : PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") dans le sujet : TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Ressources Originales Utilisées

* Brochage ESP32 DevKitC à partir du blog de GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Structure de données et décodeur PSM3003 de OpenAirProject https://github.com/openairproject/sensor-esp32

**Merci à tous !**