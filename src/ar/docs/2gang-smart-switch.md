---
title: مفتاح ذكي 2 جانج
contributors: [nakata5321]
---
هذه المقالة ستوضح لك عملية إعداد مفتاح الذكي 2 جانج.

{% roboWikiNote {type: "warning"}%}يمكن شراء جميع الأجهزة من Robonomics من الموقع الرسمي [هنا](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmQiq21yPEJbysPgvv35uJmG9rHQqbUSySu8za8BqA1kcZ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} الخطوة 1 — تفليش {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}تأتي جميع الأجهزة من Robonomics مفلشة مسبقًا. ومع ذلك، نظرًا لأن جميع الأجهزة هي أدوات تطوير، ستغطي التعليمات خيار تفليش الجهاز من البداية. إذا لم ترغب في القيام بذلك الآن، فانتقل إلى [**الخطوة 2 - نقطة الوصول**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

خذ الجهاز من الصندوق وقم بتوصيله بالكمبيوتر. ثم اذهب إلى موقع الويب [webflasher.robonomics.network](https://webflasher.robonomics.network/). هذا هو موقع تفليش الويب.

{% roboWikiVideo {videos:[{src: 'QQmZ6kYAusdjH3Yq7L9UzorZdfXAa4awD1twp5SB5z57z9R', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}ملاحظة! يعمل موقع تفليش الويب فقط مع متصفحي Google Chrome أو Microsoft Edge.{% endroboWikiNote %}

في قائمة السقوط "Firmware"، اختر الخيار **"SWS-2G-E-11-23"** ثم في "SELECT CHIP" اختر **"ESP32"**. اضغط على زر **"CONNECT"**.
سيظهر نافذة منبثقة حيث يجب عليك اختيار المنفذ التسلسلي الذي يتصل به الجهاز (عادةً ما يكون `/ttyUSB0`). ثم اختر **"INSTALL SWS-2G-E-11-23"**.
في النافذة التالية، يمكنك إجراء **CLEAR INSTALLATION** عن طريق تحديد **ERASE DEVICE**. اضغط على Next ثم Install. انتظر حتى يتم تحميل البرنامج الثابت إلى جهاز المفتاح الذكي.

بعد الانتهاء من عملية التثبيت، ستظهر نافذة منبثقة لتكوين الواي فاي. قدم بيانات اعتماد الواي فاي.

بعد إعداد الواي فاي، يمكنك زيارة الجهاز عبر زر **VISIT DEVICE**. في وقت لاحق، يمكنك زيارة الجهاز عبر عنوان IP الخاص به في الشبكة. يمكنك استخدام تطبيق [Fing mobile app](https://www.fing.com/products) أو
أداة [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) للعثور عليه.

تخطى **الخطوة 2 — نقطة الوصول** وانتقل إلى [**الخطوة 3 — التكوين**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} الخطوة 2 — نقطة الوصول {% endroboWikiTitle %}

إذا قمت بأخذ المفتاح الذكي من الصندوق وقمت بتوصيله بمصدر الطاقة، سيقوم بإنشاء نقطة اتصال ساخنة بالاسم "robonomics-XXXXXXX". اتصل بها.
يجب فتح نافذة تكوين. إذا لم يحدث ذلك، افتح متصفح الويب وانتقل إلى صفحة `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

قدم بيانات اعتماد الواي فاي. بعد ذلك، سيتصل جهاز المفتاح الذكي بشبكة الواي فاي. تحقق من الجهاز عبر عنوان IP الخاص به في الشبكة. يمكنك استخدام تطبيق [Fing mobile app](https://www.fing.com/products) أو
أداة [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) للعثور عليه.

{% roboWikiTitle { type:'2', anchor: 'step3'} %} الخطوة 3 — التكوين {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

انتقل إلى **"Configuration"**->**"Configure other"**. في سلسلة **"Template"**، أدخل ما يلي:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-2L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,224,225,0,0,320,1,321,0,0,0,0,33,1,32,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

تحقق من تفعيل خانة الاختيار **"Activate"** و **"MQTT Enable"**. إذا لم يكن مفعلًا، قم بتفعيله واضغط على زر Save.

ارجع إلى القائمة الرئيسية وانتقل إلى **"Configuration"** -> **"Configure MQTT"**.
قدم بيانات اعتماد MQTT الخاصة بك هنا:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

هذا كل شيء بالنسبة لـ ESP حاليًا. الخطوة التالية هي تثبيت تكامل Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} الخطوة 4 — إعداد التكامل {% endroboWikiTitle %}

تفترض هذه المقالة أن لديك Home Assistant. لتوصيل جهاز المفتاح الذكي بـ Home Assistant، تحتاج إلى تثبيت تكامل Tasmota.

{% roboWikiVideo {videos:[{src: 'QmXLSLSFJKrrEtQXVQbpeFAvsKFSgW15J9ZFaSH1pteMXR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

بشكل أساسي، سيكتشف Home Assistant تكامل Tasmota تلقائيًا. ولكن إذا لم يحدث ذلك، أضفه يدويًا.
هذا كل شيء. الآن يمكنك إضافة كيان المفتاح إلى لوحة المعلومات.

{% roboWikiNote {type: "warning"}%}يمكن شراء جميع الأجهزة من Robonomics من الموقع الرسمي [هنا](https://robonomics.network/devices/).
{% endroboWikiNote %}