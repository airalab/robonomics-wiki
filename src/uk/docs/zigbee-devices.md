---
title: Zigbee-пристрої в Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt/

---

**Якщо під час процесу встановлення ви підключите координатор ZigBee, ви зможете додати ZigBee-пристрої до свого розумного будинку. У цій статті пояснено, як це зробити.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## Парування пристрою

Відкрийте веб-переглядач та перейдіть за адресою `http://%PC_IP_ADDRESS%:8099`. Ви можете знайти IP-адресу Raspberry Pi, використовуючи [мобільний додаток Fing](https://www.fing.com/products) або [інструмент командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Якщо ви все налаштували на своєму ПК, використовуйте `http://localhost:8099`.

Ви побачите веб-інтерфейс Zigbee2MQTT:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


Час підключити ваш розумний пристрій.
Спочатку натисніть кнопку `Permit join (All)` у верхній частині веб-інтерфейсу Zigbee2MQTT.

Потім почніть парувати пристрої. Найпоширеніший спосіб перевести пристрій у режим підключення - утримувати його кнопку живлення або вимикати/увімкнути його 5 разів. Переконайтеся, що Zigbee2MQTT працює.

Коли пристрій підключиться, ви побачите їх у веб-інтерфейсі:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

Тепер ви повинні побачити цей датчик у вашому веб-інтерфейсі Home Assistant. Перейдіть до `Налаштування` -> `Пристрої та служби` -> `Пристрої`.

Після додавання всіх датчиків, ви можете закрити веб-інтерфейс Zigbee2MQTT.
