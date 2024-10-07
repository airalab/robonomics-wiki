---
title: كيفية استخدام المخططات الزرقاء
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

في هذا المقال ستتعرف على كيفية إضافة المخططات الزرقاء لـ Home Assistant الخاص بك وتكوينها.

## تشغيل المخططات الآلية

بعض المخططات مثبتة بالفعل. تحتاج المخططات القائمة على هذه المخططات فقط إلى تكوينها. يمكنك العثور على المخططات المثبتة مسبقًا في واجهة الويب في `الإعدادات/التشغيلات الآلية والمشاهد`. افتح `المخططات` وابحث عن المخطط الذي تريد استخدامه. في هذا المثال، سيتم استخدام `الإضاءة المفعلة بالحركة`.

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"إعدادات المخطط"} %}{% endroboWikiPicture %}

انقر على `إنشاء تشغيل آلي` لفتح محرر التشغيل الآلي. قم بإعطاء اسم، واختر مخططًا لاستخدامه (`الإضاءة المفعلة بالحركة` في حالتنا). بعد ذلك، تحتاج إلى اختيار مستشعر الحركة والمصباح. عند الانتهاء من التكوين، انقر على `حفظ`.

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"تكوين التشغيل الآلي"} %}{% endroboWikiPicture %}

إذا كنت ترغب في إجراء تغييرات، يمكنك العثور عليها من خلال الانتقال إلى `الإعدادات/التشغيلات الآلية والمشاهد` ثم `التشغيلات الآلية`.

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"قائمة التشغيلات الآلية"} %}{% endroboWikiPicture %}

## استيراد المخططات

يمكن لـ Home Assistant استيراد المخططات من منتديات Home Assistant، GitHub ومقتطفات GitHub. تقع قائمة جميع المخططات على [منصة تبادل المخططات](https://community.home-assistant.io/c/blueprints-exchange/53). بعد اختيارك، انتقل إلى `الإعدادات/التشغيلات الآلية والمشاهد` وافتح `المخططات`. انقر على `استيراد مخطط` وأدخل رابط المخطط المختار. ثم انقر على `معاينة المخطط`. في هذه الحالة، سنستخدم [اكتشاف مستوى البطارية المنخفض والإخطار لجميع مستشعرات البطارية](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664).

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"استيراد المخطط"} %}{% endroboWikiPicture %}

سيتم تحميل المخطط وعرض معاينة في حوار الاستيراد. يمكنك تغيير الاسم وإكمال الاستيراد. انقر على `إنشاء تشغيل آلي` لفتح محرر التشغيل الآلي. هنا يمكنك تكوين معلمات التشغيل الآلي وإضافة إجراءات للحصول على الإخطارات.

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"تكوين مخطط البطارية"} %}{% endroboWikiPicture %}