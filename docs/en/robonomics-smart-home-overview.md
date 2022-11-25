---
title: Robonomics Smart Home Overview

contributors: [LoSk-p, dergudzon, Leemo94, vourhey, Fingerling42]
translated: true
---

For your smart home the modern IoT market provides a wide range of solutions. But you are usually tied to centralized cloud providers or expensive proprietary gateways. As a result, you as a user are always dependent on the hardware and infrastructure vendor to run the your smart system. At the same time, your smart home cannot be truly smart without cloud statistics and analytics.

**We see two main problems with current smart homes:**

1. You have no control over what data you share with the vendor or third party.
2. Your smart home is vulnerable to shutdowns of centralized cloud servers. 

<robo-wiki-picture src="home-assistant/ha-problems.png" />

To solve both problems, we suggest you to try Robonomics, our **secure**, **serverless** and **futuristic** decentralized cloud.

<robo-wiki-picture src="home-assistant/ha-robonomics.png" />

To prepare your smart home, you will need:

<robo-wiki-picture src="home-assistant/devices-req.png" />

* [Home Assistant](https://www.home-assistant.io/) as control system software
* Raspberry Pi 4 (at least 2 GB RAM)
* SD card (minimum 16 GB) and SD adapter
* Zigbee smart devices (any from [supported devices](https://slsys.io/action/supported_devices.html))
* Zigbee adapter [JetHome USB JetStick Z2](https://jethome.ru/z2/) (or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html)) or [Robonomics SLS Gateway](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01).

You have several options for installing Home Assistant with Robonomics:

* [Pre-installed image](https://wiki.robonomics.network/docs/en/hass-install-image/) — This method implies setting up a whole new OS on your Raspberry Pi.
* [Home Assistant Docker for Unix-like OS](https://wiki.robonomics.network/docs/en/hass-install-docker/) — The method is suitable for integrating Robonomics with an existing Home Assistant Docker on your Raspberry Pi with existing OS.
* [Home Assistant Core](https://wiki.robonomics.network/docs/en/hass-install-core/) — The method is suitable for integrating Robonomics with an existing Home Assistant Core on your Raspberry Pi with existing OS.