---
title: Pre-installed Image For Raspberry Pi
contributors: [ nakata5321, PaTara43]
tools:
  - Home Assistant 2022.12.7
    https://github.com/home-assistant/core
  - Robonomics integration 1.1.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.17.0
    https://docs.ipfs.tech/
---

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.live/ipfs/QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]" />

**Welcome to the guide on installing Home Assistant with Robonomics integration on a Raspberry Pi. Home Assistant is an open-source home automation system that provides a centralized hub for controlling smart devices in your home network. By integrating with Robonomics, a decentralized cloud service, you can enhance the functionality and security of your smart home. In this article, we will provide step-by-step instructions on how to install Home Assistant with Robonomics on a Raspberry Pi, giving you the ability to automate and control various aspects of your home using a secure and decentralized solution. Let's get started!**

<robo-wiki-picture src="home-assistant/pre_installed_image.png" />

## 1. Downloading the Image

To simplify the installation process, a pre-made image can be used. It contains Home Assistant Core with Robonomics integration and IPFS. Options for downloading:

### GitHub Release

Download it from the latest [GitHub releases.](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

### IPFS get

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
ipfs get QmbuaMeXG51RS6uSzVN2C2oXeJ8vsgJ1JQKnQHgshyporE -o rpi.img.xz
```
</code-helper>


## 2. Configuring the Image

Install [Raspberry Pi Imager](https://www.raspberrypi.com/software/) on your computer. Then, insert the SD card.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Run the Raspberry Pi Imager program. Choose required image as the operating system and ensure to select your SD card from the storage dropdown menu. In settings provide your Wi-Fi, password, choose your country from drop-down list and then `Write!` image. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.live/ipfs/QmVgex7Aw9sH97kDbbwaHkbcHZRu8xWruh5a7hfnMstNrV', type:'mp4'}]" />

You can find country codes [here](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

## 3. First Boot

**Safely eject the SD card**, insert it into the Raspberry Pi and connect the power cable to your device. It should connect to your Wi-Fi network. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Once your Raspberry Pi is connected, the red LED will light up and the green LED will flash for some time. Wait up to 5 minutes for the Raspberry Pi to boot up and register on the network. 

Now find the IP address of Raspberry Pi. To find it you can use [Fing mobile app](https://www.fing.com/products) or 
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Find the `robots-home` (optional name could be `Home(homeassistant)`) 
name of the host machine in the IP list. 

In this example the address is `192.168.43.56`. 

Connect to Raspberry Pi with `ssh` command: 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh smart@192.168.43.56
```

</code-helper>

<robo-wiki-note type="note"> 

User is `smart`, password is `robot`. 

</robo-wiki-note>

## Next step

Now you have a Raspberry Pi with firmware installed, go to the [Home Assistant Init](/docs/hass-init/) article.

<!-- ## Related videos

https://youtu.be/qW4sjUaShWA -->

## Troubleshooting

1. To change Wi-Fi setting later, use command `sudo raspi-config`. Find more information about this command on [the official site.](https://www.raspberrypi.com/documentation/computers/configuration.html)