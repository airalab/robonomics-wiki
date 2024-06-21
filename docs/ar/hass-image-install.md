---
title: صورة مثبتة مسبقًا لجهاز Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**مرحبًا بك في الدليل على تثبيت Home Assistant مع دمج Robonomics على جهاز Raspberry Pi. Home Assistant هو نظام منزلي ذكي مفتوح المصدر يوفر محورًا مركزيًا للتحكم في الأجهزة الذكية في شبكة منزلك. من خلال الدمج مع Robonomics ، يمكنك تعزيز وظائف وأمان منزلك الذكي باستخدام خدمة سحابية لامركزية. في هذه المقالة ، سنقدم تعليمات خطوة بخطوة حول كيفية تثبيت Home Assistant مع Robonomics على جهاز Raspberry Pi ، مما يمنحك القدرة على أتمتة والتحكم في جوانب مختلفة من منزلك باستخدام حل آمن ولامركزي. لنبدأ!**

## الأجهزة التي تحتاجها للتثبيت

إذا لم تقم بدمج Home Assistant بالفعل في إعداد منزلك الذكي ، فمن المهم أن تكون على علم بالمعدات التي ستحتاجها لإنشاء نظام منزل ذكي كامل من البداية.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. قم بتنزيل صورة Robonomics المثبتة مسبقًا

تحتوي صورة Robonomics المثبتة مسبقًا على:
- Home Assistant Core
- IPFS
- وسيط MQTT والتكامل
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

يمكنك التحقق من الشفرة المصدرية وتنزيل أحدث إصدار للصورة على [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. قم بتكوين الصورة

قم بتثبيت [Raspberry Pi Imager](https://www.raspberrypi.com/software/) على جهاز الكمبيوتر الخاص بك. ثم قم بإدخال بطاقة SD.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


قم بتشغيل برنامج Raspberry Pi Imager. اختر الصورة المطلوبة كنظام التشغيل وتأكد من تحديد بطاقة SD الخاصة بك من قائمة التخزين المنسدلة.
في الإعدادات:
- قم بتعيين اسم المستخدم وكلمة المرور (احفظ اسم المستخدم الافتراضي "pi" ليكون سهل الحفظ),  
- قدم اسم وكلمة مرور Wi-Fi الخاصة بك, 
- اختر بلدك من قائمة الانسحاب
ثم `اكتب` الصورة. 
                   
<robo-wiki-note type="note">احفظ اسم المستخدم وكلمة المرور بعناية ، لأنه سيتعين استخدام هذه البيانات لحل المشكلات في حالة الحاجة </robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

يمكنك العثور على رموز البلدان [هنا](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

## 3. الإقلاع الأول

**أخرج بطاقة SD بأمان** ، ثم قم بإدخالها في Raspberry Pi. ثم **أدخل محول Zigbee** في Raspberry Pi.

<robo-wiki-note type="warning">من المهم إدخال محول Zigbee قبل بدء تشغيل Raspberry Pi للمرة الأولى! 
مطلوب لتكوين تلقائي لشبكة zigbee.</robo-wiki-note>

**إذا كان لديك [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (الذي يحتوي على البرامج الثابتة اللازمة بالكامل) ، فيمكنك ببساطة المتابعة مع هذه التعليمات. ومع ذلك ، إذا كان لدك محول آخر ، فأول شيء يجب عليك القيام به هو تفليشه ببرنامج Zigbee2MQTT. يمكنك العثور على تعليمات لجهازك [هنا](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

بعد ذلك ، قم بتوصيل كابل الطاقة بجهازك. يجب أن يتصل بشبكة Wi-Fi الخاصة بك. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

بمجرد توصيل جهاز Raspberry Pi، سيضيء مؤشر LED الأحمر وسيومض مؤشر LED الأخضر لبعض الوقت. انتظر ما يصل إلى 5 دقائق حتى يتم تشغيل Raspberry Pi والتسجيل على الشبكة. 

الآن ابحث عن عنوان IP لـ Raspberry Pi. يمكنك استخدام تطبيق الجوال [Fing](https://www.fing.com/products) أو 
[أداة سطر الأوامر nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) للعثور على `robots-home` (يمكن أن يكون الاسم الاختياري `Home(homeassistant)`) 
اسم الجهاز المضيف في قائمة العناوين IP. 

في هذا المثال ، العنوان هو `192.168.43.56`. 

للتحقق من أن كل شيء يعمل ، افتح متصفح الويب وانتقل إلى صفحة الويب `http://%RASPBERRY_IP_ADDRESS%:8123`. في هذا المثال ، سيكون `192.168.43.56:8123`.
إذا كان كل شيء على ما يرام ، سترى واجهة Home Assistant على الويب. إذا لم يتم فتح صفحة الويب ، انتظر حتى 5 دقائق ليتم تشغيل Raspberry Pi وحاول مرة أخى. 

<robo-wiki-video loop controls :videos="[{src: 'QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## حل المشاكل

1. لتغيير إعدادات Wi-Fi لاحقًا ، يجب عليك تسجيل الدخول إلى Raspberry Pi الخاص بك عبر الأمر `ssh`. للقيام بذلك ، افتح الطرفية على جهاز الكمبيوتر الخاص بك
واكتب الأمر `ssh` مع اسم المستخدم الخاص بك ، الذي قمت بإنشائه في خطوة "تكوين الصورة" (الافتراضي هو "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

ثم استخدم الأمر `sudo raspi-config`. ابحث عن مزيد من المعلومات حول هذا الأمر على [الموقع الرسمي.](https://www.raspberrypi.com/documentation/computers/configuration.html)
