---

title: منزل روبونوميكس الذكي

contributors: [LoSk-p]

---

يمكنك تلقي إشعارات على هاتفك الذكي باستخدام [notify](https://notify.events/). أولاً، قم بالتسجيل هناك وعلى `لوحة التحكم` قم بإنشاء قناة جديدة:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

أضف العنوان واضغط `حفظ`:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

ثم اضغط `إضافة مصدر` واختر `Home Assistant` في علامة `IoT and Smart Home`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

اكتب العنوان واضغط `التالي`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

سترى هنا الرمز الذي تحتاج إلى إضافته إلى ملف التكوين الخاص بـ Home Assistant. احفظه في مكان ما واضغط `تم`:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

ثم اضغط `اشتراك` لإضافة مشتركين:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

اختر أي مشترك تريده واتبع التعليمات.

الآن تحتاج إلى تحرير التكوين على جهاز الكمبيوتر الخاص بك مع Home Assistant. تحت مستخدم `homeassistant`، افتح ملف `configuration.yaml`:

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

{% codeHelper { copy: true}%}

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
      message: Door was changed to {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

سيقوم هذا التلقائي بإرسال رسالة `تم تغيير الباب إلى تشغيل/إيقاف` بعد تغيير حالة المستشعر برقم الكيان `binary_sensor.contact_sensor_contact` من `إيقاف` إلى `تشغيل`.

وأعد تشغيل Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```