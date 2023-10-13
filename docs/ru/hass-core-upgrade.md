---
title: Обновите ядро Home Assistant
contributors: [PaTara43, makyul]
tools:   
  - Ubuntu Server 22.04.3 LTS for RaspPi
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2023.7.3
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.1
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
---

**В этой статье содержатся инструкции по обновлению вашего существующего ядра Home Assistant с интеграцией Robonomics.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. Предполагается, что установка вашего ядра Home Assistant была завершена в соответствии с [официальными инструкциями](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) и у вас есть пользователь <u>homeassistant</u> и среда `venv`. Если это не так, следуйте инструкциям ниже, **но отредактируйте скрипт соответствующим образом**.
  2. IPFS будет установлен и запущен как служба <u>systemd</u> на хост-машине.
  3. Предполагается, что у вас установлен [Python3.10](https://www.python.org/downloads/) или более новая версия.

</robo-wiki-note>

## Установка

Скачайте установочный скрипт и запустите его в терминале:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

Вы увидите следующий вывод:

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

В процессе установки вам будет предложено подтвердить перезапуск нескольких служб. Навигируйте с помощью клавиши `tab` и выберите опцию `yes`.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  Возможно, вы увидите ошибку вроде `mkdir: can't create directory 'custom_components': File exists`. Это означает, что у вас уже есть этот каталог с некоторыми установленными пользовательскими компонентами. Просто игнорируйте это сообщение.

</robo-wiki-note>
  
После завершения перезагрузите Home Assistant.

## Проверка

Проверьте, что служба IPFS работает:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

Вы увидите следующий вывод:

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
