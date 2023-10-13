---
title: Підключити датчик

contributors: [LoSk-p, makyul]
---

Приклад роботи є у відео:

https://youtu.be/jsaFCVAx2sA

## Вимоги

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (або один з [підтримуваних](https://www.zigbee2mqtt.io/вformation/підтримуваних_adapters.html))

Service is runnвg on Raspberry Pi і contact the smart plug via zigbee protocol.

## Zigbee-приймач

Якщо у вас є JetHome USB JetStick Z2, він вже має необхідне прошивання, тому вам не потрібно його перепрошивати. Але якщо у вас є інший адаптер, спочатку вам потрібно перепрошитати його за допомогою програмного забезпечення zigbee2MQTT. Інструкції для вашого пристрою ви можете знайти [тут](https://www.zigbee2mqtt.io/вformation/підтримуваних_adapters.html).

Підключіть адаптер та перевірте адресу адаптера (вона також може бути `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Можливо, спочатку потрібно отримати доступ до порту USB. Додайте свого користувача до `dialout` групою (це працює для Ubuntu, але назва групи може бути іншою в інших ОС).
Для Ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Для Arch:
```bash
sudo usermod -a -G uucp $USER
```
Потім вийдіть з системи та увійдіть знову або перезавантажте комп'ютер.

## Установка

Клонуйте репозиторій:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Конфігурація

Перейдіть до `data/configuration.yaml` та встановіть `permit_join: true`:

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
Також ви можете заповнити поля `server` і `port` з відповідною інформацією. У полі `server` використовуйте IP-адресу `docker0` моста для встановлення з'єднання: 

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
Тут ваша адреса - `172.17.0.1`.

Потім створіть файл config/config.yaml з наступною інформацією та встановіть своє місцезнаходження (ви можете переглянути його на https://countrycode.org/ за 3-літерним ISO-кодом):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Підключіть розетку

Перший запуск:

```
docker-compose up     
```

Щоб переключитися в режим сполучення на розетці довго а потім у спливаючому вікні дозвольте розширенню це зробити кнопку живлення протягом кількох секунд, доки індикатор не почне швидко блимати синім.

У журналах ви повинні побачити, що ваш плагін почав публікувати в mqtt.

## Після парування

Якщо ви не хочете дозволяти іншим пристроям паруватися з вашим приймачем, зараз вам слід перейти до `data/configuration.yaml` та встановіть `permit_join: false`. Restart service (use 'Ctrl+C' і 

```bash
docker-compose up     
```
ще раз, щоб зберегти зміни).

## Запуск
При першому запуску буде створено обліковий запис для розетки. 
> If you already have an account you should add its seed to `config.config.yaml` file in `device_seed` section:
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

Після створення облікового запису ви побачите адресу в журналах (seed буде додано до `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Вам потрібно перекласти деякі токени на цей обліковий запис для комісій за транзакції, ви можете зробити це на [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

Сервіс побачить, що у вас достатньо токенів, в журналах ви побачите:
```
plug               | Balance is OK
```
Сервіс буде бачити mqtt-повідомлення від розетки та забезпечувати безпечне використання електроенергії. Кожну годину (ви можете змінити таймаут у розділі `config/config.yaml` in `sending_timeout` секундах) він створюватиме журнал даних з наступною інформацією:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
