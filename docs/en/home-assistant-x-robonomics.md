---
title: Home Assistant x Robonomcis
contributors: [LoSk-p, dergudzon, Leemo94, PaTara43]
translated: true
tools:   
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2022.8.2
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics integration 1.1.0
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.14.0
    https://docs.ipfs.tech/
---

**This article contains various installation methods to set up a Home Assistant with Robonomics services.** 

**If you don't have a Home Assistant instance, install it together with Robonomics following
[these instructions](#install-home-assistant-and-robonomics-integration-from-scratch). 
To upgrade your existing Home Assistant with Robonomics integration, check corresponding instructions for Home Assistant
[Docker](#add-robonomics-integration-to-existing-home-assistant-docker), [Core](#add-robonomics-integration-to-existing-home-assistant-core)
and [Home Assistant OS](#add-robonomics-integration-to-existing-home-assistant-os).**


## Install Home Assistant and Robonomics Integration from Scratch

<robo-wiki-note type="warning" title="Clean set up">

  Pay attention that this method implies setting up a whole new OS on your Raspberry Pi. If you have one with some vital
  information, please install Home Assistant **Docker** or **Core** following 
  [official guides](https://www.home-assistant.io/installation/raspberrypi) and then augment them with Robonomics.

</robo-wiki-note>

### 1. Get image
To simplify the installation process when starting from scratch, a pre-made image may be used. It contains Home Assistant
Core with Robonomics integration and IPFS.

To download it, IPFS is to be used. [Install IPFS](https://docs.ipfs.tech/install/command-line/) and start the daemon 
(Don't forget to run `ipfs init` before the first start):
```shell
ipfs daemon
```

In other terminal download image with

```shell
ipfs get Qmdca36xtJe86Mni9tAKNXpzihhNVRGKcJfb7xEeUdnfW6 -o rpi.img.xz
```

<robo-wiki-note type="Note" title="Browser alternative">

  Alternatively, you can download it 
  [from url.](https://ipfs.io/ipfs/Qmdca36xtJe86Mni9tAKNXpzihhNVRGKcJfb7xEeUdnfW6?filename=rpi_hass.img.gz) 
  (**Only with IPFS Daemon started**)

</robo-wiki-note>


Proceed to the next chapter to install the image.

### 2. Configure Image

Install [balena etcher](https://www.balena.io/etcher/) on your computer. Then, insert the SD card and run the Imager program. 
Select required image as the operating system and ensure to select your SD card from the storage dropdown, and then `flash` image.

<robo-wiki-picture src="home-assistant/balena.jpg" alt="Balena installer" />

Open the SD card's storage and navigate inside the root folder of the card. The name of the folder should be something similar to `system-boot`.

Find the file named `network-config` and open it in a text editor. Copy the text below and paste it into the file and insert your **wi-fi name** and **wi-fi password**:

```
version: 2
ethernets: 
  eth0:
    dhcp4: true
    optional: true
wifis:
  wlan0:
    dhcp4: true
    optional: true
    access-points:
      YOUR_WIFI_NAME:
        password: "YOUR_WIFI_PASSWORD"
```

<robo-wiki-note type="warning">Make sure that you input your actual Wi-Fi name and your Wi-Fi password.</robo-wiki-note>

<robo-wiki-note type="note">This Wi-Fi settings available only on first boot setup.
If later you need to change settings, please edit configuration file in `/etc/netplan/` folder. 
</robo-wiki-note>

Then you need to save the file, **safely eject the SD card**, and insert it into the Raspberry Pi and turn it on. It should connect to your wi-fi network. 

Now find the Raspberry Pi's IP address. To find address you can use [Fing mobile app](https://www.fing.com/products)
or [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).  In this example the Raspberry Pi's address is `192.168.43.56`.
Connect to it over `ssh`:

```bash
ssh ubuntu@192.168.43.56
```

<robo-wiki-note type="note"> User is "ubuntu". Password is "ubuntu". </robo-wiki-note>


Now that you have a Raspberry Pi with Home Assistant, Robonomics and IPFS installed, proceed to the [MQTT Broker](/docs/mqtt-broker/)
installation where you also configure your newly installed Home Assistant and add MQTT integration to it. After that you will
connect your Zigbee devices to your Home Assistant.

## Add Robonomics integration to Existing Home Assistant Docker

<robo-wiki-note type="warning" title="DISCLAIMER">

  Here, Robonomics integration and IPFS are to be installed along with existing Home Assistant Docker.

  1. This section is designed with an assumption that default Docker images and container of Home Assistant named 
  <u>homeassistant</u> are used.
  2. IPFS will be installed and run as a <u>systemd</u> service on the host machine.
  3. It is assumed that you have Python3.9 or higher installed.

</robo-wiki-note>

### 1. Install

Download the installation script and run it with bash:

```shell
wget https://raw.githubusercontent.com/LoSk-p/robonomics-hass-utils/main/raspberry_pi/install_integration_docker.sh
sudo bash install_integration_docker.sh
```

You will see the following output:

```shell
<...>
added /dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw
<...>
IPFS daemon installed and launched, use ipfs-daemon.service to manage.
<...>
Executing subversion-1.14.2-r1.pre-install
Executing busybox-1.35.0-r17.trigger
OK: 157 MiB in 165 packages
<...>
A    robonomics/utils.py
Checked out revision 120.
Integration downloaded!
```

<robo-wiki-note type="note" title="`custom_components` exists.">

  You may see an error like `mkdir: can't create directory 'custom_components': File exists`. This
  means that you have already installed some custom components and the folder exists. Ignore this message.

</robo-wiki-note>

Restart the container:

<robo-wiki-tabs>
  <robo-wiki-tab title="Docker">
    <pre>docker restart homeassistant</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="Docker Compose">
    <pre>docker compose restart</pre>
  </robo-wiki-tab>
</robo-wiki-tabs>


### 2. Verify

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
proceed to [configuration steps](/docs/iot-sub-setup) of Robonomics subscription and Robonomics Integration.
- Otherwise, navigate to [MQTT Broker](/docs/mqtt-broker/) installation where you also add MQTT integration to your Home
Assistant and connect your Zigbee devices to your Home Assistant via preferred hardware.

## Add Robonomics integration to Existing Home Assistant Core

**This part is under maintenance, to be updated soon.**

## Add Robonomics integration to Existing Home Assistant OS

**This part is under maintenance, to be updated soon.**

[//]: # (## Troubleshooting)

[//]: # (todo)
[//]: # (nmap)