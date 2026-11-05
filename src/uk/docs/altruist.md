---
title: Altruist і sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist — відкритий датчик довкілля. Його показники потрапляють у відкритий набір даних, який будь-хто може переглянути на [sensors.social](https://sensors.social).

## Датчик

- Є вулична версія (Urban), версія для приміщень (Insight) і набір для складання.
- Датчик підписує кожне вимірювання, тому підробити показники дорогою неможливо.
- Показники передаються через Wi-Fi, а там, де Wi-Fi немає, — радіо LoRa і mesh-мережами Meshtastic.
- Власник може ввімкнути шифрування показників. Тоді на sensors.social їх побачить лише він, своїм ключем.

Датчики Altruist виробляє Pinout Limited. Придбати їх можна на [cyberpunks.shop](https://cyberpunks.shop/) і на Amazon у ЄС. Про налаштування та підтримку — на сторінках товарів там і на [pinout.cloud](https://pinout.cloud).

## sensors.social

[sensors.social](https://sensors.social) — карта незалежних датчиків якості повітря. На ній показники зі 100+ датчиків, а у власному блозі публікуються новини проєкту.

Щоб використовувати датчик у Home Assistant у локальній мережі, є [інтеграція Altruist](https://github.com/airalab/altruist-homeassistant-integration).

## Вихідний код

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): прошивка.
- [airalab/webflasher](https://github.com/airalab/webflasher): прошивка датчика просто з браузера.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): карта.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): сервіс, який збирає вимірювання.
