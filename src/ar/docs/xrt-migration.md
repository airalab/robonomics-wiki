---
title: XRT على الشبكات الأخرى
contributors: [nakata5321, ensrationis]
---

توجد XRT الرسمية على السلسلة الموازية Robonomics في Polkadot. تشرح هذه الصفحة ما يحدث لعملة XRT على Kusama وEthereum، وأين توجد XRT على Polkadot Asset Hub.

## Kusama

توقفت السلسلة الموازية Robonomics على Kusama. أنتجت كتلتها الأخيرة رقم #12,268,835 في 28 سبتمبر 2026. أرشيف قاعدة البيانات موجود على [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

ما تقوله التدوينات المنشورة عن XRT على Kusama:

- تنتقل جميع أرصدة XRT عند الكتلة الأخيرة إلى Polkadot مع **مكافأة +20%**.
- **لا يوجد إعادة شراء** على جانب Kusama.
- أين ستظهر الأرصدة على Polkadot، وهل يحتاج الحاملون إلى فعل شيء، فسيُشرح ذلك في تدوينة منفصلة.

تابع [مدونة Robonomics](https://robonomics.network/blog/) لتلك التدوينة. المصادر: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) و[صفحة اقتصاديات الرمز](https://robonomics.network/tokenomics/).

## Ethereum

رمز XRT القديم على Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) مُهمَل. في 5 فبراير 2026 استُغلّت آلية إصداره لسكّ رموز مجانًا. ولم تتأثر XRT على Polkadot وKusama.

يمكن لحاملي الرمز القديم وقت اللقطة (كتلة Ethereum رقم 24,390,081) الترحيل:

1. افتح تطبيق الترحيل: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. اربط المحفظة التي كانت تحمل XRT في 5 فبراير 2026. يعرض التطبيق رصيدك في اللقطة والمبلغ مع المكافأة.
3. اختر أحد الخيارين. يمكن لكل عنوان الاختيار مرة واحدة.
   - **Accept (قبول)**: تستلم XRT الرسمية على Ethereum، أي رصيدك في اللقطة مضافًا إليه 20%.
   - **Decline (رفض)**: تنضم بدلًا من ذلك إلى برنامج إعادة الشراء، بسعر مرجعي قدره 2.20 دولار، يُدفع على مدى 12–36 شهرًا وبقدر ما تسمح به أموال الخزينة.

قبل أن توقّع، تحقق من أن التطبيق يتعامل مع عقد المطالبة `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. الكود المصدري للعقد في [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

ما تستلمه هو XRT الرسمية على Ethereum، بالعقد `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. وهي XRT منقولة من Polkadot بنسبة 1:1 عبر [Snowbridge](https://app.snowbridge.network/send). يمكنك الاحتفاظ بها، أو تداولها على Uniswap، أو نقلها إلى Polkadot. لا يوجد جسر من الرمز القديم إلى الجديد.

حددت التدوينات مهلة 12 شهرًا للترحيل. لا يمكن استعادة XRT التي لم يُطالب بها في الوقت المحدد إلا بتصويت حوكمة على السلسلة مع إثبات للملكية. اقرأ الشروط الدقيقة في التدوينات: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) و[Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

للأسئلة: مجموعة Telegram [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

توجد XRT على Polkadot Asset Hub كأصل أجنبي (foreign asset)، وهناك مجمّع مبادلة DOT–XRT. ويمكن دفع الرسوم على Asset Hub بعملة XRT.

لم يُنشر بعد دليل للمستخدمين لنقل XRT بين Asset Hub والسلسلة الموازية Robonomics.
