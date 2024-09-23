---
title: Robonomics SLS Шлюз

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Прошивка 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**В этой статье вы настроите Robonomics SLS Шлюз. Вы установите необходимое программное обеспечение для шлюза, настроите его и подключите к Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## Прошивка

Сначала вам нужно установить прошивку микроконтроллера шлюза. Подготовьте шлюз, установив переключатели `1` и `3` в нижней части SLS Шлюза в положение `ON`, остальные должны быть в положении `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

Подключите шлюз к вашему Raspberry Pi через порт USB типа C на шлюзе.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Клонируйте репозиторий с прошивкой на ваш Raspberry Pi:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git

```

{% endcodeHelper %}

Перейдите в `robonomics-hass-utils/esp_firmware/linux`. Чтобы прошить шлюз SLS, вам нужно выполнить скрипты `Clear` и `Flash_16mb`.

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Устранение неполадок

Если у вас возникли проблемы с обновлением прошивки шлюза, вам нужно предпринять дополнительные шаги:

1. Убедитесь, что у вас установлен модуль pySerial:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Предоставьте вашему пользователю права доступа к USB-порту и перезагрузите компьютер:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. В некоторых случаях необходимо изменить настройку полосы пропускания в скрипте для обновления прошивки. Откройте скрипт `Flash_16mb.sh` с помощью редактора `nano` иИзмените параметр baud с `921600` на меньшее значение (например, `115200`).

## Конфигурация

1. Отсоедините шлюз SLS от компьютера. Установите переключатели на задней панели шлюза в правильное положение. Переключатели `5` (RX Zigbee to ESP) и `6` (TX Zigbee to ESP) должны быть в положении `ON`, остальные должны быть в положении `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Подключите кабель питания типа C. Индикаторный свет в центре должен загореться зеленым.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. При первом запуске шлюз начнет передавать Wi-Fi с SSID `zgw****`. Подключитесь к этой сети. Имейте в виду, что сигнал может быть довольно слабым, поэтому лучше держать шлюз SLS ближе к вашему компьютеру.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. Если соединение установлено успешно, откроется веб-интерфейс (или вы можете найти его по адресу 192.168.1.1 адрес).

5. Вы увидите страницу `Настройки Wi-Fi`. Выберите свою Wi-Fi и введите пароль. Нажмите кнопку `Применить`. Шлюз перезагрузится и подключится к вашей сети Wi-Fi.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Найдите локальный IP-адрес шлюза SLS, чтобы получить доступ к веб-интерфейсу. Для этого вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Имя шлюза должно выглядеть примерно так: `zgw****`. Откройте веб-интерфейс шлюза, вставив IP-адрес шлюза в браузер.

7. Перейдите в `Настройки` -> `Аппаратное обеспечение` и убедитесь, что настройки выглядят так, как на изображении. Поправьте настройки при необходимости и нажмите кнопку `Сохранить`:

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Таблица с необходимыми значениями:

| Поле                     | Значение           |
|--------------------------|:-------------------|
| Модуль Zigbee            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Пин кнопки службы        | 33 (pullUP - true) |
| Количество адресуемых светодиодов | 0                  |
| Светодиод красный (или адрес) | 21                 |
| Светодиод зеленый        | 5                  |
| Светодиод синий           | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Перезагрузите шлюз. Выберите `Действия` -> `Перезагрузить систему` в правом верхнем углу.

9. Убедитесь, что шлюз работает правильно в окне информации Zigbee. Состояние устройства должно быть `OK`.

10. Настройте автоматическое добавление устройств в Home Assistant. Перейдите в `Zigbee` -> `Настройки`, затем выберите `Обнаружение Home Assistant MQTT` и `Очистить состояния`. Сохраните изменения и снова **перезагрузите** шлюз SLS.

{% roboWikiNote {type: "warning"}%} Если у вас уже есть активный шлюз SLS в вашем доме, и вы сейчас настраиваете другойЕсли у вас есть несколько устройств Zigbee, работающих на одном канале, они будут конфликтовать друг с другом. Чтобы решить эту проблему, вам нужно изменить канал на новом устройстве. Для этого перейдите в `Zigbee` -> `Config` и измените канал на другой (например, канал 15). {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## Сопряжение SLS с MQTT

После настройки шлюза SLS вам нужно подключить шлюз SLS к Home Assistant. Откройте веб-интерфейс шлюза SLS и перейдите в `Settings/Link` -> `MQTT Setup`:

Добавьте адрес вашего брокера (адрес Raspberry Pi с Home Assistant в локальной сети, вы можете найти его с помощью [мобильного приложения Fing](https://www.fing.com/products) или [инструмента командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), порт (по умолчанию `1883`), имя пользователя и пароль брокера (которые вы создали ранее) и имя темы (вы можете выбрать любое). Также IP-адрес Raspberry Pi должен быть статическим. Нажмите на `Enable` и `Retain states`..

Сохраните изменения. Теперь устройства будут автоматически отображаться в Home Assistant.

## Подключение устройств

Подключите ваши устройства, перейдя в раздел `Zigbee` -> `Join`. Поместите ваши сенсоры в режим сопряжения, наиболее распространенным способом перевода устройства в режим подключения является удержание его кнопки питания или переключение их вкл/выкл 5 раз. Нажмите кнопку `Enable Join`, чтобы начать поиск устройств Zigbee. Вы увидите активные сенсоры.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Теперь вы можете перейти в раздел [**Подписка на IoT**](/docs/sub-activate) и начать активацию подписки Robonomics.