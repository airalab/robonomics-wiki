---
title: تثبيت المنزل الذكي
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**مرحبًا بكم في دليل تثبيت Home Assistant مع تكامل Robonomics. Home Assistant هو نظام أتمتة منزلي مفتوح المصدر يوفر مركزًا مركزيًا للتحكم في الأجهزة الذكية في شبكة منزلك. من خلال التكامل مع Robonomics، خدمة سحابية لامركزية، يمكنك تعزيز الوظائف والأمان في منزلك الذكي. في هذا المقال، سنقدم تعليمات خطوة بخطوة حول كيفية تثبيت Home Assistant مع Robonomics، مما يمنحك القدرة على أتمتة والتحكم في جوانب مختلفة من منزلك باستخدام حلاً آمنًا ولامركزيًا. دعونا نبدأ!**

## عرض توضيحي

هنا مثال على تثبيت منزل ذكي كامل مع تكامل Robonomics. تذكر أن الوقت المطلوب قد يختلف اعتمادًا على اتصال الإنترنت.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## الأجهزة التي تحتاجها للتثبيت

إذا لم تكن قد دمجت Home Assistant بالفعل في إعداد منزلك الذكي، من المهم أن تكون على علم بالمعدات التي ستحتاجها لإنشاء نظام منزل ذكي كامل من البداية. يوصي فريق Robonomics باستخدام Raspberry Pi 4 كخادم منزل ذكي. **ولكن من الممكن إعداد كل شيء على جهاز الكمبيوتر الخاص بك.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (على الأقل 2 جيجابايت رام)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>بطاقة SD 16 جيجابايت</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> محول Zigbee (اختياري) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> أجهزة Zigbee الذكية (اختياري) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>كمبيوتر شخصي للإعداد</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

## 1. تثبيت المتطلبات الأولية

يحتوي Docker Robonomics على:
- Home Assistant
- IPFS
- MQTT Broker and Integration
- Zigbee2MQTT
- بروكسي libp2p
- تكامل Robonomics

سيوضح هذا المقال عملية التثبيت على نظام Ubuntu. أولاً، تحتاج إلى تثبيت الحزم التالية:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

ثم تحتاج إلى تثبيت Docker على الكمبيوتر الشخصي. يمكن العثور على تعليمات التثبيت على [الموقع الرسمي](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="معلومات مهمة">

  أضف مستخدمك إلى مجموعة docker، لتشغيل حاويات Docker بدون صلاحيات root. يمكن العثور على [التعليمات هنا](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

## 2. تكوين

قم بتنزيل مستودع GitHub وانتقل إلى داخله:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

ثم، أنشئ ملف `.env` من `template.env`:


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

بعد ذلك، يمكنك فتح ملف `.env` وتحرير القيم الافتراضية مثل:
- إصدارات الحزم
- المسار إلى المستودع حيث سيتم تخزين جميع مجلدات التكوين.
- المنطقة الزمنية في ["اسم قاعدة بيانات tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. البدء

قم بتشغيل النص البرمجي bash وانتظر حتى يقوم بتثبيت جميع الحزم المطلوبة:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

سيقوم النص البرمجي بالتحقق من جميع الإجراءات اللازمة التي أكملتها في الخطوات السابقة وسيقوم بإرجاع خطأ إذا كان هناك شيء خاطئ.

أثناء عملية التثبيت قد تحدث الحالات التالية:
- إذا قررت عدم استخدام منسق Zigbee، سترى سطرًا للحوار يؤكد ما إذا كنت ترغب في متابعة التثبيت:

{% codeHelper %}

```
سيقوم هذا النص البرمجي بإنشاء جميع المستودعات اللازمة وبدء حاويات Docker
لا يمكن العثور على موقع منسق Zigbee. يرجى إدخاله وتشغيل النص البرمجي مرة أخرى. لا يوجد دليل على وجود الدليل /dev/serial/by-id/
هل ترغب في المتابعة بدون منسق Zigbee؟ لن يتم بدء حاوية Zigbee2MQTT.
هل ترغب في المتابعة؟ (ن/ي)
```

{% endcodeHelper %}


- إذا كان هناك عدة أجهزة على جهاز الكمبيوتر الخاص بك تستخدم منافذ تسلسلية، سيطلب النص البرمجي اختيار الجهاز الذي تريد استخدامه:

{% codeHelper %}

```
سيقوم هذا النص البرمجي بإنشاء جميع المستودعات اللازمة وبدء حاويات Docker
المنسق Zigbee مثبت
لديك أكثر من جهاز متصل. يرجى اختيار واحد
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

هذا كل شيء. تابع إلى المقالة التالية.