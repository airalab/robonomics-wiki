---
title: توصيل الاستشعار

contributors: [LoSk-p, makyul]
---

مثال على العمل موجود في الفيديو:

https://youtu.be/jsaFCVAx2sA

## المتطلبات

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (أو واحدة من [مدعومة](https://www.zigbee2mqtt.io/information/supported_adapters.html))

الخدمة تعمل على Raspberry Pi وتتصل بالمقبس الذكي عبر بروتوكول zigbee.

## عصا Zigbee

If you have JetHome USB JetStick Z2 it already has necessary firmware so you don't need to flash it. But if you have another adapter firstly you need to flash it with zigbee2MQTT software. You can find instructions for you device [هنا](https://www.zigbee2mqtt.io/information/supported_adapters.html).

قم بتوصيل المحول وتحقق من عنوان المحول (قد يكون أيضًا `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

قد تحتاج إلى الوصول إلى منفذ USB أولاً. أضف مستخدمك إلى مجموعة `dialout` (يعمل في أوبونتو، ولكن اسم المجموعة قد يكون مختلفًا في نظام التشغيل الآخر).
بالنسبة لأوبونتو:
```bash
sudo usermod -a -G dialout $USER
```
بالنسبة لـ arch:
```bash
sudo usermod -a -G uucp $USER
```
ثم قم بتسجيل الخروج وتسجيل الدخول أو إعادة تشغيل الكمبيوتر.

## التثبيت

استنسخ المستودع:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## التكوين

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
قد ترغب أيضًا في ملء الحقلين "الخادم" و"المنفذ" بالمعلومات المقابلة. في حقل "الخادم"، استخدم عنوان IP الخاص بجسر "docker0" لتأسيس الاتصال:

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

ثم قم بإنشاء ملف config/config.yaml بالمعلومات التالية وقم بتعيين موقعك (يمكنك الاطلاع على https://countrycode.org/ للحصول على رمز ISO المكون من 3 أحرف):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## توصيل المقبس

التشغيل الأول:

```
docker-compose up     
```

للتبديل إلى وضع الزوجية على المقبس، اضغط على زر الطاقة لبضع ثوان حتى يبدأ الضوء في الوميض باللون الأزرق بسرعة. 

في السجلات يجب أن ترى الآن أن المقبس الخاص بك بدأ بنشر إلى mqtt. 


## بعد الزوية

إذا كنت لا تسمح للأجهزة الأخرى بالاقتران بجهازك، فيجب عليك الآن الانتقال إلى "data/configuration.yaml" وتعيين "permit_join: false". أعد تشغيل الخدمة (استخدم `Ctrl+C` و

```bash
docker-compose up     
```
مرة أخرى لتقديم التغييرات).

## التشغيل
عند بدء التشغيل الأول سيتم إنشاء حساب للمقبس. 
> إذا كان لديك بالفعل حساب يجب عليك إضافة بذرته إلى ملف `config.config.yaml` في قسم `device_seed`:
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

بعد إنشاء الحساب سترى العنوان في السجلات (سيتم إضافة البذرة إلى `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
تحتاج إلى نقل بعض الرموز إلى هذا الحساب لرسوم المعاملات، يمكنك القيام بذلك على [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

سيعرف الخدمة أن لديك رموز كافية، في السجلات سترى:
```
plug               | Balance is OK
```
سيعرف الخدمة رسائل mqtt من المقبس واستخدام الطاقة بأمان. كل ساعة (يمكنك تغيير الوقت المحدد في `config/config.yaml` في قسم `sending_timeout`، الوقت المحدد بالثواني) ستقوم بإنشاء سجل بيانات يحتوي على المعلومات التالية:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
