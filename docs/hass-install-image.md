---
title: Pre-installed Image For Raspberry Pi
contributors: [LoSk-p, dergudzon, Leemo94, PaTara43, nakata5321]
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


## Get image

To simplify the installation process when starting from scratch, a pre-made image may be used. It contains Home Assistant
Core with Robonomics integration and IPFS.

You can download it [from GitHub releases.](https://github.com/airalab/Robonomics-HomeAssistant-image)

Alternatively, to download it, IPFS is to be used. [Install IPFS](https://docs.ipfs.tech/install/command-line/) and start the daemon 
(Don't forget to run `ipfs init` before the first start):

```shell
ipfs daemon
```

In other terminal download image with

```shell
ipfs get QmcvqPiFVdR436wxqcKyR98uxsMYU2jmfo1K1PX9kfj3Df -o rpi.img.xz
```

Proceed to the next chapter to install the image.

## Configure Image

Install [balena etcher](https://github.com/balena-io/etcher/releases) on your computer. Then, insert the SD card.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert sd card" />

Run the Imager program. Select required image as the operating system and ensure to select your SD card from the storage dropdown, and then `flash` image.

<robo-wiki-video src="https://static.robonomics.network/wiki/balena-robonomics-image-crop.mp4" />

<!-- <robo-wiki-video :local="true" src="balena-robonomics-image-crop.mp4" /> -->

## First Boot

After flashing, open the SD card's storage and navigate inside the `boot` folder of the card. Create and open a `wpa_supplicant.conf` file:
```shell
cd /media/$USER/boot
nano wpa_supplicant.conf
```

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

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first start" />

After your Raspberry Pi is plugged in, red led will be on and green led will blink for some time. 
Wait up to 5 minutes for the Raspberry Pi to boot up and register on the network. 

Now find the Raspberry Pi's IP address. To find address you can use [Fing mobile app](https://www.fing.com/products)
or [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).  In this example the Raspberry Pi's address is `192.168.43.56`.
Connect to it over `ssh`:

```bash
ssh ubuntu@192.168.43.56
```

<robo-wiki-note type="note"> User is "ubuntu". Password is "ubuntu". </robo-wiki-note>


Now that you have a Raspberry Pi with installed firmware, proceed to the [Home Assistant Init](/docs/hass-init/)
page.