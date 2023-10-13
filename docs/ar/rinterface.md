---
title: واجهة Python و Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**بعض العمليات الخارجية المنفذة في حزم Robonomics من الصعب تقديمها من تطبيق Polkadot. بالإضافة إلى ذلك، هناك 
حاجة للتفاعل مع هذه الوظائف باستخدام لغات البرمجة. لهذا الغرض تم تطوير أداة Python بسيطة
called [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). إنه غلاف فوق صيانة polkascan
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface). فيما يلي وصف موجز لهذه الحزمة
وبعض الروابط والأمثلة المفيدة. أيضًا، يتم مناقشة أدوات CLI.**

## robonomics-interface

متاح على [PyPi](https://pypi.org/project/robonomics-interface/) حزمة جاهزة للتنزيل والإعداد.
هناك وثائق مفصلة تم إنشاؤها بواسطة docstring [documentation](https://multi-agent-io.github.io/robonomics-interface/) متاحة أيضًا.

في النهاية، هذه أداة للمطورين الذين يرغبون في التفاعل مع سلسلة كتل Robonomics عبر أدوات البرمجة. تقريبًا 
جميع مشاريع Python لفريق Robonomics التي تتفاعل مع الباراشين تستخدم هذه الواجهة.

### التثبيت

تتطلب عملية التثبيت من المستخدم تثبيت Python 3.8 على الأقل. لا يوجد `x86` أو `arm7` أو `arm8`.
عملية تجميع. يتم بناء ونشر جميع العجلات من قبل مسؤولي الاعتماديات.

يتم استخدام `pip` كأداة تثبيت:

```bash
$ pip3 install robonomics_interface
```

### استخدام عينة

الفكرة لرئيسية هي إنشاء مثيل `Account` ثم استخدامه لإنشاء مثيلات مخصصة للحزم.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  من الممكن أيضًا استخدام نقاط النهاية المخصصة (على سبيل المثال، العقد المحلي للاختبار):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

من الممكن أيضًا تقديم العمليات الخارجية:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  كما تم ذكره، تتوفر المزيد من الأمثلة على صفحة [documentation](https://multi-agent-io.github.io/robonomics-interface/) .

</robo-wiki-note>

## CLI tool

`robonomics-interface` يحتوي أيضًا على أدوات CLI لـ Python `click` للاستخدام في أغراض النمذجة الأولية والاختبارات السريعة. يتم تثبيتها
مع الحزمة ومتاحة في الطرفية:

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

يمكنك محاولة استخدامها مع العقد المحلي. تم اعتماد فلسفة الأنابيب:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```