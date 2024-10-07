---
title: Підключення пристрою Amazon FreeRTOS до Robonomics через MQTT

contributors: [khssnv]
---

Ось демонстрація того, як мікроконтролер, що працює на [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/), може бути підключений до мережі Robonomics через MQTT. Будь ласка, перегляньте [цей репозиторій](http://github.com/khssnv/freertos_mqtt_robonomics_example) для отримання вихідного коду проекту.

Ми використовуємо [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) з дистрибутивом FreeRTOS та реалізацією MQTT, наданою [Espressif IoT Development Framework](https://github.com/espressif/esp-idf), при цьому Espressif є постачальником використаного мікроконтролера.

Також є датчик [PMS-3003](http://www.plantower.com/en/content/?107.html) для демонстраційних цілей. Датчик вимірює наявність часток у повітрі, і його можна використовувати для оцінки якості повітря.

Якість повітря не є темою статті, ви можете дізнатися більше про це на веб-сайті ВООЗ: [Атмосферне (зовнішнє) забруднення повітря](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). Метою системи є публікація вимірювань датчика в мережу Robonomics від Airalab.

## Налаштування апаратного забезпечення

Ми підключаємо TXD PIN5 PMS3003 до IO17 ESP32 DevKitC для передачі вимірювань через UART.
Також обидва пристрої потребують живлення та спільної землі.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Схема підключення"} %}{% endroboWikiPicture %}

## Потік даних

Для передачі вимірювань датчика в мережу Robonomics на рівні вбудованого програмного забезпечення нашою метою є отримання даних від датчика за допомогою вбудованого протоколу зв'язку, який він підтримує (UART у нашому випадку) та передача їх до екземпляра AIRA через MQTT / TCP.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Надсилання"} %}{% endroboWikiPicture %}

У нашому прикладі ми використовуємо хмарне розгортання AIRA, доступне за допомогою публічної IP-адреси та призначеної доменної ​​назви.
На екземплярі AIRA ми налаштовуємо брокер MQTT `mosquitto` та підписуємося на `/freertos_mqtt_robonomics_example/98:F4`:AB:72:23:C4` тема для отримання повідомлень з MQTT.

Потім ми передаємо повідомлення до письменника `robonomics io` через канал.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Отримання"} %}{% endroboWikiPicture %}

Тепер дані доступні в мережі Robonomics і ми можемо знову їх прочитати за допомогою `robonomics io`.

## Прошивка

Ми використовуємо [зразок додатку ESP-MQTT з TCP-транспортом](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) як основу.

Ми лише модифікуємо `main/app_main.c` для з'єднання UART з датчиком, синхронізації часу SNTP та періодичного відправлення MQTT.

Якщо ви намагаєтеся повторити проект і це ваш перший проект на основі ESP IDF, спочатку будь ласка, дотримуйтесь [посібника з програмування ESP-IDF від Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step), щоб ознайомитися з операціями прошивки, такими як конфігурація, збірка та завантаження за допомогою інструменту `idf.py`.

### Налаштування Wi-Fi

Для зв'язку з екземпляром AIRA, розгорнутим у хмарі, нашому мікроконтролеру потрібне підключення до Інтернету.
Ми використовуємо Wi-Fi ESP32 для цього.
Espressif надає утиліти для налаштування вбудованого Wi-Fi.
У нашому прикладі ми використовуємо середовище розробки з Ubuntu 20.04 GNU/Linux.
Для налаштування Wi-Fi ми переходимо до теки проекту та запускаємо інструмент конфігурації SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Потім ми встановлюємо SSID та пароль точки доступу Wi-Fi в розділі `Example Connection Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Налаштування Wi-Fi"} %}{% endroboWikiPicture %}

### Налаштування кінцевої точки MQTT

Є дві речі, які потрібно налаштувати для MQTT.
Перше - це адреса брокера MQTT.
Це можна налаштувати за допомогою інструменту конфігурації SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Встановіть `URL брокера` в розділі `Example Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Налаштування MQTT"} %}{% endroboWikiPicture %}

Друге - це тема MQTT..
Ми встановлюємо його в прошивці з префіксом назви проекту, за яким слідує MAC-адреса нашого ESP32.
Для нашого конкретного мікросхеми ми отримуємо `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`.

## Від MQTT до Robonomics

Спочатку перевіримо, чи ми отримуємо дані через MQTT.
Ми можемо підписатися на тему пристрою, яка публікується на нашому брокері MQTT Mosquitto.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Тут ми вводимо пакет `mosquitto` в наше середовище, щоб використовувати утиліту `mosquitto_sub`.
Потім ми підписуємося на тему, встановлену в прошивці.
Ми отримали наші виміри, що означає, що AIRA правильно отримує дані через MQTT.
Тепер давайте направимо ці повідомлення в мережу Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Тут ми використовуємо утиліту `robonomics` для публікації повідомлень в каналі pubsub `/freertos_mqtt_robonomics_example`.
Ми вказуємо `bootnodes`, щоб забезпечити, що буде встановлено принаймні одне з'єднання.

Тепер ми читаємо ці повідомлення з того ж каналу pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Згенеровано випадковий ідентифікатор піра: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Підписано на тему: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Підписано на тему: /freertos_mqtt_robonomics_exampleomics_example
2021-03-27 15:15:56  Новий рівень підключений: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Додано мережеве посилання для рівня: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") у темі: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Використані початкові ресурси

* ESP32 DevKitC розпіновка від блогу GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Структура даних та декодер PSM3003 від OpenAirProject https://github.com/openairproject/sensor-esp32

**Дякуємо всім!**