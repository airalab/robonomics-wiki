---
title: Pre-installed Image For Raspberry Pi
contributors: [ nakata5321, PaTara43]
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

<robo-wiki-picture src="home-assistant/pre_installed_image.png" />

## Get Image

To simplify the installation process, a pre-made image can be used. It contains Home Assistant Core with Robonomics integration and IPFS. Options for downloading:

### GitHub Release

Download it from the latest [GitHub releases.](https://github.com/airalab/Robonomics-HomeAssistant-image)

### Image from IPFS

Alternatively, you can download it using IPFS. [Install IPFS](https://docs.ipfs.tech/install/command-line/), initialize and start the daemon:

<code-helper additionalLine="your_username@your_hostname">

```shell
ipfs init
ipfs daemon
```
</code-helper>

Open the new terminal and download the image:

<code-helper additionalLine="your_username@your_hostname">

```shell
ipfs get QmcvqPiFVdR436wxqcKyR98uxsMYU2jmfo1K1PX9kfj3Df -o rpi.img.xz
```
</code-helper>


## Configure Image

Install [balenaEtcher](https://github.com/balena-io/etcher/releases) on your computer. Then, insert the SD card.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />

Run the balenaEtcher program. Choose required image as the operating system, ensure to select your SD card from the storage dropdown menu, and then `Flash!` image.

<robo-wiki-video controls src="https://static.robonomics.network/wiki/balena-robonomics-image-crop.mp4" />

## First Boot

After flashing, open the SD card's storage and navigate to the `boot` folder on the card. Create and open a `wpa_supplicant.conf` file:

<code-helper additionalLine="your_username@your_hostname">

```shell
cd /media/$USER/boot
nano wpa_supplicant.conf
```

</code-helper>

Paste the following to the file:

<code-helper copy>

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

</code-helper>

Make sure to set your Wi-Fi credentials for `ssid`, `psk` fields and set a `country` filed according to your country. You can find country codes [here](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). 

<robo-wiki-note type="note">
  
  This way of setting Wi-Fi credentials is only available before the first boot. If you need to change it later, please, use `sudo raspi-config` command. 
  
</robo-wiki-note>

Then save the file, **safely eject the SD card**, insert it into the Raspberry Pi and connect the power cable to your device. It should connect to your Wi-Fi network. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Once your Raspberry Pi is connected, the red LED will light up and the green LED will flash for some time. Wait up to 5 minutes for the Raspberry Pi to boot up and register on the network. 

Now find the IP address of Raspberry Pi. To find it you can use [Fing mobile app](https://www.fing.com/products) or [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Find the `robonomics-rpi` name of the host machine in the IP list. 

In this example the the address is `192.168.43.56`. 

Connect to Raspberry Pi with `ssh` command: 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh ubuntu@192.168.43.56
```

</code-helper>

<robo-wiki-note type="note"> User is `ubuntu`, password is `ubuntu`. </robo-wiki-note>

Now you have a Raspberry Pi with firmware installed, go to the [Home Assistant Init](/docs/hass-init/) article.