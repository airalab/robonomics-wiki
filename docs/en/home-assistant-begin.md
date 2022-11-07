---
title: Robonomics Smart Home

contributors: [LoSk-p, dergudzon, Leemo94, vourhey]
translated: true
---

https://youtu.be/0Li2jhMTt0w

The modern market provides the average user with a large selection of smart home solutions, but they are all tied to cloud
providers. Brands such as Xiaomi and Aqara work through a proprietary gateway. As a result, you as a user are always dependent
on the hardware and infrastructure vendor to run the entire system.

**We see two main problems with this approach:**

1. Having a single point of failure in the form of vendor clouds
2. You have no control over what data you share

To solve the first problem, you can install and configure a local server running software such as 
[Home Assistant](https://www.home-assistant.io/) or [openHAB](https://www.openhab.org/). And to ensure the safe management
of your smart home from anywhere in the world, the technologies of the [Robonomics](https://robonomics.network/) platform come to the rescue.

<robo-wiki-note type="Note" title="Home Assistant x Robonomics">

  This project is aimed at both, users who already have an instance of Home Assistant and the ones who are making their
  first steps in the world of self-controlled smart homes.

</robo-wiki-note>

If you already have Home Assistant up and running, you probably have everything you need, but if not, the list of 
requirements is the following:

* Raspberry Pi 4 or a similar SBC
* SD card and SD adapter
* Zigbee smart devices (any from [supported devices](https://slsys.io/action/supported_devices.html))
* Zigbee adapter [JetHome USB JetStick Z2](https://jethome.ru/z2/) (or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html)) or [Robonomics SLS Gateway](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01)


