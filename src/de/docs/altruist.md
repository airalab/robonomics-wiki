---
title: Altruist und sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist ist ein Open-Source-Umweltsensor. Seine Messwerte fließen in einen offenen Datensatz, den jeder auf [sensors.social](https://sensors.social) einsehen kann.

## Der Sensor

- Es gibt eine Außenversion (Urban), eine Innenversion (Insight) und einen Bausatz.
- Der Sensor signiert jeden Messwert, damit Werte unterwegs nicht gefälscht werden können.
- Die Messwerte gehen über WLAN oder, wo es kein WLAN gibt, über LoRa-Funk und Meshtastic-Mesh-Netze.
- Der Eigentümer kann die Messwerte verschlüsseln. Dann sieht nur er sie auf sensors.social, mit seinem eigenen Schlüssel.

Altruist-Sensoren stellt Pinout Limited her. Sie können sie auf [cyberpunks.shop](https://cyberpunks.shop/) und in der EU auf Amazon kaufen. Hilfe zur Einrichtung und Support finden Sie auf den dortigen Produktseiten und auf [pinout.cloud](https://pinout.cloud).

## sensors.social

[sensors.social](https://sensors.social) ist eine Karte unabhängiger Luftqualitätssensoren. Sie zeigt Messwerte von über 100 Sensoren und hat einen eigenen Blog mit Neuigkeiten zum Projekt.

Um einen Sensor im lokalen Netzwerk in Home Assistant zu nutzen, gibt es die [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration).

## Quellcode

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): Firmware.
- [airalab/webflasher](https://github.com/airalab/webflasher): Firmware aus dem Browser flashen.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): die Karte.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): der Dienst, der die Messwerte sammelt.
