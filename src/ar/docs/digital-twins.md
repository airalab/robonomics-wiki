---
title: التوائم الرقمية
contributors: [nakata5321, PaTara43]

tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**تخيل أن لديك جهاز معقد أو نظام يحتوي على عدة وحدات للصيانة ويتطلب عدة حسابات للاستخدام. للحفاظ على كل هذه العناصر في مكان واحد أو لتشفير بعض الوظائف باستخدام حسابات منفصلة أو على سبيل المثال لتحديد مصادر بيانات مختلفة لتدفقات المعلومات المختلفة، يجب استخدام وحدة التوأم الرقمي.**

{% roboWikiNote {title:"نقطة تطوير", type: "warning"}%} يرجى الانتباه إلى أن هذه الدروس والتعليمات التالية تُظهر على نسخة محلية من نقطة Robonomics. قم بإعداد الخاصة بك باستخدام [هذه التعليمات](/docs/run-dev-node).
{% endroboWikiNote %}

## نظرة عامة على النظرية
يمكن لأي حساب إنشاء وإدارة توأم رقمي. يمكن تخيل التوأم على أنه نوع من الجدول يحتوي على المحتويات التالية:

| معرف التوأم  | اسم الموضوع 	| المصدر    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


حيث:
* **معرف التوأم** هو فهرس فريد غير موقع للتوأم الرقمي.
* **اسم الموضوع** هو بيانات `H256` السداسية عشرية أو ASCII بطول 32 بايتًا، نفس معلمة العمل الزائدة [`Launch`](/docs/launch).
على سبيل المثال: `0x1234....FF` أو  `hello.parachain.robonomics.world`.
* **المصدر** - هو عنوان حساب معين.

{% roboWikiNote {title:"المواضيع", type: "note"}%} كما تم مناقشته سابقًا في نظرة عامة على معلمة العمل الزائدة، يمكن تمثيل `H256` على أنه معرف IPFS CID مشفر (انظر [أداة Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) لذلك).
بالتالي، يمكن استخدام المواضيع كتخزين بيانات أيضًا، على سبيل المثال، وصف وحدة التوأم. {% endroboWikiNote %}


## إنشاء توأم رقمي

### 1. انتقل إلى المطور -> العمليات الزائدة

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. اختر digitalTwin -> create من القائمة المنسدلة للعمليات الزائدة الممكنة

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

قم بإرسال المعاملة. هنا، لا تحتاج إلى معلمات لإنشاء توأم. سيتم منحه فهرسًا وسيكون مالك التوأم الرقمي الوحيد القادر على إضافة/تعديل مواضيع التوأم من الآن فصاعدًا.

يمكن العثور على معرف التوأم على صفحة نظرة عامة على المستكشف.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## إضافة موضوع

### اختر digitalTwin -> setSource من القائمة المنسدلة للعمليات الزائدة الممكنة

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - معرف التوأم الرقمي، الذي تم الحصول عليه على صفحة المستكشف.
* `topic` - اسم الموضوع `H256` المناقش سابقًا. في هذه الصورة، إنه سلسلة من 32 رمزًا.
* `source` - عنوان الحساب الذي سيتم ربطه بالموضوع.

{% roboWikiNote {title:"الكتابة فوق", type: "note"}%} تنبيه بأنه يمكن الكتابة فوق الموضوع بعنوان مصدر آخر إذا لزم الأمر. {% endroboWikiNote %}

قم بتوقيع وإرسال العملية الزائدة.

## استكشاف

يمكنك العثور على جميع المعلومات حول التوائم الرقمية الحالية في وحدة تخزين `Developer -> Chain state` `digitalTwin`.

- عدد إجمالي للتوائم - `total()`;
- مالك التوأم الرقمي - `owner(u32)`;
- معلومات حول مواضيع توأم رقمي - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}