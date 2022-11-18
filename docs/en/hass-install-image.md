---
title: Pre-installed Image For Raspberry Pi
contributors: [LoSk-p, dergudzon, Leemo94, PaTara43]
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

**This article contains instructions to install Home Assistant with Robonomics on your Raspberry Pi.**

<robo-wiki-note type="warning" title="Clean set up">

  Pay attention that this method implies setting up a whole new OS on your Raspberry Pi. If you have one with some vital
  information, please install Home Assistant **Docker** or **Core** following 
  [official guides](https://www.home-assistant.io/installation/raspberrypi) and then augment them with Robonomics. There 
  are dedicated guides to add Robonomics Integration to your existing Home Assistant [Core](/docs/hass-install-core) and
  [Docker](/docs/hass-install-docker).

</robo-wiki-note>

## Get image

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

<robo-wiki-note type="note" title="Browser alternative">

  Alternatively, you can download it 
  [from url.](https://ipfs.io/ipfs/Qmdca36xtJe86Mni9tAKNXpzihhNVRGKcJfb7xEeUdnfW6?filename=rpi_hass.img.gz) 
  (**Only with IPFS Daemon started**)

</robo-wiki-note>


Proceed to the next chapter to install the image.

## Configure Image

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

<robo-wiki-note type="warning">

  Make sure that you input your actual Wi-Fi name and your Wi-Fi password.

</robo-wiki-note>

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


Now that you have a Raspberry Pi with Home Assistant, Robonomics and IPFS installed, proceed to the [Home Assistant Init](/docs/hass-init/)
page where you initialize your new Home Assistant and then add MQTT integration to it. After that you will
connect your Zigbee devices to your Home Assistant.