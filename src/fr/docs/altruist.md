---
title: Altruist et sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist est un capteur environnemental open source. Ses mesures alimentent un jeu de données ouvert, visible par tous sur [sensors.social](https://sensors.social).

## Le capteur

- Il existe une version extérieure (Urban), une version intérieure (Insight) et un kit.
- Le capteur signe chaque mesure, si bien que les relevés ne peuvent pas être falsifiés en chemin.
- Les relevés peuvent passer par le Wi-Fi, ou par la radio LoRa et les réseaux maillés Meshtastic là où il n'y a pas de Wi-Fi.
- Le propriétaire peut choisir de chiffrer les relevés. Lui seul peut alors les voir sur sensors.social, avec sa propre clé.

Les capteurs Altruist sont fabriqués par Pinout Limited. Vous pouvez les acheter sur [cyberpunks.shop](https://cyberpunks.shop/) et sur Amazon dans l'UE. Pour l'installation et l'assistance, consultez les fiches produit sur ces sites et [pinout.cloud](https://pinout.cloud).

## sensors.social

[sensors.social](https://sensors.social) est une carte de capteurs indépendants de qualité de l'air. Elle affiche les relevés de plus de 100 capteurs et a son propre blog avec les actualités du projet.

Pour utiliser un capteur dans Home Assistant sur votre réseau local, il existe l'[Altruist integration](https://github.com/airalab/altruist-homeassistant-integration).

## Code source

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware) : le firmware.
- [airalab/webflasher](https://github.com/airalab/webflasher) : flasher le firmware depuis un navigateur.
- [airalab/sensors.social](https://github.com/airalab/sensors.social) : la carte.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity) : le service qui collecte les mesures.
