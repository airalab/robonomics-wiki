---
title: إعداد البينياتا

contributors: [tubleronchik, LoSk-p]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**يوجهك هذا المقال خلال عملية تكوين [بينياتا](https://www.pinata.cloud/) لتعليق الملفات من تكامل روبونوميكس. يعزز هذا العمل إمكانية الوصول إلى ملفات النسخ الاحتياطي والتلميح.**

لتتمكن من تعليق ملفاتك على بينياتا، يجب عليك أولاً إنشاء حساب. ثم، انتقل إلى قسم `مفاتيح API` وأنشئ مفتاحًا جديدًا بالصلاحيات التالية:

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

ثم، انسخ `مفتاح API` و`السر الخاص بالـ API` واحتفظ بها بشكل خاص.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

إذا كنت قد قمت بإعداد تكامل روبونوميكس بالفعل، انتقل إلى `الإعدادات` -> `الأجهزة والخدمات` واضغط على `تكوين` في تكامل روبونوميكس. أدخل بيانات الدخول الخاصة بك لبينياتا.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}