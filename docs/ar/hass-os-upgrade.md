---
title: قم بترقية نظام التشغيل المساعد المنزلي الخاص بك
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**يحتوي هذا المقال على تعليمات لترقية نظام التشغيل المساعد المنزلي الحالي الخاص بك مع دمج Robonomics.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## تثبيت IPFS Add-on


يقوم دمج Robonomics بتخزين البيانات باستخدام خادم IPFS المحلي ، لذا يجب عليك تثبيته أولاً. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. هناك [إضافة IPFS لمساعد المنزل](https://github.com/airalab/ipfs-addon). لتثبيتها ، انتقل إلى `Settings` -> `Add-ons` واضغط على زر `ADD-ON STORE` في الزاوية السفلى اليمنى.

2. اضغط على النقاط الثلاث في الزاوية اليمنى العلوية واختر `Repositories`. أضف هنا الرابط التالي:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. اضغط على زر `ADD`.

4. أغلق مدير المستودع وقم بتحديث الصفحة. الآن في نهاية الصفحة يمكنك رؤية إضافة IPFS Daemon.

5. افتح الإضافة واضغط على `INSTALL`. بعد التثبيت ، اضغط على `START`.

## قم بتثبيت HACS

[متجر مجتمع مساعد المنزل (HACS)](https://hacs.xyz/) يتيح لك تثبيت التكاملات المخصصة.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. قبل البدء ، تحتاج إلى تثبيت إضافة للاتصال بجهاز مساعد المنزل باستخدام SSH. في متجر الإضافات ، ابحث عن `ssh`. نوصي بتثبيت إضافة `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  إذا لم يتم العثور على إضافة SSH ، جرب تمكين وضع المتقدم في إعدادات ملف المستخدم الخاص بك. للقيام بذلك ، انقر على أيقونة الملف الشخصي في الزاوية السفلى اليسرى ، وابحث عن خيار وضع المتقدم.

</robo-wiki-note>

2. اختر الإضافة واضغط على `INSTALL`. بعد الانتهاء من التثبيت ، انتقل إلى علامة التبويب `التكوين` وأضف `password` أو `authorized_keys`. لا تنسى حفظ هذا الجزء من التكوين.

3. في علامة التبويب `Info` ، اضغط على `START`. إذا كنت ترغب في رؤية الإضافة في الشريط الجانبي ، لا تنسى تمكين `Show in sidebar`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. افتح إضافة SSH وقم بتشغيل الأمر التالي:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. أعد تشغيل Home Assistant (يمكنك القيام بذلك في `Settings`->`System`).

6. الآن ستكون تكاملات HACS متاحة للإضافة في قائمة `Integrations`. انتقل إلى ``Settings`->`Devices & Services` ، واضغط على `Add Integration` وابحث عن HACS.

<robo-wiki-note type="warning" title="Warning">

  لاستخدام HACS ، تحتاج إلى حساب Github.

</robo-wiki-note>

7. انقر عليه واتبع تعليمات التثبيت. 

## قم بتثبيت دمج Robonomics

الآن يمكنك تثبيت دمج Robonomics باستخدام HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

افتح HACS من قائمة الشريط الجانبي وانتقل إلى `Integra1tions`. انقر فوق `Explore & Download Repositories`، ثم ابحث عن `Robonomics` وانقر فوق الزر `Download` الموجود في الزاوية اليمنى السفلية. بمجرد اكتمال التنزيل، قم بإعادة تشغيل Home Assistant.