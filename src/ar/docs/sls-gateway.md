---
title: بوابة Robonomics SLS

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**في هذه المقالة ستقوم بإعداد بوابة Robonomics SLS. ستقوم بتثبيت البرامج المطلوبة للبوابة، وتكوينها، وربطها بـ Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"بوابة sls"} %}{% endroboWikiPicture %}

## البرنامج الثابت

أولاً، تحتاج إلى تثبيت برنامج البرمجة الصغير للبوابة. قم بتجهيز البوابة عن طريق ضبط التبديلات `1` و `3` في الجزء السفلي من بوابة SLS على `ON`، يجب أن تكون الباقي `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"بوابة sls 13"} %}{% endroboWikiPicture %}

قم بتوصيل البوابة بجهاز Raspberry Pi الخاص بك عبر منفذ USB type-C على البوابة.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

انسخ المستودع مع البرنامج الثابت إلى جهاز Raspberry Pi الخاص بك:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

انتقل إلى `robonomics-hass-utils/esp_firmware/linux`. لتفليش بوابة SLS، تحتاج إلى تشغيل السيناريوهات `Clear` و `Flash_16mb`.

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### حل المشكلات

إذا كنت تواجه مشاكل في تحديث برنامج البرمجة للبوابة، يجب عليك اتخاذ خطوات إضافية:

1. تأكد من تثبيت وحدة pySerial:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}2. قم بمنح مستخدمك حق الوصول إلى منفذ USB وأعد تشغيل الكمبيوتر:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}


3. في بعض الحالات، قد يكون من الضروري تغيير إعدادات النطاق الترددي في السيناريو لتحديث البرنامج الثابت. افتح سيناريو `Flash_16mb.sh` باستخدام محرر `nano` وقم بتغيير معلمة الباود من `921600` إلى قيمة أصغر (على سبيل المثال، `115200`).

## التكوين

1. قم بفصل بوابة SLS من الكمبيوتر. ضع المفاتيح على الجزء الخلفي من البوابة في الوضع الصحيح. يجب أن تكون المفاتيح `5` (RX Zigbee to ESP) و `6` (TX Zigbee to ESP) في وضع `ON`، بينما يجب أن تكون الباقي `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. قم بتوصيل كابل الطاقة من نوع C. يجب أن يتحول الضوء المؤشر في الوسط إلى اللون الأخضر.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. عند بدء التشغيل الأول، ستبدأ البوابة في مشاركة الواي فاي بـ SSID `zgw****`. اتصل بشبكة الواي فاي هذه. تذكر أن الإشارة قد تكون ضعيفة إلى حد ما، لذا من الأفضل أن تبقى بوابة SLS أقرب إلى كمبيوترك.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. إذا كان الاتصال ناجحًا، ستفتح واجهة الويب (أو يمكنك العثور عليها على عنوان 192.168.1.1).

5. سترى صفحة `إعدادات الواي فاي`. حدد واي فاي الخاص بك وأدخل كلمة المرور. اضغط على زر `Apply`. ستعيد البوابة التشغيل وتتصل بشبكة الواي فاي الخاصة بك.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. العثور على عنوان IP المحلي لبوابة SLS للوصول إلى واجهة الويب. يمكنك العثور عليه باستخدام [تطبيق Fing المحمول](https://www.fing.com/products) أو [أداة nmap CLI](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). يجب أن يكون اسم البوابة مشابهًا لهذا: `zgw****`. افتح واجهة الويب للبوابة عن طريق لصق عنوان IP الخاص بالبوابة في المتصفح.

7. اذهب إلى `الإعدادات` -> `الأجهزة` وتأكد من أن الإعدادات تبدو كما في الصورة. قم بتصحيح الإعدادات إذا لزم الأمر وانقر على زر `حفظ`:

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

الجدول بالقيم المطلوبة:

| الحقل                   | القيمة             |
|--------------------------|:-------------------|
| وحدة Zigbee             | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| زر الخدمة              | 33 (pullUP - true) |
| عدد الأضواء القابلة للعنونة | 0                  |
| أحمر الليد (أو العنوان) | 21                 |
| أخضر الليد              | 5                  |
| أزرق الليد              | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. ثم أعد تشغيل البوابة. اختر `الإجراءات` -> `إعادة تشغيل النظام` في الزاوية العلوية اليمنى.

9. تأكد من أن البوابة تعمل بشكل صحيح في نافذة معلومات Zigbee. يجب أن يكون حالة الجهاز `OK`.

10. قم بتكوين إضافة الأجهزة تلقائيًا إلى Home Assistant. اذهب إلى `Zigbee` -> `التكوين` ثم اختر `اكتشاف Home Assistant MQTT` و`مسح الحالات`. احفظ التغييرات ومرة أخرى **أعد تشغيل** بوابة SLS.

{% roboWikiNote {type: "warning"}%} إذا كان لديك بوابة SLS نشطة بالفعل في منزلك، وأنت الآن تقوم بتكوين آخرإذا كانت قنوات الأجهزة متعارضة، فسيحدث تداخل بينهما. لحل هذه المشكلة، تحتاج إلى تغيير القناة على الجهاز الجديد. للقيام بذلك، انتقل إلى `Zigbee` -> `Config` وقم بتغيير القناة إلى أخرى (على سبيل المثال، القناة 15). {% endroboWikiNote %}

## ربط SLS ببروتوكول MQTT

بعد تكوين بوابة SLS، تحتاج إلى ربط بوابة SLS بـ Home Assistant. افتح واجهة ويب بوابة SLS وانتقل إلى `Settings/Link` -> `MQTT Setup`:

أضف عنوان وسيطك (عنوان Raspberry Pi الذي يحتوي على Home Assistant في الشبكة المحلية، يمكنك العثور عليه باستخدام [تطبيق Fing المحمول](https://www.fing.com/products) أو [أداة nmap CLI](https://vitux.com/find-devices-connected-to-your-network-with-nmap/))، والمنفذ (الافتراضي هو `1883`) واسم مستخدم وكلمة مرور الوسيط (التي قمت بإنشائها سابقًا) واسم الموضوع (يمكنك اختيار أي اسم). كما يجب أن يكون عنوان IP لـ Raspberry Pi ثابتًا. انقر على `Enable` و `Retain states`.

احفظ التغييرات. الآن ستظهر الأجهزة تلقائيًا في Home Assistant.

## ربط الأجهزة

قم بربط أجهزتك من خلال الانتقال إلى `Zigbee` -> `Join`. ضع أجهزتك في وضع الربط، وأحد أكثر الطرق شيوعًا لتبديل جهاز إلى وضع الاتصال هو الضغط على زر الطاقة أو تشغيلها/إيقافها لـ 5 مرات. اضغط على زر `Enable Join` لبدء البحث عن أجهزة Zigbee. سترى الأجهزة النشطة.

آن الآن يمكنك الانتقال إلى [**اشتراك IoT**](/docs/sub-activate) وبدء تنشيط اشتراك Robonomics.