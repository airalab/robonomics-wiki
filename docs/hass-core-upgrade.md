---
title: Upgrade Your Home Assistant Core
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

**This article contains instructions to upgrade your existing Home Assistant Core with the Robonomics integration.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. It is assumed that the installation of your Home Assistant Core was completed in accordance to the [official instructions](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) and there is a <u>homeassistant</u> user and the `venv` environment. If it is not the case, follow instructions below, **but edit the script accordingly**.
  2. IPFS will be installed and run as a <u>systemd</u> service on the host machine.
  3. It is assumed that you have [Python3.10](https://www.python.org/downloads/) or higher installed.

</robo-wiki-note>

## Install

Download the installation script and run it in the terminal:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

You will see the following output:

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

During the process, you will be asked to confirm the restart of several services. Navigating with `tab`, select the `yes` option.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  You may see an error like `mkdir: can't create directory 'custom_components': File exists`. This means that you have already have this folder with some custom components installed. Just ignore this message.

</robo-wiki-note>
  
After finishing, restart your Home Assistant.

## Verify

Check that the IPFS service is up and running:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

You will see the following output:

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
