---
title: Pre-installed Image For Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.1.7
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.7
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.17.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.30.4
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Welcome to the guide on installing Home Assistant with Robonomics integration on a Raspberry Pi. Home Assistant is an open-source home automation system that provides a centralized hub for controlling smart devices in your home network. By integrating with Robonomics, a decentralized cloud service, you can enhance the functionality and security of your smart home. In this article, we will provide step-by-step instructions on how to install Home Assistant with Robonomics on a Raspberry Pi, giving you the ability to automate and control various aspects of your home using a secure and decentralized solution. Let's get started!**

## Hardware you need for installation

If you haven't already incorporated Home Assistant into your smart home setup, it's important to be aware of the equipment you'll need to establish a complete smart home system from the ground up.

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
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://slsys.io/action/supported_devices.html" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Download Robonomics pre-installed image

Robonomics pre-installed image contains:
- Home Assistant Core
- IPFS
- MQTT Broker and Integration
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="https://crustipfs.info/ipfs/QmS2Zw3F1x8UiSc15HgWDG9PC5wA4ox8DEmHTgCGmrzLDx" />

<robo-wiki-note type="warning" title="For advanced users">

You can check source code and download latest release of image on [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. Configure the Image

Install [Raspberry Pi Imager](https://www.raspberrypi.com/software/) on your computer. Then, insert the SD card.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Run the Raspberry Pi Imager program. Choose required image as the operating system and ensure to select your SD card from the storage dropdown menu. 
In settings:
- Set username and password (save default username "pi" to be easy to remember),  
- provide your Wi-Fi name and password, 
- choose your country from drop-down list
and then `Write` image. 
                   
<robo-wiki-note type="note">Save Username and Password carefully, because these credentials will be needed in case of Troubleshooting</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" />

You can find country codes [here](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

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

<robo-wiki-video loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]" />


## Troubleshooting

1. To change Wi-Fi setting later you should login to your Raspberry Pi via `ssh` command. For this, open terminal on your computer
and type ssh command with your username, which you create on "Configuring the Image" step(default one is "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

and then use command `sudo raspi-config`. Find more information about this command on [the official site.](https://www.raspberrypi.com/documentation/computers/configuration.html)
