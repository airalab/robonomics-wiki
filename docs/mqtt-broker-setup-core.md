---
title: MQTT Broker for Home Assistant Docker and Core
contributors: [nakata5321, PaTara43]
tools:
  - Mosquitto Broker 2.0.11
    https://mosquitto.org/
---

**This article describes how to install MQTT broker for Home Assistant docker or core.**

There is a quick installation option with a pre-written script, that installs the [Mosquitto](https://mosquitto.org/) MQTT broker. Connect to your Raspberry Pi and run:

```shell
curl -O https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/mqtt-install.sh
bash mqtt-install.sh
```

You will be asked to enter `USERNAME` and `PASSWORD` for the broker. After finishing, the broker will be running as a `systemd` service.

Next, go to [MQTT integration article](/docs/mqtt-integration/).