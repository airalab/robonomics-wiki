---
title: Підключення датчика

contributors: [LoSk-p, makyul]
---

Приклад роботи можна переглянути у відео:

https://youtu.be/jsaFCVAx2sA

## Вимоги

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Адаптер Zigbee [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (або один з [підтриманих](https://www.zigbee2mqtt.io/information/supported_adapters.html))

Сервіс працює на Raspberry Pi та взаємодіє з розумною розеткою через протокол Zigbee.

## Адаптер Zigbee

Якщо у вас є JetHome USB JetStick Z2, він вже має необхідне програмне забезпечення, тому вам не потрібно його прошивати. Але якщо у вас є інший адаптер, спочатку вам потрібно прошити його за допомогою програмного забезпечення zigbee2MQTT. Інструкцію для вашого пристрою можна знайти [тут](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Підключіть адаптер та перевірте адресу адаптера (вона також може бути `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Можливо, вам знадобиться доступ до USB-порту. Додайте свого користувача до групи `dialout` (це працює для Ubuntu, але назва групи може відрізнятися в інших ОС).
Для Ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Для Arch:
```bash
sudo usermod -a -G uucp $USER
```
Потім вийдіть і зайдіть знову або перезапустіть комп'ютер.

## Встановлення

Клонуйте репозиторій:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Налаштування

Перейдіть до `data/configuration.yaml` та встановіть `permit_join: true`:

```
# Інтеграція з Home Assistant (MQTT discovery)
homeassistant: false

# дозволити новим пристроям приєднуватися
permit_join: true

# Налаштування MQTT
mqtt:
  # Базова тема MQTT для повідомлень zigbee2mqtt MQTT
  base_topic: zigbee2mqtt
  # URL сервера MQTT
  server: 'mqtt://172.17.0.1'
  # Аутентифікація на сервері MQTT, розкоментуйте, якщо потрібно:
  # user: my_user
  # password: my_password

# Налаштування Serial
serial:
  # Розташування CC2531 USB сніфера
  port: /dev/ttyUSB0
```
Також ви можете заповнити поля `server` та `port` відповідною інформацією. У полі `server` використовуйте IP адресу моста `docker0` для встановлення з'єднання:

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

Потім створіть файл config/config.yaml з наступною інформацією та встановіть своє місцезнаходження (ви можете звернутися до https://countrycode.org/ за 3-літерним ISO-кодом):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Підключення розетки

Спочатку запустіть:

```
docker-compose up     
```

Щоб перейти в режим парування на розетці, утримуйте кнопку живлення протягом кількох секунд, поки світлодіод не почне швидко мигати синім кольором.

У журналах ви повинні побачити, що ваша розетка почала публікувати в MQTT.

## Після парування

Якщо ви не хочете дозволяти іншим пристроям паруватися з вашим адаптером, зараз вам слід перейти до `data/configuration.yaml` та встановити `permit_join: false`. Перезапустіть сервіс (використовуйте 'Ctrl+C' та

```bash
docker-compose up     
```
ще раз, щоб зберегти зміни).

## Запуск
При першому запуску буде створено обліковий запис для розетки.
> Якщо у вас вже є обліковий запис, вам слід додати його seed до файлу `config.config.yaml` в розділі `device_seed`:
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
plug               | Згенеровано обліковий запис з адресою: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Вам потрібно переказати деякі токени на цей обліковий запис для оплати транзакцій, ви можете зробити це на [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts).

Сервіс побачить, що у вас достатньо токенів, у журналах ви побачите:
```
plug               | Баланс в порядку
```
Сервіс буде бачити повідомлення MQTT від розетки та зберігати використання електроенергії. Кожну годину (ви можете змінити таймаут в `config/config.yaml` в розділі `sending_timeout`, таймаут в секундах) він створить журнал даних з наступною інформацією:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```