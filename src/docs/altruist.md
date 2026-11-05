---
title: Altruist and sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist is an open-source environmental sensor. Its readings go into an open dataset that anyone can see on [sensors.social](https://sensors.social).

## The sensor

- There are an outdoor version (Urban), an indoor version (Insight) and a kit.
- The sensor signs every measurement, so readings cannot be forged on the way.
- Readings can travel over Wi-Fi, or over LoRa radio and Meshtastic mesh networks where there is no Wi-Fi.
- The owner can choose to encrypt the readings. Only the owner can then see them on sensors.social, with their own key.

Altruist sensors are made by Pinout Limited. You can buy them at [cyberpunks.shop](https://cyberpunks.shop/) and on Amazon in the EU. For setup and support, see the product pages there and [pinout.cloud](https://pinout.cloud).

## sensors.social

[sensors.social](https://sensors.social) is a map of independent air-quality sensors. It shows readings from 100+ sensors and has its own blog with project news.

To use a sensor in Home Assistant on your local network, there is the [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration).

## Source code

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): firmware.
- [airalab/webflasher](https://github.com/airalab/webflasher): flash the firmware from a browser.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): the map.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): the service that collects measurements.
