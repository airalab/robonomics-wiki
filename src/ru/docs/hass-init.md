---
title: Инициализация Home Assistant
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
---

**После установки Home Assistant необходимо его инициализировать.**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

Вы начинаете с создания учетной записи владельца Home Assistant. Эта учетная запись является администратором и может вносить любые изменения.
Откройте веб-браузер и перейдите по адресу `http://%PC_IP_ADDRESS%:8123`. Вы можете найти IP-адрес Raspberry Pi, используя [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).
Если вы настроили все на своем ПК, используйте `http://localhost:8123`.

{% roboWikiNote {type: "note"}%} IP-адрес может измениться со временем из-за настроек маршрутизатора {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. На первой странице введите имя, имя пользователя, пароль и нажмите кнопку `СОЗДАТЬ УЧЕТНУЮ ЗАПИСЬ`.

2. На следующем экране введите имя для вашего дома, установите ваше местоположение и систему единиц. Нажмите `ОПРЕДЕЛИТЬ`, чтобы найти ваше местоположение и установить часовой пояс и систему единиц на основе этого местоположения. Если вы не хотите отправлять свое местоположение, вы можете установить эти значения вручную.

3. После этого Home Assistant покажет все устройства, которые он обнаружил в вашей сети. Не беспокойтесь, если вы видите меньше элементов, чем показано ниже; вы всегда можете вручную добавить устройства позже. Сейчас просто нажмите `ЗАВЕРШИТЬ`, и вы окажетесь на основном экране Home Assistant.

4. Наконец, вы увидите веб-интерфейс Home Assistant, который покажет все ваши устройства.


## Устранение неполадок

1. Если вы забыли свой логин или пароль для локального пользователя, [проверьте эту статью](https://www.home-assistant.io/docs/locked_out/), чтобы восстановить ваши учетные данные.