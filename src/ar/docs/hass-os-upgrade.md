---

title: ترقية نظام Home Assistant الخاص بك
contributors: [LoSk-p]
tools:
  - Home Assistant OS 12.1 for RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy Add-on 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**يحتوي هذا المقال على تعليمات لترقية نظام Home Assistant الحالي الخاص بك مع دمج Robonomics.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## تثبيت HACS

[متجر مجتمع Home Assistant (HACS)](https://hacs.xyz/) يسمح لك بتثبيت التكاملات المخصصة.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. قبل البدء، تحتاج إلى تثبيت إضافة للاتصال بجهاز Home Assistant عبر SSH. ابحث في متجر الإضافات عن `ssh`. نوصي بتثبيت إضافة `SSH & Web Terminal`.

{% roboWikiNote {title:"تحذير", type: "warning"}%} إذا لم يتم العثور على إضافة SSH، جرب تمكين الوضع المتقدم في إعدادات ملف تعريف المستخدم الخاص بك. للقيام بذلك، انقر على أيقونة الملف التعريفي في الزاوية السفلية اليسرى، وابحث عن خيار الوضع المتقدم.{% endroboWikiNote %}

2. اختر الإضافة واضغط `INSTALL`. بعد الانتهاء من التثبيت، انتقل إلى علامة التبويب `Configuration` وأضف `password` أو `authorized_keys`. لا تنسى حفظ هذا الجزء من التكوين.

3. في علامة التبويب `Info`، اضغط `START`. إذا كنت ترغب في رؤية الإضافة في الشريط الجانبي، لا تنسى تمكين `Show in sidebar`.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. افتح إضافة SSH وقم بتشغيل الأمر التالي:

{% codeHelper { additionalLine: "Home Assistant Command Line", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. أعد تشغيل Home Assistant (يمكنك القيام بذلك في `Settings`->`System`).

6. الآن ستكون تكامل HACS متاحة للإضافة في قائمة `Integrations`. انتقل إلى `Settings`->`Devices & Services`، اضغط `Add Integration` وابحث عن HACS.

{% roboWikiNote {title:"تحذير", type: "warning"}%} لاستخدام HACS، تحتاج إلى حساب Github.{% endroboWikiNote %}

7. انقر عليه واتبع تعليمات التثبيت.

## تثبيت IPFS Daemon و Libp2p - WS Proxy Add-Ons

يستخدم تكامل Robonomics تخزين البيانات باستخدام IPFS daemon المحلي ويستخدم أيضًا Libp2p للتحكم عن بعد، لذا تحتاج إلى تثبيته أولاً. يمكنك إضافة مستودع Robonomics Add-Ons باستخدام هذا الزر

[![افتح نسختك من Home Assistant وأظهر مربع حوار إضافة الإضافة مع عنوان URL محدد مملوء مسبقًا.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

أو يدويًا باستخدام الخطوات التالية:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. هناك [مستودع إضافات Robonomics](https://github.com/PinoutLTD/robonomics-addons). لتثبيته، انتقل إلى `Settings` -> `Add-Ons` واضغط على زر `ADD-ON STORE` في الزاوية السفلية اليمنى.

2. اضغط على النقاط الثلاث في الزاوية العلوية اليمنى واختر `Repositories`. أضف هناك الرابط التالي:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. اضغط على زر `ADD`.

4. أغلق مدير المستودع وقم بتحديث الصفحة. الآن في نهاية الصفحة يمكنك رؤية Robonomics Add-Ons.

الآن يمكنك تثبيت كلتا الإضافتين. افتحهما واضغط `INSTALL`. بعد التثبيت، اضغط `START`.

## تثبيت تكامل Robonomics

الآن يمكنك تثبيت تكامل Robonomics باستخدام HACS.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

افتح HACS من قائمة الشريط الجانبي وابحث عن `Robonomics`. ثم انقر على زر `Download` الموجود في الزاوية اليمنى السفلية. بمجرد اكتمال التنزيل، أعد تشغيل Home Assistant.