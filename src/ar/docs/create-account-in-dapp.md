---
title: إنشاء حساب لـ Robonomics Parachain

contributors: [PaTara43, Fingerling42]
---

**للتفاعل والتشغيل مع Robonomics Parachain، يحتاج المطورون والمستخدمون إلى إنشاء حساب على بوابة Polkadot / Substrate. يقوم الحساب بأداء وظائف أساسية للشبكة: عنوان الشبكة العام (المفتاح العام)، ومراقبة الوصول إلى العنوان والأموال (المفتاح الخاص)، وإرسال المعاملات إلى الشبكة، وعرض الرموز الخاصة بك وكميتها، وما إلى ذلك. فيما يلي طريقتان رئيسيتان لإنشاء حساب لـ Robonomics Parachain.**

## 1. استخدام إضافة المتصفح Polkadot{.js}

توفر إضافة Polkadot آلية لإنشاء الحساب والتفاعل مع جميع مشاريع Polkadot / Kusama بما في ذلك Robonomics Parachain. هذه ليست الطريقة الأكثر أمانًا لإدارة حسابك، ولكنها الأكثر ملاءمة من حيث توازن الأمان / الاستخدام.

## 1.1. تثبيت إضافة المتصفح

تتوفر إضافة المتصفح لـ [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) و [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (بالإضافة إلى متصفحات تعتمد على Chromium).

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"إضافة المتصفح"} %}{% endroboWikiPicture %}

## 1.2. فتح تطبيق Robonomics Parachain

انتقل إلى [تطبيق Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) على بوابة Polkadot / Substrate. إذا كانت هذه هي المرة الأولى التي تدخل فيها إلى البوابة، ستطلب الوصول إلى إضافة المتصفح، لذا قم بالسماح بالوصول.

بمجرد فتح التطبيق، انظر إلى الزاوية اليسرى العلوية. يتم عرض اسم الشبكة، ورمزها، ورقم الكتلة الأخيرة هناك. بالنقر فوق هذا المنطقة، ستفتح قائمة بجميع شبكات Polkadot / Kusama، بما في ذلك الشبكات التجريبية والعقد المحلية. يمكنك التبديل بين الشبكات عن طريق تحديد الشبكة المطلوبة والضغط على الزر `Switch`. **تأكد من أنك**متصلة بـ Robonomics Parachain الآن**.

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"تطبيق Robonomics Parachain"} %}{% endroboWikiPicture %}

## 1.3. تحديث بيانات الامتداد وإنشاء حساب في المتصفح

من المحتمل جدًا أن يطلب منك التطبيق تحديث البيانات الوصفية للامتداد لعرض المعلومات الصحيحة حول السلسلة التي تم الاتصال بها. اذهب إلى **الإعدادات -> البيانات الوصفية**، اضغط على زر `تحديث البيانات` ثم، في نافذة البوب ​​أب، اسمح للامتداد بالقيام بذلك.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"تحديث البيانات الوصفية"} %}{% endroboWikiPicture %}

بشكل افتراضي، يعمل التطبيق على الويب فقط مع الحسابات الخارجية. للسماح بإنشاء حسابات جديدة مباشرة في المتصفح، انتقل إلى **الإعدادات -> عام -> خيارات الحساب -> إنشاء حساب في المتصفح**، اختر `السماح بتخزين الحساب المحلي في المتصفح` واضغط على زر `حفظ`.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"تحديث إنشاء الحساب في المتصفح"} %}{% endroboWikiPicture %}

## 1.4. إنشاء حساب في الامتداد

افتح امتداد المتصفح Polkadot{.js}. انقر على الزر الزائد الكبير أو حدد `إنشاء حساب جديد` من الرمز الزائد الصغير في الزاوية اليمنى العلوية. يجب أن ترى القائمة التالية، مع بذرة منسقة من اثني عشر كلمة والعنوان.

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"إنشاء حساب، الخطوة الأولى"} %}{% endroboWikiPicture %}

البذرة هي مفتاحك إلى الحساب. معرفة البذرة تسمح لك (أو لأي شخص آخر يعرف البذرة) بالسيطرة على هذا الحساب وحتى إعادة إنشائه، إذا نسيت كلمة المرور. **من المهم جدًا تخزينها في مكان آمن**، يفضل على الورق أو جهاز غير رقمي آخر، وليس في تخزين رقمي أو على جهاز كمبيوتر.

احفظ البذرة واضغط على `الخطوة التالية`. يجب أن ترى القائمة التالية.

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"إنشاء حساب، الخطوة الثانية"} %}{% endroboWikiPicture %}


- *شبكة* يتيح لك اختيار الشبكات التي سيتم استخدام هذا الحساب حصريًا عليها. يمكنك استخدام نفس العنوان على عدة شبكات، ومع ذلك، لأسباب الخصوصية، يُوصى بإنشاء عنوان جديد لكل شبكة تستخدمها.
اختر شبكة Robonomics من قائمة السحب. إذا لم تتمكن من العثور على شبكة Robonomics، فمن المحتمل أنك لم تقم بتحديث البيانات الوصفية، عد إلى الوراء وافعل ذلك.

	`ستلاحظ أن تنسيق العنوان ورمز الحساب سيتغيران — هذا أمر طبيعي. تعتبر تنسيقات الشبكة المختلفة مجرد تمثيلات أخرى لنفس المفتاح العام.`

