---
title: كيفية إرسال إطلاق مع الاشتراك

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"باراشين", type: "warning"}%}توخى الحذر من أن هذا البرنامج التعليمي يوضح استخدام اشتراك على باراشين Robonomics Kusama. يمكنك أيضًا تنفيذ كل الخطوات نفسها على [العقد المحلي](/docs/run-dev-node). {% endroboWikiNote %}


إذا كان لديك عنوان يحتوي على اشتراك نشط، فإن أي أجهزة تم إعدادها باستخدام سر هذا الحساب يمكنها إرسال extrinsics بدون رسوم.
لنجرب إرسال أمر `launch`.

انتقل إلى صفحة `Developer/Extrinsics`، ثم اختر حسابك (الحساب من قائمة الأجهزة) واختر `rws -> call(subscriptionId, call)`.
ثم في حقل `subscriptionId`، الصق عنوان مالك الاشتراك (الشخص الذي قدم عرض المزاد) وفي الحقل التالي
اختر `launch -> launch(robot, param)`. في حقل `robot`، اكتب العنوان الذي تريد إرسال عملية `launch` إليه وأدخل الأمر (للحصول على وصف الأمر launch انظر [هنا](/docs/launch)). ثم قدم العملية:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}


الآن انتقل إلى صفحة `Network/Explorer`، وفي منطقة `Recent Events` سترى حدثين قمت بإنشائهما؛ `rws.NewCall` و `launch.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}