---
title: إعداد تكامل Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
---

**في هذا المقال، ستقوم بإضافة Robonomics إلى Home Assistant. وهذا يتيح لـ Home Assistant تسجيل سجلات البيانات ببيانات مشفرة إلى Robonomics Parachain والاستماع إلى أوامر الإطلاق من الباراشين للتحكم في الأجهزة الذكية. يستخدم التكامل IPFS لتخزين البيانات وإرسال تجزئات IPFS إلى وظائف السجلات البيانية أو الإطلاق.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

أولاً، تحتاج إلى إنشاء تكوين لوحة التحكم الخاصة بك. للقيام بذلك، افتح لوحة التحكم الخاصة بـ Home Assistant الخاصة بك واضغط على زر "تحرير اللوحة" (قلم).

في النافذة المنبثقة، انقر على أيقونة النقاط الثلاث واختر زر "تحمل التحكم":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

اضغط على "تحمل التحكم" مرة أخرى:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

الآن يمكنك تثبيت تكامل Robonomics. للقيام بذلك، اتبع هذه الخطوات:

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. في واجهة Home Assistant على الويب، انتقل إلى `الإعدادات` -> `الجهاز والخدمات` واضغط على `إضافة تكامل`. ابحث عن `Robonomics`.

2. انقر على Robonomics واملأ التكوين:

- أضف البذرة من حساب `SUB_CONTROLLER` إلى بذرة حساب المتحكم.
- أضف العنوان العام لحساب `SUB_OWNER` إلى عنوان مالك الاشتراك.
- قم بتعيين فترة إرسال البيانات (افتراضيًا هي 10 دقائق).
- (اختياري) يمكنك إضافة بيانات اعتماد لخدمة التعليق Pinata أو بوابة مخصصة أخرى لنشر بياناتك بشكل أوسع عبر شبكة IPFS.

{% roboWikiNote {title:"ملاحظة", type: "ملاحظة"}%} في [قسم إعداد Pinata](/docs/pinata-setup) يمكنك العثور على معلومات أكثر تفصيلاً حول استخدام Pinata. {% endroboWikiNote %}

3. اضغط على `إرسال` بعد الانتهاء من التكوين. إذا قمت بملء كل شيء بشكل صحيح، سترى نافذة النجاح.

هذا كل شيء! لقد قمت بإعداد تكامل Robonomics بالكامل في Home Assistant. الآن يمكنك استخدام جميع خدمات Robonomics عبر الويب. لمعرفة المزيد عنها، انتقل إلى ["قسم الاستخدام"](docs/add-user).