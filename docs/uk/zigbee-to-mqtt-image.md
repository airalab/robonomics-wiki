---
title: Адаптер Zigbee з Zigbee2MQTT для попередньо встановленого зображення

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**У цій статті ви будете парувати розумні пристрої.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Відкрийте веб-переглядач і перейдіть за адресою `http://%RASPBERRY_IP_ADDRESS%:8099`. Ви можете знайти IP-адресу Raspberry Pi за допомогою [мобільного додатку Fing](https://www.fing.com/products) або [інструменту командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Ви побачите веб-інтерфейс Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




Час підключити ваш розумний пристрій. 
Спочатку натисніть кнопку `Permit join (All)` у верхній частині веб-інтерфейсу Zigbee2MQTT. 

Потім почніть парувати пристрої. Найпоширеніший спосіб переключення пристрою в режим підключення - утримуйте його кнопку живлення або включайте / виключайте його 5 разів. Переконайтеся, що Zigbee2MQTT працює.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

Коли пристрій підключається, ви побачите їх у веб-інтерфейсі:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Тепер ви повинні побачити цей датчик у вашому веб-інтерфейсі Home Assistant. Перейдіть до `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

Після додавання всіх датчиків ви можете закрити веб-інтерфейс Zigbee2MQTT.
