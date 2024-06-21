---
title: الإدارة العالمية

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**سيوضح لك هذا المقال كيفية إعداد مستخدم جديد لـ Home Assistant الخاص بك.**

## إضافة المستخدمين إلى الاشتراك

لا يمكنك استخدام حسابات تم إنشاؤها مسبقًا لأن `SUB_OWNER` و `SUB_CONTROLLER` يوفران الأمان، وأول مستخدم قمت بإنشائه عند بدء استخدام Home Assistant ليس لديه حساب Robonomics Parachain.

1. قم بإنشاء حساب على Robonomics parachain، كما فعلت في [المقال السابق](/docs/sub-activate/).

2. باستخدام حساب `SUB_OWNER`، أضف حساب مستخدم جديد إلى الاشتراك في [التطبيق](https://dapp.robonomics.network/#/subscription/devices). الآن يجب أن يكون هناك ثلاثة عناوين في قائمة الوصول: `SUB_OWNER` و `SUB_CONTROLLER` و `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## منح الوصول للمستخدم

1. انتقل إلى خدمة التطبيق المسماة [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). اختر الحساب الذي قمت بإنشائه للتو في الشريط الجانبي الأيمن (تحقق من أنك قمت باختيار الحساب المقصود عن طريق الضغط على أيقونة الملف الشخصي).

2. أدخل بذرة `USER` في الحقل المطلوب. أضف عناوين `SUB_OWNER` و `SUB_CONTROLLER` في حقول اعتمادات المسؤول. إذا كان كل شيء صحيحًا، سترى حالة التحقق `VERIFIED`.

3. قم بإنشاء كلمة مرور لمستخدم جديد قمت للتو بتسجيله ثم قم بتأكيد العملية، والتي ستكون الآن بدون رسوم بسبب الاشتراك. في وقت لاحق يمكنك استعادة كلمة المرور في علامة التبويب "استعادة".

4. بعد عملية التسجيل، قم بتسجيل الدخول إلى Home Assistant باستخدام عنوان المستخدم الخاص بك كاسم مستخدم وكلمة مرور جديدة.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

الآن يمكنك استخدام التطبيق للتحكم في منزلك من خلال Robonomics، تحقق من المقالة [**"الحصول على بيانات تلميحات المنزل الذكي"**](/docs/smart-home-telemetry/).

## حل المشاكل

1. إذا نسيت كلمة مرور Home Assistant من حساب Robonomics الخاص بك، [تحقق من Dapp.](https://dapp.robonomics.network/#/home-assistant)
انتقل إلى جزء "كلمة مرور Home Assistant الخاصة بك" واختر علامة التبويب "Restore".
