---
title: Connect SLS Gateway to Home Assistant
locale: 'ru' 
contributors: [LoSk-p]
translated: false
---

## MQTT Integration

Now you need to add MQTT integration to Home Assistant. Open web interface then go to `Configuration/Integrations` page and press `Add Integration` button. Find MQTT:

<robo-wiki-picture src="home-assistant/mqtt.jpg" />

Press on it and set up your brocker address (localhost), port (1883) and your username and password (default `user` and `pass` if you haven't changed it [here](/docs/raspberry-setup/)), then press `submit`:

<robo-wiki-picture src="home-assistant/mqtt-setup.jpg" />

Then press on three dots on MQTT integration and choose `System Options` and check if automatically adding new devices is enabled:

<robo-wiki-picture src="home-assistant/add-dev.jpg" />

## MQTT on SLS Gateway

Also you need to configure MQTT on SLS Gateway. Come back to your [SLS Gateway](https://wiki.robonomics.network/docs/en/sls-setup/#setup) go to `Settings/Link` -> `MQTT Setup`:

<robo-wiki-picture src="home-assistant/sls-mqtt-menu.jpg" />

And add your brocker address (address of the Raspberry Pi with Home Assistant in local network), port (1883) and your brocker username and password (default `user` and `pass` if you haven't changed it [here](/docs/raspberry-setup/)). Also write the topic name (you can choose any). 

<robo-wiki-note type="warning">Don't forget to tick `Enable` and `Retain states`.</robo-wiki-note>

<robo-wiki-picture src="home-assistant/sls-mqtt1.jpg" />

Save changes. Now devices will be automatically shown in Home Assistant.

After that you can connect your devices to Robonomics with this [instruction](/docs/add-smart-device-to-robonomics).