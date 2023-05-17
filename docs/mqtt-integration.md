---
title: MQTT Integration Setup
contributors: [nakata5321]
tools:
  - Home Assistant 2023.1.7
    https://github.com/home-assistant/core
---

**In this article you will add MQTT integration to Home Assistant.**

<robo-wiki-picture src="home-assistant/mqtt_integration.png" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.art/ipfs/QmYm9qNfpGdePRHRvmahY2DgHXRfAWNN6CasEY4tFRBARr', type:'mp4'}]" />

1. Open Home Assistant web interface and go to `Settings` -> `Devices & Services`.

2. Press `ADD INTEGRATION` at the right bottom corner. In the opened window find `MQTT`:

3. Select MQTT and enter:

- Broker address — `localhost`
- Port — `1883`
- Username & password — your credentials which you created earlier for Mosquitto Broker.

4. After that, press `SUBMIT`.

Now, you can proceed to add devices. Depending on the hardware you have, choose one of the options:

**Option 1 (with zigbee2MQTT for Home Assistant OS)**
* For Zigbee adapter and Home Assistant OS [go here](/docs/zigbee-to-mqtt-hassos/). Ideal for [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) or similar [supported adapters](https://www.zigbee2mqtt.io/information/supported_adapters.html).

**Option 2 (with zigbee2MQTT for for pre-installed image or Home Assistant Docker or Core)**
* For Zigbee adapter with other options of the Home Assistant installation [go here](/docs/zigbee-to-mqtt/). Ideal for [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) or similar [supported adapters](https://www.zigbee2mqtt.io/information/supported_adapters.html).

**Option 3 (with SLS Gateway)**
* For Robonomics SLS Gateway regardless of the Home Assistant installation options [go here](/docs/sls-gateway/). Open SLS gateway specs your can [find here](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01).