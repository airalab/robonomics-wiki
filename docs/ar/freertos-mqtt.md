---
title: توصيل جهاز Amazon FreeRTOS بـ Robonomics عبر MQTT

contributors: [khssnv]
---

إليك العرض التوضيحي لكيفية توصيل الميكروكنترولر الذي يعمل بنظام [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) بشبكة Robonomics عبر MQTT. يرجى التحقق من [هذا المستودع](http://github.com/khssnv/freertos_mqtt_robonomics_example) للحصول على مصدر المشروع.

نحن نستخدم [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) مع توزيعة FreeRTOS وتنفيذ MQTT المقدمة من [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) حيث تعد Espressif بائعًا للميكروكنترولر المستخدم.

هناك أيضًا مستشعر [PMS-3003](http://www.plantower.com/en/content/?107.html) لأغراض التوضيح. يقيس المستشعر وجود المواد الجسيمية في الهواء ويمكن للشخص استخدامه لتقدير جودة الهواء.

جودة الهواء ليست موضوع المقالة، يمكنك العثور على المزيد حولها على موقع منظمة الصحة العالمية: [تلوث الهواء البيئي (في الهواء الطلق)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). هدف النظام هو نشر قياسات المستشعر إلى شبكة Robonomics التابعة لـ Airalab.

## إعداد الأجهزة

نقوم بتوصيل PMS3003 TXD PIN5 بـ ESP32 DevKitC IO17 لنقل القياسات عبر UART.
كما يتطلب كلا الجهازين طاقة وأرضية مشتركة.

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## تدفق البيانات

من أجل تسليم قياسات المستشعر إلى شبكة Robonomics، هدفنا على مستوى البرامج الثابتة هو الحصول على البيانات من المستشعر عن طريق بروتوكول الاتصال المضمن الذي يدعمه (UART في حالتنا) وتمريرها إلى مثيل AIRA عن طريق MQTT / TCP.

![Sending](../images/freertos-mqtt/send.svg)

في مثالنا، نستخدم نسخة AIRA المستضافة في السحابة والتي تتوفر عن طريق عنوان IP العام واسم النطاق المعين.
في مثيل AIRA، نقوم بإعداد وسيط MQTT `mosquitto` والاشتراك في موضوع `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` للحصول على رسائل من MQTT.

ثم نمرر الرسائل إلى كاتب `robonomics io` عن طريق الأنبوب.

![Receiving](../images/freertos-mqtt/recv.svg)

الآن البيانات متاحة في شبكة Robonomics ويمكننا قراءتها مرة أخرى باستخدام `robonomics io`.

## البرامج الثابتة

نستخدم [تطبيق عينة ESP-MQTT مع نقل TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) كأساس.

نقوم فقط بتعديل `main/app_main.c` للاتصال بالمستشعر عبر UART، ومزامنة الوقت باستخدام SNTP وروتين الناشر المنتظم لبروتوكول MQTT.

إذا كنت تحاول تكرار المشروع، وهو أول مشروع قائم على ESP IDF، يرجى اتباع [دليل برمجة ESP-IDF من Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) في البداية للتعرف على عمليات البرامج الثابتة مثل التكوين والبناء والتحميل باستخدام أداة `idf.py`.

### Wi-Fi التكوين

من أجل التواصل مع مثيل AIRA المنتشر في السحابة، يحتاج الميكروكنترولر الخاص بنا إلى اتصال بالإنترنت.
نستخدم Wi-Fi ESP32 لذلك.
توفر Espressif أدوات لتكوين Wi-Fi المدمجة.
في مثالنا، نستخدم بيئة التطوير مع نظام التشغيل Ubuntu 20.04 GNU/Linux.
لتكوين Wi-Fi، نذهب إلى مجلد المشروع ونقوم بتشغيل أداة تكوين SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

ثم نقوم بتعيين SSID وكلمة مرور نقطة الوصول لشبكة Wi-Fi في قسم `Example الاتصالion التكوين`.

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### تكوين نقطة النهاية MQTT

هناك شيئين يجب تكوينهما لبروتوكول MQTT.
الأول هو عنوان وسيط MQTT.
يمكن تكوينه باستخدام أداة تكوين SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

قم بتعيين `عنوان الوسيط` في قسم `Example التكوين`.

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

الشيء الثاني هو موضوع MQTT.
نقوم بتعيينه في البرامج الثابتة مع بادئة اسم المشروع تليها عنوان MAC لـ ESP32 الخاص بنا.
يعطينا `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` للشريحة الدقيقة الخاصة بنا.

## من MQTT إلى Robonomics

في البداية، دعنا نتحقق مما إذا كنا نستلم البيانات عبر MQTT.
يمكننا الاشتراك في موضوع وسيط MQTT Mosquitto الخاص بنا لجهاز النشر.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

هنا نقوم بجلب حزمة `mosquitto` إلى بيئتنا لاستخدام أداة `mosquitto_sub`.
ثم نشترك في الموضوع المحدد في البرمجيات الثابتة.
حصلنا على قياساتنا مما يعني أن AIRA يستلم البيانات عبر MQTT بشكل صحيح.
الآن دعونا نوجه هذه الرسائل إلى شبكة Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

هنا نستخدم أداة `robonomics` لنشر الرسائل في قناة النشر والاشتراك `/freertos_mqtt_robonomics_example`.
نحدد `bootnodes` لضمان إنشاء اتصال واحد على الأقل.

الآن نحن نقرأ هذه الرسائل من نفس قناة النشر والاشتراك.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## الموارد الأصلية المستخدمة

* توصيلات ESP32 DevKitC من مدونة GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* هيكل البيانات وفك التشفير PSM3003 من مشروع OpenAirProject https://github.com/openairproject/sensor-esp32

**شكراً لكم جميعاً!**
