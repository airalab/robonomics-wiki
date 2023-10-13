---
title: محول Zigbee مع Zigbee2MQTT لصورة مثبتة مسبقًا

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**في هذه المقالة ستقوم بإقران الأجهزة الذكية.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

افتح متصفح الويب وانتقل إلى `http://%RASPBERRY_IP_ADDRESS%:8099`. يمكنك العثور على عنوان IP لجهاز Raspberry Pi باستخدا [تطبيق Fing المحمول](https://www.fing.com/products) أو [أداة سطر الأوامر nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

سترى واجهة الويب لـ Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




حان الوقت لربط جهازك الذكي. 
أولاً ، اضغط على زر `Permit join (All)` في أعلى واجهة الويب لـ Zigbee2MQTT. 

ثم ، ابدأ في إقران الأجهزة. أكثر طريقة شائعة لتبديل جهاز إلى وضع الاتصال هو الاستمرار في الضغط على زر الطاقة أو تشغيلها / إيقاف تشغيلها 5 مرات. تأكد من تشغيل Zigbee2MQTT.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

عندما يتصل الجهاز ، ستراه في واجهة الويب:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

الآن يجب أن ترى هذا الاستشعار في واجهة Home Assistant WebUI الخاصة بك. انتقل إلى `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

بعد إضافة جميع الاستشعارات ، يمكنك إغلاق واجهة الويب لـ Zigbee2MQTT.
