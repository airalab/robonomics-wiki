---
title: تفعيل الاشتراك
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - تطبيق Robonomics
    https://github.com/airalab/robonomics.app
---

في هذا المقال، ستقوم بإنشاء حسابات سلسلة كتل Robonomics وشراء اشتراك IoT.

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

للتحكم في Home Assistant باستخدام Robonomics، تحتاج إلى حسابين على سلسلة كتل Robonomics. ستقوم بشراء اشتراك Robonomics لأحد الحسابين (`OWNER`). سيتحكم الحساب الثاني (`CONTROLLER`) في جميع عمليات Home Assistant (مثل جمع البيانات) وسيمنح الوصول للمستخدمين الآخرين. ستوفر هذه الحسابات الأمان لـ Home Assistant الخاص بك.

{% roboWikiNote {title:"تحذير", type: "warning"}%}
يجب إنشاء كلا الحسابين باستخدام تشفير **ed25519**. لذلك، تحتاج إلى إنشاء حساب باستخدام واجهة المستخدم Polkadot-JS واختيار التشفير المطلوب.

تكون هذه الميزة معطلة افتراضيًا في واجهة المستخدم Polkadot-JS. لتمكينها، انتقل إلى `الإعدادات` -> `عام` -> `خيارات الحساب` وحدد `السماح بتخزين الحساب المحلي في المتصفح` في القائمة المنسدلة تحت `إنشاء حساب في المتصفح`.
{% endroboWikiNote %}

## إنشاء حسابات المالك والتحكم

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. انتقل إلى [تطبيق Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) على بوابة Polkadot / Substrate. **تحقق من الزاوية اليسرى العلوية للتأكد من أنك متصل بـ Robonomics Parachain.**

2. انتقل إلى `الحسابات` -> `الحسابات` واضغط على زر `إضافة حساب`. ستظهر لك قائمة منبثقة تحتوي على بذرة الحساب.اثنان من الأشكال: *الذاكرة* (قابلة للقراءة بواسطة الإنسان) و *الخام* (سلسلة من الأرقام والحروف).

3. افتح `خيارات الإنشاء المتقدمة`، غير نوع العملة المشفرة للحساب الذي يتم إنشاؤه إلى `Edwards - ed25519` واضغط `التالي`.

4. احفظ عبارة البذرة الذاكرية بشكل آمن واضغط `التالي`.

5. في القائمة التالية، يجب عليك تعيين اسم الحساب وكلمة المرور. للراحة، سمّه `OWNER`. اضغط `التالي`.

6. في النافذة النهائية، انقر على `حفظ` لاكتمال إنشاء الحساب. سيتم أيضًا إنشاء ملفات JSON احتياطية يجب عليك تخزينها بشكل آمن. يمكنك استخدام هذا الملف لاحقًا لاستعادة حسابك إذا تذكرت كلمة المرور.

7. كرر هذه الخطوات لإنشاء حساب بالاسم `CONTROLLER`.


## إضافة حسابات إلى Polkadot.js

للراحة، يجب عليك استخدام [امتداد Polkadot.js](https://polkadot.js.org/extension/) وإضافة هذه الحسابات الجديدة إليه. بالنسبة لحساب ed25519، يمكنك فعل ذلك فقط باستخدام ملف JSON احتياطي. يمكنك استخدام الملفات التي تم حفظها عند إنشاء الحسابات.

يمكنك الحصول على هذه الملفات مرة أخرى عن طريق إنشاء ملف احتياطي للحساب. انقر على النقاط الثلاث المجاورة لحسابك، اختر `إنشاء ملف احتياطي لهذا الحساب` وأدخل كلمة المرور الخاصة بك.

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. افتح الامتداد واضغط على زر `+` في أعلى اليمين، ثم اختر `استعادة الحساب من ملف JSON الاحتياطي`.

2. في النافذة المفتوحة، قم بتحميل ملف JSON، أدخل كلمة المرور، واضغط `استعادة`.

3. تأكد من اختيار شبكة Robonomics للحسابات في امتداد Polkadot.js. انتقل إلى `الإعدادات` -> `البيانات الوصفية` على بوابة Polkadot / Substrate وانقر على زر `تحديث البيانات الوصفية`.

4. قم بتأكيد تحديث البيانات الوصفية في النافذة المنبثقة. سيظهر الآن الامتداد تسمية الشبكة التي يتم استخدام عنوانها.## تفعيل اشتراك Robonomics

{% roboWikiNote {type: "okay"}%} لهذه الخطوة، يجب أن تمتلك كمية كافية من رموز XRT (2-3 XRT كحد أدنى) في حساب `OWNER` الخاص بك. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. انتقل إلى تطبيق Robonomics وانتقل إلى [صفحة الاشتراك](https://robonomics.app/#/rws-buy). ثم، انقر على `Connect Account` في الشريط الجانبي الأيمن.

2. في القائمة المنبثقة التالية، قم بتوصيل امتداد Polkadot.js. سترى عنوان حسابك مع رصيده.

3. قبل الشراء، تأكد من تحديد حساب `OWNER`. انقر على أيقونة ملف التعريف الخاصة بالعنوان، ويجب أن ترى حساب `OWNER`.

4. في النهاية، انقر على زر `BUY SUBSCRIPTION` وأدخل كلمة المرور لحسابك. انتظر حتى يتم اكتمال عملية التنشيط. سترى حالة اشتراكك بعد فترة.

## إعداد اشتراكك

الآن عليك إعداد اشتراكك عن طريق إضافة حساب `CONTROLLER` إليه.

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. انتقل إلى تطبيق Robonomics وانتقل إلى [صفحة إعداد الاشتراك](https://robonomics.app/#/rws-setup). انتقل إلى قسم **GENERAL SETTINGS**.

2. احذف عبارة البذرة من حقل `Controller's seed phrase` وأدخل عبارة بذرة حساب `CONTROLLER` فيه.

3. انسخ عنوان `CONTROLLER`: افتح الامتداد وانقر على الرمز المجاور لاسم الحساب.

4. الصق هذا العنوان في حقل "التحكم" وانقر على زر "حفظ".

## إضافة حسابات إلى الاشتراك

الآن، تحتاج إلى إضافة حساب "التحكم" الخاص بك إلى **قائمة الوصول**.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. انتقل إلى تطبيق Robonomics وانتقل إلى [صفحة إعداد اشتراك](https://robonomics.app/#/rws-setup). تأكد من اختيار الاشتراك الصحيح وحساب "المالك".

2. انسخ عنوان "التحكم": افتح الامتداد وانقر على الرمز المجاور لاسم الحساب.

3. الصق هذا العنوان في حقل "عنوان بولكادوت" في قسم **المستخدمون في الاشتراك** وانقر على الزر `+`.

4. أدخل كلمة المرور لحساب "المالك" في نافذة البوب ​​آب، ثم انتظر اكتمال عملية التنشيط.