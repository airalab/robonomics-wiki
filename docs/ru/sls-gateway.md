---
title: Robonomics SLS Шлюз

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Прошивка 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**В этой статье вы настроите Robonomics SLS Шлюз. Вы установите необходимое программное обеспечение для шлюза, настроите его и подключите к Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Прошивка

Сначала вам нужно установить прошивку микроконтроллера шлюза. Подготовьте шлюз, установив переключатели `1` и `3` в нижней части SLS Шлюза в положение `ON`, остальные должны быть в положении `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

Подключение ateway to your Raspberry Pi via USB type-C port on the gateway.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Клонируйте репозиторий с прошивкой на Raspberry Pi:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

Перейдите в `robonomics-hass-utils/esp_firmware/linux`. Чтобы прошить SLS шлюз, вам нужно запустить скрипты `Clear` и `Flash_16mb`.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### Устранение неполадок

Если у вас возникли проблемы с обновлением прошивки шлюза, вам нужно выполнить дополнительные действия:

1. Убедитесь, что у вас установлен модуль pySerial:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. Предоставьте своему пользователю права доступа к USB-порту и перезагрузите компьютер:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. В некоторых случаях необходимо изменить настройку пропускной способности в скрипте для обновления прошивки. Откройте скрипт `Flash_16mb.sh` с помощью редактора `nano` и измените параметр baud с `921600` на меньшее значение (например, `115200`).

## Настройка

1. Отсоедините SLS Шлюз от компьютера. Установите переключатели на задней части шлюза в правильное положение. Переключатели `5` (RX Zigbee to ESP) и `6` (TX Zigbee to ESP) должны быть в положении `ON`, остальные должны быть в положении `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Подключите кабель питания типа C. Индикаторный свет в центре должен загореться зеленым.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. При первом запуске шлюз начнет передавать Wi-Fi с SSID `zgw****`. Подключитесь к этой сети. Имейте в виду, что сигнал может быть довольно слабым, поэтому лучше держать SLS шлюз ближе к вашему компьютеру. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. Если подключение прошло успешно, откроется веб-интерфейс (или вы можете найти его по адресу 192.168.1.1). 

5. Вы увидите страницу `Wi-Fi Settings`. Выберите свою Wi-Fi и введите пароль. Нажмите кнопку `Apply`. Шлюз перезагрузится и подключится к вашей Wi-Fi сети. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. Найдите локальный IP-адрес SLS шлюза для доступа к веб-интерфейсу. Чтобы найти его, вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Имя шлюза должно выглядеть так: `zgw****`. Откройте веб-интерфейс шлюза, вставив IP-адрес шлюза в браузер.

7. Перейдите в `Setting` -> `Hardware` и убедитесь, что настройки выглядят так, как на изображении. Исправьте настройки при необходимости и нажмите кнопку `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

Таблица с необходимыми значениями:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Затем перезагрузите шлюз. Выберите  `Actions` -> `Reboot system` в правом верхнем углу.

9. Убедитесь, что шлюз работает должным образом в окне информации о Zigbee. Состояние устройства должно быть `OK`.

10. Настройте автоматическое добавление устройств в Home Assistant. Перейдите в `Zigbee` -> `Config`, затем выберите `Home Assistant MQTT Discovery` и `Clear States`. Сохраните изменения и снова **перезагрузите** SLS шлюз.

<robo-wiki-note type="warning">

Если у вас уже есть активный SLS шлюз в вашем доме, и вы сейчас настраиваете еще один, то они будут конфликтовать друг с другом. Чтобы решить эту проблему, вам нужно изменить канал на новом устройстве. Для этого перейдите в `Zigbee` -> `Config` и измените канал на другой (например, канал 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## Сопряжение SLS с MQTT

После настройки SLS Шлюза вам нужно подключить SLS Шлюз к Home Assistant. Откройте веб-интерфейс SLS Шлюза и перейдите в `Settings/Link` -> `MQTT Setup`:


Добавьте адрес вашего брокера (адрес Raspberry Pi с Home Assistant в локальной сети, вы можете найти его с помощью [мобильного приложения Fing](https://www.fing.com/products) или [инструмента командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), порт (по умолчанию `1883`), имя пользователя и пароль брокера (которые вы создали ранее) и имя темы (вы можете выбрать любое). Также IP-адрес Raspberry Pi должен быть статическим. Нажмите `Enable` и `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

Сохраните изменения. Теперь устройства будут автоматически отображаться в Home Assistant.

## Подключение устройств

Подключите ваши устройства, перейдя в раздел `Zigbee` -> `Join`. Поместите ваши сенсоры в режим сопряжения, наиболее распространенным способом переключения устройства в режим подключения является удержание его кнопки питания или переключение их вкл/выкл 5 раз. Нажмите кнопку `Enable Join`, чтобы начать поиск устройств Zigbee. Вы увидите активные сенсоры.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


Теперь вы можете перейти в раздел [**Подписка на IoT**](/docs/sub-activate) и начать активацию подписки Robonomics.
