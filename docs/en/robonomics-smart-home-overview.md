---
title: Robonomics Smart Home Overview

contributors: [LoSk-p, dergudzon, Leemo94, vourhey, Fingerling42]
translated: true
---

The modern IoT market provides the user a large selection of smart home solutions, but they are all tied to centralized cloud providers or expensive proprietary gateways.
As a result, you as a user are always dependent on the hardware and infrastructure vendor to run the entire system.

**We see two main problems with current smart homes:**

1. You have no control over what data you share with the vendor or third party.
2. You have a single point of failure in the form of centralized vendor cloud servers.

<robo-wiki-picture src="home-assistant/ha-problems.png" />

To solve both problems, we suggest you to try Robonomics, our **secure**, **serverless** and **futuristic** decentralized cloud.

<robo-wiki-picture src="home-assistant/ha-robonomics.png" />

To prepare a smart home, you will need:

<robo-wiki-picture src="home-assistant/devices-req.png" />

* Home Assistant as control system software
* Raspberry Pi 4 (at least 2 GB RAM)
* SD card (minimum 16 GB) and SD adapter
* Zigbee smart devices (any from [supported devices](https://slsys.io/action/supported_devices.html))
* Zigbee adapter [JetHome USB JetStick Z2](https://jethome.ru/z2/) (or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html)) or [Robonomics SLS Gateway](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01).

[//]: # ()
[//]: # (<robo-wiki-note type="warning" title="Clean set up">)

[//]: # ()
[//]: # (  Pay attention that this method implies setting up a whole new OS on your Raspberry Pi. If you have one with some vital)

[//]: # (  information, please install Home Assistant **Docker** or **Core** following )

[//]: # (  [official guides]&#40;https://www.home-assistant.io/installation/raspberrypi&#41; and then augment them with Robonomics. There )

[//]: # (  are dedicated guides to add Robonomics Integration to your existing Home Assistant [Core]&#40;/docs/hass-install-core&#41; and)

[//]: # (  [Docker]&#40;/docs/hass-install-docker&#41;.)

[//]: # ()
[//]: # (</robo-wiki-note>)