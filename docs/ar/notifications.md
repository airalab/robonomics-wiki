---
title: روبونوميكس سمارت هوم

contributors: [LoSk-p]
---

يمكنك تلقي إشعارات على هاتفك الذكي باستخدام [notify](https://notify.events/). أولاً قم بالتسجيل هناك وفي `لوحة التحكم` قم بإنشاء قناة جديدة:

![control_panel](../images/home-assistant/not_control_panel.png)

أضف العنوان واضغط على `حفظ`:

![channel](../images/home-assistant/not_create_chanell.png)

ثم ضغط على `Add Source`واختر `Home Assistant` في علامة التبويب `IoT and Smart Home`:

![source](../images/home-assistant/not_add_source.png)

اكتب العنوان واضغط على `Next`:

![source_next](../images/home-assistant/not_add_source_next.png)

سترى هناك الرمز الذي تحتاج إلى إضافته إلى ملف التكوين الخاص بك لـ Home Assistant. احفظه في مكان ما واضغط على `Done`:

![token](../images/home-assistant/not_token.png)

ثم اضغط على `Subscribe` لإضافة المشتركين:

![subscribe](../images/home-assistant/not_subscribe.png)

اختر أي مشترك تريده واتبع التعليمات.

الآن تحتاج إلى تحرير التكوين على جهاز الكمبيوتر الخاص بك باستخدام Home Assistant. تحت مستخدم `homeassistant` افتح ملف `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

وأضف هذه الأسطر:

```yaml
notify_events:
    token: <your token from notify>
```
أضف أيضًا تلقائي جديد بعد سطر `automation:`:
```yaml
- alias: notifications
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: Door was changed to {{ states("binary_sensor.contact_sensor_contact") }}
```
سيقوم هذا التلقائي بإرسال رسالة `Door was changed to on/off` بعد تغيير حالة الاستشعار برقم الكيان `binary_sensor.contact_sensor_contact` من `off` إلى `on`.

وأعد تشغيل Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```