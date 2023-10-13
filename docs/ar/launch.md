---
title: إطلاق
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**الميزة الأساسية الأخرى لسلسلة Robonomics هي البليت الجاهز. يسمح لك بإرسال الأوامر إلى الحسابات/أي كيانات تقف خلفها. تتضمن هذه الأوامر معلمة لتحديد المهمة المطلوب تنفيذها.**

<robo-wiki-note type="warning" title="Dev Node">

  يرجى الانتباه إلى أن هذه الدروس والدروس التالية تُعرض على نسخة محلية من Robonomics Node. قم بإعداد الخاص بك باستخدام [هذه التعليمات](/docs/run-dev-node).

</robo-wiki-note>

## 1. انتقل إلى Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. اختر launch -> launch من القائمة المنسدلة للعناصر الخارجية المحتملة

اختر أيضًا الحساب الذي ترغب في إرسال الـ extrinsic به. قم بملء حقل العنوان المستهدف وحقل المعلمة.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  يدعم التشغيل سلاسل طويلة بطول 32 بايت كأوامر ([المصدر](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)))،
  لذلك هناك مجال للارتجال هنا:
  - بالنسبة للأوامر الأساسية مثل التبديل، يمكنك استخدام "0x0000000000000000000000000000000000000000001" أو
  "0x00000000000000000000000000000000000000000000000000".
  - بالنسبة للأوامر المتقدمة بما في ذلك أوامر json، يمكنك استخدام [IPFS](https://ipfs.tech/) CID بتنسيق
  [الطريقة الصحيحة](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. قم بإرسال العملية

<robo-wiki-picture src="launch/submit.jpg" />

## 4. قم بمراجعة إطلاقك في الأحداث

للقيام بذلك، انتقل إلى *Network -> Explorer* وابحث عن قائمة الأحداث على اليمين. انقر على أيقونة المثلث للتوسيع.

<robo-wiki-picture src="launch/event.jpg" />
