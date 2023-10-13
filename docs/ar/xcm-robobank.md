---
title: مجموعة اختبارات Substrate Cumulus Parachain للرسائل بين السلاسل الجانبية 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


الهدف الرئيسي لهذا المشروع هو تبسيط تطوير وقت التشغيل الخاص بالسلاسل الجانبية عند استخدام الرسائل بين السلاسل الجانبية. 
يتيح تطوير رمز التشغيل مع اختبارات الدمج ذات درجة عالية من التكرارية وسهولة الاستخدام.
يقوم بتلقائي بناء وإعداد تكوين الشبكة المحددة مسبقًا (أي سلسلة واحدة للتوجيه + سلسلتان جانبيتان) ، وإعداد قنوات الإرسال بين السلاسل الجانبية وتشغيل اختبارات الرسائل ، وإرسال الرسائل ، باستخدام استدعاء لوقت التشغيل ، كل ذلك مُنشأ ومُركب بلغة Python.

يتم استخدام XCM Testsuite لاختبار دورة الإنتاج لـ Robobank - مجموعة من الوحدات الفرعية ، التي تسمح للروبوتات بالتسجيل في سلاسل جانبية خارجية ، واستلام الطلبات المدفوعة مسبقًا ، وتنفيذها واستلام المدفوعات باستخدام الرموز الخارجية. يتيح ذلك للروبوتات العمل داخل شبكة Robonomics مع كل البنية التحتية المطلوبة ، ولكن في الوقت نفسه ، تقدم خدماتها على أي سلسلة جانبية أخرى.

