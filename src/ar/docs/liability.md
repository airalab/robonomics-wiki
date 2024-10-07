---
title: المسؤولية
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**لتحويل الروبوتات إلى وكلاء اقتصاديين، يحتاج المرء إلى أداة عقدية لذلك. تعرف على المسؤولية - Robonomics pallet تنفذ عقودًا بين حسابات الباراشين!**

{% roboWikiNote {title:"نقطة تطوير", type: "warning"}%} يرجى الانتباه إلى أن هذا البرنامج التعليمي يتم عرضه على نسخة محلية من Robonomics Node. قم بإعداد الخاص بك باستخدام [هذه التعليمات](/docs/run-dev-node).
{% endroboWikiNote %}

## نظرة عامة على النظرية

في Ethereum، كان هناك هيكل تفاعلي معقد للمسؤولية. يمكنك التعرف عليه [هنا](/docs/robonomics-how-it-works). الأمور أصبحت أسهل قليلاً مع Kusama اليوم!

### المفاوضات

لتوقيع عقد، يحتاج الجانبان إلى المفاوضة أولاً. يمكن القيام بذلك بعدة طرق، بما في ذلك [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) أو Robonomics PubSub. يتم تقديم عينة من الشيفرة بلغة Python باستخدام Robonomics PubSub [هنا](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

العرض والطلب هما رسائل تحتوي على خصائص رئيسية اثنتان لعقد: **وصف العمل** و**السعر**. يجب على المستخدم تصميم تنسيق الرسالة لكل تطبيق محدد. ليس من الضروري أن يتبع عملية المفاوضات قاعدة تنسيق صارمة. يتم تقديم التدفق المحتمل في الصورة أدناه.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} يرجى ملاحظة أن PubSub هو بروتوكول مفتوح، لذا لا ينبغي نقل بيانات حساسة. لهذا يجب عليك استخدام بروتوكولات أخرى.
{% endroboWikiNote %}

### التوقيعات

عندما تنتهي المفاوضات بنجاح، يحتاج كل جانب إلى توقيع اتفاقه المسمى بالتوقيع. هذه رسالة تحتوي على وصف العمل والسعر **بتنسيق محدد** موقعة بمفتاح خاص للحساب. هناك [أداة بلغة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) لذلك أيضًا.
 - وصف العمل يسمى **تقنيات**. هذا هو سلسلة طويلة بطول 32 بايت تشبه إطلاق العنان والتي يمكن أن تكون معرف IPFS مشفر.
 - السعر يسمى **اقتصاديات**. هذا هو عدد عشري XRT - واينر. 1 واينر = 10**-9 XRT.

{% roboWikiNote {title:"32 بايت", type: "note"}%} يمكن للشخص الحصول على معرف IPFS بتنسيق CID بطريقة صحيحة باستخدام [مكتبة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
عند استخدام وظيفة `sign_liability`، لا حاجة لتحويل الهاش، سيتم ذلك تلقائيًا.{% endroboWikiNote %}

وفقًا لمثال القهوة:

1. المهمة هي JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. معرف IPFS CID الخاص بها هو `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. لذا **التقنيات** (CID المحول) هو `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. **الاقتصاديات** هي `1.5 XRT`.

عند التوقيع، حان الوقت لإنشاء مسؤولية! يمكن القيام بذلك من قبل أحد الجانبين (إما المستفيد أو المتعهد) أو من حساب طرف ثالث يسمى مزود.

## إنشاء المسؤولية

### التحضيرات

كما تم ذكره سابقًا، يشارك على الأقل جانبان في العملية. لهذا المثال، دعونا نستخدم ثلاثة ونقوم بإنشاء مزود منفصل لهذا. لنفترض أن المفاوضات تمت بالفعل بطريقة ما.

### 1. إنشاء ثلاثة حسابات وإضافة أموال لها

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

هنا قمنا بتزويد المزود بـ 100 XRT لتوقيع extrinsics المسؤولية، تم منح المستفيد 2 XRT لدفع العمل. لم يتم منح المتعهد أي أموال (باستثناء الوديعة القائمة على الحياة بحد أدنى 1 mXRT).

### 1. انتقل إلى المطور -> Extrinsics

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. اختر liability -> create من القائمة المنسدلة لل extrinsics الممكنة

اختر أيضًا الحساب الذي تريد تقديم ال extrinsic به. قم بملء جميع المعلمات.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"التوقيعات", type: "note"}%} نظرًا لاستخدام مزود هنا، لا حاجة لمعرفة بذور المشاركين. فقط تحتاج تواقيعهم.
{% endroboWikiNote %}

