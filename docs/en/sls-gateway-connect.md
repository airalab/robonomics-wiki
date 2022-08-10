---
title: Connect SLS Gateway to Home Assistant 

contributors: [LoSk-p]
translated: true
---
After setting up SLS [Gateway](/docs/sls-setup), now it's time to connect SLS Gateway to HOme Assistant.

## MQTT on SLS Gateway

First, You need to configure MQTT on SLS Gateway. Come back to your SLS Gateway go to `Settings/Link` -> `MQTT Setup`:

<robo-wiki-picture src="home-assistant/sls-mqtt-menu.jpg" />

And add your broker address (address of the Raspberry Pi with Home Assistant in local network. you can find it in fing app or write `ip a` command on your RPi), port (default is 1883) and your broker username and password (which you created earlier). Also write the topic name (you can choose any). 

<robo-wiki-note type="warning">Don't forget to click `Enable` and `Retain states`.</robo-wiki-note>

<robo-wiki-picture src="home-assistant/sls-mqtt1.jpg" />

Save changes. Now devices will be automatically shown in Home Assistant.

That's all. Go to the next article ["IOT subscription setup"](/docs/iot-sub-setup/) to create robonomics parachain's accounts and activate subscription.