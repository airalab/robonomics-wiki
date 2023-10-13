---
title: Оновіть свій основний додаток Home Assistant
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

**У цій статті містяться інструкції щодо оновлення вашого існуючого основного додатку Home Assistant з інтеграцією Robonomics.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. Передбачається, що встановлення вашого основного додатку Home Assistant було завершено відповідно до [офіційних інструкцій](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) і є користувач <u>homeassistant</u> та середовище `venv`. Якщо це не так, дотримуйтесь наведених нижче інструкцій, **але відредагуйте скрипт відповідно**.
  2. IPFS буде встановлено та запущено як службу <u>systemd</u> на хост-машині.
  3. Передбачається, що у вас встановлено [Python3.9](https://www.python.org/downloads/) або новішу версію.

</robo-wiki-note>

## встановити

Завантажте скрипт встановлення та запустіть його в терміналі:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

Ви побачите наступний вивід:

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

Під час процесу вас буде запрошено підтвердити перезавантаження кількох служб. Виберіть опцію `yes`, натискаючи `tab`.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  Можливо, ви побачите помилку типу `mkdir: can't create directory 'custom_components': File exists`. Це означає, що у вас вж є ця папка з деякими встановленими власними компонентами. Просто ігноруйте це повідомлення.

</robo-wiki-note>
  
Після завершення перезавантажте свій основний додаток Home Assistant.

## Підтвердити

Перевірте, що служба IPFS працює та запущена:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

Ви побачите наступний вивід:

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
