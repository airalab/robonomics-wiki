---
title: Как отправить экструзию с ESP32

contributors: [LoSk-p]
---

Отправьте экструзию Datalog в сеть Robonomics на ESP32, используя [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). Код демонстрации вы можете найти [здесь](https://github.com/LoSk-p/esp32-datalog-demo).

### Требования

* Ядро Platformio ([инструкции по установке](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Любой последовательный клиент для вашей ОС (`tio` для Linux, например). Вы можете установить `tio` с помощью следующей команды
```bash
sudo apt install tio
```
### Установка
Клонируйте репозиторий:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Настройка
Создайте файл `Private.h` в папке `src` со следующим содержимым:
```
#pragma once

// Установите реальные ключи и адреса вместо фиктивных значений
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
и заполните его информацией о вашей учетной записи Robonomics и сети WiFi. `PRIV_KEY` - это приватный ключ вашей учетной записи Robonomics, `SS58_ADR` - это ее адрес.

{% roboWikiNote {type: "warning"}%} Эта демонстрация работает только для учетных записей ED25519!
{% endroboWikiNote %}

Чтобы получить приватный ключ из фразы-семени вашей учетной записи, вы можете использовать скрипт [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py). Просто запустите его и следуйте инструкциям:
```bash
python3 get-private-key.py
```

### Загрузка
Подключите ESP32 к компьютеру с помощью USB-кабеля и соберите проект:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
Эта команда создаст двоичные файлы для esp и загрузит их, поэтому в конце вы увидите следующее:
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

После загрузки переподключите ESP к компьютеру и запустите ваш последовательный клиент (например, tio с портом `/dev/ttyACM0` в этом примере):
```bash
tio /dev/ttyACM0
```
И введите текст для экструзии записи Datalog.

Порт можно найти в журналах после выполнения команды `platformio run -t upload` в предыдущем разделе. Ищите что-то вроде:
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```