---
title: Smart Home Installation
contributors: [nakata5321, PaTara43]
tools:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Welcome to the guide on installing Home Assistant with Robonomics integration. Home Assistant is an open-source home automation system that provides a centralized hub for controlling smart devices in your home network. By integrating with Robonomics, a decentralized cloud service, you can enhance the functionality and security of your smart home. In this article, we will provide step-by-step instructions on how to install Home Assistant with Robonomics, giving you the ability to automate and control various aspects of your home using a secure and decentralized solution. Let's get started!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## Demo

Here is an example of a complete Smart Home and Robonomics integration installation. Keep in mind that the time required may vary depending on the Internet connection. 

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware you need for installation

If you haven't already incorporated Home Assistant into your smart home setup, it's important to be aware of the equipment you'll need to establish a complete smart home system from the ground up. The Robonomics team recommend to use Raspberry Pi 4 as smart home server.


{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (at least 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD card 16Gb</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee smart devices(Optionally) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee adapter(Optionally) </b> </a>  {% endroboWikiGrid %}
	
{% endroboWikiGridWrapper %}


## 1. Install Pre-requirements


{% roboWikiNote {type: "warning", title: "Important information" }%} All these steps should be done on Raspberry Pi 4 with Ubuntu sytem. {% endroboWikiNote %}

Robonomics Docker contains:
- Home Assistant
- IPFS
- MQTT Broker and Integration
- Zigbee2MQTT
- libp2p proxy
- Robonomics Integration

First you need to install the following packages:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Then you need to install Docker on your Raspberry Pi 4. Installation instruction find on [the official website](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Important information" }%} Add your user to docker group, to start docker containers without root permissions. Find [instruction here](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

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
cp template.env .env
```

{% endcodeHelper %}

After that, you may open the `.env` file and edit the default values, such as:
- the path to the repository where all configurations folders will be stored .
- time zone in ["tz database name"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Start

Run the bash script and wait until it installs all required packages:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

The script will verify all required actions completed in the previous steps and will display an error if something is incorrect.

During the installation process the following situations may occur:
- If you decide not to use the Zigbee coordinator, you will see a dialog line confirming whether to continue the installation:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (Y/n)
```

{% endcodeHelper %}


- If there are several devices on your Raspberry Pi 4 that use serial ports, the script will ask which device to use:

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

## Post-installation

After everything has started, you can use the `update.sh` script to update the version of Docker packages: 
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
This script will download new versions, delete old versions of packages, and restart everything automatically, saving all your configurations.

To stop everything, use the `stop.sh` script:
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}


That's all. Continue to the next article.