---
title: إعداد تكامل Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**في هذا المقال، ستقوم بإضافة Robonomics إلى Home Assistant. وهذا يتيح لـ Home Assistant تسجيل سجلات بيانات مع بيانات مشفرة إلى Robonomics Parachain والاستماع إلى أوامر الإطلاق من الباراشين للتحكم في الأجهزة الذكية. يستخدم التكامل IPFS لتخزين البيانات وإرسال تجزئات IPFS إلى وظائف السجلات البيانية أو الإطلاق.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. في واجهة Home Assistant على الويب، انتقل إلى `الإعدادات` -> `الجهاز والخدمات` واضغط على `إضافة تكامل`. ابحث عن `Robonomics`.

2. انقر على Robonomics واملأ الإعدادات:

- أضف البذرة من حساب `SUB_CONTROLLER` إلى بذرة حساب المتحكم.
- أضف عنوان العام الخاص بحساب `SUB_OWNER` إلى عنوان مالك الاشتراك.
- حدد فترة إرسال البيانات (افتراضيًا هي 10 دقائق).
- (اختياري) يمكنك إضافة بيانات اعتماد لخدمة التعليق Pinata أو بوابة مخصصة أخرى لنشر بياناتك بشكل أوسع عبر شبكة IPFS.

{% roboWikiNote {title:"ملاحظة", type: "ملاحظة"}%} في [قسم إعداد Pinata](/docs/pinata-setup) يمكنك العثور على معلومات أكثر تفصيلاً حول استخدام Pinata.{% endroboWikiNote %}

3. اضغط على `إرسال` بعد الانتهاء من التكوين. إذا قمت بملء كل شيء بشكل صحيح، سترى نافذة النجاح.

هذا كل شيء! لقد قمت بإعداد تكامل Robonomics بالكامل في Home Assistant. الآن يمكنك استخدام جميع خدمات Robonomics عبر الويب. لمعرفة المزيد عنها، انتقل إلى ["قسم الاستخدام"](docs/add-user).