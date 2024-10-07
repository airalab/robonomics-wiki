---
title: قم بترقية Home Assistant Docker أو Core الخاص بك لنظام تشغيل شبيه بيونكس
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics Home Assistant Integration 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**يحتوي هذا المقال على تعليمات لترقية Home Assistant Docker أو Core الحالي (على نظام تشغيل شبيه بيونكس) مع دمج Robonomics.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"تنصيح", type: "warning"}%}
  1. يُفترض أن Docker مثبت بشكل صحيح.
  2. يُفترض أن الصور الافتراضية وحاوية Docker الخاصة بـ Home Assistant أو Home Assitant Core مستخدمة.
  3. سيتم تثبيت IPFS و Libp2p-ws-proxy كحاويات Docker.
{% endroboWikiNote %}


## التثبيت

قم بتنزيل النص البرمجي للتثبيت وتشغيله في الطرفية:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

سيتحقق من تثبيت Docker بشكل صحيح. ثم سيحاول العثور على IPFS ويقترح التحقق من التكوين إذا تم تثبيت IPFS. إذا لم يتم العثور على IPFS، سيقوم النص البرمجي بتثبيت كل من IPFS و Libp2p-ws Proxy. سترى الناتج التالي:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker مثبت
$User ينتمي إلى مجموعة docker.
التحقق مما إذا كان IPFS مثبتًا... قد يستغرق بضع دقائق. يرجى الانتظار
<...>
 ✔ تم بدء تشغيل الحاوية ipfs-daemon
 ✔ تم بدء تشغيل الحاوية lipb2p-ws-proxy
كل شيء جاهز!
``` install_integration_core.sh
```

{% endcodeHelper %}

إذا كان IPFS مثبتًا بالفعل، سترى الناتج التالي:
```shell
Docker مثبت
$User ينتمي إلى مجموعة docker.
التحقق مما إذا كان IPFS مثبتًا... قد يستغرق بضع دقائق. يرجى الانتظار
تم العثور على نسخة IPFS. تأكد من أن تكوينك مُعد بشكل صحيح باستخدام الإعدادات التالية:
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - المنافذ 4001 و 5001 و 8080 متاحة.
      أيضًا، أضف العقد التالية:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      هل تم تكوينك بشكل صحيح؟ [نعم/لا]:

```
في هذه الحالة، يجب عليك ضبط ملف تكوين IPFS الخاص بك وتأكيده.

{% roboWikiNote {title:"تنبيه!", type: "warning"}%} تكوين IPFS بشكل صحيح أمر مهم؛ لا تتجاهل هذه الخطوة!{% endroboWikiNote %}

## تنزيل دمج Robonomics

سنستخدم [HACS](https://hacs.xyz/) لتثبيت الدمج. إذا لم يتم تثبيت HACS على Home Assistant الخاص بك بعد، يجب عليك [تثبيته](https://hacs.xyz/docs/setup/download/) أولاً.

بعد ذلك، في Home Assistant الخاص بك، انتقل إلى HACS وابحث عن `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

افتحه وانقر على `تنزيل` في الزاوية السفلى اليمنى. قد يستغرق تنزيل المستودع بعض الوقت.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

هذا كل شيء. تابع إلى المقالة التالية.