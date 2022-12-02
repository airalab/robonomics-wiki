---
title: MQTT Integration Setup
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

**In this article you will add MQTT integration to Home Assistant.**

Open Home Assistant web interface and go to `Settings` -> `Devices & Services`.

<robo-wiki-picture src="home-assistant/settings.jpg" alt="Home Assistant settings menu" />

Press `ADD INTEGRATION` at the right bottom corner. In the opened window find `MQTT`:

<robo-wiki-picture src="home-assistant/mqtt.jpg" />

Select MQTT and enter:

- Broker address — `localhost`
- Port — `1883`
- Username & password — your credentials which you created earlier for Mosquitto Broker.

After that, press `SUBMIT`.

<robo-wiki-picture src="home-assistant/mqtt-setup.jpg" />

After that, you can proceed to add devices. Depending on the hardware you have, choose one of the options:

**Option 1 (with zigbee2MQTT)**
* For Zigbee adapter [go here](/docs/zigbee-to-mqtt/). Ideal for [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) or similar [supported adapters](https://www.zigbee2mqtt.io/information/supported_adapters.html).

**Option 2 (with SLS Gateway)**
* For Robonomics SLS Gateway [go here](/docs/sls-gateway/). Open SLS gateway specs your can [find here](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01).