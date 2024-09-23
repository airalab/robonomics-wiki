---
title: تثبيت المنزل الذكي
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt
---

**مرحبًا بكم في دليل تثبيت Home Assistant مع تكامل Robonomics. Home Assistant هو نظام أتمتة منزلي مفتوح المصدر يوفر مركزًا مركزيًا للتحكم في الأجهزة الذكية في شبكة منزلك. من خلال التكامل مع Robonomics، خدمة سحابية لامركزية، يمكنك تعزيز الوظائف والأمان في منزلك الذكي. في هذه المقالة، سنقدم تعليمات خطوة بخطوة حول كيفية تثبيت Home Assistant مع Robonomics، مما يمنحك القدرة على أتمتة والتحكم في جوانب مختلفة من منزلك باستخدام حلاً آمنًا ولامركزيًا. دعونا نبدأ!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## عرض توضيحي

هنا مثال على تثبيت تكامل المنزل الذكي و Robonomics بالكامل. تذكر أن الوقت المطلوب قد يختلف اعتمادًا على
اتصال الإنترنت.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## الأجهزة التي تحتاجها للتثبيت

إذا لم تكن قد دمجت Home Assistant بالفعل في إعداد منزلك الذكي، فمن المهم أن تكون على علم بالمعدات التي ستحتاجها لإنشاء نظام منزل ذكي كامل من البداية. يوصي فريق Robonomics باستخدام Raspberry Pi 4 كخادم منزل ذكي. **ولكن من الممكن إعداد كل شيء على جهاز الكمبيوتر الخاص بك.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (على الأقل 2 جيجابايت من ذاكرة الوصول العشوائي)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>بطاقة SD بسعة 16 جيجابايت</b> {% endroboWikiGrid %}{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> محول Zigbee (اختياري) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> أجهزة Zigbee الذكية (اختياري) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>سطح مكتب للإعداد</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. تثبيت المتطلبات الأولية

يحتوي Robonomics Docker على:
- Home Assistant
- IPFS
- وسيط MQTT وتكامل- Zigbee2MQTT
- libp2p proxy
- Robonomics Integration

هذا المقال سيوضح عملية التثبيت على نظام Ubuntu. أولاً، تحتاج إلى تثبيت الحزم التالية:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

ثم تحتاج إلى تثبيت Docker على الكمبيوتر الشخصي. يمكن العثور على تعليمات التثبيت على [الموقع الرسمي](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "معلومات هامة" }%} أضف مستخدمك إلى مجموعة docker، لتشغيل حاويات Docker بدون صلاحيات root. يمكن العثور على [التعليمات هنا](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. تكوين

قم بتنزيل مستودع GitHub وانتقل إلى داخله:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

ثم، قم بإنشاء ملف `.env` من `template.env`:


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

بعد ذلك، يمكنك فتح ملف `.env` وتحرير القيم الافتراضية مثل:
- المسار إلى المستودع حيث ستتم تخزين جميع مجلدات التكوين.
- المنطقة الزمنية في ["اسم قاعدة بيانات tz"](https://en.wikipedia.org/wiki/قائمة_المناطق_الزمنية_لقاعدة_بيانات_tz).

## 3. البدء

قم بتشغيل النص البرمجي bash وانتظر حتى يقوم بتثبيت جميع الحزم المطلوبة:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

سيقوم النص البرمجي بالتحقق من جميع الإجراءات المطلوبة التي أكملتها في الخطوات السابقة وسيقوم بإرجاع خطأ إذا كان هناك خطأ ما.

أثناء عملية التثبيت قد تحدث الحالات التالية:
- إذا قررت عدم استخدام منسق Zigbee، سترى سطر حوار يؤكد ما إذا كنت ترغب في متابعة التثبيت:

{% codeHelper %}

```
سيقوم هذا النص البرمجي بإنشاء جميع المستودعات اللازمة وبدء تشغيل حاويات دوكر
لا يمكن العثور على موقع منسق zigbee. يرجى إدخاله وتشغيل النص البرمجي مرة أخرى. المجلد /dev/serial/by-id/ غير موجود
هل ترغب في المتابعة بدون منسق zigbee؟ لن يتم بدء حاوية Zigbee2MQTT.
هل ترغب في المتابعة؟ (Y/n)
```

{% endcodeHelper %}


- إذا كان هناك عدة أجهزة على جهاز الكمبيوتر الخاص بك تستخدم منافذ تسلسلية، سيطلب النص البرمجي اختيار الجهاز الذي تريد استخدامه:

{% codeHelper %}

```
سيقوم هذا النص البرمجي بإنشاء جميع المستودعات اللازمة وبدء تشغيل حاويات دوكر
المنسق zigbee مثبت
لديك أكثر من جهاز متصل. يرجى اختيار واحد
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## بعد التثبيت

بعد بدء كل شيء، يمكنك استخدام السيناريو `update.sh` لتحديث إصدار حزم Docker. سيقوم هذا السيناريو بتنزيل الإصدارات الجديدة،
حذف الإصدارات القديمة من الحزم، وإعادة تشغيل كل شيء تلقائيًا، مما يوفر جميع تكويناتك.

لإيقاف كل شيء، استخدم السيناريو `stop.sh`.


هذا كل شيء. تابع إلى المقالة التالية.