---
title: تجربة الحكومة على السلسلة

---

في الوقت الحالي، يعتبر Polkadot واحدًا من أكبر منظمات الحكومة اللامركزية في العالم! هناك العديد من الأحداث المثيرة التي تجري في النظام البيئي كجزء من تجربة الحكم على السلسلة. يقترح مطورو Robonomics أن يزيد مشاركو الهاكاثون من مستوى اندماج مجتمع Polkadot من خلال دمج الأحداث المتعلقة بالتصويت وطلبات الخزينة الجديدة وتغييرات العصر والمزيد، في نظام منزل ذكي نموذجي.


---

يناقش هذا المقال إدارة المنزل الذكي من خلال Robonomics Cloud نتيجة لأي حدث في نظام Polkadot. إليك مثال على كيفية تشغيل مصباح عند تقديم استفتاء جديد في شبكة Polkadot.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## المتطلبات

 - وحدة Home Assistant مثبتة مع تكامل Robonomics. يمكن العثور على طرق التثبيت [هنا](/docs/install-smart-home).
 - عقدة Polkadot أو بوابة للتفاعل. على سبيل المثال - `wss://polkadot.api.onfinality.io`
 - عقدة Robonomics أو بوابة للتفاعل.
 - حساب مُنشأ بتنسيق ED25519. يمكن العثور على المعلومات [هنا](/docs/sub-activate).
 - وجود حساب مُنشأ في قائمة الأجهزة للاشتراك في Robonomics. تعرف على المزيد [هنا](/docs/add-user).
 - عناوين المالك والمراقب للاشتراك.

مكتبات Python:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## إنشاء مستمع لـ Polkadot

أولاً، تحتاج إلى إنشاء سكريبت سيستمع لأحداث جديدة في شبكة Polkadot. في المثال، سنتتبع إنشاء الاستفتاءات الجديدة.

