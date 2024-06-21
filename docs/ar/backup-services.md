---
title: خدمات النسخ الاحتياطي

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**في هذه المقالة، ستتعلم كيفية إنشاء نسخ احتياطية لتكوين Home Assistant الخاص بك واستعادته عند الحاجة. لإنشاء النسخ الاحتياطية، يتم استدعاء خدمة تقوم بإنشاء أرشيف آمن يحتوي على ملفات التكوين. تقوم الخدمة أيضًا بإضافة تكوين Mosquitto brocker و Zigbee2MQTT إلى النسخة الاحتياطية إذا كانت موجودة. ثم تقوم هذه الخدمة بإضافة الأرشيف إلى IPFS وتخزين معرف النتيجة في Robonomics Digital Twin.**
## إنشاء نسخة احتياطية لتكوين Home Assistant

يتيح لك إنشاء نسخة احتياطية استعادة تكوين Home Assistant الخاص بك بسهولة في حالة حدوث خطأ.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">

لكي تتمكن من إجراء نسخ احتياطية واستعادة التكوين الخاص بك، من الضروري استخدام **بوابة IPFS مخصصة** مثل Pinata. بدون ذلك، ستتم تخزين نسخة الاحتياطية الخاصة بك فقط على عقدة IPFS المحلية الخاصة بك، مما قد يمنعك من استعادة تكوين Home Assistant الخاص بك في حالة فشل العقدة المحلية.

</robo-wiki-note>

1. في واجهة الويب لـ Home Assistant، انتقل إلى `أدوات المطور` -> `الخدمات`. ابحث عن `Robonomics: حفظ النسخة الاحتياطية في Robonomics` واضغط على `استدعاء الخدمة`.

2. انتظر حتى تظهر إشعار `تم تحديث النسخة الاحتياطية في Robonomics` في `الإشعارات`.

<robo-wiki-note type="warning" title="WARNING">

لا تحاول إنشاء نسخة احتياطية أو استعادة التكوين فور تحميل Home Assistant و Robonomics Integration. يرجى **الانتظار لمدة تقريبية 5 دقائق** لإتمام الإعداد الأولي.

</robo-wiki-note>

وسيطات الخدمة:
- **نسخة احتياطية كاملة** (الافتراضي: خاطئ) - إضافة قاعدة البيانات إلى النسخة الاحتياطية، بحيث يتم تخزين تاريخ حالات الكيان أيضًا.
- **مسار ملف كلمة مرور mosquitto** (الافتراضي: `/etc/mosquitto`) - إذا كنت تستخدم طرق تثبيت Home Assistant Core أو Docker وليس لديك مسار افتراضي لـ Mosquitto brocker، يجب عليك تغيير هذا المعلم. *لا يلزم ذلك لـ Home Assistant OS أو Superviser*.

## استعادة تكوين Home Assistant من النسخة الاحتياطية

لكي تتمكن من استعادة التكوين الخاص بك، ستحتاج إلى Home Assistant و Robonomics Integration مثبتين. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">

لضمان استعادة التكوين الناجحة في طرق تثبيت Home Assistant Core و Docker، تحتاج إلى أداء خطوات الإعداد الإضافية كما هو موضح في نهاية الصفحة.

</robo-wiki-note>

1. قم بتثبيت Home Assistant مع Robonomics Integration (إذا لم يتم تثبيته بعد)، باتباع الخطوات الواردة في المقالة الخاصة بـ [طريقة التثبيت المطلوبة](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-هنا-your-smart-home).

