---
title: التوائم الرقمية
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**تخيل أن لديك جهاز معقد أو نظام يحتوي على عدة وحدات للصيانة ويتطلب عدة حسابات للاستخدام. للحفاظ على جميعها في مكان واحد أو لتشفير بعض الوظائف بحسابات منفصلة أو، على سبيل المثال، لتعيين مصادر بيانات مختلفة لتدفقات المعلومات المختلفة، يجب استخدام وحدة التوأم الرقمي.**

<robo-wiki-note type="warning" title="Dev Node">

  يرجى الانتباه إلى أن هذه الدروس والتعليمات التالية تتم على نسخة محلية من نود روبونوميكس. قم بإعداد النسخة الخاصة بك باستخدام [هذه التعليمات](/docs/run-dev-node).

</robo-wiki-note>

## نظرة عامة على النظرية
يمكن لأي حساب إنشاء وإدارة توأم رقمي. يمكن تخيل التوأم على أنه نوع من الجدول يحتوي على المحتويات التالية:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


حيث:
* **DT id** هو فهرس فريد للتوأم الرقمي غير الموقع.
* **Topic name** هو بيانات `H256` بتنسيق ست عشري أو ASCII بطول 32 بايتًا، نفس طول [`إطلاق`](/docs/launch) المعلمة الخارجية. 
على سبيل المثال: `0x1234....FF` أو `hello.parachain.robonomics.world`.
* **Source** - هو عنوان حساب ما.

<robo-wiki-note type="note" title="Topics">

  كما تم مناقشته سابقًا في نظرة عامة على المعلمة الخارجية للإطلاق، يمكن تمثيل `H256` على أنه معرف IPFS مشفر (انظر
  [أداة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) لذلك).
  بالتالي، يمكن استخدام المواضيع كتخزين بيانات أيضًا، على سبيل المثال، وصف وحدة التوأم.

</robo-wiki-note>


## إنشاء توأم رقمي

### 1. انتقل إلى المطور -> العمليات الخارجية

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. اختر digitalTwin -> create من القائمة المنسدلة للمعلمات الخارجية الممكنة

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

قدم المعامل. هنا، لا توجد معلمات مطلوبة لإنشاء توأم. سيتم منحه فهرس وسيكون فقط مالك التوأم الرقمي قادرًا على إضافة/تعديل مواضيع التوأم من الآن فصاعدًا.

يمكن العثور على معرف التوأم في صفحة نظرة عامة على المستكشف.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## إضافة موضوع

### اختر digitalTwin -> setSource من القائمة المنسدلة للمعلمات الخارجية الممكنة

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - معرف التوأم الرقمي، الذي تم الحصول عليه من صفحة استكشافr.
* `topic` - اسم الموضوع `H256` المناقش سابقًا. في هذه الصورة، إنه سلسلة مكونة من 32 رمزًا.
* `source` - عنوان الحساب المرتبط بالموضوع.

<robo-wiki-note type="note" title="Overwrite">

  توجه انتباهك إلى أنه يمكن استبدال الموضوع بعنوان مصدر آخر إذا لزم الأمر.

</robo-wiki-note>

قم بتوقيع وتقديم المعلمة الخارجية.

## Explore

يمكنك العثور على جميع المعلومات حول التوائم الرقمية الموجودة في وحدة تخزين `Developer -> Chain state` `digitalTwin`.

- إجمالي عدد التوائم - `total()`;
- مالك التوأم الرقمي - `owner(u32)`;
- معلومات حول مواضيع التوأم الرقمي - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />