---
title: ربط جهاز Amazon FreeRTOS بـ Robonomics عبر MQTT

contributors: [khssnv]
---

هنا توضيح لكيفية ربط متحكم صغير يعمل بنظام [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) بشبكة Robonomics عبر MQTT. يرجى التحقق من [هذا المستودع](http://github.com/khssnv/freertos_mqtt_robonomics_example) للحصول على مصدر المشروع.

نحن نستخدم [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) مع توزيعة FreeRTOS وتنفيذ MQTT المقدم من قبل [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) حيث تعتبر Espressif موردًا للمتحكم الصغير المستخدم.

هناك أيضًا جهاز استشعار [PMS-3003](http://www.plantower.com/en/content/?107.html) لأغراض العرض. يقيس الجهاز الاستشعار وجود المواد الجزيئية في الهواء ويمكن للشخص استخدامه لتقدير جودة الهواء.

جودة الهواء ليست موضوع المقال، يمكنك العثور على مزيد من المعلومات حولها على موقع منظمة الصحة العالمية: [تلوث الهواء البيئي (الخارجي)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). هدف النظام هو نشر قياسات الجهاز الاستشعاري إلى شبكة Robonomics التابعة لـ Airalab.

## إعداد الأجهزة

نقوم بتوصيل PMS3003 TXD PIN5 بـ ESP32 DevKitC IO17 لنقل القياسات عبر UART.
كما يتطلب كل من الجهازين توصيل الطاقة والأرضية المشتركة.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"مخطط الأسلاك"} %}{% endroboWikiPicture %}

## تدفق البيانات

من أجل تسليم قياسات الجهاز الاستشعاري إلى شبكة Robonomics، يكون هدفنا على مستوى البرنامج الثابت هو الحصول على البيانات من جهاز استشعار عبر بروتوكول الاتصال المضمن الذي يدعمه (UART في حالتنا) وتمريرها إلى مثيل AIRA عبر MQTT / TCP.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"الإرسال"} %}{% endroboWikiPicture %}

في مثالنا، نستخدم نسخة سحابية من AIRA متاحة عبر عنوان IP عام واسم نطاق معين.
على مثيل AIRA، نقوم بإعداد وسيط MQTT `mosquitto` والاشتراك في `/freertos_mqtt_robonomics_example/98:F4`:AB:72:23:C4` موضوع للحصول على الرسائل من MQTT.

ثم نمرر الرسائل إلى كاتب `robonomics io` بواسطة الأنبوب.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Receiving"} %}{% endroboWikiPicture %}

الآن البيانات متاحة في شبكة Robonomics ويمكننا قراءتها مرة أخرى باستخدام `robonomics io`.

## البرنامج الثابت

نحن نستخدم [تطبيق عينة ESP-MQTT مع نقل TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) كأساس.

نقوم فقط بتعديل `main/app_main.c` لاتصال UART بالمستشعر، ومزامنة الوقت SNTP وروتين الناشر MQTT الدوري.

إذا كنت تحاول تكرار المشروع، وهو مشروعك الأول القائم على ESP IDF، يرجى في البداية اتباع [دليل برمجة Espressif's ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) لتعرف على عمليات البرنامج الثابت مثل التكوين، والبناء، والتحميل باستخدام أداة `idf.py`.

### تكوين الواي فاي

من أجل التواصل مع نسخة AIRA المنشأة في السحابة، يتطلب المتحكم الدقيق لدينا اتصالًا بالإنترنت.
نحن نستخدم واي فاي ESP32 لذلك.
توفر Espressif أدوات لتكوين واي فاي المدمج.
في مثالنا، نستخدم بيئة تطوير مع Ubuntu 20.04 GNU/Linux.
لتكوين الواي فاي، ننتقل إلى مجلد المشروع ونشغل أداة تكوين SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

ثم نقوم بتعيين اسم شبكة الواي فاي وكلمة المرور في قسم `Example Connection Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Menuconfig Wi-Fi"} %}{% endroboWikiPicture %}

### تكوين نقطة نهاية MQTT

هناك شيئان يجب تكوينهما لـ MQTT.
الأول هو عنوان وسيط MQTT.
يمكن تكوينه باستخدام أداة تكوين SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

قم بتعيين `عنوان الوسيط` في قسم `Example Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Menuconfig MQTT"} %}{% endroboWikiPicture %}

الشيء الثاني هو موضوع MQTT.
تم تعيينه في البرنامج الثابت باسم المشروع متبوعًا بعنوان MAC لجهاز ESP32 الخاص بنا.
يعطينا `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` لرقاقتنا الدقيقة الخاصة.

## من MQTT إلى Robonomics

أولاً دعنا نتحقق من استلام البيانات عبر MQTT.
يمكننا الاشتراك في موضوع النشر الخاص بجهازنا في وسيط MQTT Mosquitto.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

هنا نقوم بجلب حزمة `mosquitto` إلى بيئتنا لاستخدام أداة `mosquitto_sub`.
ثم نشترك في الموضوع المعين في البرنامج الثابت.
لقد حصلنا على قياساتنا مما يعني أن AIRA تستلم البيانات عبر MQTT بشكل صحيح.
الآن دعنا نوجه هذه الرسائل إلى شبكة Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

هنا نستخدم أداة `robonomics` لنشر الرسائل في قناة النشر `/freertos_mqtt_robonomics_example`.
نحدد `bootnodes` لضمان تأسيس اتصال واحد على الأقل.

الآن نقوم بقراءة هذه الرسائل من نفس القناة العامة.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  تم توصيل نظير جديد: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: تمت إضافة رابط الشبكة للنظير: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") في الموضوع: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## الموارد الأصلية المستخدمة

* تعريف دبوس ESP32 DevKitC من مدونة GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* هيكل البيانات وفك تشفير PSM3003 من مشروع OpenAirProject https://github.com/openairproject/sensor-esp32

**شكرًا للجميع!**