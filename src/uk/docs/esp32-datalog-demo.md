---
title: Як надіслати екструзію з ESP32

contributors: [LoSk-p]
---

Надсилайте екструзію даних в мережу Robonomics на ESP32 за допомогою [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). Код демонстрації можна знайти [тут](https://github.com/LoSk-p/esp32-datalog-demo).

### Вимоги

* Ядро Platformio ([інструкція з встановлення](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Будь-який послідовний клієнт для вашої ОС (`tio` для Linux, наприклад). Ви можете встановити `tio` за допомогою наступної команди
```bash
sudo apt install tio
```
### Встановлення
Клонуйте репозиторій:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Налаштування
Створіть файл `Private.h` у папці `src` з наступним вмістом:
```
#pragma once

// Встановіть реальні ключі та адреси замість фіктивних значень
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
і заповніть його інформацією про ваш обліковий запис Robonomics та мережу WiFi. `PRIV_KEY` - це приватний ключ вашого облікового запису Robonomics, `SS58_ADR` - його адреса.

{% roboWikiNote {type: "warning"}%} Ця демонстрація працює лише для облікових записів ED25519!
{% endroboWikiNote %}

Щоб отримати приватний ключ з фрази-зерна вашого облікового запису, ви можете використати скрипт [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py). Просто запустіть його та дотримуйтесь інструкцій:
```bash
python3 get-private-key.py
```

### Завантаження
Підключіть ESP32 до комп'ютера за допомогою USB-кабелю та зіберіть проект:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
Ця команда зібере бінарні файли для esp та завантажить їх, тому в кінці ви побачите наступне:
```
Writing at 0x000b9def... (84 %)
Writing at 0x000bf4c2... (87 %)
Writing at 0x000c56bf... (90 %)
Writing at 0x000cc6df... (93 %)
Writing at 0x000d1dec... (96 %)
Writing at 0x000d71b0... (100 %)
Wrote 836160 bytes (538555 compressed) at 0x00010000 in 12.2 seconds (effective 548.7 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
=========================== [SUCCESS] Took 24.08 seconds ===========================
```

### Запуск

Після завантаження повторно підключіть ESP до комп'ютера та запустіть ваш послідовний клієнт (наприклад, tio з портом `/dev/ttyACM0` у цьому прикладі):
```bash
tio /dev/ttyACM0
```
І введіть текст для екструзії запису даних.

Після виконання команди `platformio run -t upload` у попередньому розділі ви можете знайти порт у журналах. Шукайте щось на зразок:
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```