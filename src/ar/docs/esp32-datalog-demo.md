---
title: كيفية إرسال Extrinsic من ESP32

contributors: [LoSk-p]
---

إرسال بيانات السجل الخارجي في شبكة Robonomics على ESP32 باستخدام [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). يمكنك العثور على كود العرض [هنا](https://github.com/LoSk-p/esp32-datalog-demo).

### المتطلبات

* Platformio core ([تعليمات التثبيت](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* أي عميل تسلسلي لنظام التشغيل الخاص بك (`tio` لنظام Linux، على سبيل المثال). يمكنك تثبيت `tio` باستخدام الأمر التالي
```bash
sudo apt install tio
```
### التثبيت
انسخ المستودع:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### التكوين
أنشئ ملف `Private.h` في مجلد `src` بالمحتوى التالي:
```
#pragma once

// قم بتعيين المفاتيح الحقيقية والعناوين بدلاً من القيم الوهمية
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
واملأه بمعلومات حساب Robonomics الخاص بك وشبكة WiFi. `PRIV_KEY` هو المفتاح الخاص لحساب Robonomics الخاص بك، `SS58_ADR` هو عنوانه.

{% roboWikiNote {type: "warning"}%} هذا العرض التوضيحي يعمل فقط لحسابات ED25519!
{% endroboWikiNote %}

للحصول على المفتاح الخاص من عبارة بذرة حسابك يمكنك استخدام البرنامج النصي [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py). قم بتشغيله واتبع التعليمات:
```bash
python3 get-private-key.py
```

### الرفع
قم بتوصيل ESP32 بالكمبيوتر باستخدام كابل USB وقم ببناء المشروع:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
سيقوم هذا الأمر ببناء ملفات ثنائية لـ esp ورفعها، لذا في النهاية سترى ما يلي
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

### التشغيل

بعد الرفع، قم بإعادة توصيل ESP بالكمبيوتر وتشغيل عميل Serial الخاص بك (مثل tio مع المنفذ `/dev/ttyACM0` في هذا المثال):
```bash
tio /dev/ttyACM0
```
واكتب النص لسجل Datalog الخارجي.

يمكنك معرفة المنفذ في السجلات بعد أمر `platformio run -t upload` في القسم السابق. ابحث عن شيء مثل هذا:
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```