---
title: المساهمة
contributors: [positivecrash, ensrationis]
---

Robonomics مشروع مفتوح المصدر، ونريد أن نجعل المساهمة فيه سهلة على الجميع. يمكنك الإبلاغ عن مشكلة، أو اقتراح تغيير، أو تحسين الكود أو هذا التوثيق. افتح issue أو pull request في المستودع الذي ينتمي إليه التغيير.

## المستودعات الرئيسية

- [airalab/robonomics](https://github.com/airalab/robonomics): وقت التشغيل ووحداته. فيه ملفا CONTRIBUTING.md وSECURITY.md خاصان به.
- [airalab/robins](https://github.com/airalab/robins): أدوات، منها أداة سطر الأوامر `cps` وبوابات الأجهزة.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): مكتبة Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): تطبيق الويب على [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): هذا الويكي.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): الموقع الرئيسي.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): موقع Robonomics Academy.

## الإبلاغ عن المشكلات

1. اختر المستودع الذي تنتمي إليه المشكلة.
2. إذا كانت خطأً برمجيًا، فتحقق من أنه لم يُبلَّغ عنه من قبل.
3. اكتب عنوانًا ووصفًا واضحين، مع أكبر قدر ممكن من المعلومات ذات الصلة.
4. لهذا الويكي، استخدم قالب الـ issue واذكر الصفحة التي تحتاج إلى إصلاح.

لا تبلّغ عن الثغرات الأمنية في issues علنية. اتبع ملف SECURITY.md في [airalab/robonomics](https://github.com/airalab/robonomics): فهو يعتمد الإبلاغ الخاص عبر GitHub Security Advisories.

## اقتراح تغييرات على الشبكة

يقرر حاملو XRT التغييرات على وقت التشغيل ومعاملاته. صِف الفكرة أولًا في issue على [airalab/robonomics](https://github.com/airalab/robonomics/issues)، ثم اطرحها في استفتاء. راجع [XRT والحوكمة](/docs/xrt-and-governance/#how-to-propose-a-change).

## طلبات الدمج (Pull requests)

1. للإصلاحات الصغيرة مثل الأخطاء الإملائية، الـ pull request أفضل من الـ issue.
2. صِف المشكلة والحل في الـ pull request. وأرفق رابط الـ issue المرتبط إن وُجد.
3. لا ترسل pull requests تقتصر على إصلاح المسافات أو التنسيق.
4. اتبع أسلوب النص المحيط ولغته وتخطيطه.

## تحرير هذا الويكي

يُبنى الويكي باستخدام Eleventy. تحتاج إلى Node.js 20، أو 22 وما بعده.

1. استنسخ [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki)، ثم شغّل `npm install` و`npm run start` لعرضه محليًا.
2. الصفحات ملفات Markdown في `src/docs/`. يبدأ كل منها بـ frontmatter: `title`، و`contributors` (أسماء مستخدمي GitHub)، و`tools` اختياريًا.
3. الشريط الجانبي هو `src/_data/sidebar_docs.json`. عندما تضيف مُدخلًا، أضف عنوانه إلى `translations/pages/en.json` أيضًا.

يشرح [ملف README](https://github.com/airalab/robonomics-wiki#readme) مكونات الصفحات وطريقة العمل على الترجمة.
