---
title: MQTT Setup
contributors: [nakata5321, PaTara43]
translated: true
tools:
  - Mosquitto Broker 2.0.11
    https://mosquitto.org/
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

**This article describes how to install MQTT broker. If you on this page, 
this is mean that you complete one variant from "Install" section and the "Home Assistant init" article.**


## Install MQTT broker

There is a quick installation option with a pre-written script. Connect to your Raspberry Pi, where you host Home Assistant and run:

```shell
ubuntu@your-rpi:~$
curl -O https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/mqtt-install.sh
bash mqtt-install.sh
```

You will be asked to insert **USERNAME** and **PASSWORD** for Broker. Now it's running as a `systemd` service.

## Add MQTT Integration

Now, you should install MQTT integration to the Home Assistant. For this on you Home Assistant web interface go to 
`Settings` -> `devices & Services`.

<robo-wiki-picture src="home-assistant/settings.jpg" alt="settings screen" />

And press `ADD INTEGRATION` at the right bottom corner. In the opened window find `MQTT`:

<robo-wiki-picture src="home-assistant/mqtt.jpg" />

Press on it and set up your broker address - `localhost`, port - `1883` 
and your username and password, which you've created earlier, then press `submit`:

<robo-wiki-picture src="home-assistant/mqtt-setup.jpg" />

Now it's time to add some devices to your smart home. Depending on the hardware you have, pick one of the options:

**Option 1 (with zigbee2MQTT)**
* If you have [Zigbee adapter go here.](/docs/zigbee-to-mqtt/) (List of [supported adapter here](https://www.zigbee2mqtt.io/information/supported_adapters.html) or use [JetHome USB JetStick Z2](https://jethome.ru/z2/).)

**Option 2 (with SLS Gateway)**
* If you have [Robonomics SLS Gateway go here.](/docs/sls-gateway/) Open hardware specs your can [find here.](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01)

