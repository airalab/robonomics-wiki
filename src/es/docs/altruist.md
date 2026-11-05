---
title: Altruist y sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist es un sensor ambiental de código abierto. Sus lecturas van a un conjunto de datos abierto que cualquiera puede ver en [sensors.social](https://sensors.social).

## El sensor

- Hay una versión para exterior (Urban), una para interior (Insight) y un kit.
- El sensor firma cada medición, así que las lecturas no se pueden falsificar por el camino.
- Las lecturas pueden viajar por wifi, o por radio LoRa y redes en malla Meshtastic donde no hay wifi.
- El propietario puede elegir cifrar las lecturas. En ese caso solo él puede verlas en sensors.social, con su propia clave.

Los sensores Altruist los fabrica Pinout Limited. Puedes comprarlos en [cyberpunks.shop](https://cyberpunks.shop/) y en Amazon en la UE. Para la instalación y el soporte, consulta allí las páginas de producto y [pinout.cloud](https://pinout.cloud).

## sensors.social

[sensors.social](https://sensors.social) es un mapa de sensores independientes de calidad del aire. Muestra lecturas de más de 100 sensores y tiene su propio blog con noticias del proyecto.

Para usar un sensor en Home Assistant dentro de tu red local, existe la [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration).

## Código fuente

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): el firmware.
- [airalab/webflasher](https://github.com/airalab/webflasher): grabar el firmware desde un navegador.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): el mapa.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): el servicio que recoge las mediciones.
