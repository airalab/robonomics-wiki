---
title: Robonomics Smart Home 
locale: 'pt' 
contributors: [LoSk-p, dergudzon, Leemo94]
translated: true
---
There are instructions on how to connect your smart home devices to the Robonomics network. You need Robonomics [accounts](/docs/create-account-in-dapp/) for each device, they will publish encrypted data in datalog. Also you need user account that will send commands to devices end encrypt/decrypt data.

In this video you can see the example of connecting temperature sensor:

https://youtu.be/iB2Z8HtERgs

# Requirements

* Raspberry Pi 4 or 3
* SD card and SD adapter
* Temperature sensor - [Keen Home RS-THP-MP-1.0](https://www.zigbee2mqtt.io/devices/RS-THP-MP-1.0.html) (or another [supported device](https://www.zigbee2mqtt.io/information/supported_devices.html))

### Method 1 (with SLS Gateway)
* [Robonomics SLS Gateway](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01)

### Method 2 (with zigbee2MQTT)
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html))

### Method 3 (with Xiaomi Gateway)
* Xiaomi Gateway (one of [supported](https://www.home-assistant.io/integrations/xiaomi_miio#xiaomi-gateway))
* [Mi Home app](https://play.google.com/store/apps/details?id=com.xiaomi.smarthome&hl=ru&gl=US) or HomeKit app

Also you can connect some devices directly through Mi Home app (for example, Vacuum Cleaner).

# Setup

1. First you need to [setup Raspberry Pi](/docs/raspberry-setup/) (also you can [use prepared image](/docs/raspberry-image/)).
2. Then you need to connect devices to Home Assistant:
- [Connection with zigbee2MQTT](/docs/zigbee2-mqtt/)
- [Setup SLS Gateway](/docs/sls-setup) and [connect it to Home Assistant](/docs/sls-gateway-connect)
- [Connection through Xiaomi Gateway](/docs/xiaomi-gateway/)
- [Connect Vacuum Cleaner](/docs/vacuum-connect/)
3. And [connect them to Robonomics Network](/docs/add-smart-device-to-robonomics/).
