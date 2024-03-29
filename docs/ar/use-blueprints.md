---
title: كيفية استخدام النماذج الأولية
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

في هذه المقالة ستتعرف على كيفية إضافة النماذج الأولية لمساعد المنزل الخاص بك وتكوينها.

## النماذج الأولية للتشغيل التلقائي

تم تثبيت بعض النماذج الأولية بالفعل. تحتاج فقط إلى تكوين التشغيل التلقائي بناءً على هذه النماذج الأولية. يمكنك العثور على النماذج الأولية المثبتة مسبقًا في واجهة الويب في `Settings/Automations & Scenes`. افتح `Blueprints` وابحث عن النموذج الأولي الذي ترغب في استخدامه. في هذا المثال سيتم استخدام `Motion-activated Light`. 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

انقر على `Create Automation` لفتح محرر التشغيل التلقائي. قم بتعيين اسم واختيار نموذج أولي للاستخدام (`Motion-activated Light` في حالتنا). بعد ذلك ، يجب عليك اختيار مستشعر الحركة والمصباح. عند الانتهاء من التكوين ، انقر على `Save.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation التكوين" />

إذا كنت ترغب في إجراء تغييرات ، يمكنك العثور عليها عن طريق الانتقال إلى `Settings/Automations & Scenes` ثم `Automations`. 

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## استيراد النماذج الأولية

يمكن لمساعد المنزل استيراد النماذج الأولية من منتديات مساعد المنزل ومستودع GitHub ومستودعات GitHub Gists. يتم تحديد قائمة جميع النماذج الأولية في [تبادل النماذج الأولية](https://community.home-assistant.io/c/blueprints-exchange/53). بعد اختيارك ، انتقل إلى `Settings/Automations & Scenes` وافتح `Blueprints`. انقر على `Import Blueprint` وأدخل عنوان URL للنموذج الأولي المختار. ثم انقر على `PREVIEW BLUEPRINT`. في هذه الحالة ، سنستخدم [كشف مستوى البطارية المنخفض والإشعار لجميع مستشعرات البطارية](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

سيتم تحميل النموذج الأولي وعرض معاينة في مربع الاستيراد. يمكنك تغيير الاسم وإكمال الاستيراد. انقر على `Create Automation` لفتح محرر التشغيل التلقائي. هنا يمكنك تكوين معلمات التشغيل التلقائي وإضافة إجراءات للحصول على الإشعارات.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 