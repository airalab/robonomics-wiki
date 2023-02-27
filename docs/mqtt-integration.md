---
title: MQTT Integration Setup
contributors: [nakata5321]
tools:
  - Home Assistant 2022.12.7
    https://github.com/home-assistant/core
---

**In this article you will add MQTT integration to Home Assistant.**

<robo-wiki-picture src="home-assistant/mqtt_integration.png" />

<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/mqtt-hass-setup.mp4', type:'mp4'}]" />

1. Open Home Assistant web interface and go to `Settings` -> `Devices & Services`.

2. Press `ADD INTEGRATION` at the right bottom corner. In the opened window find `MQTT`:

3. Select MQTT and enter:

- Broker address — `localhost`
- Port — `1883`
- Username & password — your credentials which you created earlier for Mosquitto Broker.

4. After that, press `SUBMIT`.

Now, you can proceed to add devices. Depending on the hardware you have, choose one of the options:

**Option 1 (with zigbee2MQTT)**
* For Zigbee adapter [go here](/docs/zigbee-to-mqtt/). Ideal for [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) or similar [supported adapters](https://www.zigbee2mqtt.io/information/supported_adapters.html).

**Option 2 (with SLS Gateway)**
* For Robonomics SLS Gateway [go here](/docs/sls-gateway/). Open SLS gateway specs your can [find here](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01).