لراحة التجربة، تم استخدام عقدة Polkadot محلية في وضع التطوير. يمكنك العثور على دليل النشر [هنا](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

للاتصال بعقدة عامة، قم بتغيير "POLKAD"المتغير "OT_GATEWAY".

مثال على الشيفرة:

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('بدء عد الاستفتاءات:', data.value)
    if update_nr > 0:
        print('زيادة عدد الاستفتاءات:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

هذا السكربت سيستمع للتغييرات في رقم الاستفتاء الحالي وسيعرض رقم أحدث استفتاء.

### الاختبار

قم بتشغيل البرنامج وافتح [polkadot.js](https://polkadot.js.org/apps/#/explorer).
للتبديل إلى العقدة التطويرية المحلية، انقر على الرمز في الزاوية اليسرى العلوية، وستظهر قائمة جانبية. حدد "Development" و "Local Node" في الأسفل، ثم انقر على "Switch".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

ستنتقل إلى العقدة المحلية. انتقل إلى علامة التبويب "Governance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

أنشئ صورة جديدة. دعنا نترك تعليقًا في الشبكة. قم بتوقيعها وإرسالها إلى الشبكة.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

ستتلقى هاشها. انسخه وانتقل إلى علامة التبويب "Governance" -> "Referenda". انقر على "Submit Proposal". نظرًا لأن هذه شبكة اختبارية، يمكن ترك معظم الحقول القابلة للتكوين كما هي افتراضيًا. الصق هاش الصورة وقم بتوقيع الاقتراح.

{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

بعد إرسالها إلى الشبكة، سيكتشف البرنامج الاقتراح الجديد وسيخرج السجلات التالية:

```
بدء عد الاستفتاءات: 0
زيادة عدد الاستفتاءات: 1## الاتصال بالمنزل الذكي

الآن نحتاج إلى إضافة تفاعل مع المنزل الذكي بعد إنشاء اقتراح جديد.

لذلك، نحتاج إلى معرفة ما يلي:
- مجال الخدمة
- اسم الخدمة
- الكيان المستهدف
- البيانات - يجب أن تكون من نوع "dict"

دعنا نرى أين يمكن العثور عليها. افتح نسخة Home Assistant المثبتة. انتقل إلى "أدوات المطور -> الخدمات"، اختر أي خدمة وانتقل إلى وضع YAML. دعونا نأخذ مثالًا على مفتاح تبديل.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"services"} %}{% endroboWikiPicture %}

يحتوي مفتاح "service" على مجال الخدمة واسمها. كل ما قبل النقطة هو المجال، وكل ما بعدها هو اسم الخدمة. كما أن الحقل البيانات مطلوب أيضًا.

للعثور على الكيان المستهدف، انتقل إلى "الإعدادات -> الأجهزة والخدمات -> الكيانات". ستكون هناك عمود بـ "معرف الكيان" - وهذا هو المعلمة المستهدفة المطلوبة.

الآن بعد أن نعرف جميع المعلمات، دعونا نرى ما سيحدث في النص البرمجي.

سيتصل النص البرمجي بمشغل IPFS المحلي. (إذا اتبعت تعليمات إعداد المنزل الذكي، فلديك بالفعل مشغل IPFS يعمل.)

أولاً، سنقوم بتشكيل أمر بتنسيق JSON. بعد ذلك، يتم تشفير الرسالة بمفاتيح المستخدم والتحكم.
ثم يتم حفظ الأمر المشفر في ملف وإضافته إلى IPFS. بعد ذلك، يتم إرسال العلامة التجارية IPFS الناتجة إلى سلسلة الكتل Robonomics من خلال عملية "إطلاق" إلى عنوان المتحكم.
عندما يتلقى المتحكم الإطلاق، سيقوم بتنزيل الملف من IPFS، وفك تشفيره، واستدعاء الخدمة المحددة بداخله.

الشفرة الكاملة كما يلي:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# polkadot part
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Robonomics part

# Robonomics credentials
# User address must be inأجهزة RWS
# يجب أن يكون عنوان المستخدم ED25519
user_seed = "<SEED_PHRASE>"
controller_address = "<CONTROLLER_ADDRESS>"
sub_owner_address = "<OWNER_ADDRESS>"

# الأمر
service_domain = "<DOMAIN>"  # النطاق هو ما قبل النقطة في اسم الخدمة. على سبيل المثال "switch"
service_name = "<NAME>"  # الاسم - ما يأتي بعد النقطة في اسم الخدمة. على سبيل المثال "turn_on"
target_entity = "<ENTITY_ID>"  #  entity_id. على سبيل المثال "switch.boiler"
data = {}  # يجب أن يكون من نوع القاموس


def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('بدء عد الاستفتاءات:', data.value)

    if update_nr > 0:
        print('زيادة عدد الاستفتاءات:', data.value)
        # إرسال إطلاق إلى عنوان التحكم مع تجزئة ipfs
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"نتيجة المعاملة: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    تشفير الرسالة باستخدام مفتاح المرسل الخاص ومفتاح المستلم العام
    :param message: الرسالة للتشفير
    :param sender_keypair: مفتاح حساب المرسل
    :param recipient_public_key: مفتاح المستلم العام
    :return: الرسالة المشفرة
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# تنسيق الرسالة للإطلاق
data['entity_id'] = target_entity
command = {'platform': service_domain, 'name': service_name, 'params': data}

message = json.dumps(command)
print(f"الرسالة: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# تشفير الأمر
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"الرسالة المشفرة: {message}")
filename = "temporal_file"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```ar
result_ipfs  = result["Hash"]
    print(f"تجزئة IPFS: {result_ipfs}")
    print(f"تجزئة IPFS للإطلاق {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

إذا قمت بكل شيء بشكل صحيح، سترى السجلات التالية:
```
Message: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
Ecrypted message: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
تجزئة IPFS: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
تجزئة IPFS للإطلاق 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
بدء عدد الاستفتاءات: 0
زيادة عدد الاستفتاءات: 1
نتيجة المعاملة: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```