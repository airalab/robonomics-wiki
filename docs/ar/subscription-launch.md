---
title: كيفية إرسال إطلاق مع الاشتراك

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  تنبيه أن هذا البرنامج التعليمي يوضح استخدام الاشتراك في سلسلة Robonomics Kusama. يمكنك أيضًا تنفيذ جميع الخطوات نفسها على [العقد المحلي](/docs/run-dev-node).

</robo-wiki-note>

إذا كان ديك عنوان يحتوي على اشتراك نشط ، فيمكن لأي أجهزة تم إعدادها باستخدام سر تلك الحساب إرسال extrinsics بدون رسوم. 
لنجرب إرسال الأمر `launch`.

انتقل إلى صفحة `Developer/Extrinsics` ، ثم اختر حسابك (الحساب من قائمة الأجهزة) وحدد `rws -> call (subscriptionId ، call)`. 
ثم في حقل `subscriptionId` ، الصق عنوان مالك الاشتراك (الشخص الذي قدم عرض المزاد) وفي الحقل التالي اختر `launch -> launch (robot ، param)`. في حقل `robot` ، اكتب العنوان الذي تريد إرسال معاملة `launch` إليه وأدخل الأمر (للحصول على وصف الأمر الخاص بالإطلاق ، راجع [هنا](/docs/launch)). ثم أرسل المعاملة:

![launch](../images/rws/launch.png)


الآن انتقل إلى صفحة `Network/Explorer` ، وفي منطقة `Recent Events` سترى حدثين قمت بإنشائهما ؛ `rws.NewCall` و `launch.NewLaunch`:

![events](../images/rws/events.png)
