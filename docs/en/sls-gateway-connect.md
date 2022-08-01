---
title: Connect SLS Gateway to Home Assistant 

contributors: [LoSk-p]
translated: true
---

## MQTT on SLS Gateway

You need to configure MQTT on SLS Gateway. Come back to your [SLS Gateway](https://wiki.robonomics.network/docs/en/sls-setup/#setup) go to `Settings/Link` -> `MQTT Setup`:

<robo-wiki-picture src="home-assistant/sls-mqtt-menu.jpg" />

And add your brocker address (address of the Raspberry Pi with Home Assistant in local network), port (1883) and your brocker username and password (default `user` and `pass` if you haven't changed it [here](/docs/raspberry-setup/)). Also write the topic name (you can choose any). 

<robo-wiki-note type="warning">Don't forget to tick `Enable` and `Retain states`.</robo-wiki-note>

<robo-wiki-picture src="home-assistant/sls-mqtt1.jpg" />

Save changes. Now devices will be automatically shown in Home Assistant.

After that you can connect your devices to Robonomics with this [instruction](/docs/add-smart-device-to-robonomics).