---
title: نظرة عامة
contributors: [ensrationis]
---

Robonomics سحابة للأجهزة تعمل على Polkadot. تحفظ في السحابة وصفًا لأجهزتك وحالتها الحالية، وتسجّل القياسات، وترسل الأوامر. وتدفع مقابل ذلك بعملة XRT، رمز الشبكة. لا تدير هذه السحابة شركة واحدة: يشغّلها مُجمِّعون (collators) مستقلون، ويحكمها حاملو XRT بالتصويت على السلسلة.

## المكونات الرئيسية

- **شجرة الأجهزة (CPS).** شجرة من العُقد تصف منشأتك: مبنى، وغرفه، والأجهزة الموجودة فيها. تحمل كل عقدة وصفًا قصيرًا وحالتها الحالية. ويقرر المالك من يحق له الكتابة في أي جزء من الشجرة. هذه هي نواة Robonomics اليوم. راجع [شجرة الأجهزة (CPS)](/docs/device-tree/).
- **XRT.** رمز الشبكة. تُدفع به رسوم المعاملات والاشتراكات، ويصوّت به حاملوه. راجع [XRT والحوكمة](/docs/xrt-and-governance/).
- **الحوكمة.** نظام OpenGov القياسي في Polkadot بمسارين. لا يوجد مفتاح Sudo: كل تغيير يتطلب صلاحيات خاصة، بما في ذلك ترقيات وقت التشغيل (runtime)، يمر عبر استفتاء.
- **المُجمِّعون.** الخوادم التي تنتج الكتل. يمكن لأي شخص أن يصبح مرشحًا برهن مبلغ من XRT. راجع [تشغيل مُجمِّع](/docs/run-collator/).

المكونات الأقدم (Datalog وLaunch واشتراكات RWS وDigital Twin وLiability) ما زالت تعمل، لكنها مُهمَلة (deprecated). راجع [الوحدات القديمة](/docs/legacy-pallets/).

## الشبكة

| | |
|---|---|
| الشبكة | السلسلة الموازية Robonomics على Polkadot |
| Para ID | 3388 |
| الرمز | XRT، بـ 9 خانات عشرية |
| صيغة العنوان | بادئة SS58 رقم 32 (تبدأ العناوين بـ `4`) |
| زمن الكتلة | 6 ثوانٍ (القيمة المستهدفة) |
| نقطة RPC العامة | `wss://polkadot.rpc.robonomics.network/` |
| مستكشف الكتل | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [افتحه عبر RPC الخاص بـ Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

شبكة Polkadot هي شبكة Robonomics الوحيدة العاملة. أما السلسلة الموازية على Kusama فقد توقفت. راجع [XRT على الشبكات الأخرى](/docs/xrt-migration/).

## ما يجري بناؤه

يضيف إصدار Robonomics 5.0 السحابة على طبقات. الحوكمة وشجرة الأجهزة مع Scope والصلاحيات تعمل بالفعل. والاشتراكات قيد التطوير: سيتمكن الجهاز من استخدام الشبكة دون أن يحمل XRT بنفسه. أما التخزين والحوسبة فمخطط لهما، ولا يوجد لهما كود بعد.

اقرأ المزيد في تدوينة [Robonomics 5.0، الجزء الأول](https://robonomics.network/blog/robonomics-5-0-runtime-first/) وفي [خارطة طريق 5.0](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## البرمجيات والقائمون عليها

جميع برمجيات Robonomics مفتوحة المصدر:

- [airalab/robonomics](https://github.com/airalab/robonomics): وقت التشغيل ووحداته (pallets).
- [airalab/robins](https://github.com/airalab/robins): أدوات، منها أداة سطر الأوامر `cps` وبوابات للأجهزة.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): مكتبة Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): تطبيق الويب على [robonomics.app](https://robonomics.app).

لا يوجد برنامج عقدة خاص بـ Robonomics. يشغّل المُجمِّعون البرنامج العام `polkadot-omni-node` من Parity مع مواصفات سلسلة (chain spec) Robonomics.

تدير مواقع Robonomics، ومنها هذا الويكي، شركة Akagi Engineering Co., Ltd. (اليابان). الأخبار وملاحظات الإصدارات منشورة في [مدونة Robonomics](https://robonomics.network/blog/).
