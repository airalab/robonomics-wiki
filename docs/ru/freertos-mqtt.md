---
title: Подключение устройства Amazon FreeRTOS к Robonomics по протоколу MQTT

contributors: [khssnv]
---

Вот демонстрация того, как микроконтроллер, работающий на [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/), может быть подключен к сети Robonomics через MQTT. Пожалуйста, проверьте [этот репозиторий](http://github.com/khssnv/freertos_mqtt_robonomics_example) для получения исходного кода проекта.

Мы используем [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) с дистрибутивом FreeRTOS и реализацией MQTT, предоставленной [Espressif IoT Development Framework](https://github.com/espressif/esp-idf), при этом Espressif является производителем используемого микроконтроллера.

Также есть датчик [PMS-3003](http://www.plantower.com/en/content/?107.html) в качестве демонстрации. Датчик измеряет наличие частиц в воздухе, и его можно использовать для оценки качества воздуха.

Качество воздуха не является темой статьи, вы можете узнать больше об этом на веб-сайте ВОЗ: [Атмосферное (уличное) загрязнение воздуха](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). Цель системы - публикация измерений датчика в сети Robonomics от Airalab.

## Настройка оборудования

Мы подключаем PMS3003 TXD PIN5 к ESP32 DevKitC IO17 для передачи измерений по UART.
Также оба устройства требуют питания и общего заземления.

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## Поток данных

Для передачи измерений датчика в сеть Robonomics на уровне прошивки нашей целью является получение данных от датчика по встроенному протоколу связи, который он поддерживает (в нашем случае UART), и передача их в экземпляр AIRA по протоколу MQTT / TCP.

![Sending](../images/freertos-mqtt/send.svg)

В нашем примере мы используем облачное развертывание AIRA, доступное по публичному IP-адресу и назначенному доменному имени.
На экземпляре AIRA мы настраиваем MQTT-брокер `mosquitto` и подписываемся на тему `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`, чтобы получать сообщения от MQTT.

Затем мы передаем сообщения в писатель `robonomics io` через канал.

![Receiving](../images/freertos-mqtt/recv.svg)

Теперь данные доступны в сети Robonomics, и мы можем прочитать их с помощью `robonomics io`.

## Прошивка

Мы используем [пример приложения ESP-MQTT с TCP-транспортом](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) в качестве основы.

Мы только модифицируем `main/app_main.c` для подключения по UART к датчику, синхронизации времени SNTP и периодической публикации MQTT.

Если вы пытаетесь повторить проект и это ваш первый проект на базе ESP IDF, сначала ознакомьтесь с [Руководством по программированию ESP-IDF от Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step), чтобы ознакомиться с операциями прошивки, такими как настройка, сборка и загрузка с помощью инструмента `idf.py`.

### Wi-Fi Конфигурация

Для связи с экземпляром AIRA, развернутым в облаке, нашему микроконтроллеру требуется подключение к Интернету.
Мы используем Wi-Fi ESP32 для этого.
Espressif предоставляет утилиты для настройки встроенного Wi-Fi.
В нашем примере мы используем среду разработки с Ubuntu 20.04 GNU/Linux.
Для настройки Wi-Fi мы переходим в папку проекта и запускаем инструмент настройки SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Затем мы устанавливаем SSID и пароль точки доступа Wi-Fi в разделе «Пример конфигурации подключения».

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### Настройка конечной точки MQTT

Есть две вещи, которые нужно настроить для MQTT.
Первое - это адрес брокера MQTT.
Он настраивается с помощью инструмента настройки SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Установите `URL брокера` в разделе `Example Configuration`.

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

Второе - это тема MQTT.
Мы устанавливаем ее в прошивке с префиксом имени проекта, за которым следует MAC-адрес нашего ESP32.
Это дает нам `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` для нашей конкретной микросхемы.

## От MQTT к Robonomics

Сначала давайте проверим, получаем ли мы данные по MQTT.
Мы можем подписаться на тему брокера MQTT Mosquitto, на которую устройство публикует.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Здесь мы вводим пакет `mosquitto` в нашу среду, чтобы использовать утилиту `mosquitto_sub`.
Затем мы подписываемся на тему, установленную в прошивке.
Мы получили наши измерения, что означает, что AIRA правильно получает данные по MQTT.
Теперь давайте направим эти сообщения в сеть Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Здесь мы используем утилиту `robonomics` для публикации сообщений в канале pubsub `/freertos_mqtt_robonomics_example`.
Мы указываем `bootnodes`, чтобы обеспечить установку хотя бы одного соединения.

Теперь мы считываем эти сообщения из того же канала pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Использованные исходные ресурсы

* Схема выводов ESP32 DevKitC от блога GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Структура данных и декодер PSM3003 от OpenAirProject https://github.com/openairproject/sensor-esp32

**Спасибо всем!**
