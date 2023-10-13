---
title: Connexionez un appareil Amazon FreeRTOS à Robonomics via MQTT

contributors: [khssnv]
---

Voici la démonstration de la façon dont un microcontrôleur exécutant [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) peut être connecté au réseau Robonomics via MQTT. Veuillez consulter [ce référentiel](http://github.com/khssnv/freertos_mqtt_robonomics_example) pour le code source du projet.

Nous utilisons [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) avec la distribution FreeRTOS et la mise en œuvre MQTT fournies par [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) tandis qu'Espressif est un fournisseur du microcontrôleur utilisé.

Il y a aussi un capteur [PMS-3003](http://www.plantower.com/en/content/?107.html) à des fins de démonstration. Le capteur mesure la présence de particules dans l'air et on peut l'utiliser pour estimer la qualité de l'air.

La qualité de l'air n'est pas un sujet de l'article, vous pouvez en savoir plus à ce sujet sur le site web de l'OMS: [Pollution de l'air ambiant (extérieur)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). L'objectif du système est de publier les mesures du capteur sur le réseau Robonomics d'Airalab.

## Configuration matérielle

Nous connectons la broche TXD du PMS3003 à l'IO17 de l'ESP32 DevKitC pour transférer les mesures par UART.
Les deux appareils nécessitent également une alimentation et une masse commune.

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## Flux de données

Afin de transmettre les mesures du capteur au réseau Robonomics, notre objectif au niveau du micrologiciel est d'obtenir les données d'un capteur par le protocole de communication intégré qu'il prend en charge (UART dans notre cas) et de les transmettre à une instance AIRA par MQTT / TCP.

![Sending](../images/freertos-mqtt/send.svg)

Dans notre exemple, nous utilisons le déploiement cloud AIRA disponible par une adresse IP publique et un nom de domaine attribué.
Sur l'instance AIRA, nous configurons le courtier MQTT `mosquitto` et nous nous abonnons au sujet `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` pour recevoir des messages de MQTT.

Ensuite, nous transmettons les messages à l'écrivain `robonomics io` par un tuyau.

![Receiving](../images/freertos-mqtt/recv.svg)

Maintenant, les données sont disponibles dans le réseau Robonomics et nous pouvons les lire à nouveau avec `robonomics io`.

## Micrologiciel

Nous utilisons l'application d'exemple [ESP-MQTT avec transport TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) comme base.

Nous modifions uniquement `main/app_main.c` pour la connexion UART au capteur, la synchronisation de l'heure SNTP et la routine de publication MQTT périodique.

Si vous essayez de reproduire le projet et que c'est votre premier projet basé sur ESP IDF, veuillez d'abord suivre le guide de programmation [ESP-IDF d'Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) pour vous familiariser avec les opérations du micrologiciel telles que la configuration, la compilation et le téléchargement avec l'outil `idf.py`.

### Configuration Wi-Fi

Afin de communiquer avec l'instance AIRA déployée dans le cloud, notre microcontrôleur nécessite une connexion Internet.
Nous utilisons le Wi-Fi de l'ESP32 pour cela.
Espressif fournit des utilitaires pour configurer le Wi-Fi intégré.
Dans notre exemple, nous utilisons un environnement de développement avec Ubuntu 20.04 GNU/Linux.
Pour configurer le Wi-Fi, nous allons dans le dossier du projet et exécutons l'outil de configuration SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Ensuite, nous définissons le SSID et le mot de passe du point d'accès Wi-Fi dans la section `Example Connection Configuration`.

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### Configuration du point de terminaison MQTT

Il y a deux choses à configurer pour MQTT.
La première est l'adresse du courtier MQTT.
Elle est configurable avec l'outil de configuration SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Définissez l'URL du courtier dans la section `Example Configuration`.

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

La deuxième chose est le sujet MQTT.
Nous le définissons dans le micrologiciel avec le préfixe du nom du projet suivi de l'adresse MAC de notre ESP32.
Cela nous donne `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` pour notre microprocesseur particulier.

## De MQTT à Robonomics

Commençons par vérifier si nous recevons des données par MQTT.
Nous pouvons nous abonner au sujet du courtier MQTT Mosquitto pour recevoir les publications de l'appareil.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Ici, nous importons le package `mosquitto` dans notre environnement pour utiliser l'utilitaire `mosquitto_sub`.
Ensuite, nous nous abonnons au sujet défini dans le micrologiciel.
Nous avons obtenu nos mesures, ce qui signifie que AIRA reçoit correctement les données via MQTT.
Maintenant, laissons passer ces messages vers le réseau Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Ici, nous utilisons l'utilitaire `robonomics` pour publier des messages dans le canal pubsub `/freertos_mqtt_robonomics_example`.
Nous spécifions les `bootnodes` pour garantir au moins une connexion établie.

Maintenant, nous lisons ces messages à partir du même canal pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Ressources originales utilisées

* Schéma des broches ESP32 DevKitC provenant du blog de GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Structure de données et décodeur PSM3003 provenant du projet OpenAirProject https://github.com/openairproject/sensor-esp32

**Merci à tous !**