2.  [قم بإعداد Robonomics Integration](https://wiki.robonomics.network/docs/robonomics-hass-integration) باستخدام **نفس البذور** التي استخدمتها في تكوين Robonomics السابق. إذا انتهت اشتراكك، [أعد تنشيطه](https://wiki.robonomics.network/docs/sub-activate).

3. في واجهة الويب لـ Home Assistant، انتقل إلى `أدوات المطور` -> `الخدمات`. ابحث عن `Robonomics: استعادة من النسخة الاحتياطية في Robonomics` واضغط على `استدعاء الخدمة`. انتقل إلى صفحة `نظرة عامة` للتحقق من حالة النسخة الاحتياطية الخاصة بك.

4. بعد الاستعادة، سيتم إعادة تشغيل Home Assistant تلقائيًا. إذا لم يتم إعادة تشغيل Home Assistant لأي سبب، يمكنك التحقق من حالة الاستعادة عن طريق مراقبة حالة الكيان `robonomics.backup`. إذا كانت الحالة هي `تمت الاستعادة`، فسيتعين عليك إعادة تشغيل Home Assistant يدويًا عن طريق الانتقال إلى `الإعدادات` > `النظام` والنقر على زر `إعادة التشغيل` الموجود في الزاوية العلوية اليمنى.

5. إذا كان النسخة الاحتياطية الخاصة بك تتضمن تكوين Zigbee2MQTT أو Mosquitto، فيجب عليك إعادة تشغيل هذه الخدمات لتمكين التكوين الجديد. يمكنك القيام بذلك يدويًا عن طريق إعادة تشغيل الخدمات بشكل فردي، أو يمكنك ببساطة إعادة تشغيل جهاز Home Assistant لضمان إعادة تشغيل جميع الخدمات.

وسيطات الخدمة:
- **مسار ملف كلمة مرور mosquitto** (الافتراضي: `/etc/mosquitto`) - إذا كنت تستخدم طرق تثبيت Home Assistant Core أو Docker وليس لديك مسار افتراضي لـ Mosquitto brocker، يجب عليك تغيير هذا المعلم. *لا يلزم ذلك لـ Home Assistant OS أو Superviser*.
- **مسار تكوين Zigbee2MQTT** (الافتراضي: `/opt/zigbee2mqtt`) - إذا كنت تستخدم طرق تثبيت Home Assistant Core أو Docker وليس لديك مسار افتراضي لـ Zigbee2MQTT، يجب عليك تغيير هذا المعلم. *لا يلزم ذلك لـ Home Assistant OS أو Superviser*.

## استعادة تكوين Mosquitto و Zigbee2MQTT لطريقة تثبيت Home Assistant Core

إذا كانت النسخة الاحتياطية تتضمن تكوين Mosquitto أو Zigbee2MQTT، خلال عملية الاستعادة، سيتم وضعهما في المسار الافتراضي أو في المسار المحدد في المعلمات. ومع ذلك، إذا قمت بتثبيت تكامل Robonomics في Home Assistant Core الموجود *(ليس من صورة Robonomics المثبتة مسبقًا)*، فقد لا يكون لدى المستخدم `homeassistant` صلاحية الوصول إلى هذا المسار.

لذا لاستعادة تكوين Mosquitto و Zigbee2MQTT، يجب منح أذونات القراءة اللازمة للمستخدم `homeassistant`:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## نسخ احتياطي لتكوين Mosquitto و Zigbee2MQTT لطريقة تثبيت Home Assistant بواسطة Docker

لنقل نسخ احتياطية لتكوينات Mosquitto و Zigbee2MQTT من حاوية Docker ، تحتاج إلى إنشاء أحجام لتكويناتهما المعنية. يمكن تحقيق ذلك عن طريق تشغيل حاوية Home Assistant الخاصة بك بوسائط إضافية:

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

أو إجراء تغييرات في ملف `compose.yaml` الخاص بك:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

يرجى ملاحظة أن المسارات الافتراضية لتكوينات Mosquitto و Zigbee2MQTT هي `/etc/mosquitto` و `/opt/zigbee2mqtt` على التوالي. ومع ذلك ، قد تختلف هذه المسارات اعتمادًا على إعدادك المحدد.

</robo-wiki-note>

## أزرار النسخ الاحتياطي

بالإضافة إلى استخدام الخدمات للعمل مع النسخ الاحتياطية ، يمكنك تبسيط العملية باستخدام أزرار `button.create_backup` و `button.restore_from_backup` من تكامل Robonomics. تُطلق هذه الأزرار الخدمات المعنية بالمعلمات الافتراضية (تنشئ زر النسخ الاحتياطي نسخة احتياطية بدون تاريخ).

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

لإضافة أزرار إلى لوحة التحكم الخاصة بك ، اتبع هذه الخطوات:

1. انقر على النقاط الثلاث في الزاوية اليمنى العلوية من لوحة التحكم.
2. حدد `تحرير لوحة التحكم`.
3. انقر على زر `إضافة بطاقة` في الزاوية اليمنى السفلية.
4. اختر بطاقة `الكيانات`.
5. في حقل `الكيانات` ، ابحث عن كيانات button.create_backup و button.restore_from_backup.
6. اضغط على `حفظ` لإضافة الكيانات إلى البطاقة.
7. انتهِ من التحرير بالنقر على زر `تم` في الزاوية اليمنى العلوية.