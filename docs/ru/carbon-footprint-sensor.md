---
title: Подключите датчик

contributors: [LoSk-p, makyul]
---

Пример работы есть в видео:

https://youtu.be/jsaFCVAx2sA

## Требования

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Адаптер Zigbee [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (или один из [поддерживаемых](https://www.zigbee2mqtt.io/information/supported_adapters.html))

Сервис работает на Raspberry Pi и связывается со смарт-розеткой через протокол Zigbee.

## Адаптер Zigbee

Если у вас есть JetHome USB JetStick Z2, он уже имеет необходимое программное обеспечение, поэтому вам не нужно его прошивать. Но если у вас есть другой адаптер, сначала вам нужно прошить его с помощью программного обеспечения zigbee2MQTT. Инструкции для вашего устройства можно найти [здесь](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Подключите адаптер и проверьте адрес адаптера (он также может быть `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Возможно, вам потребуется получить доступ к USB-порту. Добавьте своего пользователя в группу `dialout` (это работает для Ubuntu, но имя группы может отличаться в других ОС).
Для Ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Для Arch:
```bash
sudo usermod -a -G uucp $USER
```
Затем выйдите из системы и войдите снова или перезагрузите компьютер.

## Установка

Клонируйте репозиторий:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Конфигурация

Перейдите в `data/configuration.yaml` и установите `permit_join: true`:

```
# Home Assistant integration (MQTT discovery)
homeassistant: false

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://172.17.0.1'
  # MQTT server authentication, uncomment if required:
  # user: my_user
  # password: my_password

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/ttyUSB0
```
Также вы можете заполнить поля `server` и `port` соответствующей информацией. В поле `server` используйте IP-адрес моста `docker0` для установления соединения: 

```bash
$ ip a                                                 127
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

...

5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:dff:feff:5fa3/64 scope link 
       valid_lft forever preferred_lft forever
```
Здесь ваш адрес - `172.17.0.1`.

Затем создайте файл config/config.yaml со следующей информацией и установите свое местоположение (вы можете посмотреть на https://countrycode.org/ для 3-буквенного ISO-кода):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Подключите розетку

Первый запуск:

```
docker-compose up     
```

Чтобы перейти в режим сопряжения с розеткой, удерживайте кнопку питания в течение нескольких секунд, пока не начнет быстро мигать синий свет. 

В журналах вы должны увидеть, что ваша розетка начала публиковаться в mqtt. 


## После сопряжения

Если вы не хотите разрешить другим устройствам сопрягаться с вашим адаптером, теперь вы должны перейти в `data/configuration.yaml` и установить `permit_join: false`. Перезапустите сервис (используйте 'Ctrl+C' и 

```bash
docker-compose up     
```
еще раз, чтобы применить изменения).

## Запуск
При первом запуске будет создан аккаунт для розетки. 
> Если у вас уже есть аккаунт, вы должны добавить его сид в файл `config.config.yaml` в разделе `device_seed`:
>
> ```
> location: RUS
> service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
> twin_id: 5
> sending_timeout: 3600
> broker_address: "172.17.0.1"
> broker_port: 1883
> device_seed: <device_seed>
>```

После создания аккаунта вы увидите адрес в журналах (сид будет добавлен в `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Вам нужно перевести некоторые токены на этот аккаунт для оплаты комиссии за транзакции, вы можете сделать это на [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

Сервис увидит, что у вас достаточно токенов, в журналах вы увидите:
```
plug               | Balance is OK
```
Сервис увидит mqtt-сообщения от розетки и обеспечит безопасное использование электроэнергии. Каждый час (вы можете изменить таймаут в `config/config.yaml` в разделе `sending_timeout`, таймаут указывается в секундах) будет создан журнал данных со следующей информацией:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
