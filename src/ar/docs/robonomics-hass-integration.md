---
title: إعداد تكامل Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - تكامل Robonomics Home Assistant 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**في هذه المقالة، ستقوم بإضافة Robonomics إلى Home Assistant. يتيح هذا لـ Home Assistant تسجيل سجلات البيانات ببيانات مشفرة إلى Robonomics Parachain والاستماع إلى أوامر الإطلاق من الباراشين للتحكم في الأجهزة الذكية. يستخدم التكامل IPFS لتخزين البيانات وإرسال تجزئة IPFS إلى وظائف سجلات البيانات أو الإطلاق.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'إعداد التكامل'}%} {% endroboWikiPicture %}

أولاً، تحتاج إلى إنشاء تكوين لوحة التحكم الخاصة بك. للقيام بذلك، افتح لوحة التحكم الخاصة بـ Home Assistant واضغط على زر "تحرير اللوحة" (قلم) في الزاوية العلوية اليمنى.
في النافذة المنبثقة، انقر على أيقونة النقاط الثلاث واختر زر "تحكم":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'إعداد التكامل'}%} {% endroboWikiPicture %}

اضغط على "تحكم" مرة أخرى:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'إعداد التكامل'}%} {% endroboWikiPicture %}

الآن يمكنك تثبيت تكامل Robonomics. للقيام بذلك، اتبع هذه الخطوات:

1. في واجهة الويب لـ Home Assistant، انتقل إلى `الإعدادات` -> `الأجهزة والخدمات` واضغط `إضافة تكامل`. ابحث عن `Robonomics`.

2. انقر على Robonomics، قم بتحميل ملف الإعداد الخاص بك (المسمى `robonomics.app-settings-<subscirption-name>-server.json`، حيث `<subscirption-name>` هو اسم اشتراكك)، وأدخل كلمة مرور لحساب `CONTROLLER`. يمكن العثور على تعليمات حول كيفية إنشاء ملف الإعداد [هنا](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"إنشاء تحكم"} %}{% endroboWikiPicture %}

3. اختياري: يمكنك اختيار الشبكة التي ترغب في استخدامها.

4. اضغط `إرسال` بعد الانتهاء من التكوين. إذا قمت بملء كل شيء بشكل صحيح، سترى نافذة النجاح.

{% roboWikiNote {type: "okay", title: "" }%} قد يستغرق التثبيت حوالي 10-15 دقيقة، اعتمادًا على اتصال الإنترنت الخاص بك. {% endroboWikiNote %}

هذا كل شيء! لقد قمت بإعداد تكامل Robonomics بالكامل في Home Assistant. الآن يمكنك استخدام جميع خدمات Robonomics عبر الويب. لمعرفة المزيد عنها، انتقل إلى ["قسم الاستخدام"](/docs/add-user).