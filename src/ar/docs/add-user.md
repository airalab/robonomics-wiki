---
title: إضافة مستخدم

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**سيعرض هذا المقال كيفية إعداد مستخدم جديد لـ Home Assistant الخاص بك.**

## إضافة مستخدمين إلى الاشتراك

لا يمكنك استخدام الحسابات التي تم إنشاؤها مسبقًا لأن `OWNER` و `CONTROLLER` يوفران الأمان، والمستخدم الأول الذي قمت بإنشائه عند بدء استخدام Home Assistant ليس لديه حساب Robonomics Parachain.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. أنشئ حسابًا على Robonomics parachain، كما فعلت في [المقال السابق](/docs/sub-activate/).

2. باستخدام حساب `OWNER`، أضف حساب مستخدم جديد إلى الاشتراك على صفحة `SETUP A SUBSCRIPTION` في [Robonomics DApp](https://robonomics.app/#/rws-setup). الآن يجب أن تحتوي قسم `USERS IN SUBSCRIPTION` على ثلاث عناوين في قائمة الوصول: `OWNER`، `CONTROLLER` و `USER`.


## ملف JSON لإعداد RWS

أولاً، يجب على المستخدم الحصول على ملف JSON الذي يحتوي على معلومات إعداد RWS.

### إنشاء ملف JSON لإعداد RWS

يمكن للمسؤول إنشاء ملف JSON لإعداده في صفحة [SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup) باستخدام زر `Download import for other users`.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### استيراد إعداد RWS

الآن يمكن للمستخدم استيراد إعداد RWS باستخدام هذا الملف JSON باستخدام زر `IMPORT SETUP`.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## منح الوصول للمستخدم

على نفس الصفحة ([SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)) يمكنك تعيين كلمة مرور للمستخدم الجديد.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. اختر الحساب الذي أنشأته للتو في الشريط الجانبي الأيمن (تحقق من أنك اخترت الحساب المقصود عن طريق الضغط على رمز الملف الشخصي).

2. أدخل عنوان `USER` وعبارة البذرة في الحقول المطلوبة.

3. املأ كلمة مرور ثم قم بتأكيد العملية باستخدام زر `CREATE PASSWORD`، الذي سيكون الآن بدون رسوم بسبب الاشتراك.

4. بعد عملية التسجيل، قم بتسجيل الدخول إلى Home Assistant باستخدام عنوان المستخدم الخاص بك كاسم مستخدم وكلمة مرور جديدة تم إنشاؤها.

الآن يمكنك استخدام التطبيق للتحكم في منزلك من خلال Robonomics، تحقق من [**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/) المقال.