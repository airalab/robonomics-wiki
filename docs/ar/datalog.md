---
title: سجل البيانات
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**الآن بعد أن لديك بعض الأموال في حسابك يمكنك تقديم extrinsics. أول شيء لتجربته هو Datalog. يتيح لك تخزين البيانات في سلسلة الكتل بشكل دائم. تخيل تخزين موزع ومحمي بالتشفير لبياناتك وهذا هو!**

<robo-wiki-note type="warning" title="Dev Node">

يرجى الانتباه إلى أن هذه الدروس والتعليمات التالية تتم على نسخة محلية من نود روبونوميكس. قم بإعداد النسخة الخاصة بك باستخدام [هذه التعليمات](/docs/run-dev-node).

</robo-wiki-note>

## 1. انتقل إلى المطور -> العمليات الخارجية

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. اختر سجل البيانات -> تسجيل من القائمة المنسدلة للعمليات الخارجية الممكنة

اختر أيضًا الحساب الذي ترغب في إرسال العملية الخارجية به. قم بملء حقل التسجيل.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  يدعم سجل البيانات سلسلة نصية بحد أقصى 512 بايت. يمكن استخدامه لتخزين كمية كبيرة من البيانات [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. قم بإرسال العملية

قم بتوقيع وإرسال العملية باستخدام الحساب الذي تم إنشاؤه مسبقًا باستخدام الامتداد أو التطبيق اللامركزي.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  يمكنك أيضًا مسح **جميع** سجلاتك باستخدام *datalog -> erase* الاستدعاء.

</robo-wiki-note>

## 4. قم بمراجعة سجل البيانات الخاص بك في التخزين

للقيام بذلك، انتقل إلى *Developer -> Chain state*, حدد *datalog -> datalogIndex*, حدد حسابك واضغط على زر 
"+" للحصول على فهرس سجلات حسابك ثم استكشف السجل الذي تحتاجه باستخدام *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="استكشافr">

  يمكن رؤية جميع الأحداث بما في ذلك سجل البيانات في تدفق الأحداث في *المستكشف*.

</robo-wiki-note>