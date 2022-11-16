---
title: Home Assistant Core
contributors: [PaTara43, makyul]
translated: true
tools:   
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2022.8.2
    https://github.com/home-assistant/core
  - Robonomics integration 1.1.0
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.14.0
    https://docs.ipfs.tech/
---

**This article contains instructions to upgrade your existing Home Assistant Core with Robonomics Integration.**

<robo-wiki-note type="warning" title="DISCLAIMER">

  Here, Robonomics integration and IPFS are to be installed along with existing Home Assistant Core.

  1. This section is designed with an assumption that installation went completely according to 
  [instructions](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) given by Home Assistant
  developers and there is a <u>homeassistant</u> user and venv. If it is not the case, follow instructions below **but edit the script accordingly**.
  2. IPFS will be installed and run as a <u>systemd</u> service on the host machine.
  3. It is assumed that you have Python3.9 or higher installed.

</robo-wiki-note>

## Install

Download the installation script and run it with bash:
  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
sudo bash install_integration_core.sh
```

You will see the following output:

```shell
<...>
https://raw.githubusercontent.com/LoSk-p/robonomics-hass-utils/main/raspberry_pi/install_ipfs_arc_dependent.sh
<...>
IPFS daemon installed and launched, use ipfs-daemon.service to manage.
<...>
A    robonomics/utils.py
Checked out revision 125.
Integration downloaded!
```

Somewhere along the way you will be asked to confirm the restart of several services. Navigating with `tab`, select the `yes` option.
  
<robo-wiki-note type="note" title="`custom_components` exists.">

  You may see an error like `mkdir: can't create directory 'custom_components': File exists`. This
  means that you have already installed some custom components and the folder exists. Ignore this message.

</robo-wiki-note>
  
Restart your Home Assistant.

## Verify

Check that IPFS service is up and running:
```shell
ubuntu@ubuntu:~$ systemctl status ipfs-daemon.service 
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

You will see the integration available while going through further steps of this tutorial.

Now that the integration is added to the folder of custom components of Home Assistant, you have two options:

- Whether you have MQTT integration installed and some Zigbee devices connected by either Zigbee2MQTT or any other hardware,
proceed to [configuration steps](/docs/sub-activate) of Robonomics subscription and Robonomics Integration.
- Otherwise, navigate to [MQTT Broker](/docs/mqtt-and-hass-setup/) installation where you also add MQTT integration to your Home
Assistant and connect your Zigbee devices to your Home Assistant via preferred hardware.
