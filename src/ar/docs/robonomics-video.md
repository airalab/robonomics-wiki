---
title: خدمة فيديو روبونوميكس
contributors: [nakata5321]
---

يوضح هذا المقال كيفية إضافة كاميرا IP إلى Home Assistant وإرسال مقاطع الفيديو إلى خدمة الويب Robonomics.

لتوصيل كاميرا بـ Home Assistant، تحتاج إلى معرفة عنوان IP الخاص بها وإنشاء حساب كاميرا محلي للاتصال بتيار RTSP.

{% roboWikiNote {type: "warning"}%} نظرًا لأن هذا يتم بطريقة مختلفة لكل كاميرا، فإن هذه العملية لا تعتبر في هذا المقال.
{% endroboWikiNote %}

المتطلبات:
- كاميرا IP
- حساب كاميرا محلي مكون
- عنوان IP للكاميرا
- Home Assistant مكون

{% roboWikiNote {type: "warning"}%} يفترض هذا المقال أن لديك كاميرا IP عامة بدون خيارات RTZ (تدوير، ميل، تكبير). إذا كان لديك كاميرا RTZ، تحقق من ["مقال الكاميرا RTZ"](docs/ptz-camera). ثم عد إلى الخطوة الثانية هنا. {% endroboWikiNote %}

## توصيل الكاميرا

أولاً، تحتاج إلى معرفة عنوان URL لتيار RTSP للكاميرا.
للقيام بذلك، جرب إدخال الاستعلام التالي على الإنترنت: "<اسم الكاميرا> تيار RTSP".
يجب أن يبدأ عنوان URL للتيار بـ `rtsp://<عنوان_IP>...`.

يستخدم هذا المقال كاميرا "Tapo" ومسار التيار هو `rtsp://<عنوان_IP>/stream1`.

افتح Home Assistant وانتقل إلى "الإعدادات"-> "الأجهزة والخدمات". اضغط على زر "إضافة تكامل" وابدأ بكتابة "كاميرا عامة" التكامل. اختره.

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

في نافذة التكوين، قدم المعلومات التالية:
- عنوان مصدر التيار - عنوان URL لتيار RTSP الكاميرا
- اسم المستخدم - اكتب اسم مستخدم حساب الكاميرا المحلي الخاص بك
- كلمة المرور - اكتب كلمة مرور لحساب الكاميرا المحلي الخاص بك

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

انتقل إلى أسفل الإعدادات واضغط على زر "إرسال".

في نافذة المعاينة، قم بتنشيط خانة الاختيار "هذه الصورة تبدو جيدة." واضغط على زر "إرسال". ثم - "إنهاء".

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"} %}{% endroboWikiPicture %}

### إضافة إلى لوحة التحكم

بالإضافة إلى ذلك، يمكنك إضافة البث إلى لوحة التحكم الخاصة بك. للقيام بذلك، انتقل إلى لوحة التحكم وأنشئ بطاقة جديدة "Picture Glance". الخطوات الإضافية:
- أدخل "العنوان" الذي تريده
- احذف البيانات من "مسار الصورة"
- حدد الكاميرا في "كيان الكاميرا"
- في "عرض الكاميرا"، حدد "مباشر" بحيث يكون هناك تأخير أقل

واحفظها.
{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}


## تحقق من مجلد الوسائط

قبل إرسال الفيديو إلى خدمة Robonomics Video، يجب حفظ الفيديو في مجلد، ويجب أن يكون لدى Home Assistant وصول إلى هذا المجلد.
أسهل خيار في هذه الحالة هو استخدام حزمة وسائط، حيث يقوم Home Assistant بتخزين جميع الوسائط.

- إذا كنت تستخدم HAOS أو Pre-installed Image فإن Home Assistant لديك بالفعل "مجلد وسائط".
- إذا كنت تستخدم Home Assistant Core، يجب عليك الانتقال إلى مجلد `.homeassistant` وإنشاء مجلد `media` فيه.
- إذا كنت تستخدم Home Assistant Docker، أضف سطر ` -v /PATH_TO_YOUR_MEDIA:/media \` إلى أمر Docker.

للتحقق من أن كل شيء تم تهيئته بشكل صحيح، انتقل إلى علامة "وسائط" -> "وسائط محلية" في Home Assistant الخاص بك.
يجب أن ترى مجلدًا فارغًا (بدون أخطاء):

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## استدعاء الخدمة

لإرسال فيديو إلى Robonomics، يجب عليك استدعاء خدمة مخصصة في Home Assistant.
يتم ذلك يدويًا في هذه المقالة، ولكن يمكنك إنشاء تلقائية لذلك.

للقيام بذلك، انتقل إلى "أدوات المطور" -> "الخدمات" وابحث عن "Robonomics: حفظ التسجيل في Robonomics".

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

في "الأهداف"، اختر كيان الكاميرا الخاص بك.
في "المسار لحفظ التسجيل" يجب عليك توفير مسار مطلق إلى المجلد،
حيث يمكن لـ Home Assistant حفظ الفيديو:
- للصورة المثبتة مسبقًا - `/home/homeassistant/.homeassistant/media`;
- لـ HA OS أو Home Assistant Docker - `/media`- لـ Home Assistant Core - المسار إلى المجلد الذي تم إنشاؤه مسبقًا للوسائط.

بالإضافة إلى ذلك، يمكنك اختيار مدة التسجيل.

املأ البيانات واستدعي الخدمة باستخدام زر "استدعاء الخدمة".

## DAPP

لعرض الفيديو الناتج، انتقل إلى [Robonomics DAPP](https://vol4tim.github.io/videostream/).

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

الصق عنوان حساب جهاز التحكم الخاص بك وانقر على الزر أدناه. انتظر عملية "البحث عن التوائم".
كنتيجة، ستحصل على IPFS CID مع جميع مقاطع الفيديو المسجلة.

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

بعد ذلك، حدد حساب جهاز التحكم (أو أي حساب آخر) من قائمة السحب والإفلات وقم بتوقيع رسالة للتفويض في بوابة Web3 IPFS لتنزيل جميع مقاطع الفيديو. كنتيجة، ستحصل على جميع مقاطع الفيديو التي سجلتها منزلك الذكي.

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

نظرًا لأن جميع مقاطع الفيديو في المجلد مشفرة بمفتاح جهاز التحكم، يجب عليك إدخاله لفك تشفير مقاطع الفيديو.
بعد ذلك، يتم تنشيط زر تشغيل الفيديو. انقر عليه لتنزيل الفيديو.

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}