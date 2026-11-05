---
title: Altruist и sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist — открытый датчик окружающей среды. Его показания попадают в открытый набор данных, который любой может посмотреть на [sensors.social](https://sensors.social).

## Датчик

- Есть уличная версия (Urban), версия для помещений (Insight) и набор для сборки.
- Датчик подписывает каждое измерение, поэтому подделать показания по пути нельзя.
- Показания передаются по Wi-Fi, а там, где Wi-Fi нет, — по радио LoRa и через mesh-сети Meshtastic.
- Владелец может включить шифрование показаний. Тогда на sensors.social их увидит только он, своим ключом.

Датчики Altruist производит Pinout Limited. Купить их можно на [cyberpunks.shop](https://cyberpunks.shop/) и на Amazon в ЕС. Про настройку и поддержку — на страницах товаров там и на [pinout.cloud](https://pinout.cloud).

## sensors.social

[sensors.social](https://sensors.social) — карта независимых датчиков качества воздуха. На ней показания с 100+ датчиков, а в собственном блоге публикуются новости проекта.

Чтобы использовать датчик в Home Assistant в локальной сети, есть [интеграция Altruist](https://github.com/airalab/altruist-homeassistant-integration).

## Исходный код

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): прошивка.
- [airalab/webflasher](https://github.com/airalab/webflasher): прошивка датчика прямо из браузера.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): карта.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): сервис, который собирает измерения.
