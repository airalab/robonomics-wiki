---
title: Адаптер Zigbee с Zigbee2MQTT для предустановленного образа

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**В этой статье вы будете сопрягать умные устройства.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Откройте веб-браузер и перейдите по адресу `http://%RASPBERRY_IP_ADDRESS%:8099`. Вы можете найти IP-адрес Raspberry Pi, используя [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Вы увидите веб-интерфейс Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




Пришло время подключить ваше умное устройство. 
Сначала нажмите кнопку `Permit join (All)` в верхней части веб-интерфейса Zigbee2MQTT. 

Затем начните сопрягать устройства. Самый распространенный способ перевести устройство в режим подключения - удерживать его кнопку питания или включать/выключать его 5 раз. Убедитесь, что Zigbee2MQTT работает.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

Когда устройство подключится, вы увидите их в веб-интерфейсе:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Теперь вы должны увидеть этот датчик в вашем веб-интерфейсе Home Assistant. Перейдите в `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

После добавления всех датчиков вы можете закрыть веб-интерфейс Zigbee2MQTT.
