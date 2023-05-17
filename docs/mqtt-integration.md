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
