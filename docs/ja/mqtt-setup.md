---
title: MQTT Setup
contributors: [nakata5321, PaTara43]
translated: false
tools:
  - Mosquitto Broker 2.0.11
    https://mosquitto.org/
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

**Being on this page means that you have installed Home Assistant with Robonomics and IPFS and yet don't have any
Zigbee devices connected. To do so, you first need a MQTT broker to be set up and MQTT integration to be configured.**


## Install MQTT broker

There is a quick installation option with a pre-written script. Connect to your Raspberry Pi, where you host Home Assistant and run:

```shell
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

Then press on three dots on MQTT integration and choose `System Options` and check if automatically adding new devices is enabled:

<robo-wiki-picture src="home-assistant/add-dev.jpg" />


Now it's time to add some devices to your smart home. Depending on the hardware you have, pick one of the options:

**Option 1 (with zigbee2MQTT)**
* If you have Zigbee adapter [JetHome USB JetStick Z2](https://jethome.ru/z2/)
(or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html)) go [**here.**](/docs/zigbee-to-mqtt/)

**Option 2 (with SLS Gateway)**
* If you have [Robonomics SLS Gateway](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01) go [**here.**](/docs/sls-gateway/)

