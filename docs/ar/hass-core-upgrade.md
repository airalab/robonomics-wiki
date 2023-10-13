---
title: ترقية Home Assistant Core الخاص بك
contributors: [PaTara43, makyul]
tools:   
  - Ubuntu Server 22.04.2 LTS for RaspPi
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2023.1.7
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.2.0
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.17.0
    https://docs.ipfs.tech/
---

**يحتوي هذا المقال على تعليمات لترقية Home Assistant Core الحالي الخاص بك مع تكامل Robonomics.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. يفترض أن تكون تثبيت Home Assistant Core الخاص بك قد تم وفقًا للتعليمات الرسمية أن هناك مستخدم <u>homeassistant</u> وبيئة `venv`. إذا لم يكن الأمر كذلك ، فاتبع التعليمات أدناه ، **ولكن قم بتحرير النص وفقًا لذلك**.
  2. سيتم تثبيت IPFS وتشغيله كخدمة <u>systemd</u> على جهاز المضيف.
  3. يفترض أن يكون لديك [Python3.10](https://www.python.org/downloads/) أو أحدث مثبت.,

</robo-wiki-note>

## ثَبَّتَ

قم بتنزيل نص التثبيت وتشغيله في الطرفية:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

سترى الناتج التالي:

<code-helper additionalLine="rasppi_username@rasppi_hostname">


```shell
<...>
https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_ipfs_arc_dependent.sh
<...>
IPFS daemon installed and launched, use ipfs-daemon.service to manage.
<...>
A    robonomics/utils.py
Checked out revision 125.
Integration downloaded!
```

</code-helper>

خلال العملية ، سيُطلب منك تأكيد إعادة تشغيل العديد من الخدمات. باستخدام `tab` ، حدد الخيار `yes`.",
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  قد ترى خطأ مثل `mkdir: can't create directory 'custom_components': File exists`. هذا يعني أن لديك بالفعل هذا المجلد مع بعض المكونات المخصصة المثبتة. تجاهل هذه الرسالة فقط.

</robo-wiki-note>
  
بعد الانتهاء ، قم بإعادة تشغيل Home Assistant الخاص بك.

## يؤكد

تحقق من أن خدمة IPFS قيد التشغيل والعمل:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

سترى الناتج التالي:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```
● ipfs-daemon.service - IPFS Daemon Service
     Loaded: loaded (/etc/systemd/system/ipfs-daemon.service; enabled; preset: enabled)
     Active: active (running) since Thu 2022-11-03 11:30:39 UTC; 14min ago
   Main PID: 4400 (ipfs)
      Tasks: 12 (limit: 4416)
     Memory: 141.9M
        CPU: 3min 5.031s
     CGroup: /system.slice/ipfs-daemon.service
             └─4400 /usr/local/bin/ipfs daemon
```

</code-helper>
