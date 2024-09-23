---
title: مراقبة الطاقة
contributors: [nakata5321]
---
هذه المقالة ستوضح لك عملية إعداد مراقبة الطاقة.

{% roboWikiNote {type: "warning"}%} يمكن شراء جميع الأجهزة من Robonomics من الموقع الرسمي [هنا](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} الخطوة 1 — تفليش {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} تأتي جميع الأجهزة من Robonomics مفلشة مسبقًا. ومع ذلك، نظرًا لأن جميع الأجهزة هي أدوات تطوير، ستغطي التعليمات خيار تفليش الجهاز من البداية. إذا كنت لا ترغب في القيام بذلك الآن، فانتقل إلى [**الخطوة 2 - نقطة الوصول**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

خذ الجهاز من الصندوق وقم بتوصيله بالكمبيوتر. ثم اذهب إلى موقع الويب [webflasher.robonomics.network](https://webflasher.robonomics.network/). هذا هو موقع الويب للتفليش.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} ملاحظة! يعمل موقع التفليش على متصفحي Google Chrome أو Microsoft Edge فقط.
{% endroboWikiNote %}

في قائمة السقوط "Firmware"، اختر الخيار **"مراقبة الطاقة"** ثم في "SELECT CHIP" اختر **"ESP32-S3"**. اضغط على زر **"CONNECT"**.
سيظهر نافذة منبثقة حيث يجب عليك اختيار المنفذ التسلسلي الذي يتصل به الجهاز (عادةً ما يكون `/ttyUSB0`). ثم اختر **"INSTALL ENERGY-MONITOR_EN"**.
في النافذة التالية، يمكنك إجراء **CLEAR INSTALLATION** عن طريق تحديد **ERASE DEVICE**. اضغط على Next ثم Install. انتظر حتى يتم تحميل البرنامج الثابت إلى جهاز مراقبة الطاقة.

بعد الانتهاء من عملية التثبيت، ستظهر نافذة منبثقة لتكوين الواي فاي. قدم بيانات اعتماد الواي فاي.

بعد إعداد الواي فاي، يمكنك زيارة الجهاز عبر زر **VISIT DEVICE**. فيما بعد، يمكنك زيارة الجهاز عبر عنوان IP الخاص به في الشبكة. للعثور عليه، يمكنك استخدام تطبيق [Fing mobile app](https://www.fing.com/products) أو
أداة [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

تخطى **الخطوة 2 — نقطة الوصول** وانتقل إلى [**الخطوة 3 — التكوين**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} الخطوة 2 — نقطة الوصول {% endroboWikiTitle %}

إذا قمت بأخذ جهاز مراقبة الطاقة من الصندوق وقمت بتوصيله بمصدر الطاقة، سيقوم بإنشاء نقطة اتصال ساخنة بالاسم "robonomics-XXXXXXX". اتصل بها. يجب فتح نافذة التكوين. إذا لم يحدث ذلك، افتح متصفح الويب وانتقل إلى صفحة `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

قدم بيانات اعتماد الواي فاي. بعد ذلك، سيتصل جهاز مراقبة الطاقة بشبكة الواي فاي. تحقق من الجهاز عبر عنوان IP الخاص به في الشبكة. للعثور عليه، يمكنك استخدام تطبيق [Fing mobile app](https://www.fing.com/products) أو
أداة [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} الخطوة 3 — التكوين {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

انتقل إلى **"Configuration"**->**"Configure other"**. في سلسلة **"Template"**، أدخل ما يلي:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

تحقق من تفعيل خانة الاختيار **"Activate"** و **"MQTT Enable"**. إذا لم يكن مفعلًا، قم بتفعيله واضغط على زر Save.

ارجع إلى "القائمة الرئيسية" وانتقل إلى **"Configuration"** -> **"Configure MQTT"**.
قدم بيانات اعتماد MQTT الخاصة بك هنا:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

هذا كل شيء بالنسبة لـ ESP حاليًا. الخطوة التالية هي تثبيت تكامل Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} الخطوة 4 — إعداد التكامل {% endroboWikiTitle %}

تفترض هذه المقالة أن لديك Home Assistant. لتوصيل جهاز مراقبة الطاقة بـ Home Assistant، تحتاج إلى تثبيت تكامل "Tasmota".

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

بشكل أساسي، سيكتشف Home Assistant تكامل "Tasmota" تلقائيًا. ولكن إذا لم يحدث ذلك، أضفه يدويًا.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

هذا كل شيء. الآن يمكنك إضافة كيانات الطاقة إلى لوحة التحكم.

{% roboWikiNote {type: "warning"}%} يمكن شراء جميع الأجهزة من Robonomics من الموقع الرسمي [هنا](https://robonomics.network/devices/).
{% endroboWikiNote %}