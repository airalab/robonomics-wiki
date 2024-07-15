---
title: Smart Home Installation
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
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

## Demo

Here is an example of a complete Smart Home and Robonomics integration installation. Keep in mind that the time required may vary depending on the Internet connection.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware you need for installation

If you haven't already incorporated Home Assistant into your smart home setup, it's important to be aware of the equipment you'll need to establish a complete smart home
system from the ground up. The Robonomics team recommend to use Raspberry Pi 4 as smart home server. **But it's possible to set up everything on your PC.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (at least 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD card 16Gb</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee adapter(Optionally) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee smart devices(Optionally) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Desktop for setup</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. Install Pre-requirements

Robonomics Docker contains:
- Home Assistant
- IPFS
- MQTT Broker and Integration
- Zigbee2MQTT
- libp2p proxy
- Robonomics Integration

This article will show the installation process on Ubuntu system. First you need to install next packages:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

Then you need to install Docker on PC. Installation instruction find on [the official website](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="Important information">

  Add your user to docker group, to start docker containers without root permissions. Find [instruction here](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

## 2. Configure

Download the GitHub repository and navigate inside it:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Then, create a `.env` file from the `template.env`:


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

After that, you may open the `.env` file and edit default values such as:
- Versions of packages
- path to repository where will be stored all configurations folders.
- time zone in ["tz database name"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Start

Run the bash script and wait until it installs all required packages:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

The script will check all required actions that you completed in the previous steps and will throw an error if something is wrong.

During the installation process the following situations may occur:
- If you decide not to use the Zigbee coordinator, you will see a dialog line confirming whether to continue the installation:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (y/n)
```

{% endcodeHelper %}


- If there are several devices on your PC that use serial ports, the script will ask which device to use:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

That's all. Continue to the next article.