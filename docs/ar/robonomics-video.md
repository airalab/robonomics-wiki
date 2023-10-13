---
title: خدمة فيديو روبونوميكس
contributors: [nakata5321]
---

يوضح هذا المقال كيفية إضافة كاميرا IP إلى Home Assistant وإرسال مقاطع الفيديو إلى خدمة Robonomics على الويب.

لتوصيل الكاميرا بـ Home Assistant ، تحتاج إلى معرفة عنوان IP الخاص با وإنشاء حساب كاميرا محلي للاتصال بتيار RTSP.

<robo-wiki-note type="warning">
نظرًا لأن هذا يتم بطرق مختلفة لكل كاميرا ، فإن هذه العملية لا تعتبر في هذا المقال.
</robo-wiki-note>

المتطلبات:
- كاميرا IP
- حساب كاميرا محلي مكون
- عنوان IP للكاميرا
- Home Assistant المكونة

<robo-wiki-note type="note">

يفترض هذا المقال أن لديك كاميرا IP عامة بدون خيارات RTZ (تدوير ، ميل ، تكبير). 
"إذا كان لديك كاميرا RTZ ، فتحقق من [مقال \"كاميرا RTZ\"](/docs/ptz-camera). ثم عد إلى الخطوة الثانية هنا.",

</robo-wiki-note>

## قم بتوصيل الكاميرا

أولاً، تحتاج إلى معرفة عنوان URL الخاص ببث RTSP الخاص بالكاميرا.
للقيام بذلك ، حاول إدخال الاستعلام التالي على الإنترنت: "<CAMERA_NAME> تيار RTSP".
يجب أن يبدأ عنوان URL بـ `rtsp://<IP_Address>...`. 

يستخدم هذا المقال كاميرا "Tapo" ومسار التيار هو `rtsp://<IP_Address>/stream1`.

افتح Home Assistant وانتقل إلى "Settings"-> "Devices & Services". اضغط على زر "ADD INTEGRATION" و
ابدأ الكتابة "Generic Camera"  اختره.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

في نافذة التكوين ، قم المعلومات التالية:
- Stream Source URL - عنوان URL لتيار RTSP الكاميرا
- Username - اكتب اسم مستخدم حساب الكاميرا المحلي الخاص بك
- Password - اكتب كلمة مرور لحساب الكاميرا المحلي الخاص بك

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

انتقل إلى أسفل الإعدادات واضغط على زر "إرسال".

في نافذة المعاينة ، قم بتفعيل خانة الاختيار "This image looks good." واضغط على زر "إرسال". ثم - "إنهاء".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### أضف إلى لوحة المعلومات

بالإضافة إلى ذلك ، يمكنك إضافة التيار إلى لوحة المعلومات الخاصة بك. للقيام بذلك ، انتقل إلى لوحة المعلومات وأنشئ بطاقة جديدة 
"صورة سريعة". الخطوات الإضافية:
- أدخل "العنوان" الذي تريده
- احذف البيانات من "مسار الصورة"
- حدد الكاميرا في "كيان الكاميرا"
- في "عرض الكاميرا" ، حدد "مباشر" حتى يكون هناك تأخير أقل

واحفظها.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## تحقق من مجلد الوسائط

قبل إرساله إلى Robonomics Video Service، يجب حفظ الفيديو في مجلد، ويجب أن يكون لدى Home Assistant حق الوصول إلى هذا المجلد.
أسهل خيار في هذه الحالة هو استخدام حزمة وسائط ، حيث يقم Home Assistant بتخزين جميع الوسائط.

- إذا كنت تستخدم HAOS أو Pre-installed Image ، فلديك بالفعل مجلد وسائط في Home Assistant الخاص بك.
- إذا كنت تستخدم Home Assistant Core ، فيجب عليك الانتقال إلى مجلد `.homeassistant` وإنشاء مجلد `media` فيه.
- إذا كنت تستخدم Home Assistant Docker ، فأضف سطر ` -v /PATH_TO_YOUR_MEDIA:/media \` إلى أمر Docker.

للتحقق من أن كل شيء تم تعيينه بشكل صحيح ، انتقل إلى علامة التبويب “Media” -> “local media” في Home Assistant الخاص بك. 
يجب أن ترى مجلدًا فارغًا (بدون أخطاء):

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## استدعاء الخدمة

لإرسال فيديو إلى Robonomics ، يجب عليك استدعاء خدمة مخصصة في Home Assistant. 
في هذا المقال يتم ذلك يدويًا ، ولكن يمكنك إنشاء تلقائي لذلك.

للقيام بذلك ، انتقل إلى  "Developer tools" -> "Services"وابحث عن "Robonomics: حفظ التسجيل في Robonomics ".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

في "الأهداف" اختر كيان الكاميرا الخاص بك.
في "مسار حفظ التسجيل" يجب أن قدم مسارًا مطلقًا إلى المجلد،
حيث يمكن لـ Home Assistant حفظ الفيديو:
- للصورة المثبتة مسبقًا - `/home/homeassistant/.homeassistant/media`;
- لـ HA OS أو Home Assistant Docker- `/media`;
- لـ Home Assistant Core - مسار إلى المجلد الذي تم إنشاؤه مسبقًا للوسائط.

بالإضافة إلى ذلك ، يمكنك اختيار مدة التسجيل. 

املأ البيانات واستدعِ الخدمة باستخدام زر "استدعاء الخدمة".

## DAPP

لعرض الفيديو الناتج ، انتقل إلى [Robonomics DAPP](https://vol4tim.github.io/videostream/).

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

الصق عنوان حساب جهاز التحكم الخاص بك وانقر على الزر أدناه. انتظر عملية "البحث عن التوائم". 
كنتيجة ، ستحصل على CID IPFS مع جميع مقاطع الفيديو المسجلة.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

بعد ذلك ، حدد حساب جهاز التحكم (أو أي حساب آخر) من القائمة المنسدلة وقم بتوقيع رسالة للتفويض في
بوابة Web3 IPFS لتنزيل جميع مقاطع الفيديو. كنتيجة ، ستحصل على جميع مقاطع الفيديو المسجلة بواسطة منزلك الذكي.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

نظرًا لأن جميع مقاطع الفيديو في المجلد مشرة بمفتاح جهاز التحكم ، فإنه يجب عليك إدخاله لفك تشفير مقاطع الفيديو.
بعد ذلك ، يتم تنشيط زر تشغيل الفيديو. انقر عليه لتنزيل الفيديو.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






