---
title: Robonomics Smart Home

contributors: [LoSk-p, dergudzon, Leemo94]
translated: false
---
If you don't want your data to be stored in some Xiaomi or another server that you can't access, you can use you own local server with Home Assistant and Robonomics to control your smart devices outdoors. There are instructions on how to connect your smart home devices to the Robonomics network. 

You need Robonomics [account](/docs/create-account-in-dapp/) with a subscription (lets call it `SUB_OWNER`) and another account in devices of this subscription (it will be `SUB_ADMIN`). Both accounts should be ED25519 crypto type. 

Devices in the subscription are connected with Home Assistant users, so `SUB_OWNER` can add the device to the subscription and the user with the device account name will be added to Home Assistant. They can send `Launch` transactions with commands on `SUB_ADMIN` account to control smart devices connected to Home Assistant.

Also `SUB_ADMIN` will send to Robonomics encrypted telemetry with states of all sensors or smart devices in Home Assistant, so with `SUB_ADMIN` secret key you will be able to read telemetry from Datalog. 

## Requirements

* Raspberry Pi 4
* SD card and SD adapter
* Zigbee smart devices (any from [supported devices](https://slsys.io/action/supported_devices.html))

### Method 1 (with zigbee2MQTT)
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html))

### Method 2 (with SLS Gateway)
* [Robonomics SLS Gateway](https://easyeda.com/ludovich88/robonomics_sls_gateway_v01)

## Start

Let's start. First you need to [setup Raspberry Pi](/docs/raspberry-setup/).
