---
title: Connect SLS Gateway to Home Assistant 

contributors: [LoSk-p, nakata5321]
translated: true
---
After setting up the SLS [Gateway](/docs/sls-setup), now it's time to connect it to Home Assistant.

## MQTT on SLS Gateway

First, You need to configure MQTT on SLS Gateway. Come back to your SLS Gateway web interface and go to `Settings/Link` -> `MQTT Setup`:

<robo-wiki-picture src="home-assistant/sls-mqtt-menu.jpg" />

And add your broker address (address of the Raspberry Pi with Home Assistant in local network, you can find it in Fing [app](https://www.fing.com/products) or with `ip a` command on your RPi), port (default is 1883) and your broker username and password (which you have created earlier). Also write the topic name (you can choose any). 

<robo-wiki-note type="warning">Don't forget to click `Enable` and `Retain states`.</robo-wiki-note>

<robo-wiki-picture src="home-assistant/sls-mqtt1.jpg" />

Save changes. Now devices will be automatically shown in Home Assistant.

That's all. Go to the next article ["IOT subscription setup"](/docs/iot-sub-setup/) to create Robonomics Parachain accounts and activate subscription.