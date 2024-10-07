---
title: بدء تشغيل Home Assistant
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
---

**بعد تثبيت Home Assistant، يحتاج إلى تهيئة.**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

تبدأ بإنشاء حساب المالك لـ Home Assistant. هذا الحساب هو مسؤول ويمكنه إجراء أي تغييرات.
افتح متصفح الويب وانتقل إلى `http://%PC_IP_ADDRESS%:8123`. يمكنك العثور على عنوان IP لجهاز Raspberry Pi باستخدام [تطبيق Fing المحمول](https://www.fing.com/products) أو [أداة nmap CLI](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).
إذا قمت بإعداد كل شيء على جهاز الكمبيوتر الخاص بك، استخدم `http://localhost:8123`.

{% roboWikiNote {type: "note"}%} قد يتغير عنوان IP مع مرور الوقت، بسبب إعدادات الموجه {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. في الصفحة الأولى، أدخل اسمًا، اسم مستخدم، كلمة مرور وانقر على زر `إنشاء حساب`.

2. في الشاشة التالية، ادخل اسمًا لمنزلك وقم بتعيين موقعك ونظام الوحدات. انقر على `DETECT` للعثور على موقعك وتعيين منطقة التوقيت ونظام الوحدات بناءً على ذلك الموقع. إذا لم ترغب في إرسال موقعك، يمكنك ضبط هذه القيم يدويًا.

3. بعد ذلك، سيعرض Home Assistant أي أجهزة اكتشفها على شبكتك. لا تقلق إذا رأيت عددًا أقل من العناصر المعروضة أدناه؛ يمكنك دائمًا إضافة الأجهزة يدويًا لاحقًا. الآن، انقر فقط على `FINISH` وستكون على الشاشة الرئيسية لـ Home Assistant.

4. في النهاية، سترى واجهة Home Assistant على الويب، التي ستعرض جميع أجهزتك.


## حل المشكلات

1. إذا نسيت اسم الدخول أو كلمة المرور للمستخدم المحلي، [تحقق من هذه المقالة](https://www.home-assistant.io/docs/locked_out/) لاستعادة بيانات اعتمادك.