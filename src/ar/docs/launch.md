---
title: إطلاق
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**ميزة أساسية أخرى لسلسلة كتل Robonomics هي لوحة الإطلاق. تسمح لك بإرسال أوامر إلى الحسابات/أي كيانات تقف وراءها. تتضمن هذه الأوامر معلمة لتحديد المهمة التي يجب تنفيذها.**

{% roboWikiNote {title:"نقطة تطويرية", type: "تحذير"}%} يرجى الانتباه إلى أن هذه الدروس والتعليمات التالية تُظهر على نسخة محلية من نقطة Robonomics. قم بإعداد الخاصة بك باستخدام [هذه التعليمات](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. انتقل إلى المطور -> الإكستريمالات

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. اختر إطلاق -> إطلاق من القائمة المنسدلة للإكستريمالات الممكنة

اختر أيضًا الحساب الذي ترغب في تقديم الإكستريمال معه. قم بملء حقل العنوان المستهدف وحقل المعلمة.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"launch"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 بايت", type: "ملاحظة"}%} يدعم الإطلاق سلاسل تصل إلى 32 بايتًا كأوامر ([المصدر](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  لذا هناك مجال للابتكار هنا:
  - بالنسبة للأوامر الأساسية مثل التبديل، يمكنك استخدام "0x0000000000000000000000000000000000000000000000000000000000000001" أو
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - بالنسبة للأوامر المتقدمة بما في ذلك تلك التي تشبه json، يمكنك استخدام [IPFS](https://ipfs.tech/) CID المنسق بطريقة
  [صحيحة](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. تقديم المعاملة

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

## 4. مراجعة إطلاقك في الأحداث

لفعل ذلك، انتقل إلى *الشبكة -> المستكشف* وابحث عن قائمة الأحداث على اليمين. انقر فوق رمز المثلث لتوسيعه.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"event"} %}{% endroboWikiPicture %}
