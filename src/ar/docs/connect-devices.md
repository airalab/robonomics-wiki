---
title: ربط الأجهزة
contributors: [Fingerling42, nakata5321, ensrationis]
---

هناك طريقتان لإدخال الأجهزة إلى Robonomics: عبر Home Assistant، أو مباشرةً، مع أي جهاز يستطيع توقيع معاملة أو التحدث إلى بوابة.

الأجهزة الجاهزة وتركيب أنظمة المنزل الذكي تقدمها شركة Pinout Limited. راجع [pinout.cloud](https://pinout.cloud) للمنتجات والخدمات.

## Home Assistant

هناك ثلاثة تكاملات لـ Home Assistant. وظائفها مختلفة، ودرجة تحديثها ليست واحدة.

| التكامل | وظيفته | الحالة |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | يراقب Home Assistant بحثًا عن المشكلات. يشفّر تقرير الخطأ، ويرفعه إلى IPFS، ويسجّل الـ CID على السلسلة. يتحول التقرير إلى تذكرة دعم لدى الجهة التي ركّبت نظامك. ويرسل أيضًا نبضة يومية تؤكد أنه يعمل. | تجري صيانته. يصدر كإصدارات تجريبية. يحتاج إلى Home Assistant 2026.3.1 أو أحدث؛ ثبّته عبر HACS كمستودع مخصص. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | وصول عن بُعد إلى Home Assistant عبر معاملات مشفّرة ضمن اشتراك RWS، إضافة إلى إدارة المستخدمين والنسخ الاحتياطية. | متوقف عن التحديث. آخر إصدار هو 2.2.1 من أكتوبر 2025. يستخدم الإصدار القديم `robonomics-interface` 1.6.3، ويحتاج إلى عقدة IPFS محلية، وما زالت نقاطه الافتراضية تشير إلى Kusama التي توقفت. يمكن اختيار نقطة Polkadot. لم يُختبر مع وقت التشغيل الحالي. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | يقرأ مستشعر Altruist عبر الشبكة المحلية. لا يستخدم السلسلة. | صغير، ومحلي فقط. |

يعتمد تكامل Robonomics من airalab على اشتراكات RWS. راجع [الوحدات القديمة](/docs/legacy-pallets/#rws-subscriptions) لمعرفة وضعها الحالي.

## أي جهاز

هذه هي اللبنات الأساسية لربط جهازك الخاص.

1. **امنح الجهاز حسابًا خاصًا به.** يبقى المفتاح على الجهاز.
2. **ادفع تكاليف معاملاته.** إما أن ترسل إلى الحساب قليلًا من XRT (تكلفة سجل datalog أقل من جزء من الألف من XRT عند كتابة هذه الصفحة)، أو تضيفه إلى اشتراك RWS عبر `rws.set_devices` (حتى 32 جهازًا) وترسل معاملاته عبر `rws.call`.
3. **صِف المنشأة في شجرة الأجهزة.** أنشئ عقدة للموقع وعقدًا لأجهزته. اربط حساب الجهاز بعقدته بوصفه هوية العقدة. امنح صلاحية `Write` لبوابة إذا كانت البوابة تكتب نيابة عن الجهاز. راجع [شجرة الأجهزة (CPS)](/docs/device-tree/).
4. **اكتب البيانات.** ضع الحالة الحالية في `payload` الخاص بالعقدة (حتى 8 KiB)، أو اكتب سجلات عبر `datalog.record` (حتى 512 بايت، [قديمة](/docs/legacy-pallets/#datalog)). ضع البيانات الأكبر على IPFS واكتب الـ CID الخاص بها.
5. **أرسل الأوامر عند الحاجة.** يرسل الاستدعاء القديم `launch` حدث أمر موقّعًا إلى حساب جهاز. راجع [Launch](/docs/legacy-pallets/#launch).

المكتبات لكل خطوة: `robonomics-interface` في Python، و`@polkadot/api` في JavaScript، و`libcps` مع أداة `cps` في Rust. راجع [مكتبات العميل](/docs/client-libraries/).

### بوابات للأجهزة الصغيرة

ليس كل جهاز قادرًا على التحدث إلى السلسلة. تقف هذه البوابات مفتوحة المصدر في المنتصف:

- **edge** ([airalab/robins](https://github.com/airalab/robins)): تستقبل رسائل موقّعة عبر HTTP وMeshtastic وتمررها عبر libp2p GossipSub.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): تحوّل رسائل MQTT إلى تحديثات في شجرة الأجهزة.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): تجمع قياسات المستشعرات الموقّعة وتمررها إلى IPFS pubsub وإلى السلسلة الموازية. وهي تخدم المستشعرات على [sensors.social](https://sensors.social).

عُقد الترحيل العامة وحالتها موجودة على [pubsub.robonomics.network](https://pubsub.robonomics.network).
