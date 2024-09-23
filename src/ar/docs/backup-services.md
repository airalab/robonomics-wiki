---
title: خدمات النسخ الاحتياطي

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**في هذه المقالة، ستتعلم كيفية إنشاء نسخ احتياطية من تكوين Home Assistant الخاص بك واستعادته عند الحاجة. لإنشاء النسخ الاحتياطية، يتم استدعاء خدمة تقوم بإنشاء أرشيف آمن يحتوي على ملفات التكوين. تقوم الخدمة أيضًا بإضافة تكوين Mosquitto brocker و Zigbee2MQTT إلى النسخة الاحتياطية إذا كانت موجودة. ثم تقوم هذه الخدمة بإضافة الأرشيف إلى IPFS وتخزين الـ CID الناتج في Robonomics Digital Twin.**
## إنشاء نسخ احتياطية لتكوين Home Assistant

إنشاء نسخة احتياطية يتيح لك استعادة تكوين Home Assistant الخاص بك بسهولة في حالة حدوث خطأ.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "تحذير"}%}لإجراء عملية النسخ الاحتياطي واستعادة التكوين الخاص بك، من الضروري استخدام **بوابة IPFS مخصصة** مثل Pinata. دون ذلك، ستتم تخزين نسختك الاحتياطية فقط على عقدة IPFS المحلية الخاصة بك، مما قد يمنعك من استعادة تكوين Home Assistant الخاص بك في حالة فشل العقدة المحلية.
{% endroboWikiNote %}

1. في واجهة الويب لـ Home Assistant، انتقل إلى `Developer Tools` -> `Services`. ابحث عن `Robonomics: Save Backup to Robonomics` واضغط على `CALL SERVICE`.

2. انتظر حتى ترى إشعار `تم تحديث النسخ الاحتياطية في Robonomics` يظهر في `Notification`.


{% roboWikiNote {type: "warning", title: "تحذير"}%} لا تحاول إنشاء نسخة احتياطية أو استعادة التكوين مباشرة بعد تحميل Home Assistant و Robonomics Integration. يرجى **الانتظار لمدة تقريبية 5 دقائق** للسماح بإكمال الإعداد الأولي. {% endroboWikiNote %}

