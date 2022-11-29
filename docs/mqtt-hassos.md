---
title: MQTT Broker for Home Assistant OS
contributors: [LoSk-p]
tools:
  - Home Assistant 2022.11.4
    https://github.com/home-assistant/core
---

**This article describes how to install MQTT broker to Home Assistant OS.**

## Install MQTT Broker

In the Add-on Store find the `Mosquitto broker` add-on:

<robo-wiki-picture src="home-assistant/mosquitto-addon.jpg" />

Press on it and press `Install`. After installation go to `Configuration` tab and write **USERNAME** and **PASSWORD** for the broker in `Logins` section in the following format:

```
- username: USERNAME
  password: PASSWORD
```

<robo-wiki-picture src="home-assistant/mosquitto-addon-conf.jpg" />

Don't forget them, they will be needed in the future steps. Save the configuration and go to `Info` tab to start the add-on.

<robo-wiki-picture src="home-assistant/mosquitto-addon-start.jpg" />

Continue MQTT setup with [Add MQTT Integration](/docs/mqtt-setup#install-mqtt-broker).