### 3. تقديم المعاملة

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. استعراض المسؤولية في الأحداث

لذلك، انتقل إلى `Network -> Explorer` وابحث عن قائمة الأحداث على اليمين. انقر على رمز المثلث لتوسيعه.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"الهاش", type: "note"}%} يمكن تحويل الهاش إلى معرف IPFS CID باستخدام نفس [أداة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).
{% endroboWikiNote %}

### 5. استكشاف التخزين

يمكنك أيضًا استكشاف بعض الخصائص للمسؤوليات في وحدة التخزين `liability`.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"الفهرس التالي", type: "note"}%} تظهر وظيفة التخزين `Next Index` أحدث فهرس للمسؤولية +1، لذلك حتى لو كانت `1`، سيتم استكشاف المسؤولية `0`.
{% endroboWikiNote %}

## التقارير

تخيل أن القهوة قد تم إعدادها والآن يحتاج جهاز صنع القهوة إلى الإبلاغ عن ذلك بطريقة ما. هنا تأتي تقارير المسؤولية إلى الصورة. كدليل على العمل، يقوم الحساب بإضافة معرف IPFS CID آخر كمحتوى للتقرير عند إنهاء المسؤولية الحالية. هذا مرة أخرى يتطلب توقيع المتعهد.

{% roboWikiNote {title:"توقيع التقرير", type: "note"}%} الرسالة الموقعة تحتوي على فهرس المسؤولية الحالية ومعرف IPFS CID للتقرير المشفر بتمثيل 32 بايت. مرة أخرى، يمكن لـ [أداة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) المساعدة في توقيع التقرير.
{% endroboWikiNote %}

مع استمرار مثال جهاز صنع القهوة:

1. التقرير هو JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. معرف IPFS CID الخاص به هو `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. لذا **الحمولة** (CID المحول) هو `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **الفهرس** هو `0` وهو فهرس المسؤولية الحالية.

### 1. انتقل إلى extrinsics، liability -> finalize(report)

املأ المعلمات وقدم ال extrinsic. مرة أخرى، يمكن أن يتم ذلك بواسطة حساب طرف ثالث.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"الوديعة القائمة على الحياة", type: "warning"}%} تأكد من أن حساب المتعهد ليس "ميتًا" - يجب أن يحتوي على الوديعة القائمة على الحياة بحد أدنى 1 mXRT.
{% endroboWikiNote %}

قم بتوقيع وتقديم التقرير. عند الانتهاء، يمكنك استكشافه في الأحداث.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. استكشاف التقارير

يمكنك أيضًا مراقبة التقرير في التخزين. انتقل إلى `Developer -> Storage` واختر `liability` من القائمة المنسدلة.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. التحقق من الأرصدة

يُظهر الصورة أن الضامن الآن حصل على "الراتب". حدثت علاقة اقتصادية!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"التحقق", type: "ملاحظة"}%} حاليًا لا يوجد وسيلة للتحقق من أن العمل تم، لذلك بمجرد أن يقوم الضامن بالإبلاغ، يتم نقل الرموز إلى حسابه.
سيتم إضافة ميزة التحقق في المستقبل.
{% endroboWikiNote %}