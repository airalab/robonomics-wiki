---
title: تفعيل الاشتراك
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - تطبيق Robonomics Dapp v0.7.0
    https://github.com/airalab/robonomics.app
---

**في هذا المقال، ستقوم بإنشاء حسابات سلسلة كتل Robonomics وشراء اشتراك IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

للتحكم في Home Assistant باستخدام Robonomics، تحتاج إلى حسابين على سلسلة كتل Robonomics. ستقوم بشراء اشتراك Robonomics لأحد الحسابين (`OWNER`). سيتحكم الحساب الثاني (`CONTROLLER`) في جميع عمليات Home Assistant (مثل البيانات الواصلة) وسيمنح الوصول للمستخدمين الآخرين. ستوفر هذه الحسابات الأمان لـ Home Assistant الخاص بك.

إذا لم يكن لديك حساب، تحقق من هذا المقال وقم بإنشاء [حساب OWNER](/docs/create-account-in-dapp/). سيتم إنشاء حساب المراقب تلقائيًا أثناء الإعداد.

في المقال، يتم استخدام محفظة [امتداد Polkadot.js](https://polkadot.js.org/extension/) للعمل مع الحسابات، ولكن يمكنك استخدام محفظة أخرى تكون مناسبة بالنسبة لك.

## تفعيل اشتراك Robonomics

{% roboWikiNote {type: "حسنًا"} %}

لهذه الخطوة، يجب أن تمتلك كمية كافية من رموز XRT (2-3 XRT كحد أدنى) في حساب `OWNER` الخاص بك.

{% endroboWikiNote %}


{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

1. انتقل إلى تطبيق Robonomics وانتقل إلى [صفحة الاشتراك](https://robonomics.app/#/rws-buy). ثم، انقر على `Connect Account` في الشريط الجانبي الأيمن.

2. في القائمة المنبثقة التالية، اربط ملحق Polkadot.js. سترى عنوان حسابك مع رصيده.

3. قبل الشراء، تأكد من تحديد حساب `OWNER`. انقر على أيقونة ملف العنوان، ويجب أن ترى حساب `OWNER`.

4. في النهاية، انقر على زر `BUY SUBSCRIPTION` وأدخل كلمة مرور حسابك. انتظر حتى يتم اكتمال عملية التنشيط. سترى حالة اشتراكك بعد لحظات.

## إعداد اشتراكك

الآن عليك إعداد اشتراكك عن طريق إضافة حساب `CONTROLLER` إليه.

{% roboWikiPicture {src:"docs/home-assistant/sub-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. انتقل إلى تطبيق Robonomics وانتقل إلى [صفحة إعداد اشتراك](https://robonomics.app/#/rws-setup). انتقل إلى قسم **إعدادات الاشتراك**.

2. في حقل `عبارة البذرة للتحكم` اضغط على العصا السحرية لإنشاء حساب `CONTROLLER` جديد.

3. في النافذة المنبثقة، قم بإنشاء كلمة مرور لحساب `CONTROLLER`.

4. في النافذة المنبثقة التالية، سترى عنوان حسابك الجديد وعبارة البذرة الذهنية. احفظ عبارة البذرة الذهنية بشكل آمن لأنك ستحتاج إليها لاحقًا لإعداد التكامل. بالإضافة إلى ذلك، سيتم تنزيل ملف JSON مع حساب `CONTROLLER`. يمكنك استيراده إلى محفظتك. يمكن العثور على كيفية القيام بذلك لامتداد Polkadot.js [هنا](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-create.jpg", alt:"controller create"} %}{% endroboWikiPicture %}

5. أغلق النافذة المنبثقة وانقر على زر `SAVE`.

## إضافة حساب التحكم إلى الاشتراك

الآن، تحتاج إلى إضافة حساب `CONTROLLER` الخاص بك إلى **قائمة الوصول**. 

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

اذهب إلى تطبيق Robonomics وانتقل إلى [صفحة إعداد اشتراك](https://robonomics.app/#/rws-setup). تأكد من اختيار الاشتراك الصحيح وحساب `OWNER`.


٢. انسخ عنوان `CONTROLLER`: افتح الامتداد وانقر على الرمز المجاور لاسم الحساب أو انسخ العنوان من قسم **Subscription settings**.

٣. الصق هذا العنوان في حقل `Polkadot address` في قسم **USERS IN SUBSCRIPTION** وانقر على زر `+`.

٤. أدخل كلمة المرور لحساب `OWNER` في نافذة البوب ​​ثم انتظر اكتمال عملية التنشيط.

هذا كل شيء. انتقل إلى المقالة التالية.