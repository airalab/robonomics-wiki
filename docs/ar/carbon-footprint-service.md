---
title: خدمة التعويض 

contributors: [tubleronchik]
---

مثال على العمل موجود في الفيديو:

https://youtu.be/Ha9wN6bjh64

خدمة لتعويض بصمة ثاني أكسيد الكربون عن طريق حرق الرموز المميزة في شبكة Statemine.
يتم حساب ثاني أكسيد الكربون الناتج على النحو التالي: البيانات الواردة من الجهاز بالواط مضروبة في المعاملات تعتمد على المنطقة. يتم تغطية 1 طن من ثاني أكسيد الكربون عن طريق استهلاك رمز واحد. [هنا](/docs/carbon-footprint-sensor) هي التعليمات لتوصيل الجهاز.

## سيناريو

1. سجل جهازًا جديدًا في التوأم الرقمي في شبكة Robonomics 
2. بمجرد انتهاء الفاصل الزمني ، احصل على آخر البيانات من جميع الأجهزة واضربها بالمعامل اعتمادًا على المنطقة
3. جمع البيانات وتحويلها إلى أطنان ثاني أكسيد الكربون
4. طرح إجمالي عدد الرموز المحترقة من البيانات الحالية 
5. حرق عدد صحيح من الرموز في شبكة Statemine 
6. حفظ إجمالي عدد الرموز المحترقة في قاعدة البيانات المحلية و سجل البيانات 


## التثبيت

استنسخ المستودع وعدل ملف التكوين.

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## وصف التكوين

لا تقم بتعديل `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network wهنا Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
تم أخذ معاملات الطاقة غير المتجددة من [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) وتخزينها في `utils/coefficients.py`. 

## إطلاق

```
docker-compose up
```