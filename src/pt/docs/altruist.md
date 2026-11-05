---
title: Altruist e sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

O Altruist é um sensor ambiental de código aberto. As leituras dele vão para um conjunto de dados aberto que qualquer pessoa pode ver no [sensors.social](https://sensors.social).

## O sensor

- Há uma versão para área externa (Urban), uma para área interna (Insight) e um kit.
- O sensor assina cada medição, então as leituras não podem ser falsificadas no caminho.
- As leituras podem viajar por Wi-Fi ou, onde não há Wi-Fi, por rádio LoRa e redes mesh Meshtastic.
- O dono pode escolher criptografar as leituras. Nesse caso, só ele pode vê-las no sensors.social, com a própria chave.

Os sensores Altruist são fabricados pela Pinout Limited. Você pode comprá-los na [cyberpunks.shop](https://cyberpunks.shop/) e na Amazon da UE. Para configuração e suporte, veja as páginas dos produtos e [pinout.cloud](https://pinout.cloud).

## sensors.social

O [sensors.social](https://sensors.social) é um mapa de sensores independentes de qualidade do ar. Ele mostra leituras de mais de 100 sensores e tem um blog próprio com notícias do projeto.

Para usar um sensor no Home Assistant na sua rede local, existe a [integração Altruist](https://github.com/airalab/altruist-homeassistant-integration).

## Código-fonte

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): firmware.
- [airalab/webflasher](https://github.com/airalab/webflasher): grava o firmware pelo navegador.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): o mapa.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): o serviço que coleta as medições.
