---
title: Підключення пристрою Amazon FreeRTOS до Robonomics через MQTT

contributors: [khssnv]
---

Ось демонстрація того, як мікроконтролер, що працює на [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/), може бути підключений до мережі Robonomics через MQTT. Будь ласка, перевірте [цей репозиторій](http://github.com/khssnv/freertos_mqtt_robonomics_example) для отримання вихідного коду проекту.

Ми використовуємо [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) з дистрибутивом FreeRTOS та реалізацією MQTT, наданою [Espressif IoT Development Framework](https://github.com/espressif/esp-idf), який є виробником використовуваного мікроконтролера.

Також є датчик [PMS-3003](http://www.plantower.com/en/content/?107.html)  для демонстраційних цілей. Датчик вимірює наявність частинок у повітрі, і його можна використовувати для оцінки якості повітря.

Якість повітря не є темою статті, ви можете дізнатися більше про це на веб-сайті ВООЗ: [Ambient (outdoor) air pollution](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). Метою системи є публікація вимірювань датчика в мережі Robonomics Airalab.

## Налаштування апаратного забезпечення

Ми підключаємо PMS3003 TXD PIN5 до ESP32 DevKitC IO17 для передачі вимірювань за допомогою UART.
Також обидва пристрої потребують живлення та спільного заземлення.

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## Потік даних

Для передачі вимірювань датчика в мережу Robonomics на рівні прошивки нашою метою є отримання даних з датчика за допомогою вбудованого комунікаційного протоколу, який він підтримує (UART у нашому випадку) і передача його до екземпляра AIRA за допомогою MQTT / TCP.

![Sending](../images/freertos-mqtt/send.svg)

У нашому прикладі ми використовуємо хмарне розгортання AIRA, доступне за публічною IP-адресою та призначеною доменною назвою.
На екземплярі AIRA ми налаштовуємо брокер MQTT `mosquitto` та підписуємося на тему `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`, щоб отримувати повідомлення з MQTT.

Потім ми передаємо повідомлення до письменника `robonomics io` через канал.

![Receiving](../images/freertos-mqtt/recv.svg)

Тепер дані доступні в мережі Robonomics, і ми можемо знову прочитати їх за допомогою `robonomics io`.

## Прошивка

Ми використовуємо зразок застосунку [ESP-MQTT sample application with TCP transport](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) як основу.

Ми лише змінюємо `main/app_main.c` для підключення до датчика через UART, синхронізації часу SNTP та періодичного видавця MQTT.

Якщо ви намагаєтеся повторити проект і це ваш перший проект на основі ESP IDF, спочатку ознайомтеся з посібником з програмування [Espressif's ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step), щоб ознайомитися з операціями прошивки, такими як налаштування, збірка та завантаження за допомогою інструменту `idf.py`.

### Налаштування Wi-Fi

Для зв'язку з екземпляром AIRA, розгорнутим у хмарі, нашому мікроконтролеру потрібне підключення до Інтернету.
Ми використовуємо Wi-Fi ESP32 для цього.
Espressif надає утиліти для налаштування вбудованого Wi-Fi.
У нашому прикладі ми використовуємо середовище розробки з Ubuntu 20.04 GNU / Linux.
Щоб налаштувати Wi-Fi, ми переходимо до папки прокту та запускаємо інструмент налаштування SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Потім ми встановлюємо SSID точки доступу Wi-Fi та пароль в розділі `Example Підключитисяion Конфігурація`.

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### Налаштування кінцевої точки MQTT

Є дві речі, які потрібно налаштувати для MQTT.
Перше - це адреса брокера MQTT.
Це налаштовується за допомогою інструменту налаштування SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Встановіть `URL брокера` в розділі `Example Налаштування`.

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

Друга річ - це тема MQTT.
Ми встановлюємо її в прошивці з префіксом назви проекту, за яким слідує MAC-адреса нашого ESP32.
Це дає нам `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` для нашого конкретного мікросхеми.

## Від MQTT до Robonomics

Спочатку перевіримо, чи отримуємо дані за допомогою MQTT.
Ми можемо підписатися на тему брокера MQTT Mosquitto, на яку пристрій публікує.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Тут ми додаємо пакет `mosquitto` до нашого середовища, щоб використовувати утиліту `mosquitto_sub`.
Потім ми підписуємося на тему, встановлену в прошивці.
Ми отримали наші вимірювання, що значає, що AIRA правильно отримує дані через MQTT.
Тепер давайте направимо ці повідомлення до мережі Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Тут ми використовуємо утиліту `robonomics` для публікації повідомлень у каналі pubsub `/freertos_mqtt_robonomics_example`.
Ми вказуємо `bootnodes`, щоб забезпечити, що буде встановлено принаймні одне з'єднання.

Тепер ми читаємо ці повідомлення з того ж каналу pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Використані початкові ресурси

* ESP32 DevKitC pinout з блогу GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Структура даних та декодер PSM3003 з проекту OpenAirProject https://github.com/openairproject/sensor-esp32

**Дякуємо всім!**
