---
title: تفعيل الاشتراك
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

في هذه المقالة ستقوم بإنشاء حسابات Robonomics parachain وشراء اشتراك IoT. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


للتحكم في Home Assistant باستخدام Robonomics ، تحتاج إلى حسابين على Robonomics parachain. بالنسبة لأحد الحسابات (`sub_owner`) ، تشتري اشتراكًا Robonomics. سيتحكم الحساب الثاني (`sub_controller`) في جميع عمليات Home Assistant (مثل التلميتريا) وسيمنح الوصول للمستخدمين الآخرين. ستوفر هذه الحسابات الأمان لـ Home Assistant الخاص بك. 

<robo-wiki-note type="warning" title="WARNING">

يجب إنشاء كلا الحسابين بتشفير **ed25519**. ولهذا السبب، تحتاج إلى إنشاء حساب باستخدام واجهة مستخدم Polkadot-JS وتحديد التشفير المطلوب. 

تم تعطيل هذه الميزة بشكل افتراضي على واجهة المستخدم Polkadot-JS. لتمكينها ، انتقل إلى `Settings` -> `General` -> `account options` وحدد `Allow local in-browser account storage` في قائمة السقوط `in-browser account creation`.

</robo-wiki-note>

## إنشاء حسابات المالك والمراقب

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. انتقل إلى [تطبيق Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) على بوابة Polkadot / Substrate. **تحقق من الزاوية اليسرى العلوية للتأكد من أنك متصل بـ Robonomics Parachain.**

2. انتقل إلى `Accounts` -> `Accounts` واضغط على زر `Add account`. سترى قائمة منبثقة تحتوي على بذرة الحساب. لديها نموذجين: *Mnemonic* (قابل للقراءة من قبل الإنسان) و *Raw* (سلسلة من الأرقام والحروف). 

3. افتح `Advanced creation options` ، غير نوع التشفير لإنشاء الحساب إلى `Edwards - ed25519` واضغط على `Next`.


4. احفظ عبارة البذرة الذاكرة النصية بأمان واضغط على `التالي`.

5. في القائمة التالية ، يجب عليك تعيين اسم الحساب وكلمة المرور. اعطه اسم `sub_owner` للراحة. اضغط على `Next`.

6. في النافذة الأخيرة ، انقر فوق `Save` لإنهاء إنشاء الحساب. سيتم أيضًا إنشاء ملفات JSON احتياطية يجب عليك تخزينها بأمان. يمكنك استخدام هذا الملف لاحقًا لاستعادة حسابك إذا تذكرت كلمة المرور.

7. كرر هذه الخطوات لحساب بالاسم `sub_controller`.


## إضافة الحسابات إلى Polkadot.js

للراحة ، يجب عليك استخدام [امتداد Polkadot.js](https://polkadot.js.org/extension/) وإضافة هذه الحسابات الجديدة إليه. بالنسبة لحساب ed25519 ، يمكنك فعل ذلك فقط باستخدام ملف JSON احتياطي. يمكنك استخدام الملفات المحفوظة عند إنشاء الحسابات.

يمكنك الحصول على هذه الملفات مرة أخرى عن طريق إنشاء ملف احتياطي للحساب. انقر على النقاط الثلاث في حسابك ، اختر Create a backup file for this account`  واكتب كلمة المرور الخاصة بك.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. افتح الامتداد واضغط على زر `+` في الزاوية اليمنى العلوية ، ثم اختر `Restore account from backup JSON file`.

2. في النافذة المفتوحة ، قم بتحميل ملف JSON ، أدخل كلمة المرور واضغط على `Restore`.

3. تأكد من تحديد شبكة Robonomics للحسابات في امتداد Polkadot.js. على بوابة Polkadot / Substrate ، انتقل إلى `Setting` -> `Metadata` وانقر على زر `Update metadata`. 

4. قم بتأكيد تحديث البيانات الوصفية في النافذة المنبثقة. الآن سيعرض الامتداد تسمية الشبكة التي يتم استخدام العنوان لها.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## تفعيل اشتراك Robonomics 

<robo-wiki-note type="okay">

لهذه الخطوة ، يجب أن يكون لديك كمية كافية من رموز XRT (2-3 XRTs كحد أدنى) في حساب `sub_owner` الخاص بك.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. انتقل إلى تطبيق Robonomics dapp إلى [صفحة الاشتراك](https://dapp.robonomics.network/#/subscription) واضغط على توصيل الحساب في الشريط الجانبي الأيمن.

2. في القائمة المنبثقة التالية ، قم بتوصيل امتداد Polkadot.js. سترى عنوان حسابك مع الرصيد.

3. قبل الشراء ، تحقق من اختيار حساب `sub_owner`. اضغط على أيقونة ملف التعريف الخاصة بالعنوان ، يجب أن ترى حساب `sub_owner` تحت حقل `تحقق من حساب المالك`.

4. أخيرًا ، اضغط على زر `SUBMIT` وأدخل كلمة المرور الخاصة بحسابك. بعد ذلك ، انتظر حتى يتم الانتهاء من عملية التفعيل. سترى حالة اشتراكك بعد فترة من الزمن.


## إضافة الحسابات إلى الاشتراك

أنت الآن بحاجة إلى إضافة حساب "وحدة تحكم فرعية" إلى **قائمة الوصول**.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. افتح الامتداد وانقر على الرمز بجوار اسم الحساب. سيتم نسخ عنوان الحساب.


2. الصق هذا العنوان في حقل `Robonomics parachain address` في جزء **إدارة الوصول**. أعطه اسمًا واضغط على زر `+`. 

3. كرر الخطوات 1 و 2 لحساب `sub_owner`.

4. اضغط على `Save`. أدخل كلمة مرور `sub_owner` الخاصة بك في نافذة النقاط المنبثقة وانتظر حتى يتم الانتهاء من عملية التفعيل.
