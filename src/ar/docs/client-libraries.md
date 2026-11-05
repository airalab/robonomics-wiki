---
title: مكتبات العميل
contributors: [PaTara43, ensrationis]
---

اختر المكتبة حسب اللغة وحسب ما تحتاج إليه. لشجرة الأجهزة، استخدم `@polkadot/api` أو حزم Rust أو أداة `cps`. ولـ datalog وRWS من Python، استخدم `robonomics-interface`.

| المكتبة | اللغة | شجرة الأجهزة | ملاحظات |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | لا توجد دوال مساعدة | Datalog، RWS، الحسابات، التشفير |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | نعم | عميل Substrate عام |
| npm `robonomics-interface` | JavaScript | لا | يستخدمها robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | نعم، بأنواع محددة | روابط (bindings) لوقت التشغيل |
| `libcps` وأداة `cps` | Rust، سطر الأوامر | نعم، بالكامل | من [airalab/robins](https://github.com/airalab/robins) |

تتصل جميعها بـ `wss://polkadot.rpc.robonomics.network/` أو بعقدتك الخاصة.

## Python: robonomics-interface

الإصدار الحالي هو 3.1.0. اختُبر على سلسلة تطوير بوقت التشغيل 52، وبفحوص للقراءة فقط على الشبكة العاملة. الإصدار 3.0 إعادة كتابة كاملة وغير متوافق مع 2.x: لم يعد يعتمد على `substrate-interface`. إذا كنت تنتقل من 2.x، فاقرأ [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

ما تغطيه:

- المفاتيح: ED25519 افتراضيًا. أما sr25519، وهو الافتراضي في محافظ Polkadot، فيحتاج إلى الإضافة `[sr25519]` و`crypto_type=SR25519`. عناوين SS58، وعبارات الاسترداد، واستيراد النسخ الاحتياطية للمحافظ.
- عميل غير متزامن يتنقل بين النقاط عند الفشل، ونسخة متزامنة مماثلة للسكربتات (`RobonomicsSync`).
- استعلامات التخزين والمعاملات (extrinsics) مع الأحداث ورسائل خطأ مقروءة.
- دوال مساعدة لـ Datalog وRWS وSystem وBalances.
- تشفير الرسائل، وغلاف التقارير الذي تستخدمه Robonomics Report Service.

لا توجد دوال مساعدة لشجرة الأجهزة. لكن يمكن استدعاء أي وحدة عبر الدالتين العامتين `compose_call` و`submit`.

التثبيت (Python 3.12 أو أحدث):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

سجل datalog، وفق ملف README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

التوثيق: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

تعمل `@polkadot/api` مع كل الوحدات، ومنها شجرة الأجهزة. أمثلة من [CPS pallet README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

```javascript
// Read a node.
const info = await api.query.cps.nodes(nodeId);   // parent and Scope pointer
const meta = await api.query.cps.meta(nodeId);
const payload = await api.query.cps.payload(nodeId);

// Create a root node and a child.
await api.tx.cps.createNode(null, meta, payload, null).signAndSend(owner);
await api.tx.cps.createNode(parentId, meta, payload, null).signAndSend(owner);

// Let another account write to one node.
await api.tx.cps.grantAccess(nodeId, principal, 'Write', 'Node').signAndSend(owner);

// View functions (need a @polkadot/api version with view-function support).
const scope = await api.view.cps.resolveScope(nodeId);
```

حزمة npm المسماة `robonomics-interface` (JavaScript) هي ما يستخدمه robonomics.app. تغطي datalog وlaunch وRWS والتوأم الرقمي والاستدعاءات المساعدة، لكنها لا تغطي شجرة الأجهزة.

## Rust

- `robonomics-runtime-subxt-api`: روابط بأنواع محددة لوقت التشغيل، تشمل دوال العرض الخاصة بشجرة الأجهزة.
- `libcps`: مكتبة لشجرة الأجهزة مع عميل خفيف مدمج. غير منشورة على crates.io؛ استخدمها من [airalab/robins](https://github.com/airalab/robins).

<div id="cps-command-line-tool"></div>

## أداة سطر الأوامر cps

تعمل `cps` مع شجرة الأجهزة من الطرفية. يمكنها تشغيل عميلها الخفيف الخاص، فلا تحتاج إلى عقدة ولا إلى RPC عام.

ثبّتها من الإصدارات الليلية (nightly) في [airalab/robins](https://github.com/airalab/robins/releases) (أرشيفات لـ Linux وmacOS، بمعماريتي x86_64 وaarch64)، أو شغّلها عبر Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

يذكر ملف README في robins أيضًا الأمر `cargo install libcps`، لكن لا توجد حزمة `libcps` على crates.io.

بعض الأوامر:

```bash
cps lc &                        # start the embedded light client on 127.0.0.1:9944
cps status                      # where am I connected
cps tree <NODE_ID> --depth 2    # look at a tree

export ROBONOMICS_SURI='<your seed phrase>'   # signs writes; keep it secret
cps create --meta '{"type":"building","name":"HQ"}' --payload '{"status":"online"}'
cps create --parent <NODE_ID> --meta '{"type":"room"}' --payload '{"temp":"22C"}'
cps meta set <NODE_ID> '{"type":"room","name":"Lab"}'
cps payload set <NODE_ID> 'temp=24C'
cps delete <NODE_ID>
```

الدليل الكامل في [توثيق robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## الأدوات القديمة

غلاف ROS 2 (`robonomics-ros2`) و`robonomics-js` أدوات قديمة ولا تجري صيانتها لوقت التشغيل الحالي.
