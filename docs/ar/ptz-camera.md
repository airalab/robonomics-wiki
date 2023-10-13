---
title: تحكم في كاميرا PTZ في Home Assistant
contributors: [nakata5321]
---

تغطي هذه المقالة عملية إعداد كاميرا PTZ في Home Assistant. 
سيتم استخدام بروتوكول ONVIF. هذا يتطلب حساب كاميرا محلي.

<robo-wiki-note type="warning">
عملية إعداد حساب الكاميرا المحلية غير مشمولة في هذه المقالة.
</robo-wiki-note>

المتطلبات:
- كاميرا PTZ
- حساب كامرا محلي
- عنوان IP للكاميرا
- Home Assistant المكونة

## التكامل مع ONVIF

لنبدأ بتثبيت **تكامل ONVIF**. 

انتقل إلى "Devices & Services" في "Settings" واضغط على الزر "ADD INTEGRATION".
اكتب "ONVIF" واختر التكامل. ستظهر النافذة التالية.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

اضغط على زر "Submit". سيحاول البحث تلقائيًا عن الكاميرا الخاصة بك. إذا نجح، 
اختر كاميراك من القائمة واملأ الحقول الفارغة. 
إلا أنه يجب عليك ملء جميع الحقول يدويًا إذا لم ينجح البحث التلقائي. ستظهر النافذة التالية.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

املأ الفجوات:
- Name - قم بإعطاء اسم لكاميراك
- Host - قدم عنوان IP لكاميراك
- Port - عادة ما يكون 2020 هو الأكثر شيوعًا، ولكن مزود الكاميرا الخاص بك قد يغيره
- Username - اكتب اسم مستخدم حساب الكاميرا المحلي
  - Password - اكتب كلمة مرور لحساب الكاميرا المحلي

واضغط على "Submit". اختر منطقة للكاميرا الخاصة بك وانقر على "Finish".

## أضف تحكم الكاميرا إلى لوحة القيادة

الآن بعد أن قمت بإعداد الكاميرا بالكامل، يمكنك إضافة تدفقها وأزرار التحكم إلى لوحة القيادة.

انتقل إلى لوحة القيادة وابدأ بإنشاء بطاقة جديدة. اختر "Picture Glance".

 <robo-wiki-picture src="home-assistant/glance.jpg" />

املأ البيانات:
- Title - اختر عنوان صورة الكاميرا
- Camera Entity - اختر كيان الكاميرا من القائمة المنسدلة
- Camera View - اختر "live" للحصول على تأخير أقل

بعد ذلك، انتقل إلى وضع "Code Editor" عن طريق الضغط على الزر في الجانب الأيسر السفلي. سترى الكود التالي:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

استبدل محتوى `entities: []` وفقًا للمثال التالي (`<YOUR_CAMERA_ENTITY>` هو نفس المعلمة `camera_image`):

<code-helper copy>

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

</code-helper>

هذا كل شيء. الآن يجب أن ترى بطاقة الكاميرا PTZ على لوحة القيادة مع أزرار التحكم.

## حل المشاكل
إذا كنت تستخدم Home Assistant Core ولا ترى تيارًا من الكاميرا ، يجب عليك تثبيت تكاملات "stream" و "FFMPEG". 
للقيام بذلك، يجب عليك إضافة السلاسل `stream: ` و `ffmpeg: ` في نهاية configuration.yaml.