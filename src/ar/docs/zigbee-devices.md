---
title: أجهزة Zigbee في Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt/

---

**إذا أدخلت جهاز ZigBee coordinator أثناء عملية التثبيت، يمكنك إضافة أجهزة ZigBee إلى منزلك الذكي. ستشرح هذه المقالة كيفية القيام بذلك.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## جهاز الإقران

افتح متصفح الويب وانتقل إلى `http://%PC_IP_ADDRESS%:8099`. يمكنك العثور على عنوان IP لجهاز Raspberry Pi باستخدام [تطبيق Fing المحمول](https://www.fing.com/products) أو [أداة nmap CLI](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). إذا قمت بإعداد كل شيء على جهاز الكمبيوتر الشخصي الخاص بك، استخدم `http://localhost:8099`.

سترى واجهة الويب لـ Zigbee2MQTT:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


حان الوقت لربط جهازك الذكي.
أولاً، اضغط على زر `Permit join (All)` في أعلى واجهة الويب لـ Zigbee2MQTT.

ثم، ابدأ في إقران الأجهزة. أكثر الطرق شيوعًا لتبديل جهاز إلى وضع الاتصال هو الضغط على زر الطاقة الخاص به أو تشغيله/إيقافه 5 مرات. تأكد من أن Zigbee2MQTT يعمل.

عندما يتم الاتصال بالجهاز، ستراهم في واجهة الويب:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

الآن يجب أن ترى هذا المستشعر في واجهة مستخدم Home Assistant الخاصة بك. اذهب إلى `Settings` -> `Devices & Services` -> `Devices`.

بعد إضافة جميع المستشعرات، يمكنك إغلاق واجهة الويب لـ Zigbee2MQTT.
