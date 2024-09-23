---
title: كيفية توصيل جهاز استشعار SDS011

contributors: [tubleronchik]
---

**إليك دليل خطوة بخطوة حول كيفية توصيل جهاز الاستشعار الخاص بك بشبكة Robonomics Sensors و Home Assistant. تستخدم أجهزتنا البرنامج الثابت Robonomics، وهو إصدار محسن من برنامج الاستشعار المجتمعي. يتضمن مستشعرات إضافية ولديه آلية إرسال بيانات معدلة.**

{% roboWikiNote {type: "warning"}%} يمكن شراء جميع الأجهزة من Robonomics على الموقع الرسمي [هنا](https://robonomics.network/devices/).
{% endroboWikiNote %}


## الإعداد

1. قم بتوصيل الجهاز بالمقبس لتشغيله.
2. سيقوم اللوح بإنشاء شبكة Wi-Fi تحمل اسم `RobonomicsSensor-xxxxxxxxx`. اتصل بها من هاتفك أو جهاز الكمبيوتر: سترى نافذة المصادقة (إذا لم تظهر، افتح المتصفح وانتقل إلى `192.168.4.1`).
3. حدد شبكة Wi-Fi الخاصة بك من القائمة (أو اكتبها بنفسك إذا لم تكن في القائمة) واملأ حقل كلمة المرور.
{% roboWikiNote {type: "warning", title: "INFO"}%} يمكن توصيل الجهاز فقط بشبكة Wi-Fi بتردد 2.4 جيجاهرتز. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. اكتب إحداثيات المكان الذي سيتم تثبيت الجهاز فيه. يمكنك الحصول عليها من أي خرائط أو الحصول عليها من العنوان باستخدام [هذا الرابط.](https://www.latlong.net/convert-address-to-lat-long.html)
{% roboWikiNote {type: "warning", title: "WARNING"}%} ستظهر إحداثيات الجهاز على خريطة متاحة للجمهور. إذا كنت لا ترغب في عرض معلوماتك الخاصة، اكتب إحداثيات قريبة ولكن ليست دقيقة.
{% endroboWikiNote %}
5. انقر على `حفظ التكوين وإعادة التشغيل`. سيتم إعادة تشغيل اللوح والاتصال بالشبكة Wi-Fi المحددة.
6. افتح [خريطة أجهزة الاستشعار Robonomics](https://sensors.robonomics.network/#/) وابحث عن المكان الذي قمت بتثبيت الجهاز فيه. خلال بضع دقائق، ستتمكن من رؤية جهاز الاستشعار الخاص بك مع البيانات على الخريطة.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}{% endroboWikiPicture %}

## مساعد المنزل

هناك خياران للتثبيت المتاحان:

### الخيار 1: HACS

أسهل طريقة لإضافة جهاز استشعار لوفتداتن المحلي هي من خلال HACS. [هنا](https://hacs.xyz/docs/setup/download/) يمكنك العثور على شرح موجز حول كيفية إعداد HACS.

بمجرد تثبيت HACS، انتقل إلى HACS -> التكاملات وابحث عن التكامل `Local Luftdaten Sensor`. انقر على زر التنزيل وأعد تشغيل مساعد المنزل بمجرد تنزيل التكامل.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### الخيار 2: التثبيت اليدوي

تحت مستخدم `homeassistant`، انسخ مستودع المشروع:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

إذا كان لديك بالفعل أي تكاملات مخصصة، انسخ `custom_components/local_luftdaten/` إلى دليل `custom_components` الخاص بك، على سبيل المثال:

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

إذا لم يكن لديك أي تكاملات مخصصة، انسخ دليل `custom_components` بأكمله إلى دليل تكوين مساعد المنزل الخاص بك. على سبيل المثال:

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## التكوين

أنشئ إدخال جديد لجهاز الاستشعار في ملف `configuration.yaml` الخاص بك وقم بضبط اسم المضيف أو عنوان IP. للعثور على عنوان IP المحلي لجهاز الاستشعار الخاص بك، يمكنك استخدام [تطبيق Fing المحمول](https://www.fing.com/products) أو [أداة nmap CLI](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). يمكن أن يكون الاسم أي شيء.

|المعلمة              |النوع    | الضرورة    | الوصف
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | مطلوب     | عنوان IP للجهاز
|`scan_interval`        | number | الافتراضي: 180 | التكرار (بالثواني) بين التحديثات
|`name`                 | string | مطلوب    | اسم الجهاز الاستشعاري
|`monitored_conditions` | قائمة   | مطلوب     | قائمة بالأجهزة الاستشعارية المراقبة


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: جهاز قياس جودة الهواء
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> يمكن العثور على قائمة بجميع الأجهزة الاستشعارية المدعومة في [المستودع](https://github.com/lichtteil/local_luftdaten).

أعد تشغيل Home Assistant الخاص بك.
بعد ذلك، يمكنك إضافة جهاز استشعار إلى لوحة التحكم الخاصة بك. سيكون اسم الكيان هو الاسم الذي أضفته إلى `configuration.yaml`.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}