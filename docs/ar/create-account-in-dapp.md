---
title: إنشاء حساب لـ Robonomics Parachain 

contributors: [PaTara43, Fingerling42]
---

**للتفاعل والتشغيل مع Robonomics Parachain ، يحتاج المطورون والمستخدمون إلى إنشاء حساب على بوابة Polkadot / Substrate. يقوم الحساب بأداء وظائف أساسية للشبكة: عنوان الشبكة العامة (المفتاح العام) ، والتحكم في الوصول إلى العنوان والأموال (المفتاح الخاص) ، وإرسال المعاملات إلى الشبكة ، وعرض الرموز الخاصة بك وكميتها ، وما إلى ذلك. فيما يلي طريقتان رئيسيتان لإنشاء حساب لـ Robonomics Parachain.**

## 1. باستخدام امتداد المتصفح Polkadot{.js}

يوفر امتداد Polkadot آلية لإنشاء الحساب والتفاعل مع جميع مشاريع Polkadot / Kusama بما في ذلك Robonomics Parachain. هذه ليست أكثر الطرق أمانًا لإدارة حسابك ، ولكنها الأكثر ملاءمة من حيث التوازن بين الأمان والاستخدام.

## 1.1. تثبيت امتداد المتصفح

يتوفر امتداد المتصفح لـ [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) و [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (بالإضافة إلى المتصفحات القائمة على Chromium).

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. فتح تطبيق Robonomics Parachain

انتقل إلى [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) on Polkadot / Substrate Portal. If this is the first time you entered the portal, it will request access to the browser extension, so allow access. 

Once you've opened the app, take a look at the top left corner. The name of the network, its icon and the number of the last block are displayed tهنا. Clicking on this area will open a list of all Polkadot / Kusama networks, including test networks and local nodes. You can switch between networks by حددing the required one and pressing the `Switch` button. **Make sure you are connected to Robonomics Parachain now**. 

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. تحديث بيانات التمديد

من المرجح جدًا أن يطلب منك التطبيق تحديث بيانات التمديد لعرض المعلومات الصحيحة حول السلسلة التي تتصل بها. انتقل إلى **الإعدادات -> البيانات الوصفية** ، اضغط على زر `تحديث البيانات الوصفية` ، ثم في النافذة المنبثقة ، اسمح للامتداد بالقيام بذلك. 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. إنشاء حساب في التمديد

افتح امتداد المتصفح Polkadot{.js}. انقر فوق الزر الكبير زائد أو حدد `إنشاء حساب جديد` من الرمز الزائد الصغير في الزاوية العلوية اليمنى. يجب أن ترى القائمة التالية ، مع بذرة منجنيك المولدة على شكل اثني عشر كلمة والعنوان. 

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

البذرة هي مفتاحك للحساب. معرفة البذرة تسمح لك (أو لأي شخص آخر يعرف البذرة) بالسيطرة على هذا الحساب وإعادة إنشائه ، إذا نسيت كلمة المرور. **من المهم جدًا تخزينها في مكان آمن** ، يفضل على الورق أو جهاز غير رقمي ، وليس في التخزين الرقمي أو على الكمبيوتر. 

احفظ البذرة واضغط على `الخطوة التالية`. يجب أن ترى القائمة التالية.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* يسمح لك بتحديد الشبكات التي سيتم استخدام هذا الحساب حصريًا لها. يمكنك استخدام نفس العنوان على عدة شبكات ، ومع ذلك ، لأسباب الخصوصية ، يُوصَى بإنشاء عنوان جديد لكل شبكة تستخدمها. 
حدد شبكة Robonomics من قائمة السحب. إذا لم تتمكن من العثور على شبكة Robonomics ، فمن المحتمل أنك لم تقم بتحديث البيانات الوصفية ، فعد وافعل ذلك.

    - ستلاحظ أن تنسيق العنوان ورمز الحساب سيتغير - هذا أمر طبيعي. تمثل تنسيقات الشبكة المختلفة مجرد تمثيلات أخرى لنفس المفتاح العام. 

- *Name* تُستخدم فقط كاسم للحساب لاستخدامك الشخصي فقط. لا يتم تخزينها على سلسلة الكتل ولن يراها المستخدمون الآخرون. 

- *Password* تُستخدم لتشفير معلومات حسابك. ستحتاج إلى إعادة إدخالها عند توقيع المعاملات على البوابة. أنشئ واحدة وتذكرها.

نتيجة لذلك ، بعد إنشاء حساب ، ستراه في قائمة الحسابات في امتداد Polkadot{.js}. يمكنك بالنقر على النقاط الثلاث ، إعادة تسمية الحساب ، تصديره ، إزالته من الامتداد وتغيير الشبكة المستخدمة للحساب. 

أيضًا ، سيظهر الحساب في قائمة **الحسابات -> الحسابات** على البوابة ، حيث سيتم التأكيد على أنه تم حقنه باستخدام الامتداد.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")


## 2. مباشرة على تطبيق Robonomics Parachain

You can use the user interface on the Polkadot / Substrate Portal to create an حساب. It could be used for development and tests. 

## 2.1. فتح تطبيق Robonomics Parachain

Go to [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) على بوابة Polkadot / Substrate. **تحقق في الزاوية اليسرى العلوية من أنك متصل بـ Robonomics Parachain**.  

انتقل إلى **الحسابات -> الحسابات** واضغط على زر `إضافة حساب`. 

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. إنشاء حساب

يجب أن ترى قائمة البوب ​​التالية مع بذرة الحساب. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

لديها نموذجين: *Mnemonic* (قابل للقرءة من الإنسان) و *Raw* (سلسلة من الأرقام والحروف). احفظ عبارة البذرة بأمان واضغط على `التالي`.

> يمكنك أيضًا تغيير نوع التشفير لإنشاء الحساب ، لذلك افتح `خيارات الإنشاء المتقدمة` واختر النوع (`ed25519` في الصورة).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

في القائمة التالية ، يجب عليك تعيين اسم الحساب وكلمة المرور ، على غرار تعليمات التمديد الموضحة أعلاه.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

النقر على زر 'التالي' سيأخذك إلى النافذة الأخيرة. انقر على 'حفظ' لإنهاء إنشاء الحساب. سيتم أيضًا إنشاء ملفات JSON احتياطية يجب عليك تخزينها بأمان. يمكنك استخدام هذا الملف لاحقًا لاستعادة حسابك إذا تذكرت كلمة المرور.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 إضافة حساب ed25519 إلى امتداد Polkadot

قد تحتاج إلى إضافة الحساب الذي تم إنشاؤه إلى امتداد Polkadot.js (بالنسبة لحساب ed25519 ، يمكنك فعل ذلك فقط باستخدام ملف JSON الاحتياطي). لذلك ، تحتاج إلى إنشاء ملف احتياطي للحساب. اضغط على النقاط الثلاث في حسابك واختر 'إنشاء ملف احتياطي لهذا الحساب' واكتب كلمة المرور الخاصة بك.

![Backup file](../images/creating-an-account/backup-file.jpg)

ثم افتح امتدادًا واضغط على زر '+' في الزاوية العلوية اليمنى ، ثم اختر 'استعادة الحساب من ملف JSON الاحتياطي'.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

في النافذة المفتوحة ، اسحب الملف المحفوظ ، أدخل كلمة المرور واضغط على 'استعادة'.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. تم إنشاء الحساب بنجاح 

الآن يمكنك التعامل بشكل كامل مع حسابك الجديد. أرسل واستلم الرموز والرسائل واكتب datalog وأكثر من ذلك. لا تتردد في استكشاف جميع ميزات التطبيق. لنسخ عنوان حسابك ببساطة ، انقر فوق رمزه ، وسيتم نسخ العنوان إى الحافظة. 

إذا كنت ترغب في معرفة المزيد عن حسابات Polkadot / Kusama وطرق إنشائها الإضافية ، يمكن العثور على مزيد من المعلومات [هنا](https://wiki.polkadot.network/docs/learn-accounts) و [هنا](https://wiki.polkadot.network/docs/learn-account-generation).
