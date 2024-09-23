---
title: خدمة تعويض الانبعاثات

contributors: [tubleronchik]
---

مثال على العمل موجود في الفيديو:

https://youtu.be/Ha9wN6bjh64

خدمة لتعويض بصمة ثاني أكسيد الكربون عن طريق حرق الرموز في شبكة Statemine. يتم حساب ثاني أكسيد الكربون المنتج على النحو التالي: البيانات من الجهاز بالواط تضرب في المعاملات تعتمد على المنطقة. يتم تغطية طن واحد من ثاني أكسيد الكربون من خلال استهلاك رمز واحد. [هنا](/docs/carbon-footprint-sensor) تعليمات لربط الجهاز.

## سيناريو

1. سجل جهازًا جديدًا في التوأم الرقمي في شبكة Robonomics
2. بمجرد انتهاء الفاصل الزمني، احصل على آخر البيانات من جميع الأجهزة واضرب في المعامل الذي يعتمد على المنطقة
3. جمع البيانات وتحويلها إلى أطنان ثاني أكسيد الكربون
4. طرح العدد الإجمالي للرموز المحروقة من البيانات الحالية
5. حرق عدد صحيح من الرموز في شبكة Statemine
6. حفظ العدد الإجمالي للرموز المحروقة في قاعدة البيانات المحلية و Datalog

## التثبيت

انسخ المستودع وعدل ملف التكوين.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## وصف التكوين

لا تقم بتحرير `config/config_template.yaml`!

```
robonomics:
  seed: <البذرة لحساب في شبكة Robonomics حيث سيتم إنشاء التوأم الرقمي>
statemine:
  seed: <البذرة لحساب المسؤول بالرموز الخضراء في شبكة Statemine>
  endpoint: <نقطة النهاية لـ statemine>
  token_id: <معرف الرمز الذي سيتم حرقه>
  ss58_format: <تنسيق العنوان في Polkadot (لشبكة Statemine هو 2)>

service:
  interval: <كم مرة سيتم جمع البيانات من الأجهزة>
```

تم أخذ المعاملات للطاقة غير المتجددة من [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) وتخزينها في `utils/coefficients.py`.

## الإطلاق

```
docker-compose up
```