---
title: Pre-installed Image For Raspberry Pi
contributors: [LoSk-p, dergudzon, Leemo94, PaTara43, nakata5321]
translated: true
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
  - Robonomics integration 1.1.3
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
ipfs get QmR92hqCvqy5Vzxyszobb6o5tPkeFNNTy5ZZsVBFVDheFR -o rpi.img.xz
```

<robo-wiki-note type="note" title="Browser alternative">

  Alternatively, you can download it 
  [from GitHub releases.](https://github.com/nakata5321/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


Proceed to the next chapter to install the image.

## Configure Image

Install [balena etcher](https://www.balena.io/etcher/) on your computer. Then, insert the SD card.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert sd card" />

Run the Imager program. Select required image as the operating system and ensure to select your SD card from the storage dropdown, and then `flash` image.

<robo-wiki-picture src="home-assistant/balena.jpg" alt="Balena installer" />

After flashing, open the SD card's storage and navigate inside the `boot` folder of the card.

Inside this folder you need to create a `wpa_supplicant.conf` file, where you will provide your network credentials.
Paste the following to the file:
```shell
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=<Insert 2 letter ISO 3166-1 country code here>

network={
        scan_ssid=1
        ssid="<Name of your wireless LAN>"
        psk="<Password for your wireless LAN>"
        proto=RSN
        key_mgmt=WPA-PSK
        pairwise=CCMP
        auth_alg=OPEN
}
```
And set `ssid`, `psk` and `country` code according to yours. You can find country codes [here](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). 

<robo-wiki-note type="warning">
  Make sure that you input your actual Wi-Fi name and your Wi-Fi password.
</robo-wiki-note>

<robo-wiki-note type="note"> This way of setting Wi-Fi credentials is only available before the first boot. If you need to change it later, please, use `sudo raspi-config` command. 
</robo-wiki-note>

Then you need to save the file, **safely eject the SD card**, and insert it into the Raspberry Pi and turn it on. It should connect to your wi-fi network. 

> After your Raspberry Pi is plugged in, make sure to wait a few (up to 5) minutes for it to boot up and register on the network. 

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