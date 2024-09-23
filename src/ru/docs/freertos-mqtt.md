---
title: Подключение устройства Amazon FreeRTOS к Robonomics через MQTT

contributors: [khssnv]
---

Вот демонстрация того, как микроконтроллер, работающий на [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/), может быть подключен к сети Robonomics через MQTT. Пожалуйста, ознакомьтесь с [этим репозиторием](http://github.com/khssnv/freertos_mqtt_robonomics_example) для просмотра исходного кода проекта.

Мы используем [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) с дистрибутивом FreeRTOS и реализацией MQTT, предоставленной [Espressif IoT Development Framework](https://github.com/espressif/esp-idf), при этом Espressif является поставщиком используемого микроконтроллера.

Также в демонстрационных целях используется датчик [PMS-3003](http://www.plantower.com/en/content/?107.html). Датчик измеряет наличие частиц в воздухе, и его можно использовать для оценки качества воздуха.

Качество воздуха не является темой статьи, вы можете узнать больше об этом на сайте ВОЗ: [Атмосферное (уличное) загрязнение воздуха](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). Цель системы - публикация измерений датчика в сети Robonomics от Airalab.

## Настройка оборудования

Мы подключаем вывод TXD датчика PMS3003 к выводу IO17 ESP32 DevKitC для передачи измерений по UART.
Также оба устройства требуют питания и общей земли.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Схема подключения"} %}{% endroboWikiPicture %}

## Поток данных

Для передачи измерений датчика в сеть Robonomics на уровне прошивки наша цель - получить данные от датчика по поддерживаемому встроенному протоколу обмена данными (в нашем случае UART) и передать их в экземпляр AIRA через MQTT / TCP.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Отправка"} %}{% endroboWikiPicture %}

В нашем примере мы используем облачное развертывание AIRA, доступное по публичному IP-адресу и назначенному доменному имени.
На экземпляре AIRA мы настраиваем брокер MQTT `mosquitto` и подписываемся на `/freertos_mqtt_robonomics_example/98:F4`:AB:72:23:C4` тема для получения сообщений из MQTT.

Затем мы передаем сообщения в писатель `robonomics io` через канал.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Получение"} %}{% endroboWikiPicture %}

Теперь данные доступны в сети Robonomics, и мы можем прочитать их снова с помощью `robonomics io`.

## Прошивка

Мы используем [приложение-пример ESP-MQTT с TCP-транспортом](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) в качестве основы.

Мы только модифицируем `main/app_main.c` для подключения UART к датчику, синхронизации времени SNTP и периодической публикации MQTT.

Если вы пытаетесь повторить проект и это ваш первый проект на ESP IDF, сначала ознакомьтесь с [руководством по программированию ESP-IDF от Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step), чтобы ознакомиться с операциями прошивки, такими как конфигурация, сборка и загрузка с помощью инструмента `idf.py`.

### Конфигурация Wi-Fi

Для связи с экземпляром AIRA, развернутым в облаке, нашему микроконтроллеру требуется подключение к Интернету.
Мы используем Wi-Fi ESP32 для этого.
Espressif предоставляет утилиты для настройки встроенного Wi-Fi.
В нашем примере мы используем среду разработки с Ubuntu 20.04 GNU/Linux.
Для настройки Wi-Fi переходим в папку проекта и запускаем инструмент конфигурации SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Затем устанавливаем SSID и пароль точки доступа Wi-Fi в разделе `Example Connection Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Настройка Wi-Fi в меню"} %}{% endroboWikiPicture %}

### Конфигурация MQTT-точки

Для MQTT есть две вещи, которые нужно настроить.
Первое - это адрес брокера MQTT.
Это можно настроить с помощью инструмента конфигурации SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Установите `URL брокера` в разделе `Example Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Настройка MQTT в меню"} %}{% endroboWikiPicture %}

Второе - это тема MQTT..
Мы устанавливаем его в прошивке с префиксом имени проекта, за которым следует MAC-адрес нашего ESP32.
Это дает нам `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` для нашего конкретного микрочипа.

## От MQTT к Robonomics

Сначала давайте проверим, что мы получаем данные по MQTT.
Мы можем подписаться на тему устройства, опубликованную на нашем брокере MQTT Mosquitto.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Здесь мы добавляем пакет `mosquitto` в наше окружение, чтобы использовать утилиту `mosquitto_sub`.
Затем мы подписываемся на тему, установленную в прошивке.
Мы получили наши измерения, что означает, что AIRA правильно получает данные по MQTT.
Теперь давайте направим эти сообщения в сеть Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Здесь мы используем утилиту `robonomics` для публикации сообщений в канале pubsub `/freertos_mqtt_robonomics_example`.
Мы указываем `bootnodes`, чтобы гарантировать установление хотя бы одного соединения.

Теперь мы считываем эти сообщения из того же канала pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  Новый пир подключен: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Ссылка на сетку добавлена для пира: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") в теме: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Использованные оригинальные ресурсы

* ESP32 DevKitC выводы из блога GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Структура данных и декодер PSM3003 от OpenAirProject https://github.com/openairproject/sensor-esp32

**Спасибо всем!**