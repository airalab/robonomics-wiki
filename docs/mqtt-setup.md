---
title: MQTT Setup
contributors: [nakata5321, PaTara43]
tools:
  - Mosquitto Broker 2.0.11
    https://mosquitto.org/
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

**This article describes how to configure MQTT integration. If you are on this page.**

## Install MQTT Broker

<robo-wiki-note type="warning">

  This installation method only for Core and Docker Home Assistant installations. If you have Home Assistant OS, go to [MQTT Broker for Home Assistant OS](/docs/mqtt-hassos/) to install the MQTT broker and continue with "Add MQTT Integration" section.

</robo-wiki-note>

There is a quick installation option with a pre-written script, that installs the [Mosquitto](https://mosquitto.org/) MQTT broker. Connect to your Raspberry Pi and run:

```shell
curl -O https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/mqtt-install.sh
bash mqtt-install.sh
```

You will be asked to enter `USERNAME` and `PASSWORD` for the broker. After finishing, the broker will be running as a `systemd` service.

## Add MQTT Integration

Install MQTT integration for Home Assistant. Open Home Assistant web interface and go to `Settings` -> `Devices & Services`.

<robo-wiki-picture src="home-assistant/settings.jpg" alt="Home Assistant settings menu" />

Press `ADD INTEGRATION` at the right bottom corner. In the opened window find `MQTT`:

<robo-wiki-picture src="home-assistant/mqtt.jpg" />

Select MQTT and set up your broker address — `localhost`, port — `1883`, your username and password (the same which you created earlier for Mosquitto Broker), then press `SUBMIT`.

<robo-wiki-picture src="home-assistant/mqtt-setup.jpg" />

After that, you can proceed to add devices. Depending on the hardware you have, choose one of the options:

**Option 1 (with zigbee2MQTT)**
* For Zigbee adapter [go here](/docs/zigbee-to-mqtt/). Ideal for [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) or similar [supported adapters](https://www.zigbee2mqtt.io/information/supported_adapters.html).

**Option 2 (with SLS Gateway)**
* For Robonomics SLS Gateway [go here](/docs/sls-gateway/). Open SLS gateway specs your can [find here](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01).