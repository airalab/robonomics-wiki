---
title: كيفية إضافة مستشعر SDS011 إلى Home Assistant

contributors: [tubleronchik]
---

يشرح هذا المقال كيفية توصيل مستشعر جودة الهواء SDS مع البرامج الثابتة [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) و [Robonomics](https://github.com/airalab/sensors-software) إلى Home Assistant.

## التثبيت 
هناك خياران للتثبيت المتاحان:

### الخيار 1: HACS

أسهل طريقة لإضافة مستشعر Luftdaten المحلي هي من خلال HACS. يمكنك [هنا](https://hacs.xyz/docs/setup/download/) العثور على شرح موجز حول كيفية إعداد HACS.

بمجرد تثبيت HACS، انتقل إلى HACS -> التكاملات وابحث عن التكامل `Local Luftdaten Sensor`. انقر على زر التنزيل وأعد تشغيل Home Assistant بمجرد تنزيل التكامل.
<robo-wiki-picture src="sds-hacs.png"/>

### الخيار 2: التثبيت اليدوي

تحت مستخدم homeassistant، استنسخ مستودع المشروع:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

إذا كان لديك بالفعل أي تكاملات مخصصة، قم بنسخ `custom_components/local_luftdaten/` إلى دليل `custom_components` الخاص بك، على سبيل المثال:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
إذا لم يكن لديك أي تكاملات مخصصة، قم بنسخ دليل `custom_components` بأكمله إلى دليل تكوين Home Assistant الخاص بك. على سبيل المثال:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## التكوين

أنشئ إدخال مستشعر جديد في `configuration.yaml` الخاص بك وقم بضبط اسم المضيف أو عنوان IP. يمكنك استخدام [تطبيق Fing المحمول](https://www.fing.com/products) أو [أداة سطر الأوامر nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) للعثور على عنوان IP المحلي للمستشعر الخاص بك. يمكن أن يكون الاسم أي.

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors

<code-helper copy>

  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Air quality sensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```
</code-helper>

> يمكن العثور على قائمة جميع المستشعرات المدعومة في [المستودع](https://github.com/lichtteil/local_luftdaten).

أعد تشغيل Home Assistant الخاص بك.
بعد ذلك يمكنك إضافة المستشعر إلى لوحة التحكم الخاصة بك. سيكون اسم الكيان هو الاسم الذي أضفته إلى `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>