معلمات الخدمة:
- **نسخة احتياطية كاملة** (افتراضيًا: خطأ) - إضافة قاعدة البيانات إلى النسخة الاحتياطية، بحيث يتم تخزين تاريخ حالات الكيان أيضًا.
- **مسار إلى ملف كلمة مرور mosquitto** (افتراضيًا: `/etc/m`osquitto`) - إذا كنت تستخدم طرق تثبيت Home Assistant Core أو Docker وليس لديك مسار افتراضي إلى وسيط Mosquitto، يجب عليك تغيير هذا المعلمة. *لا يلزم ذلك في Home Assistant OS أو Superviser*.

## استعادة تكوين Home Assistant من النسخ الاحتياطي

لكي تستعيد تكوينك، ستحتاج إلى Home Assistant مثبت ودمج Robonomics.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}لضمان نجاح استعادة تكوينك في Home Assistant Core وطرق تثبيت Docker، يجب عليك أداء خطوات الإعداد الإضافية كما هو موضح في نهاية الصفحة.
{% endroboWikiNote %}

1. قم بتثبيت Home Assistant مع دمج Robonomics (إذا لم يتم تثبيته بعد)، اتبع الخطوات الموجودة في المقالة لـ [طريقة التثبيت المرغوبة](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [قم بإعداد دمج Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) باستخدام **نفس البذور** التي استخدمتها في تكوين Robonomics السابق. إذا انتهت اشتراكك، [أعد تنشيطه](https://wiki.robonomics.network/docs/sub-activate).

3. في واجهة الويب لـ Home Assistant، انتقل إلى `Developer Tools` -> `Services`. ابحث عن `Robonomics: Restore from the Backup in Robonomics` واضغط على `CALL SERVICE`. انتقل إلى صفحة `Overview` للتحقق من حالة النسخ الاحتياطي الخاص بك.

4. بعد الاستعادة، سيقوم Home Assistant بإعادة التشغيل تلقائيًا. إذا لم يتم إعادة تشغيل Home Assistant لأي سبب، يمكنك التحقق من حالة الاستعادة عن طريق مراقبة حالة كيان `robonomics.backup`. إذا كانت الحالة `restored`، ستحتاج إلى إعادة تشغيل Home Assistant يدويًا عن طريق الانتقال إلى `Settings` > `System` والنقر على زر `RESTART` الموجود في الزاوية اليمنى العلوية.

5. إذا كان النسخ الاحتياطي الخاص بك يتضمن تكوين Zigbee2MQTT أو Mosquitto، يجب عليك إعادة تشغيل هذه الخدمات لتمكين التكوين الجديد. يمكنك القيام بذلك.بإمكانك إعادة تشغيل الخدمات بشكل يدوي عن طريق إعادة تشغيل كل خدمة على حدة، أو بإمكانك ببساطة إعادة تشغيل جهاز Home Assistant لضمان إعادة تشغيل جميع الخدمات.

وسيطرح الخدمات التالية:
- **مسار ملف كلمة مرور mosquitto** (الافتراضي: `/etc/mosquitto`) - إذا كنت تستخدم طرق تثبيت Home Assistant Core أو Docker وليس لديك مسار افتراضي لوسيط Mosquitto، يجب عليك تغيير هذا المعلم. *غير مطلوب لنظام التشغيل Home Assistant OS أو المشرف*.
- **مسار تكوين Zigbee2MQTT** (الافتراضي: `/opt/zigbee2mqtt`) - إذا كنت تستخدم طرق تثبيت Home Assistant Core أو Docker وليس لديك مسار افتراضي لـ Zigbee2MQTT، يجب عليك تغيير هذا المعلم. *غير مطلوب لنظام التشغيل Home Assistant OS أو المشرف*.

## استعادة تكوين Mosquitto و Zigbee2MQTT لطريقة تثبيت Home Assistant Core

إذا كانت النسخة الاحتياطية تتضمن تكوين Mosquitto أو Zigbee2MQTT، خلال عملية الاستعادة، سيتم وضعها في المسار الافتراضي أو في المسار المحدد في المعلمات. ومع ذلك، إذا قمت بتثبيت تكامل Robonomics في Home Assistant Core الحالي *(ليس من الصورة المثبتة مسبقًا)*، فقد لا يكون لمستخدم `homeassistant` الوصول إلى هذا المسار.

لذا، لاستعادة تكوين Mosquitto و Zigbee2MQTT، يجب منح أذونات القراءة اللازمة للمستخدم `homeassistant`:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## نسخ احتياطي لتكوين Mosquitto و Zigbee2MQTT لطريقة تثبيت Home Assistant Docker

لنسخ احتياطي لتكوينات Mosquitto و Zigbee2MQTT من حاوية Docker، يجب إنشاء أحجام لتكويناتهما الخاصة. يمكن تحقيق ذلك عن طريق تشغيل حاوية Home Assistant الخاصة بك بمعلمات إضافية:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

أو قم بإجراء التغييرات في ملف `compose.yaml` الخاص بك:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"ملاحظة"}%}يرجى ملاحظة أن المسارات الافتراضية لتكوينات Mosquitto و Zigbee2MQTT هي `/etc/mosquitto` و `/opt/zigbee2mqtt` على التوالي. ومع ذلك، قد تختلف هذه المسارات اعتمادًا على إعدادك الخاص.
{% endroboWikiNote %}

## أزرار النسخ الاحتياطي

بالإضافة إلى استخدام الخدمات للعمل مع النسخ الاحتياطية، يمكنك تبسيط العملية عن طريق استخدام أزرار `button.create_backup` و `button.restore_from_backup` من تكامل Robonomics. تُشغل هذه الأزرار الخدمات المعنية بمعلمات افتراضية (تقوم زر النسخ الاحتياطي بإنشاء نسخة احتياطية بدون تاريخ).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

لإضافة الأزرار إلى لوحة التحكم الخاصة بك، اتبع هذه الخطوات:

1. انقر على النقاط الثلاث في الزاوية اليمنى العلوية من لوحة التحكم.
2. حدد `تحرير لوحة التحكم`.
3. انقر على زر `إضافة بطاقة` في الزاوية اليمنى السفلى.
4. اختر بطاقة `الكيانات`.
5. في حقل `الكيانات`، ابحث عن الكيانات button.create_backup و button.restore_from_backup.
6. اضغط على `حفظ` لإضافة الكيانات إلى البطاقة.
7. انتهِ من التحرير بالنقر على زر `تم` في الزاوية اليمنى العلوية.