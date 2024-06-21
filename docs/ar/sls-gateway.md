---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**في هذه المقالة ستقوم بإعداد بوابة Robonomics SLS. ستقوم بتثبيت البرامج المطلوبة للبوابة وتكوينها وربطها بـ Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## البرامج الثابتة

أولاً ، تحتاج إلى تثبيت برامج البرمجة الثابتة للبوابة. قم بتجهيز البوابة عن طريق ضبط المفاتيح `1` و `3` في الجزء السفلي من بوابة SLS على `ON` ، ويجب أن تكون الأخرى على `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

قم بتوصيل البوابة بجهاز Raspberry Pi الخاص بك عبر منفذ USB type-C على البوابة.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

استنسخ المستودع مع البرامج الثابتة على جهاز Raspberry Pi الخاص بك:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

انتقل إلى `robonomics-hass-utils/esp_firmware/linux`. لتفليش بوابة SLS ، تحتاج إلى تشغيل البرامج النصية `Clear` و `Flash_16mb`.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### حل المشاكل

إذا كنت تواجه مشاكل في تحديث برامج البرمجة الثابتة للبوابة ، فيجب عليك اتخاذ خطوات إضافية:

1. تأكد من تثبيت وحدة pySerial:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. قم بمنح المستخدم الخاص بك حقوق الوصول إلى منفذ USB وأعد تشغيل الكمبيوتر:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. في بعض الحالات ، من الضروري تغيير إعداد النطاق الترددي في البرنامج النصي لتحديث البرامج الثابتة. افتح البرنامج النصي `Flash_16mb.sh` باستخدام محرر `nano` وقم بتغيير معلة الباود من `921600` إلى قيمة أصغر (على سبيل المثال ، `115200`).

## التكوين

1. قم بفصل بوابة SLS عن الكمبيوتر. ضبط المفاتيح على ظهر البوابة في الموضع الصحيح. يجب أن تكون المفاتيح `5` (RX Zigbee to ESP) و `6` (TX Zigbee to ESP) في الموضع `ON` ، ويجب أن تكون الأخرى على `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. قم بتوصيل كابل الطاقة من النوع C. يجب أن يتحول الضوء المؤشر في الوسط إلى اللون الأخضر.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. عند بدء التشغيل الأول ، ستبدأ البوابة في مشاركة Wi-Fi مع SSID `zgw****`. قم بالاتصال بشبكة الاتصال هذه. تذكر أن الإشارة قد تكون ضعيفة إلى حد ما ، لذا من الأفضل أن تبقى بوابة SLS أقرب إلى جهاز الكمبيوتر الخاص بك. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. إذا تمت الاتصال بنجاح ، فسيتم فتح واجهة الويب (أو يمكنك العثور عليها على عنوان 192.168.1.1). 

5. سترى صفحة `Wi-Fi Settings` . حدد شبكة Wi-Fi الخاصة بك وأدخل كلمة المرور. اضغط على زر `Apply`. ستعيد البوابة التشغيل وتتصل بشبكة Wi-Fi الخاصة بك. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. ابحث عن عنوان IP المحلي لبوابة SLS للوصول إلى واجهة الويب. يمكنك استخدام تطبيق [Fing mobile app](https://www.fing.com/products) أو أداة [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) للعثور على ذلك. يجب أن يكون اسم البوابة كما يلي: `zgw****`. افتح واجهة الويب للبوابة عن طريق لصق عنوان IP البوابة في المتصفح.

7. انتقل إلى `Setting` -> `Hardware` وتأكد من أن الإعدادات تبدو كما هو موضح في الصورة. قم بتصحيح الإعدادات إذا لزم الأمر وانقر على زر `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

الجدول مع القيم المطلوبة:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. ثم أعد تشغيل البوابة. اختر  `Actions` -> `Reboot system` في الزاوية العلوية اليمنى.

9. تأكد من أن البوابة تعمل بشكل صحيح في نافذة معلومات Zigbee. يجب أن يكون حالة الجهاز `OK`.

10. قم بتكوين إضافة الأجهزة تلقائيًا إلى Home Assistant. انتقل إلى `Zigbee` -> `Config` ثم اختر `Home Assistant MQTT Discovery` و `Clear States`. قم بحفظ التغييرات ومرة أخرى **أعد تشغيل** بوابة SLS.

<robo-wiki-note type="warning">

إذا كان لديك بالفعل بوابة SLS نشطة في منزلك ، وتقوم الآن بتكوين بوابة أخرى ، فسيتعارضون مع بعضهم البعض. لحل هذه المشكلة ، تحتاج إلى تغيير القناة على الجهاز الجديد. للقيام بذلك ، انتقل إلى `Zigbee` -> `Config` وقم بتغيير القناة إلى قناة أخرى (على سبيل المثال ، القناة 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## ربط SLS بـ MQTT

بعد تكوين بوابة SLS ، تحتاج إلى ربط بوابة SLS بـ Home Assistant. افتح واجهة الويب لبوابة SLS وانتقل إلى `Settings/Link` -> `MQTT Setup`:


أضف عنوان وسيطك (عنوان جهاز Raspberry Pi مع Home Assistant في الشبكة المحلية ، يمكنك العثور عليه باستخدام تطبيق [Fing mobile app](https://www.fing.com/products) أو أداة [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)) ، والمنفذ (الافتراضي هو `1883`) واسم مستخدم وكلمة مرور وسيطك (التي قمت بإنشائها سابقًا) واسم الموضوع (يمكنك اختيار أي اسم). كما يجب أن يكون عنوان IP لجهاز Raspberry Pi ثابتًا. انقر على `Enable` و `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

احفظ التغييرات. الآن ستظهر الأجهزة تلقائيًا في Home Assistant.

## ربط الأجهزة

قم بتوصيل أجهزتك عن طريق الانتقال إلى `Zigbee` -> `Join`. ضع حساساتك في وضع الاقتران ، وأكثر الطرق الشائعة لتبديل الجهاز إلى وضع الاتصال هي الاستمرار في الضغط على زر الطاقة أو تشغيلها / إيقاف تغيلها 5 مرات. اضغط على زر `Enable Join` لبدء البحث عن أجهزة Zigbee. سترى حساسات نشطة.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


الآن يمكنك الانتقال إلى قسم [**اشتراك IoT**](/docs/sub-activate) وبدء تفعيل اشتراك Robonomics.
