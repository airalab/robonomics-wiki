---
title: المسؤولية
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**لتحويل الروبوتات إلى عوامل اقتصادية، يحتاج المرء إلى أداة تعاقدية للقيام بذلك. الوفاء بالمسؤولية - منصة Robonomics التي تنفذ العقود بين حسابات Parachain!**

<robo-wiki-note type="warning" title="Dev Node">

  يرجى الانتباه إلى أن هذا البرنامج التعليمي معروض على مثيل محلي لـ Robonomics Node. قم بإعداده باستخدام [هذه التعليمات](/docs/run-dev-node).

</robo-wiki-note>

## نظرة عامة على النظرية

بالعودة إلى إثناوم، كان هناك هيكل معقد جدًا لتفاعل المسؤولية. يمكنك التعرف عليه [هنا](/docs/robonomics-how-it-works). في هذه الأيام أصبحت الأمور أسهل قليلاً مع كوساما!

### المفاوضات

لتوقيع العقد، يحتاج الجانبان إلى التفاوض أولاً. يمكن إجراء ذلك بعدة طرق، بما في ذلك [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) أو Robonomics PubSub. عينة من كود Python باستخدام Robonomics PubSub هي
معروض [هنا](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub). 

العرض والطلب عبارة عن رسائل تحتوي على خاصيتين رئيسيتين للعقد: **الوصف الوظيفي** و **السعر**. يجب أن يصمم المستخدم تنسيق الرسالة لكل تطبيق محدد. ليس من المهم في عملية المفاوضات اتباع قاعدة صارمة بشأن الشكل. يتم عرض التدفق المحتمل في الصورة أدناه.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  يرجى ملاحظة أن PubSub هو بروتوكول مفتوح ، لذا يجب عدم نقل أي بيانات حساسة. لهذا يجب عليك استخدام بروتوكولات أخرى.

</robo-wiki-note>


### التوقيعات

عندما تنتهي المفاوضات بنجاح، يحتاج كل جانب إلى التوقيع على ما يسمى باتفاقه المسمى بالتوقيع. هذه رسالة تحتوي على الوصف الوظيفي والسعر **بصيغة محددة** موقعة بمفتاح خاص للحساب. توجد [أداة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.المسؤولية.sign_liability) لذلك أيضًا.
 - يُطلق على وصف الوظيفة اسم **التقنيات**. هذا هو سلسلة طويلة بطول 32 بايتًا يمكن أن تكون CID مشفرة.
 - يُطلق على السعر اسم **الاقتصاد**. هذا هو عشري XRT - واينر. 1 واينر = 10 ** -9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  يمكن للشخص الحصول على [IPFS](https://ipfs.tech/) CID بتنسيق مناسب باستخدام [مكتبة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  عند استخدام وظيفة `sign_liability` ، لا حاجة لتحويل الهاش ، سيتم ذلك تلقائيًا.

</robo-wiki-note>

بعد المثال على القهوة:

1. المهمة هي JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. تكون CID الخاص بها هو `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. لذا فإن **التقنيات** (CID المحول) هو `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **الاقتصاد** هو `1.5 XRT`.

عند التوقيع، حان الوقت لإنشاء مسؤولية! يمكن أن يتم ذلك عن طريق أحد الطرفين (إما الوعد أو الوعد) أو عن طريق حساب طرف ثالث لما يسمى بالمزود.

## إنشاء المسؤولية

### التحضيرات

وكما ذكرنا سابقًا، يشارك جانبان على الأقل في هذه العملية. في هذا المثال، دعونا نستخدم ثلاثة وننشئ موفرًا منفصلاً لهذا الغرض. لنفترض أن المفاوضات جرت بطريقة أو بأخرى بالفعل.

### 1. انتقل إلى Developer -> Extrinsics

<robo-wiki-picture src="liability/balances.jpg" />

هنا قمنا بتزويد المزود بـ 100 XRT للتوقيع على المسؤوليات الخارجية، وتم منح الوعد 2 XRT لدفع ثمن العمل.
لم يتم منح المتعهد أي أموال (باستثناء الوديعة القائمة على الوجود بمقدار 1 mXRT على الأقل).

### 1. انتقل إلى Developer -> Extrinsics الخارجية

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. اختر المسؤولية -> إنشاء من قائمة الاستخراجات الممكنة

اختر أيضًا الحساب الذي ترغب في تقديم الاستخراج معه. قم بملء جميع المعلمات.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="التوقيعات">

  نظرًا لأن المزود يستخدم هنا ، لا حاجة لمعرفة بذور المشاركين. فقط توقيعاته المطلوبة.

</robo-wiki-note>

### 3. قم بإرسال العملية

<robo-wiki-picture src="liability/submit.jpg" />

### 4. استعراض المسؤولية الخاصة بك في الأحداث

للقيام بذلك، انتقل إلى "Network -> Explorer" وابحث عن قائمة الأحداث على اليمين. انقر على أيقونة المثلث للتوسيع.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  يمكن تحويل التجزئة إلى IPFS CID باستخدام نفس [أداة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. استكشاف التخزين

يمكنك أيضًا استكشاف بعض الخصائص للمسؤوليات في وحدة التخزين `liability`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  تظهر وظيفة التخزين `Next Index` أحدث فهرس للمسؤولية +1 ، لذلك على الرغم من أنها `1` ، يتم استكشاف المسؤولية `0`.

</robo-wiki-note>

## التقارير

تخيل أن القهوة تم إعدادها والآن يحتاج جهاز صنع القهوة إلى الإبلاغ عنها بطريقة ما. هنا تأتي تقارير المسؤولية إلى الساحة. كدليل على العمل ، يضيف الحساب CID آخر كمحتوى تقرير عند إنهاء المسؤولية الحالية. هذا مرة أخرى يتطلب توقيع المتعهد.

<robo-wiki-note type="note" title="Report signature">

  تحتوي الرسالة الموقعة على مؤشر المسؤولية الحالي ومعرف IPFS CID للتقرير المشفر بتمثيل 32 بايت. مرة أخرى ، يمكن أن يساعد [أداة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) في توقيع التقرير.

</robo-wiki-note>

مع مثال آلة القهوة:

1. التقرير هو JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. معرف IPFS CID الخاص به هو `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. لذا فإن **الحمولة** (CID المحولة) هي `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **المؤشر** هو `0` وهو المؤشر الحالي للمسؤولية.

### 1. انتقل إلى extrinsics ، liability -> finalize(report)

املأ المعلمات وأرسلها خارجيًا. مرة أخرى، قد يتم ذلك عن طريق حساب جهة خارجية.

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  تنبيه: يجب أن يكون حساب المتعهد غير "ميت" - يجب أن يكون لديه الإيداع الحيوي بحد أدنى 1 mXRT.

</robo-wiki-note>

قم بتوقيع وإرسال التقرير. عند الانتهاء ، يمكنك استكشافه في الأحداث.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. استكشاف reports

يمكنك أيضًا ملاحظة التقرير في المخزن. انتقل إلى `Developer -> Storage` واختر `المسؤولية` من القائمة المنسدلة.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. التحقق من الأرصدة

في الصورة يتم عرض أن المتعهد حصل على "salary"". حدثت علاقة اقتصادية!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  في الوقت الحالي ، ليس هناك طريقة للتحقق مما إذا تم الانتهاء من العمل ، لذلك بمجرد أن يقوم المتعهد بالإبلاغ ، يتم تحويل الرموز إلى حسابه.
  سيتم إضافة ميزة التحقق في المستقبل.

</robo-wiki-note>