- *الاسم* هو فقط اسم الحساب لاستخدامك الشخصي. لا يتم تخزينه على سلسلة الكتل ولن يكون مرئيًا للمستخدمين الآخرين.

- *كلمة المرور* تُستخدم لتشفير معلومات حسابك. ستحتاج إلى إعادة إدخالها عند توقيع المعاملات على البوابة. أنشئ كلمة مرور وتذكرها.

وبعد إنشاء حساب، ستراه في قائمة الحسابات في امتداد Polkadot{.js}. بالنقر على ثلاث نقاط، يمكنك إعادة تسمية الحساب، تصديره، إزالته من الامتداد وتغيير الشبكة المستخدمة للحساب.

أيضًا، سيظهر الحساب في قائمة **الحسابات -> الحسابات** على البوابة، حيث سيتم التنويه بأنه تم حقنه باستخدام الامتداد.

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"إنشاء حساب ناجح"} %}{% endroboWikiPicture %}


## 2. مباشرة على تطبيق Robonomics Parachain

يمكنك استخدام واجهة المستخدم على بوابة Polkadot / Substrate لإنشاء حساب. يمكن استخدامه للتطوير والاختبارات.

## 2.1. افتح تطبيق Robonomics Parachain

انتقل إلى [تطبيق Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) على بوابة Polkadot / Substrate. **تحقق في الزاوية اليسرى العليا من أنك متصل بـ Robonomics Parachain**.

انتقل إلى **الحسابات -> الحسابات** واضغط على زر `إضافة حساب`.

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"تطبيق Robonomics Parachain"} %}{% endroboWikiPicture %}

## 2.2. إنشاء حساب

يجب أن ترى القائمة المنبثقة التالية مع بذرة الحساب.

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"Generating account seed"} %}{% endroboWikiPicture %}

تحتوي على نموذجين: *الكلمات الذاكرية* (قابلة للقراءة من قبل الإنسان) و *النص الخام* (سلسلة من الأرقام والحروف). احفظ عبارة البذرة بشكل آمن واضغط على `التالي`.

> يمكنك أيضًا تغيير نوع التشفير لإنشاء الحساب، لذلك افتح `خيارات الإنشاء المتقدمة` واختر النوع (`ed25519` على الصورة).

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"ed25519 crypto type account"} %}{% endroboWikiPicture %}

في القائمة التالية، تحتاج إلى تعيين اسم الحساب وكلمة المرور، على غرار تعليمات التمديد الموضحة أعلاه.


{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"Generating account name and password"} %}{% endroboWikiPicture %}

بالنقر على زر `التالي` ستنتقل إلى النافذة الأخيرة. انقر على `حفظ` لإنهاء إنشاء الحساب. سيتم أيضًا إنشاء ملفات JSON احتياطية يجب عليك تخزينها بشكل آمن. يمكنك استخدام هذا الملف لاحقًا لاستعادة حسابك إذا تذكرت كلمة المرور.

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"Successful account creation"} %}{% endroboWikiPicture %}

## 2.3 إضافة حساب ed25519 إلى تمديد Polkadot

قد تحتاج إلى إضافة الحساب الذي تم إنشاؤه إلى تمديد Polkadot.js (لحساب ed25519 يمكنك فعل ذلك فقط باستخدام ملف JSON الاحتياطي). لذلك، تحتاج إلى إنشاء ملف احتياطي للحساب. اضغط على النقاط الثلاث في حسابك واختر `إنشاء ملف احتياطي لهذا الحساب` واكتب كلمة المرور الخاصة بك.

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"Backup file"} %}{% endroboWikiPicture %}

ثم افتح التمديد واضغط على زر `+` في أعلى اليمين، ثم اختر `استعادة الحساب من ملف JSON الاحتياطي`.

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"Restore backup in extension"} %}{% endroboWikiPicture %}

في النافذة المفتوحة، اسحب الملف المحفوظ، أدخل كلمة المرور واضغط `استعادة`.

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"استعادة النسخ الاحتياطي في التمديد 2"} %}{% endroboWikiPicture %}

## 3. تم إنشاء الحساب بنجاح

الآن يمكنك التحكم بشكل كامل في حسابك الذي تم إنشاؤه حديثًا. قم بإرسال واستقبال الرموز، والرسائل، وكتابة سجل البيانات، والمزيد. لا تتردد في استكشاف جميع ميزات التطبيق. لنسخ عنوان حسابك ببساطة، انقر فوق رمزه، وسيتم نسخ العنوان إلى الحافظة.

إذا كنت ترغب في معرفة المزيد حول حسابات Polkadot / Kusama وطرق إنشائها الإضافية، يمكن العثور على مزيد من المعلومات [هنا](https://wiki.polkadot.network/docs/learn-accounts) و [هنا](https://wiki.polkadot.network/docs/learn-account-generation).