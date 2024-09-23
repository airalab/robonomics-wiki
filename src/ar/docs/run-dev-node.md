---
title: كيفية تشغيل نود تطوير Robonomics
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**للاختبار التطبيقات الخاصة بك على Robonomics قد ترغب في تشغيلها في وضع التطوير. يوضح هذا المقال تعليمات خطوة بخطوة حول كيفية الحصول على نسخة اختبار محلية خاصة بـ Robonomics.**


## الحصول على ملف تنفيذي للنود

1. أولاً، تحتاج إلى ملف تنفيذي، قم بتنزيل الأرشيف الخاص به من أحدث [إصدار](https://github.com/airalab/robonomics/releases).

2. انتقل إلى مجلد الأرشيف، قم بفك الضغط عن الملف التنفيذي وقم بتغيير الأذونات:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## التشغيل

شغل النود بالأمر التالي:

```bash
./robonomics --dev
```
سترى الناتج التالي:

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"من الصفر", type: "note"}%} إذا كنت ترغب في تطهير الكتل الموجودة يمكنك القيام بذلك عن طريق إزالة RocksDB في `/tmp/substrate******/chains/dev/db/full`.
استبدل `******` بالمعرف المقابل الذي يظهر في السجلات عند التشغيل.

إذا كنت ترغب في بدء النود من الصفر في كل مرة استخدم العلم `--tmp`.
{% endroboWikiNote %}


## الاتصال

الآن يمكنك الاتصال بالنود المحلي من خلال [بوابة Polkadot](https://polkadot.js.org/apps/#/explorer).

قم بتغيير الشبكة إلى `Local Node` في الزاوية اليسرى العلوية واضغط `Switch`.

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

مرحبًا بك في النسخة المحلية من Robonomics!

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}