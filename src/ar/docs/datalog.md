---
title: داتالوج
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**الآن بعد أن لديك بعض الأموال في حسابك يمكنك تقديم العمليات الخارجية. أول محاولة هي داتالوج. يسمح لك بتخزين البيانات في سلسلة الكتل بشكل دائم. تخيل تخزين موزع ومحمي بالعملات المشفرة لبياناتك وهذا هو!**

{% roboWikiNote {type: "warning", title: "نود التطوير"}%} يرجى الانتباه إلى أن هذه البرامج التعليمية والتي تتبعها موجودة على نسخة محلية من نود روبونوميكس. قم بإعداد الخاص بك باستخدام [هذه التعليمات](/docs/run-dev-node).
{% endroboWikiNote %}


## 1. انتقل إلى المطور -> عمليات خارجية

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. اختر datalog -> record من القائمة المنسدلة للعمليات الخارجية الممكنة

اختر أيضًا الحساب الذي ترغب في تقديم العملية الخارجية به. املأ حقل السجل.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "كمية كبيرة من البيانات"}%} يدعم داتالوج سلسلة نصية بحد أقصى 512 بايت. لتخزين كمية كبيرة من البيانات يمكن للشخص استخدام [IPFS](https://ipfs.tech/).
{% endroboWikiNote %}

## 3. تقديم العملية

قم بتوقيع وتقديم العملية بالحساب الذي تم إنشاؤه مسبقًا باستخدام الامتداد أو التطبيق.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "مسح"}%} يمكنك أيضًا مسح **جميع** سجلاتك باستخدام استدعاء *datalog -> erase*.
{% endroboWikiNote %}

## 4. استعراض داتالوج الخاص بك في التخزين

لهذا، انتقل إلى *المطور -> حالة السلسلة*, حدد *datalog -> datalogIndex*, حدد حسابك واضغط على
الزر "+" للحصول على فهرس سجلات حسابك ومن ثم استكشاف الذي تحتاجه باستخدام *datalog -> datalogItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "مستكشف"}%} يمكن رؤية جميع الأحداث بما في ذلك سجل داتالوج في تدفق الأحداث في *المستكشف*.
{% endroboWikiNote %}