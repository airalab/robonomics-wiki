---
title: تفعيل الاشتراك
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - تطبيق Robonomics Dapp v0.8.2
    https://github.com/airalab/robonomics.app
---

**في هذا المقال، ستقوم بإنشاء حسابات سلسلة كتل Robonomics وشراء اشتراك IoT.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

للتحكم في Home Assistant باستخدام Robonomics، تحتاج إلى حسابين على سلسلة كتل Robonomics. ستقوم بشراء اشتراك Robonomics لأحد الحسابين (`OWNER`). سيتحكم الحساب الثاني (`CONTROLLER`) في جميع عمليات Home Assistant (مثل جمع البيانات) وسيمنح الوصول للمستخدمين الآخرين. ستوفر هذه الحسابات الأمان لـ Home Assistant الخاص بك.

إذا لم يكن لديك حساب، تحقق من هذا المقال وقم بإنشاء [حساب OWNER](/docs/create-account-in-dapp/). سيتم إنشاء حساب المراقب تلقائيًا أثناء الإعداد.

في المقال، يتم استخدام ملحق [Polkadot.js](https://polkadot.js.org/extension/) للعمل مع الحسابات، ولكن يمكنك استخدام محفظة أخرى تكون مريحة بالنسبة لك.

## تفعيل اشتراك Robonomics

{% roboWikiNote {type:"حسناً"} %}

لهذه الخطوة، يجب أن تمتلك كمية كافية من رموز XRT (2-3 XRT كحد أدنى) في حساب `OWNER` الخاص بك.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. انتقل إلى تطبيق Robonomics وانتقل إلى [صفحة الاشتراك](https://robonomics.app/#/rws-buy). ثم، انقر على `Connect Account` في الشريط الجانبي الأيمن.

2. في القائمة المنبثقة التالية، اربط امتداد Polkadot.js. سترى عنوان حسابك مع رصيده.

3. قبل الشراء، تأكد من تحديد حساب `OWNER`. انقر على أيقونة ملف العنوان، ويجب أن ترى حساب `OWNER`.

4. في النهاية، انقر على زر `BUY SUBSCRIPTION` وأدخل كلمة المرور لحسابك. انتظر حتى يتم اكتمال عملية التنشيط. سترى حالة اشتراكك بعد فترة.

## إعداد اشتراكك

الآن عليك إعداد اشتراكك عن طريق إضافة حساب `CONTROLLER` إليه. 

{% roboWikiPicture {src:"docs/home-assistant/sub-download-backup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. اذهب إلى تطبيق Robonomics وانتقل إلى [صفحة إعداد اشتراك](https://robonomics.app/#/rws-setup). انتقل إلى قسم **إعدادات الاشتراك**.

2. انقر على `تنزيل النسخة الاحتياطية` واختر الخيار `للخادم`.

{% roboWikiNote {type: "warning", title: "معلومات هامة"} %} سيؤدي هذا الإجراء إلى إنشاء متحكم جديد لاشتراكك. لا تنسى إضافته إلى الاشتراك. {% endroboWikiNote %}

3. في النافذة المنبثقة، قم بإنشاء كلمة مرور لحساب `المتحكم`.

{% roboWikiPicture {src:"docs/home-assistant/server-new-settings.png", alt:"إنشاء متحكم"} %}{% endroboWikiPicture %}

4. في النافذة المنبثقة التالية، سترى عنوان حسابك الجديد وعبارة البذور النمطية. احفظ عبارة البذور النمطية بشكل آمن. في مجلد التنزيلات، ستجد ملفين JSON: يُسمى الملف الأول `Controller-<address>.json`، حيث `<address>` هو عنوان المتحكم الذي تم إنشاؤه حديثًا. يُسمى الملف الثاني `robonomics.app-settings-<subscirption-name>-server.json`، حيث `<subscirption-name>` هو اسم الاشتراك الخاص بك. احفظ هذه الملفات بشكل آمن، حيث ستحتاج إليها لاحقًا لإعداد التكامل. بالإضافة إلى ذلك، يمكنك استيراد متحكمك.استيرادها إلى محفظتك. يمكن العثور على تعليمات لاستيرادها إلى امتداد Polkadot.js [هنا](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-acc.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

5. (اختياري) يمكنك إضافة بيانات اعتماد لخدمة Pinata أو بوابة مخصصة أخرى لنشر بياناتك بشكل أوسع عبر شبكة IPFS.

{% roboWikiNote {title:"ملاحظة", type: "ملاحظة"}%} في [قسم إعداد Pinata](/docs/pinata-setup) يمكنك العثور على معلومات أكثر تفصيلاً حول استخدام Pinata.{% endroboWikiNote %}

6. أغلق النافذة المنبثقة وانقر على زر `SAVE`.

{% roboWikiPicture {src:"docs/home-assistant/save-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

## إضافة حساب المتحكم إلى الاشتراك

الآن، تحتاج إلى إضافة حساب `CONTROLLER` الخاص بك إلى **قائمة الوصول**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. انتقل إلى تطبيق Robonomics وانتقل إلى [صفحة إعداد الاشتراك](https://robonomics.app/#/rws-setup). تأكد من اختيار الاشتراك الصحيح وحساب `OWNER`.

2. انسخ عنوان `CONTROLLER`: افتح الامتداد وانقر على الرمز المجاور لاسم الحساب أو انسخ العنوان من قسم **إعدادات الاشتراك**.

3. الصق هذا العنوان في حقل `عنوان Polkadot` في قسم **المستخدمون في الاشتراك** وانقر على الزر `+`.

4. أدخل كلمة المرور لحساب `OWNER` في نافذة البوب ​​آب، ثم انتظر اكتمال عملية التنشيط.

هذا كل شيء. انتقل إلى المقالة التالية.