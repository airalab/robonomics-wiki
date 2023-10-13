---
title: كيفية تشغيل نقطة تطوير Robonomics
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**لاختبار تطبيقاتك على Robonomics قد ترغب في تشغيلها في وضع التطوير. يوضح هذا المقال خطوة بخطوة
تعليمات حول كيفية الحصول على نسخة اختبار محلية خاصة بك من Robonomics.**


## احصل على ملف تنفيذي للنقطة

1. أولاً ، تحتاج إلى ملف تنفيذي ، قم بتنزيل الأرشيف الخاص به من أحدث [إصدار](https://github.com/airalab/robonomics/releases).

2. انتقل إلى مجلد الأرشيف ، قم بفك الضغط عن الملف التنفيذي وقم بتغيير الأذونات:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## تشغيل

قم بتشغيل النقطة باستخدام:

```bash
./robonomics --dev
```
سترى الناتج التالي:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  إذا كنت ترغب في حذف الكتل الموجودة بالفعل ، فيمكنك القيام بذلك عن طريق إزالة RocksDB في `/tmp/substrate******/chains/dev/db/full`.
  استبدل `******` بمعرف مقابل يتم عرضه في السجلات عند الإطلاق.

  إذا كنت ترغب في بدء تشغيل النقطة من البداية في كل مرة ، استخدم علامة `--tmp`.

</robo-wiki-note>

## الاتصال

الآن يمكنك الاتصال بالنقطة المحلية الخاصة بك من خلال [بوابة Polkadot](https://polkadot.js.org/apps/#/explorer).

قم بتغيير الشبكة إلى `Local Node` في الزاوية اليسرى العلوية واضغط على `Switch`.

![switch](../images/dev-node/portal.png)

مرحبًا بك في النسخة المحلية لـ Robonomics!

![local_node](../images/dev-node/dev-portal.png)


