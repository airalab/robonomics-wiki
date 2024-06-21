---
title: إعداد تكامل Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**في هذه المقالة، ستضيف Robonomics إلى Home Assistant. يتيح ذلك لـ Home Assistant تسجيل سجلات البيانات ببيانات مشفرة إلى Robonomics Parachain والاستماع إلى أوامر الإطلاق من الباراشين للتحكم في الأجهزة الذكية. يستخدم التكامل IPFS لتخزين البيانات وإرسال تجزئات IPFS إلى وظائف السجلات أو الإطلاق.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. في واجهة الويب لـ Home Assistant، انتقل إلى `Settings` -> `Device & Services` واضغط على `ADD INTEGRATION`. ابحث عن `Robonomics`.

2. انقر على Robonomics واملأ التكوين: 

- أضف البذرة من حساب `SUB_CONTROLLER` إلى بذرة حساب المراقب.
- أضف عنوان الحساب العام لحساب `SUB_OWNER` إلى عنوان مالك الاشتراك.
- قم بتعيين فترة إرسال البيانات (بشكل افتراضي هو 10 دقائق).
- (اختياري) يمكنك إضافة بيانات اعتماد لخدمة التثبيت Pinata أو بوابة مخصصة أخرى لنشر بياناتك على نطاق أوسع في شبكة IPFS.

3. اضغط على `SUBMIT` بعد الانتهاء من التكوين. إذا قمت بملء كل شيء بشكل صحيح، سترى نافذة النجاح.

هذا كل شيء! لقد قمت بإعداد تكامل Robonomics بالكامل في Home Assistant. الآن يمكنك استخدام جميع 
خدمات Robonomics عبر الويب. لمعرفة المزيد عنها، انتقل إلى ["قسم الاستخدام"](/docs/global-administration).
