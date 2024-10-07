---
title: توصيل الجهاز الاستشعار

contributors: [LoSk-p, makyul]
---

مثال على العمل موجود في الفيديو:

https://youtu.be/jsaFCVAx2sA

## المتطلبات

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* محول Zigbee [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (أو أحد الأجهزة المدعومة [هنا](https://www.zigbee2mqtt.io/information/supported_adapters.html))

الخدمة تعمل على Raspberry Pi وتتصل بالمقبس الذكي عبر بروتوكول zigbee.

## محول Zigbee

إذا كان لديك JetHome USB JetStick Z2، فإنه يحتوي بالفعل على البرنامج الثابت اللازم، لذا لا داعي لتفليشه. ولكن إذا كان لديك محول آخر، فيجب عليك أولاً تفليشه ببرنامج zigbee2MQTT. يمكنك العثور على تعليمات لجهازك [هنا](https://www.zigbee2mqtt.io/information/supported_adapters.html).

قم بتوصيل المحول وتحقق من عنوان المحول (قد يكون `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

قد تحتاج إلى الحصول على وصول إلى منفذ USB أولاً. أضف مستخدمك إلى مجموعة `dialout` (يعمل لنظام التشغيل أوبونتو، ولكن اسم المجموعة قد يكون مختلفًا في أنظمة التشغيل الأخرى).
لأوبونتو:
```bash
sudo usermod -a -G dialout $USER
```
لأرش:
```bash
sudo usermod -a -G uucp $USER
```
ثم قم بتسجيل الخروج وتسجيل الدخول أو إعادة تشغيل الكمبيوتر.

## التثبيت

انسخ المستودع:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## الضبط

انتقل إلى `data/configuration.yaml` وقم بتعيين `permit_join: true`:

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
قد ترغب أيضًا في ملء الحقول `server` و `port` بالمعلومات المقابلة. في الحقل `server`، استخدم عنوان IP لجسر `docker0` لإقامة الاتصال:

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
هنا عنوانك هو `172.17.0.1`.

ثم قم بإنشاء ملف config/config.yaml بالمعلومات التالية وقم بتعيين موقعك (يمكنك الرجوع إلى https://countrycode.org/ للحصول على رمز ISO المكون من 3 أحرف):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## توصيل المقبس

قم أولاً بتشغيل:

```
docker-compose up     
```

للتبديل إلى وضع الإقران على المقبس، اضغط على زر الطاقة لبضع ثوانٍ حتى يبدأ الضوء في الوميض بلون أزرق بسرعة.

في السجلات، يجب أن ترى الآن أن المقبس الخاص بك بدأ بنشر إلى mqtt.

## بعد الإقران

إذا كنت لا ترغب في السماح لأجهزة أخرى بالإقران مع محولك، يجب عليك الآن الانتقال إلى `data/configuration.yaml` وتعيين `permit_join: false`. أعد تشغيل الخدمة (استخدم 'Ctrl+C' و

```bash
docker-compose up     
```
مرة أخرى لتطبيق التغييرات).

## التشغيل
عند بدء التشغيل الأول، سيتم إنشاء حساب للمقبس.
> إذا كان لديك بالفعل حساب، يجب عليك إضافة بذرته إلى ملف `config.config.yaml` في قسم `device_seed`:
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

بعد إنشاء الحساب، سترى العنوان في السجلات (سيتم إضافة البذرة إلى `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
يجب عليك تحويل بعض الرموز إلى هذا الحساب لرسوم المعاملات، يمكنك القيام بذلك على [بوابة Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts).

سيقوم الخدمة برؤية أن لديك رصيد كافٍ، في السجلات سترى:
```
plug               | Balance is OK
```
سترى الخدمة رسائل mqtt من المقبس وتوفير استخدام الطاقة. كل ساعة (يمكنك تغيير الوقت المحدد في `config/config.yaml` في قسم `sending_timeout`، الوقت المحدد بالثواني) ستنشئ سجل بالمعلومات التالية:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```