---
title: Altruist وsensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist مستشعر بيئي مفتوح المصدر. تدخل قراءاته في مجموعة بيانات مفتوحة يستطيع أي شخص الاطلاع عليها في [sensors.social](https://sensors.social).

## المستشعر

- هناك نسخة خارجية (Urban)، ونسخة داخلية (Insight)، وعُدّة (kit).
- يوقّع المستشعر كل قياس، فلا يمكن تزوير القراءات في الطريق.
- يمكن أن تنتقل القراءات عبر Wi-Fi، أو عبر لاسلكي LoRa وشبكات Meshtastic المتشابكة حيث لا يتوفر Wi-Fi.
- يستطيع المالك أن يختار تشفير القراءات. عندها لا يراها على sensors.social إلا المالك، بمفتاحه الخاص.

تصنع شركة Pinout Limited مستشعرات Altruist. يمكنك شراؤها من [cyberpunks.shop](https://cyberpunks.shop/) ومن Amazon في الاتحاد الأوروبي. للإعداد والدعم، راجع صفحات المنتج هناك و[pinout.cloud](https://pinout.cloud).

## sensors.social

[sensors.social](https://sensors.social) خريطة لمستشعرات جودة الهواء المستقلة. تعرض قراءات أكثر من 100 مستشعر، ولها مدونتها الخاصة بأخبار المشروع.

لاستخدام المستشعر في Home Assistant على شبكتك المحلية، يوجد [تكامل Altruist](https://github.com/airalab/altruist-homeassistant-integration).

## الكود المصدري

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): البرنامج الثابت.
- [airalab/webflasher](https://github.com/airalab/webflasher): تثبيت البرنامج الثابت من المتصفح.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): الخريطة.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): الخدمة التي تجمع القياسات.
