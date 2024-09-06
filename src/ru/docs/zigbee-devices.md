---
title: Устройства Zigbee в Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt/

---

**Если в процессе установки вы вставите координатор ZigBee, вы сможете добавить устройства ZigBee в свой умный дом. В этой статье будет объяснено, как это сделать.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## Парное устройство

Откройте веб-браузер и перейдите по адресу `http://%PC_IP_ADDRESS%:8099`. Вы можете найти IP-адрес Raspberry Pi, используя [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Если вы настроили все на своем ПК, используйте `http://localhost:8099`.

Вы увидите веб-интерфейс Zigbee2MQTT:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


Пришло время подключить ваше умное устройство.
Сначала нажмите кнопку `Permit join (All)` в верхней части веб-интерфейса Zigbee2MQTT.

Затем начните пару устройств. Самый распространенный способ перевести устройство в режим подключения - удерживать его кнопку питания или включать/выключать его 5 раз. Убедитесь, что Zigbee2MQTT работает.

Когда устройство подключится, вы увидите их в веб-интерфейсе:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

Теперь вы должны увидеть этот датчик в вашем веб-интерфейсе Home Assistant. Перейдите в `Настройки` -> `Устройства и Сервисы` -> `Устройства`.

После добавления всех датчиков, вы можете закрыть веб-интерфейс Zigbee2MQTT.