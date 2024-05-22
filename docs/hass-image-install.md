---
title: Smart Home Installation
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Welcome to the guide on installing Home Assistant with Robonomics integration. Home Assistant is an open-source home automation system that provides 
a centralized hub for controlling smart devices in your home network. By integrating with Robonomics, a decentralized cloud service, you can enhance the functionality and
security of your smart home. In this article, we will provide step-by-step instructions on how to install Home Assistant with Robonomics, giving you the ability to 
automate and control various aspects of your home using a secure and decentralized solution. Let's get started!**

## Hardware you need for installation

If you haven't already incorporated Home Assistant into your smart home setup, it's important to be aware of the equipment you'll need to establish a complete smart home 
system from the ground up. The Robonomics team recommend to use Raspberry Pi 4 as smart home server. **But it's possible to set up everything on your PC.**

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter(Optionally)</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices(Optionally)</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Install Pre-requirements

Robonomics docker contains:
- Home Assistant
- IPFS
- MQTT Broker and Integration
- Zigbee2MQTT
- libp2p proxy
- Robonomics Integration

This article will show the installation process on ubuntu system. First you need to install next packages:

<code-helper copy>

```
sudo apt-get install wget unzip git
```
</code-helper>

Then you need to install Docker on PC. Installation instruction find on [the official website](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="Robonomics for you">
  Add your user to docker group, to start docker containers without root permissions.
</robo-wiki-note>

## 2. Configure

Download GitHub repository and go inside it:

<code-helper copy>

```
sudo apt-get install wget unzip git
```
</code-helper>


## 3. First Boot

**Safely eject the SD card**, insert it into the Raspberry Pi. Then **insert Zigbee adapter** into the Raspberry Pi.

<robo-wiki-note type="warning">It's important to insert Zigbee adapter before first start of raspberry Pi! 
It's needed for autoconfiguration of zigbee network.</robo-wiki-note>

**If you have the [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (which has all the necessary firmware), you can simply proceed with these instructions. However, if you have another adapter, the first thing you need to do is to flash it with Zigbee2MQTT software. You can find instructions for your device [here](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

Next, connect the power cable to your device. It should connect to your Wi-Fi network. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Once your Raspberry Pi is connected, the red LED will light up and the green LED will flash for some time. Wait up to 5 minutes for the Raspberry Pi to boot up and register on the network. 

Now find the IP address of Raspberry Pi. To find it you can use [Fing mobile app](https://www.fing.com/products) or 
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Find the `robots-home` (optional name could be `Home(homeassistant)`) 
name of the host machine in the IP list. 

In this example the address is `192.168.43.56`. 

To check that everything is working, open web browser and go to web page `http://%RASPBERRY_IP_ADDRESS%:8123`. In this example, it will be `192.168.43.56:8123`.
If everything is fine, you will see Home Assistant web interface. If webpage doesn't open, wait up to 5 minutes for the Raspberry Pi to boot up and try again. 

<robo-wiki-video loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Troubleshooting

1. To change Wi-Fi setting later you should login to your Raspberry Pi via `ssh` command. For this, open terminal on your computer
and type ssh command with your username, which you create on "Configuring the Image" step(default one is "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

and then use command `sudo raspi-config`. Find more information about this command on [the official site.](https://www.raspberrypi.com/documentation/computers/configuration.html)
