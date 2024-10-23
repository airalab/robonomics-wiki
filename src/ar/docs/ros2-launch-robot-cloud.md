---
title: إطلاق روبوت من السحابة
contributors: [Fingerling42]
tools:   
  - Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**في هذا المقال، ستتعلم كيفية استخدام وظيفة الإطلاق في Robonomics في ROS 2 من خلال أمثلة متنوعة**

الميزة الرئيسية لسلسلة الكتل Robonomics لإرسال الأوامر إلى الأجهزة هي الوظيفة الخارجية للإطلاق. تسمح هذه الوظيفة لك بإرسال سلسلة تحتوي على معلمة (بشكل قيمة سداسية عشرية طويلة بطول 32 بايت) إلى عنوان محدد ضمن سلسلة الكتل. عادةً، تمثل السلسلة تجزء IPFS يشير إلى ملف يحتوي على المعلمات اللازمة لتنفيذ الأمر. يمكنك العثور على مزيد من التفاصيل حول وظيفة الإطلاق [في هذا المقال](https://wiki.robonomics.network/docs/launch/).

في Robonomics ROS 2 Wrapper، تم تنفيذ وظيفة الإطلاق كخدمة لإرسال الأوامر وكموضوع لاستقبال الأوامر.

## إرسال الإطلاق

الخدمة، تسمى `robonomics/send_launch`، تبدو كما يلي:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # سلسلة المعلمة أو اسم الملف الذي تحتوي على المعلمات التي يجب تحميلها إلى IPFS
string  target_address          # العنوان الذي سيتم تنشيطه بالإطلاق
bool    is_file         True    # هل هو معلمة إطلاقيحتاج ملف يجب رفعه إلى IPFS (الافتراضي هو صحيح)؟
bool    encrypt_status  True    # تحقق مما إذا كان يجب تشفير ملف المعلمة بالعنوان المستهدف، الافتراضي هو صحيح
---
string  launch_hash             # هاش لصفقة الإطلاق
```

{% endcodeHelper %}

يقبل الخدمة المعلمات التالية كجزء من الطلب: معلمة الأمر (إما سلسلة بسيطة أو اسم ملف يحتوي على معلمات الأمر)، العنوان المستهدف في شبكة Robonomics parachain لإرسال الإطلاق، وعلمين: أحدهما يشير إلى ما إذا كانت المعلمة ملفًا، والآخر يحدد ما إذا كان يجب تشفير الملف (كلاهما مضبوطان على صحيح افتراضيًا). سيتم رفع الملف إلى IPFS، وسيتم تمرير هاشه كمعلمة إطلاق. لذا، يجب وضع الملف في الدليل المخصص لملفات IPFS، كما هو محدد في ملف التكوين لعقدة `robonomics_ros2_pubsub`.

افتراضيًا، يتم تشفير الملف باستخدام العنوان العام لمستلم الإطلاق. الطريقة المستخدمة للتشفير هي التشفير العام بناءً على تشفير المنحنى البيضاوي Curve25519. في التنفيذ الحالي، يتم دعم التشفير فقط لعناوين الحساب من نوع ED25519 (Edwards) (يمكنك قراءة المزيد حول هذا في [هذه المقالة](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

بعد إرسال الإطلاق، تُرجع الخدمة هاش الصفقة.

## استقبال الإطلاق

استقباليتم تنظيم الإطلاقات في شكل موضوع مقابل. من الناحية التقنية، يستخدم العقد وظيفة robonomics-interface للاشتراك في حالة عنوانه الخاص وينتظر ظهور حدث `NewLaunch`. بمجرد حدوث الحدث، يقوم العقد بنشر رسالة إلى موضوع `robonomics/received_launch`. تتبع الرسالة الصيغة التالية:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # عنوان الحساب الذي أرسل أمر الإطلاق
string  param                   # سلسلة نصية تحتوي على المعلمة أو اسم الملف الذي يحتوي على المعلمات
```

{% endcodeHelper %}

تحتوي حقول الرسالة على العنوان الذي تم منه إرسال الإطلاق والمعلمة نفسها: إما سلسلة بسيطة أو اسم الملف الذي يحتوي على المعلمات التي تم تنزيلها من IPFS ووضعها في دليل العمل IPFS. إذا كان الملف مشفرًا، يتم فك تشفيره خلال هذه العملية.


## مثال مع Turtlesim

بعد ذلك، سنقدم كيفية استخدام وظيفة الإطلاق مع [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) كمثال. Turtlesim هو محاكي خفيف مصمم لتعلم ROS 2. يمكنك تثبيته باستخدام الأمر التالي:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

يتضمن حزمة Robonomics ROS 2 Wrapper حزمة مُعدة مُسبقًا تسمى `turtlesim_robonomics`، مُكيفة خصيصًا لـ Turtlesim. تُتيح لك هذه الحزمة اختبار جميع ميزات الواجهة. دعنا نجرب تشغيلها.

{% roboWikiNote {type: "warning", title: "تحذير"}%}

  يُرجى التأكد من وجود رصيد كافٍ في حسابك أو اشتراك نشط لأداء المعاملات.

{% endroboWikiNote %}

1. للبدء، قم بإنشاء ملف تكوين لنسخة pubsub من `turtlesim_robonomics` باستخدام القالب `config/robonomics_pubsub_params_template.yaml`. قم بملء الحقول المناسبة ببيانات اعتماد Robonomics الخاصة بك (بذرة الحساب، نوع العملة المشفرة، عنوان مالك الاشتراك). كما يجب تحديد دليل لملفات IPFS. بمجرد الانتهاء، قم بإعادة تسمية الملف، على سبيل المثال، `first_pubsub_params.yaml`.

2. قم بتشغيل IPFS Daemon:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. قم بتشغيل ملف ROS 2 launch التالي. سيبدأ جميع العقد اللازمة: Turtlesim نفسه، تنفيذ الواجهة لـ Turtlesim، و Robonomics pubsub:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params```.yaml النطاق:='turtlesim1'
```

{% endcodeHelper %}

سترى المحاكي مع السلحفاة، جنبًا إلى جنب مع سجلات ROS 2 في وحدة التحكم تعرض معرف IPFS، والمسار إلى الدليل الذي يحتوي على ملفات IPFS، وعنوان Robonomics، ومعلومات أخرى ذات صلة.

### تشغيل Turtlesim من بوابة Polkadot

1. يتم التحكم في Turtlesim عبر موضوع `/cmd_vel`، لذا تحتاج إلى تحضير الرسائل المقابلة وتضمينها في ملف، الذي سيتم استخدامه كمعلمة تشغيل. للراحة، تم تحضير هذه الرسائل في ملف JSON. أنشئ ملفًا (على سبيل المثال، `turtle_cmd_vel.json`) والصق ما يلي:

  {% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
```    }
  ]
  ```

  {% endcodeHelper %}

  هذا المثال JSON سيأمر السلحفاة بالتحرك مرتين.

2. بعد ذلك، يجب رفع الملف إلى IPFS. يمكنك اختيار أي طريقة، ولكن لهذا المثال، سنستخدم IPFS Kubo. افتح نافذة الأوامر في الدليل الذي يحتوي على ملف JSON وقم برفعه إلى IPFS:

{% codeHelper { copy: true}%}

```shell
ipfs add turtle_cmd_vel.json
```

{% endcodeHelper %}

  ستتلقى تجزئة IPFS للملف. تأكد من حفظها للاستخدام لاحقًا.

3. قبل إرسال الإطلاق، يجب تحويل تجزئة IPFS إلى سلسلة تتألف من 32 بايتًا. يمكن القيام بذلك باستخدام بعض الأوامر في Python. افتح نافذة الأوامر، قم بتشغيل مترجم Python 3، وقم بتشغيل الأوامر التالية:

{% codeHelper { copy: true}%}

```python
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
```

{% endcodeHelper %}

  احفظ السلسلة الناتجة للاستخدام لاحقًا.

4. افتح بوابة Robonomics [Polkadot/Substrate portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) وانتقلانتقل إلى علامة **المطورين** -> **الخارجيات**. حدد الخارجية `launch` -> `launch(robot, param)`. في حقل `robot`، ضع عنوان الروبوت الخاص بك، وفي حقل `param`، ضع السلسلة التي تحتوي على تحويل هاش IPFS. قم بإرسال المعاملة.

5. انتقل إلى محاكي Turtlesim. بعد إرسال المعاملة بنجاح، يجب أن يبدأ السلحفاة في التحرك.

### تشغيل Turtlesim من أدوات سطر الأوامر ROS 2

1. الآن دعنا نحاول إرسال إطلاق لـ Turtlesim من عقدة ROS 2 pubsub أخرى. أولاً، قم بإنشاء ملف تكوين آخر (على سبيل المثال، `second_pubsub_params.yaml`) ببيانات اعتماد Robonomics مختلفة ودليل IPFS منفصل.

2. في نافذة الطرفية الفرعية، قم بتشغيل عقدة `robonomics_ros2_pubsub` جديدة باستخدام ملف التكوين الجديد:

{% codeHelper { copy: true}%}

```shell
ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
```

{% endcodeHelper %}

3. ضع ملف JSON الذي يحتوي على الأوامر لـ Turtlesim (`turtle_cmd_vel.json`) في دليل IPFS للنشر الجديد.

4. قبل إرسال الإطلاق، دعنا نقوم بإعداد الرصد لمراقبة كيفية استقبال `turtlesim_robonomics`.البيانات عند الوصول. للقيام بذلك، في نافذة الطرفية المستقلة، اشترك في الموضوع المقابل:

{% codeHelper { copy: true}%}

   ```shell
   ros2 topic echo /turtlesim1/robonomics/received_launch
   ```
   
{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"}%}
يتوجب بشكل افتراضي على معالج الإطلاق توقع تجزئة IPFS لملف كمعلمة. إذا كنت بحاجة إلى أن يتعامل النشر والاشتراك مع المعلمة كسلسلة نصية عادية، يجب عليك تغيير معلمة العقدة ROS 2 المقابلة `launch_is_ipfs` من `True` إلى `False`. يمكنك القيام بذلك باستخدام الأمر `ros2 param set`.
{% endroboWikiNote %}

الآن، نحتاج إلى استدعاء خدمة.5 ROS 2 لإرسال الإطلاق. في نافذة الطرفية المستقلة، استخدم الأمر التالي:

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'YOUR_TURTLESIM_ADDRESS'"}
```

{% endcodeHelper %}

سترى سجلات النشر والاشتراك تعرض تفاصيل تقديم الإطلاق.

انتقل إلى محاكي.6 Turtlesim. بعد إرسال المعاملة بنجاح، يجب أن تبدأ السلحفاة.

### تشغيل Turtlesim من خلال عقدة أخرى

1. الآن، دعنا نحاول إنشاء عقدة اختبارية ستنتظر وصول الإطلاق ثم تقوم بإعادته إلى Turtlesim. يمكنك استخدام حزمة الاختبار الجاهزة `test_robot_robonomics`. انسخ هذه الحزمة إلى مساحة العمل الخاصة بك في ROS 2.

2. افتح ملف العقدة الموجود في `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` في أي محرر نصوص، وأضف الكود التالي بعد دالة `__init__`:

 {% codeHelper { copy: true}%}

   ```python
   def launch_file_subscriber_callback(self, msg) -> None:
       super().launch_file_subscriber_callback(msg)

       transaction_hash = self.send_launch_request(self.param, target_address='YOUR_TURTLESIM_ADDRESS', is_file=True, encrypt_status=True)

       self.get_logger().info('Sent launch to the turtle with hash: %s ' % str(transaction_hash))
   ```

{% endcodeHelper %}

   هذه الدالة ستقوم أولاً بمعالجة الإطلاق الذي تم استلامه ثم ستستخدم معلمته لإرسال إطلاق جديد إلى Turtlesim.

3. قم ببناء الحزمة باستخدام `colcon`، ثم قم بتفعيل ملفات الإعداد الخاصة بها.

4. قم بتشغيل ملف إطلاق ROS 2 للحزمة الاختبارية باستخدام بيانات اعتماد pubsub الثانية:

{% codeHelper { copy: true}%}

   ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```

{% endcodeHelper %}

5. الآن، قم بإرسال إطلاق بمعلمات `turtle_cmd_vel.json` إلى عنوان العقدة الاختبارية، على سبيل المثال، عبر بوابة Polkadot/Substrate. قبل القيام بذلك، تأكد من أن Turtlesim ما زالت تعمل. يجب أن تتلقى العقدة الاختبارية الإطلاق ثم ترسل واحدة جديدة بنفس المعلمات، مما يجعل السلحفاة في Turtlesim تبدأ في التحرك.
