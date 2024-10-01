---
title: التحكم في كاميرا PTZ في Home Assistant
contributors: [nakata5321]
---

يغطي هذا المقال عملية إعداد كاميرا PTZ في Home Assistant.
سيتم استخدام بروتوكول ONVIF. وهذا يتطلب حساب كاميرا محلي.

{% roboWikiNote {type: "warning"}%} لم يتم تغطية عملية إعداد حساب الكاميرا المحلي في هذا المقال.
{% endroboWikiNote %}


المتطلبات:
- كاميرا PTZ
- حساب كاميرا محلي
- عنوان IP للكاميرا
- Home Assistant مكون

## دمج ONVIF

لنبدأ بتثبيت **دمج ONVIF**.

انتقل إلى "الأجهزة والخدمات" في "الإعدادات" واضغط على زر "إضافة دمج".
اكتب "ONVIF" واختر الدمج. سترى النافذة التالية.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

اضغط على زر "Submit". سيحاول البحث تلقائيًا عن كاميرتك. إذا نجح ذلك،
اختر كاميرتك من القائمة واملأ الحقول الفارغة.
وإلا، يجب عليك ملء جميع الحقول يدويًا. سترى النافذة التالية.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

املأ الفجوات:
- الاسم - قم بإعطاء اسم لكاميرتك
- المضيف - قم بتوفير عنوان IP لكاميرتك
- المنفذ - عادةً ما يكون 2020، ولكن مزود الكاميرا قد يغيره
- اسم المستخدم - اكتب اسم مستخدم حساب الكاميرا المحلي
  - كلمة المرور - اكتب كلمة مرور لحساب الكاميرا المحلي

ثم اضغط على "Submit". اختر منطقة لكاميرتك وانقر على "Finish".

## إضافة تحكم الكاميرا إلى لوحة التحكم

الآن بعد أن قمت بإعداد الكاميرا بالكامل، يمكنك إضافة تيارها وأزرار التحكم إلى لوحة التحكم.

انتقل إلى لوحة التحكم وابدأ بإنشاء بطاقة جديدة. اختر "Picture Glance".

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

املأ البيانات:
- العنوان - اختر عنوان صورة الكاميرا
- كيان الكاميرا - اختر كيان كاميرا من القائمة المنسدلة
- عرض الكاميرا - اختر "مباشر" للحصول على تأخير أقل

ثم انتقل إلى وضع "محرر الكود" عن طريق الضغط على الزر في الجهة السفلى اليسرى. سترى الكود التالي:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

استبدل محتوى `entities: []` وفقًا للمثال أدناه (`<YOUR_CAMERA_ENTITY>` هو نفس المعلمة `camera_image`):

{% codeHelper { copy: true}%}

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

هذا كل شيء. الآن يجب أن ترى بطاقة كاميرا PTZ على لوحة التحكم مع أزرار التحكم.

## حل المشكلات
إذا كنت تستخدم Home Assistant Core ولم ترَ تيارًا من الكاميرا، يجب عليك تثبيت دمج "stream" و "FFMPEG".
للقيام بذلك، يجب عليك إضافة السلاسل `stream: ` و `ffmpeg: ` إلى نهاية configuration.yaml.