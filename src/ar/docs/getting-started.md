---
title: البدء
contributors: [Vourhey, positivecrash, ensrationis]
---

تأخذك هذه الصفحة من الصفر إلى أول سجل لك على شبكة Robonomics. تحتاج إلى متصفح، وإضافة محفظة، وكمية صغيرة من XRT.

## 1. أنشئ حسابًا

1. ثبّت [إضافة Polkadot.js](https://polkadot.js.org/extension/) أو أي محفظة Polkadot أخرى تدعم الشبكات المخصصة.
2. أنشئ حسابًا في المحفظة. دوّن عبارة الاسترداد واحفظها بعيدًا عن الإنترنت.
3. الحساب نفسه يعمل على Robonomics. تعرض Robonomics العناوين بصيغتها الخاصة (بادئة SS58 رقم 32)، لذلك يبدأ عنوانك فيها بـ `4`.

لا يظهر الحساب على السلسلة إلا بعد أن يحمل الإيداع الوجودي (existential deposit) على الأقل، وهو 0.000001 XRT.

## 2. احصل على XRT

تحتاج إلى كمية قليلة جدًا. عند كتابة هذه الصفحة، كانت رسوم سجل datalog الواحد أقل بكثير من 0.001 XRT.

أماكن تداول XRT اليوم:

- **Uniswap على Ethereum.** عملة XRT الرسمية على Ethereum هي XRT منقولة من Polkadot عبر Snowbridge. عقدها هو `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [المبادلة على Uniswap](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). ينقل [Snowbridge](https://app.snowbridge.network/send) الرموز بين Ethereum وPolkadot.
- **Polkadot Asset Hub.** توجد XRT على Asset Hub، وهناك مجمّع مبادلة DOT–XRT.

نقل XRT من Asset Hub إلى حسابك على السلسلة الموازية Robonomics هو تحويل بين سلاسل. لم يُنشر دليل خطوة بخطوة لذلك بعد. إذا واجهتك مشكلة، فاسأل في مجموعة Telegram [XRT Traders](https://t.me/xrt_trade).

{% roboWikiNote {type: "warning", title: "روابط قديمة"}%} ما زالت بعض الصفحات القديمة تشير إلى منصات تداول لم تعد تدرج XRT، وإلى الرمز القديم على Ethereum `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. الرمز القديم ليس XRT الرسمية. {% endroboWikiNote %}

## 3. اتصل بـ Polkadot.js Apps

افتح [Polkadot.js Apps مع RPC الخاص بـ Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). يتصل بالنقطة العامة `wss://polkadot.rpc.robonomics.network/`. اسمح للموقع في إضافة المحفظة حتى يظهر حسابك.

لتصفح الكتل والحسابات والتحويلات، يمكنك أيضًا استخدام مستكشف الكتل [scan.robonomics.network](https://scan.robonomics.network).

<div id="4-send-your-first-record"></div>

## 4. أرسل سجلك الأول

أبسط خطوة أولى هي سجل datalog: قطعة بيانات قصيرة تُخزَّن على السلسلة باسم حسابك.

1. في Polkadot.js Apps، افتح **Developer → Extrinsics**.
2. اختر حسابك، ثم `datalog` و`record`.
3. أدخل بياناتك، بحد أقصى 512 بايت. النص العادي يكفي.
4. أرسل المعاملة ووقّعها في المحفظة.

لقراءة السجل، افتح **Developer → Chain state**، واختر `datalog` و`datalogIndex`، واستعلم عن حسابك. ستظهر لك الخانات التي تحتوي على سجلاتك. ثم استعلم عن `datalogItem` بحسابك ورقم الخانة. يأتي كل سجل مع طابع زمني.

Datalog إحدى [الوحدات القديمة](/docs/legacy-pallets/#datalog). ما زالت تعمل وتصلح لتجربة أولى، لكن المشاريع الجديدة ينبغي أن تستخدم شجرة الأجهزة.

## 5. الخطوة التالية: صِف أجهزتك

نواة Robonomics هي شجرة الأجهزة. تنشئ عقدة لمنشأتك، وتضيف عقدًا لأجزائها وأجهزتها، وتحدد من يحق له تحديثها. راجع [شجرة الأجهزة (CPS)](/docs/device-tree/)، ثم [ربط الأجهزة](/docs/connect-devices/).
