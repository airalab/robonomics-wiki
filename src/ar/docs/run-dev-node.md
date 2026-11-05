---
title: تشغيل عقدة تطوير
contributors: [LoSk-p, ensrationis]
---

عقدة التطوير سلسلة Robonomics محلية من عقدة واحدة لاختبار الكود الخاص بك. تُنتج الكتل فورًا، وفي حسابات الاختبار أرصدة، ولا شيء يمس الشبكة العاملة.

لم يعد هناك ملف تنفيذي `robonomics --dev`. تبني وقت التشغيل من [airalab/robonomics](https://github.com/airalab/robonomics)، وتولّد منه مواصفات سلسلة، ثم تشغّل البرنامج العام `polkadot-omni-node` من Parity بتلك المواصفات.

## أمر واحد (Nix)

من نسخة مستنسخة من المستودع:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

يبني السكربت وقت التشغيل مع الميزة `dev-runtime` عند الحاجة، ويولّد مواصفات سلسلة مؤقتة، ثم يشغّل `polkadot-omni-node --chain <spec> --dev`.

## بدون Nix

ثبّت الأداتين عبر Cargo، ثم شغّل السكربت نفسه:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## يدويًا

للاحتفاظ بمواصفات السلسلة أو لتغيير خيارات العقدة، نفّذ الخطوات بنفسك:

{% codeHelper {copy: true} %}

```bash
cargo build --release -p robonomics-runtime --features dev-runtime

chain-spec-builder -c ./chain_spec.json create \
  -n "Robonomics Dev" -i robonomics-dev -t development \
  -r ./target/release/wbuild/robonomics-runtime/robonomics_runtime.compact.compressed.wasm \
  --para-id 2000 --relay-chain westend-local \
  --properties tokenSymbol=XRT,tokenDecimals=9 \
  named-preset development

polkadot-omni-node --chain ./chain_spec.json --dev
```

{% endcodeHelper %}

لا يوجد خيار مدمج `--chain dev`: تمرّر دائمًا المواصفات المولّدة مع `--dev`. أضف `--base-path <dir>` للاحتفاظ بحالة السلسلة بين مرات التشغيل.

## ما تحصل عليه

- RPC وWebSocket على `ws://127.0.0.1:9944`.
- معرّف السلسلة `robonomics-dev`، وpara ID رقم 2000، وسلسلة الترحيل `westend-local`، والرمز XRT بـ 9 خانات عشرية.
- حسابات تطوير ممولة مسبقًا: Alice وBob وCharlie وغيرها من مفاتيح الاختبار المعروفة.
- Alice هي Sudo. يوجد Sudo فقط في إصدارات `dev-runtime`، ولا يوجد أبدًا على الشبكة العاملة.
- حالة جديدة عند كل تشغيل، ما لم تضبط `--base-path`.

اربط [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) بالعنوان `ws://127.0.0.1:9944` لتتجول فيها. ومع أداة `cps`، استخدم `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` و`ROBONOMICS_SURI=//Alice`.

## RWS على سلسلة التطوير

ينشئ Root مزادات RWS. لتخطي هذه الخطوة عند اختبار كود RWS، يحتوي مستودع `robonomics-interface` على السكربت `scripts/devchain.sh` الذي يشغّل سلسلة تطوير فيها مزادات RWS جاهزة منذ كتلة التكوين (genesis).

خيارات أخرى، منها صورة Docker، موجودة في [دليل المطوّر](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
