---
title: تثبيت المنزل الذكي
contributors: [nakata5321, PaTara43]
tools:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**مرحبًا بكم في دليل تثبيت Home Assistant مع تكامل Robonomics. Home Assistant هو نظام أتمتة منزلي مفتوح المصدر يوفر مركزًا مركزيًا للتحكم في الأجهزة الذكية في شبكة منزلك. من خلال التكامل مع Robonomics، خدمة سحابية لامركزية، يمكنك تعزيز الوظائف والأمان في منزلك الذكي. في هذا المقال، سنقدم تعليمات خطوة بخطوة حول كيفية تثبيت Home Assistant مع Robonomics، مما يمنحك القدرة على أتمتة والتحكم في جوانب مختلفة من منزلك باستخدام حلاً آمنًا ولامركزيًا. دعونا نبدأ!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## عرض توضيحي

هناهو مثال على تثبيت تكامل كامل بين المنزل الذكي و Robonomics. تذكر أن الوقت المطلوب قد يختلف اعتمادًا على اتصال الإنترنت.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## الأجهزة التي تحتاجها للتثبيت

إذا لم تكن قد دمجت Home Assistant بالفعل في إعداد منزلك الذكي، من المهم أن تكون على علم بالمعدات التي ستحتاجها لإنشاء نظام منزل ذكي كامل من البداية. يوصي فريق Robonomics باستخدام Raspberry Pi 4 كخادم منزل ذكي.

{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (على الأقل 2 جيجابايت من ذاكرة الوصول العشوائي)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>بطاقة SD16 جيجابايت</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
    {% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
     <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> أجهزة ذكية Zigbee (اختياري) </b> </a>  {% endroboWikiGrid %}
    {% roboWikiGrid %}     {% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
    <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> محول Zigbee (اختياري) </b> </a>  {% endroboWikiGrid %}
    
{% endroboWikiGridWrapper %}


## 1. تثبيت المتطلبات الأولية


{% roboWikiNote {type: "warning", title: "معلومات هامة" }%} يجب أن تتم جميع هذه الخطوات على Raspberry Pi 4 مع نظام Ubuntu. {% endroboWikiNote %}

يحتوي Robonomics Docker على:
- Home Assistant
- IPFS
- وسيط MQTT وتكامل- Zigbee2MQTT
- libp2p proxy
- تكامل Robonomics

أولاً، تحتاج إلى تثبيت الحزم التالية:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

ثم تحتاج إلى تثبيت Docker على Raspberry Pi 4 الخاص بك. يمكن العثور على تعليمات التثبيت على [الموقع الرسمي](https://docs.docker.com/engine/install/).

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

بعد ذلك، يمكنك فتح ملف `.env` وتحرير القيم الافتراضية، مثل:
- مسار المستودع حيث ستُخزن جميع مجلدات التكوين.
- المنطقة الزمنية في ["اسم قاعدة بيانات tz"](https://en.wikipedia.org/wiki/List_of_t## 3. البدء

قم بتشغيل السيناريو الخاص بالباش وانتظر حتى يقوم بتثبيت جميع الحزم المطلوبة:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

سيقوم السيناريو بالتحقق من إكمال جميع الإجراءات المطلوبة في الخطوات السابقة وسيعرض خطأ إذا كان هناك شيء غير صحيح.

أثناء عملية التثبيت قد تحدث الحالات التالية:
- إذا قررت عدم استخدام منسق Zigbee، سترى سطر حوار يؤكد ما إذا كنت ترغب في متابعة التثبيت:

{% codeHelper %}

```
سيقوم هذا السيناريو بإنشاء جميع المستودعات اللازمة وبدء تشغيل حاويات دوكر
لا يمكن العثور على موقع منسق Zigbee. يرجى إدخاله وتشغيل السيناريو مرة أخرى. المجلد /dev/serial/by-id/ غير موجود
هل ترغب في المتابعة بدون منسق Zigbee؟ لن يتم بدء حاوية Zigbee2MQTT.
هل ترغب في المتابعة؟ (Y/n)
```

{% endcodeHelper %}


- إذا كان هناك عدة أجهزة على Raspberry Pi 4 الخاص بك تستخدم منافذ تسلسلية، سيطلب السيناريو اختيار الجهاز المراد استخدامه:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/التسلسل/بواسطة الهوية/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#؟
```

{% endcodeHelper %}

## بعد التثبيت

بعد بدء كل شيء، يمكنك استخدام السيناريو `update.sh` لتحديث إصدار حزم Docker:
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
سيقوم هذا السيناريو بتنزيل الإصدارات الجديدة، وحذف الإصدارات القديمة من الحزم، وإعادة تشغيل كل شيء تلقائيًا، مما يوفر جميع تكويناتك.

لإيقاف كل شيء، استخدم السيناريو `stop.sh`:
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}

هذا كل شيء. تابع إلى المقالة التالية.