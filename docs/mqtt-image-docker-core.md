---
title: MQTT Broker for Pre-installed Image or Home Assistant Docker or Core
contributors: [nakata5321, PaTara43]
tools:
  - Mosquitto Broker 2.0.15
    https://github.com/eclipse/mosquitto
---

**This article describes how to install MQTT broker for Robonomics pre-installed image or for Home Assistant Docker or Core.**

<robo-wiki-picture src="home-assistant/mqtt_broker_core.png" />

There is a quick installation option with a pre-written script, that installs the [Mosquitto](https://mosquitto.org/) MQTT broker. Connect to your Raspberry Pi and run:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
curl -O https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/mqtt-install.sh
bash mqtt-install.sh
```
</code-helper>

You will be asked to enter `USERNAME` and `PASSWORD` for the broker. After finishing, the broker will be running as a `systemd` service.

## Next step

After that, go to the [MQTT Integration Setup](/docs/mqtt-integration/) article.

## Related videos

https://youtu.be/n4PX25aB1JU