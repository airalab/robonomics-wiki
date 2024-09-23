---
title: واجهة Python و Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**بعض العمليات الخارجية المنفذة في البليتات Robonomics صعبة التقديم من تطبيق Polkadot. بالإضافة إلى ذلك، هناك حاجة للتفاعل مع هذه الوظيفة باستخدام لغات البرمجة. لهذا الغرض تم تطوير أداة Python بسيطة تسمى [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). إنها عبارة عن غلاف فوق [py-substrate-interface](https://github.com/polkascan/py-substrate-interface) الذي يتم الاحتفاظ به بواسطة polkascan. فيما يلي وصف موجز لهذه الحزمة وبعض الروابط والأمثلة المفيدة. كما يتم مناقشة أدوات واجهة سطر الأوامر.**

## واجهة robonomics

متوفرة على [PyPi](https://pypi.org/project/robonomics-interface/) الحزمة جاهزة للتنزيل والإعداد.
هناك وثائق مفصلة تم إنشاؤها بواسطة docstring [التوثيق](https://multi-agent-io.github.io/robonomics-interface/) متاحة أيضًا.

بشكل عام، هذه أداة للمطورين الذين يرغبون في التفاعل مع سلسلة كتل Robonomics عبر أدوات البرمجة. تستخدم جميع مشاريع Python التابعة لفريق Robonomics التي تتفاعل مع الباراشين هذه الواجهة.

### التثبيت

يتطلب عملية التثبيت من المستخدم أن يكون لديه Python 3.8 على الأقل مثبتًا. لا تتطلب الهندسات `x86` أو `arm7` أو `arm8` عملية تجميع. تم بناء جميع العجلات ونشرها بواسطة محافظي التبعيات.

يتم استخدام `pip` كأداة تثبيت:

```bash
$ pip3 install robonomics_interface
```

### استخدام عينة

الفكرة الرئيسية هي إنشاء مثيل `Account` ثم استخدامه لإنشاء مثيلات مخصصة للبليت.

```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"العقد المحلي", type: "note"}%}
  من الممكن أيضًا استخدام نقاط نهاية مخصصة (على سبيل المثال، العقد المحلي للاختبار):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

يمكن أيضًا تقديم العمليات الخارجية:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("مرحبًا، Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # هذا تجزء العملية الخارجية
```

{% roboWikiNote {title:"الوثائق", type: "note"}%}كما تم ذكره، تتوفر المزيد من الأمثلة على الصفحة [التوثيق](https://multi-agent-io.github.io/robonomics-interface/). {% endroboWikiNote %}

## أداة واجهة سطر الأوامر

تحتوي `robonomics-interface` أيضًا على أدوات واجهة سطر الأوامر `click` في Python للاستخدام في أغراض النمذجة والاختبارات السريعة. يتم تثبيتها مع الحزمة ومتاحة في الطرفية:

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   Subscribe to datalog/launch events in the chain
#  write  Send various extrinsics (launch commands or record datalogs)
```

يمكنك تجربتها مع العقد المحلي. تم اعتماد فلسفة الأنابيب:

```bash
$ echo "مرحبًا، Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # هذا تجزء العملية الخارجية
```