متوفر مقطع فيديو توضيحي على [YouTube](https://www.youtube.com/watch؟v=S_bZgsxngiM)

الخطوات الرئيسية في سيناريو العرض التوضيحي هي:
- تشغيل سلسلة توجيه وسلسلتين جانبيتين في حزمة من 6 عمليات
- إعداد قنوات الرسائل XCM بين السلاسل الجانبية
- تسجيل روبوت في كلتا السلاسل الجانبية
- إنشاء طلب لهذا الروبوت في سلسلة العميل (احتياطي الدفع لإكمال الطلب)
- إرسال رسالة XCM إلى سلسلة Robonomics
- إنشاء سجل الطلب "المعكوس" على سلسلة Robonomics
- يقبل الروبوت الطلب على سلسلة Robonomics
- إرسال رسالة XCM حول قبول الطلب إلى سلسلة العميل
- قبول الطلب على سلسلة العميل (احتياطي رسوم الجزاء عن عدم إكمال الطلب حتى الموعد النهائي للطلب)
- يكمل الروبوت الطلب على سلسلة Robonomics
- إرسال رسالة XCM حول إكمال الطلب إلى سلسلة العميل
- تسوية جميع المدفوعات (يتم نقل دفعة العميل إلى الروبوت ، بالإضافة إلى رسوم الجزاء غير المستخدمة)
- إغلاق الطلب1


## المصدر
هذا المشروع هو نسخة مشتقة من
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
يحتوي على رمز الوقت التشغيل الذي يتم اختباره.
كما في رمز العقدة الأصلي للسلاسل الجانبية في الدليل "./pallets" ، "./runtime" ، "./node".

الاختلافات مع "substrate-node-template" الأصلي:
- هذا الوقت التشغيل للمجمع لديه وحدة معالجة HRMP ويمكنه التعامل مع الرسائل من السلاسل الجانبية الشقيقة
- وحدة اختبار الوقت التشغيل الوهمية جاهزة للاختبارات الداخلية لـ XCM

## بناء وتشغيل
الإعداد الموصى به (بشدة): 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[ملاحظة] يمكن أن يستغرق البناء الأول الكثير من الوقت ، حتى عدة ساعات على الأجهزة غير المثلى.

[ملاحظة] يعمل البرنامج النصي مع الإصدارات الثابتة (تجزئة الهاشات) من Polkadot (Rococo) في سلسلة التوجيه والسلاسل الجانبية.

[ملاحظة] بشكل افتراضي ، يقوم البرنامج النصي بإعادة إنشاء نفس البيئة في كل مرة يتم فيها تشغيله ، عن طريق إزالة جميع الحالات السابقة. يمكن تغيير هذا السلوك في "config.sh" باستخدام "PERSISTENT" param.


تشغيل بناء وبرنامج الإعداد.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

الإجراءات الأساسية لبرنامج "init.sh":
 - قراءة التكوين (ملف "config.sh" مع رقم التنقيح ، ومفاتيح العقدة الأولية والمعرفات ، ومعلمة استمرارية بيانات السلسلة ، إلخ.)
 - إعداد حزم النظام الأساسية و Rust و Python
 - بناء برامج ثنائية منفصلة لسلسلة التوجيه وأيضًا لكل من السلاسل الجانبية
    - سيتم إنشاء البرامج الثنائية في الدليل ./bin. 
 - (اختياري) إزالة جميع بيانات السلسلة السابقة لجميع السلاسل
    - معطل إذا تم تعيين "PERSISTENT=1" في "config.sh"
 - يعمل كعمليات منفصلة (بأرقام معرفات العمليات وأنابيب الإدخال / الإخراج المنفصلة):
    - المحققون في سلسلة التوجيه (أي 4 محققين لتشغيل تنقيح Rococo المستقر)
    - مجمعو السلاسل الجانبية للسلسلة 100 (أي مجمع واحد لللسلة الجانبية الأولى التي تقوم بتطويرها)
    - مجمعو السلاسل الجانبية للسلسلة 200 (أي مجمع واحد للسلسلة الجانبية الثانية التي تقوم بتطويرها)
 - يطبع جميع نقاط النهاية والمنافذ إلى وحدة التحكم ، مما يتيح لك دراسة أي سلسلة باستخدام تطبيقات الواجهة الأمامية (مستكشف ، DApp)
 - استمر في طباعة جميع بيانات الإخراج لجميع السلاسل إلى وحدة التحكم

[تحذير] بعد التشغيل ، انتظر حتى يتم تشغيل الشبكة ، وتأكد من بدء تنفيذ الكتلة ، وأن السلاسل الجانبية مسجلة. يجب أن تستغرق هذه العمليات حوالي 5 دقائق (50 كتلة × 6 ثوانٍ).

## التحقق من أن الإعداد الأولي يعمل 

استخدم واجهة المستخدم الأمامية القياسية لـ Polkdot ونقاط النهاية المولدة "--ws-port" للاتصال بكل عقدة.
افتح [تطبيق Polkadot](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) لمراقبة السلاسل. 

### مثال:
Localhost ، 4 محققين لسلسلة التوجيه ، مجمع واحد للسلسلة الجانبية 100 ، مجمع واحد للسلسلة الجانبية 200:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


إذا عمل كل شيء، وبدأ التوافق، يمكننا المضي قدمًا في تشغيل حالات الاختبار الخاصة بنا (في نافذة الأوامر الجديدة).

### اختبار تمرير الرسائل UMP
```bash
./scripts/init.sh ump
```
يقوم بإنشاء رسالة `Balance.transfer` في `parachain-100` ويمرها إلى سلسلة الوساطة.
عندما تستلم سلسلة الوساطة الرسالة، ستقوم بتحويل 15 رمزًا من حساب `para 100` إلى حساب Charlie.


### اختبار تمرير الرسائل HRMP
```bash
./scripts/init.sh ump
```

يقوم بإنشاء رسالة `Balance.transfer` في `parachain-100` ويمررها إلى `sibling 200`.
قبل ذلك، يمنح حساب `subl 100` 1000 رمز وينشئ قناة اتصال بين الباراشينات.
```bash
./scripts/init.sh hrmp
```
يمكن إرسال رسائل أخرى عن طريق تشغيل الأمر الفرعي `hrmpm`. لا يقوم بإنشاء قناة وبالتالي يعمل بشكل أسرع.
```bash
./scripts/init.sh hrmpm
```

### المزيد من الخيارات
```bash
./scripts/init.sh help
```

## شبكة اختبار محلية

### إنشاء مواصفات سلسلة مخصصة
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

تحرير rococo_local.json، واستبدال معلمات الأرصدة والسلطات بالخاصة بك.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

عنوان Polkadot لـ //Alice//stash (تشفير sr25519).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

مفتاح جلسة Polkadot grandpa لـ //Alice (تشفير ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

عنوان Polkadot لـ //Alice (تشفير sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

تحويل rococo_local.json إلى التنسيق الخام.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
لاستخدام مواصفات سلسلة جديدة، استبدل ملف rococo.json في مجلد ./config/ بهذا الجديد وأعد تشغيل السلسلة.
```bash
./scripts/init.sh run
```
يمكنك تحرير الشفرة بحرية. سيقوم الأمر أعلاه بإعادة بناء المشروع وتحديث عقدة المجمع قبل البدء.
Cumulus هو برنامج قبل الإصدار لا يزال قيد التطوير الشاق.
نحن نستخدم التزامًا محددًا من polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15 18 مارس 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

يمكنك استخدام إصدارات أحدث من البرنامج. للقيام بذلك، قم بتغيير POLKADOT_COMMIT في ./scipt/config.sh
إلى أحدث التزام في فرع `rococo-v1`، احذف ./bin/polkadot، وقم بتشغيل 
```bash
./scripts/init.sh run
```

تحديث تبعيات مشروع المجمع 
```bash
cargo update
./scripts/init.sh build
```
قد تتطلب بعض التبعيات ميزات جديدة لأداة البرمجة Rust. يستند هذا المشروع إلى Rust `nightly-2021-01-26`
قم بتحديث إصدار أداة برمجة Rust في ./scripts/config.sh قبل البناء.

## اختراق الباراشين
[إضافة لوحة خارجية](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - يجب أن تكون في "تعلم المزيد" ربما؟
## Learn More

راجع [قالب العقدة في Substrate Developer Hub Node](https://github.com/substrate-developer-hub/substrate-node-template) لمعرفة المزيد عن هيكل هذا المشروع والقدرات التي يحتوي عليها والطريقة التي يتم بها تنفيذ تلك القدرات. يمكنك معرفة المزيد عن [مسار كتلة الباراشين](https://polkadot.network/the-path-of-a-parachain-block/) في مدونة Polkadot الرسمية. [ورشة عمل Parity Cumulus](https://substrate.dev/cumulus-workshop/#/)
