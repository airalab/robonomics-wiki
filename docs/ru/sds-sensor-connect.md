---
title: Как подключить датчик SDS011

contributors: [tubleronchik]
---

** Вот пошаговое руководство о том, как подключить ваш датчик к сети датчиков Robonomics. Наши датчики используют прошивку Robonomics, которая является улучшенной версией прошивки sensor.community. Она включает дополнительные датчики и имеет измененный механизм отправки данных. **

1. Подключите датчик к розетке для его питания.
2. Плата создаст Wi-Fi сеть с именем `RobonomicsSensor-xxxxxxxxx`. Подключитесь к ней с вашего телефона или компьютера: вы увидите окно авторизации (если нет, откройте браузер и перейдите по адресу `192.168.4.1`).
3. Выберите свою Wi-Fi сеть из списка (или введите ее вручную, если она отсутствует в списке) и заполните поле пароля.
<robo-wiki-note type="okay" title="INFO">
Датчик можно подключить только к сети Wi-Fi 2,4 ГГц. 
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Укажите координаты места, где будет установлен датчик. Вы можете получить их с любых карт или получить их из адреса, используя [эту ссылку.](https://www.latlong.net/convert-address-to-lat-long.html)
<robo-wiki-note type="warning" title="WARNING">
Координаты датчика будут отображаться на общедоступной карте. Если вы не хотите показывать свою личную информацию, укажите близкие, но не точные координаты.
</robo-wiki-note> 
5. Нажмите на `Save configuration and restart`. Плата перезагрузится и подключится к указанной Wi-Fi сети.
6. Откройте [карту датчиков Robonomics](https://sensors.robonomics.network/#/) и найдите место, где вы установили датчик. Через несколько минут вы сможете увидеть ваш датчик с данными на карте.
<robo-wiki-picture src="sds-sensor-map.png"/>

