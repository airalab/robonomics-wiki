---
title: تشغيل مُجمِّع
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

ينتج المُجمِّعون (collators) كتل السلسلة الموازية Robonomics. يشرح هذا الدليل إعداد مُجمِّع على خادم Linux، وتسجيله على السلسلة، وكيف يكسب.

مصدر هذا الدليل هو [دليل المُجمِّع](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) في مستودع وقت التشغيل.

## ما تحتاج إليه

- خادم: 8 أنوية معالج، و64 GB ذاكرة، و2 TB من نوع NVMe. تبلغ تكلفة خادم كهذا نحو 120–150 دولارًا شهريًا.
- القرص: تشغل السلسلة الموازية وسلسلة الترحيل Polkadot معًا نحو 1.1 TB، والحجم في ازدياد. خطّط لـ 2 TB على الأقل.
- حساب على Robonomics برصيد حر يزيد على 32 XRT.

## 1. ثبّت العقدة

لا يوجد ملف تنفيذي لعقدة Robonomics. يشغّل المُجمِّع البرنامج العام `polkadot-omni-node` من Parity مع مواصفات سلسلة Robonomics. يفترض الدليل وجود مستخدم `robonomics` مجلده الرئيسي `/var/lib/robonomics/` ومساره الأساسي `/var/lib/robonomics/base/`.

نزّل `polkadot-omni-node` من [إصدارات Polkadot SDK](https://github.com/paritytech/polkadot-sdk/releases). استخدم أحدث إصدار `polkadot-stable*`؛ الأوامر أدناه تستخدم `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

نزّل مواصفات السلسلة:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. أنشئ مفتاح الشبكة

لا يبدأ المُجمِّع دون مفتاح شبكة:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

يُكتب المفتاح في `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. احتفظ بنسخة احتياطية منه.

## 3. شغّل العقدة

قيمة `ExecStart` الموصى بها لخدمة systemd:

{% codeHelper {copy: true} %}

```
ExecStart=/usr/local/bin/polkadot-omni-node \
  --name "YOUR_NODE_NAME" \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json \
  --base-path /var/lib/robonomics/base/ \
  --collator \
  --sync warp \
  --telemetry-url "wss://telemetry.parachain.robonomics.network/submit/ 0" \
  -- \
  --sync warp
```

{% endcodeHelper %}

- أول `--sync warp` للسلسلة الموازية، والذي بعد `--` لسلسلة الترحيل المدمجة. بدونه قد تستغرق مزامنة سلسلة الترحيل أسابيع.
- لا تحتوي مواصفات السلسلة على نقطة للقياس عن بُعد (telemetry)، لذا يُفعَّل عبر `--telemetry-url`.

## 4. أنشئ مفاتيح الجلسة

مفاتيح الجلسة هي مفاتيح Aura (sr25519). شغّل العقدة مؤقتًا مع `--rpc-methods unsafe`، ثم استدعِ `author_rotateKeysWithOwner` بحساب المُجمِّع الخاص بك:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

تحتوي النتيجة على حقلين: `keys` و`proof`. احفظهما كليهما. تحقق من أن العقدة تحمل المفاتيح:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

ثم أزل `--rpc-methods unsafe` وأعد تشغيل العقدة.

## 5. سجّل على السلسلة

أرسل هذه المعاملات (extrinsics) من حساب المُجمِّع، مثلًا في [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` بالقيمتين من الخطوة السابقة. لا تمرّر proof فارغًا: فهو يربط المفاتيح بحسابك.
2. `collatorSelection.registerAsCandidate()`. يرهن هذا **32 XRT**.

تنضم عقدتك إلى المجموعة بعد تغيّر الجلسة. الجلسة في وقت التشغيل 3,600 كتلة، أي نحو 6 ساعات بكتل مدتها 6 ثوانٍ.

تحقق من ترشّحك على السلسلة، لا من سلامة العقدة فقط: انظر إلى `collatorSelection.candidateList` و`collatorSelection.invulnerables` في **Developer → Chain state**.

مبلغ الرهن وحدود المرشحين من إعدادات وقت التشغيل. تغييرها يتطلب استفتاءً على مسار Root. راجع [XRT والحوكمة](/docs/xrt-and-governance/).

## كيف تعمل المكافآت

يكسب المُجمِّع بطريقتين:

1. **مكافأة الكتلة.** تُسكّ 0.0042 XRT ثابتة مباشرة لمنتج كل كتلة. وهي سارية منذ وقت التشغيل 43.
2. **الرسوم والإكراميات.** تذهب كل الرسوم والإكراميات إلى صندوق المُجمِّعين. ويحصل منتج الكتلة على حصة من الصندوق.

حُددت مكافأة الكتلة لتغطي تكلفة الخادم مع هامش:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

المدخلات هي: خادم بتكلفة 2,040 دولارًا في السنة، و7 مُجمِّعين، وهامش 30%، وسعر XRT يساوي دولارًا واحدًا. تُراجَع المكافأة بترقية لوقت التشغيل عندما تتغير المدخلات.

يعتمد دخلك على حصتك من الكتل: كلما زاد عدد المُجمِّعين، قلّ عدد الكتل التي ينتجها كل واحد منهم. الخلفية والقياسات: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
