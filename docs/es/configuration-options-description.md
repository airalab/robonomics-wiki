---
title: Configuration Options Description 

contributors: [LoSk-p, Vourhey, tubleronchik]
translated: false
---

Basically, you can think of the Sensors Connectivity module as a black box with one input (sensor data) and many outputs.
For now only SDS011 sensor is supported, but if you are familiar with Python it'd be easy to add other sensors as well.

At the moment it's possible to publish data to [Luftdaten](https://luftdaten.info/) and [Robonomics Network Datalog](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). 
Robonomics team has prepared a few ready-to-use configurations.
You can find the full overview of the configuration fields [here.](https://github.com/airalab/sensors-connectivity/tree/master/connectivity/config)

This Article contains advanced configurations scenarios. If you didn't read previous article ["Sensors Connectivity Module Setup"](/docs/sensors-connectivity-setup/) first read it.
## Scenario #1: Connect SDS011 to serial port

The easiest and the most straightforward way to connect your sensor to the network by the serial port.

First, connect you board to a USB port, and find path to board with next command:

```bash
$ ls -l /dev/serial/by-id
total 0
lrwxrwxrwx 1 root root 13 сен  5 14:01 usb-1a86_USB2.0-Ser_-if00-port0 -> ../../ttyUSB0
```

In the example it is `ttyUSB0`.
Now you need to create a new configuration file, or edit the existing configuration file from the previous [article](/docs/sensors-connectivity-setup/#json-configuration).
Insert what you see below to the configuration file. Write the full path to your database in the file.

<robo-wiki-note type="okay">
Don't forget to insert your board path to port statement and latitude and longitude of a sensor to geo statement.
</robo-wiki-note>

```json
{
   "general": {
      "publish_interval": 30,
      "db_path": ""
   },
   "comstation":{
      "enable":true,
      "port":"/dev/<YOUR-PATH-TO-BOARD>",
      "work_period":300,
      "geo":"00.000000,00.000000",
      "public_key":""
   },
   "httpstation": {
      "enable": false,
      "port": 8001
   },
   "mqttstation": {
      "enable": false,
      "host": "localhost",
      "port": 1883
   },
   "luftdaten": {
      "enable": false
   },
   "robonomics": {
      "enable": true,
      "ipfs_provider": "/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic": "airalab.lighthouse.5.robonomics.eth"
   },
   "datalog": {
      "enable": false,
      "suri": "",
      "dump_interval": 60,
      "temporal_username": "",
      "temporal_password": "",
      "pinata_api": "",
      "pinata_secret": ""
   },
   "dev": {
      "sentry": ""
   },
   "frontier": {
      "enable": false,
      "suri": ""
   },
   "trackagro": {
      "enable": false,
      "token": ""
   }
}
```

And start Sensors Connectivity module.

## Scenario #2: Connect SDS011 via MQTT

**Attention**, Robonomics sensors firmware doesn't work with MQTT. These settings for additional sensors, which work through MQTT. 
Example of those sensors you can find [here.](/docs/freertos-mqtt/)

Let's assume you already have MQTT broker [mosquitto](https://mosquitto.org/download/) or similar.

Again as in the previous scenario you need to create a new configuration file, or edit the existing configuration file from the previous [article](/docs/sensors-connectivity-setup/#json-configuration).
Insert what you see below to the configuration file. Write the full path to your database in the file.

<robo-wiki-note type="okay">
Don't forget to insert MQTT broker port  in host field and MQTT broker port to port field.
</robo-wiki-note>

Sensors Connectivity Module will listen `/freertos_mqtt_robonomics_example/` topic.
```json
{
   "general": {
      "publish_interval": 30,
      "db_path": ""
   },
   "comstation":{
      "enable":false,
      "port":"/dev/ttyUSB0",
      "work_period":300,
      "geo":"",
      "public_key":""
   },
   "httpstation": {
      "enable": false,
      "port": 8001
   },
   "mqttstation": {
      "enable": true,
      "host": "<MQTT-broker-host>",
      "port": <MQTT-broker-port>
   },
   "luftdaten": {
      "enable": false
   },
   "robonomics": {
      "enable": true,
      "ipfs_provider": "/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic": "airalab.lighthouse.5.robonomics.eth"
   },
   "datalog": {
      "enable": false,
      "suri": "",
      "dump_interval": 60,
      "temporal_username": "",
      "temporal_password": "",
      "pinata_api": "",
      "pinata_secret": ""
   },
   "dev": {
      "sentry": ""
   },
   "frontier": {
      "enable": false,
      "suri": ""
   },
   "trackagro": {
      "enable": false,
      "token": ""
   }
}
```

And start Sensors Connectivity module.

## Scenario #3: Publish sensors data to Datalog

In this scenario it doesn’t matter which sensors connection type to choose. Example will show you instructions is written for default one - over `http`.

This scenario shows how to upload your sensor's data to Robonomics Parachain Datalog. 
Robonomics Datalog is analog of "Telemetry" in Web3 technologies. 
Datalog function is meant to create a sensor's data snapshot each period of time, which increase reliability of data.

Just like in the previous scenario you need to create a new configuration file, or edit the existing configuration file from the previous [article](/docs/sensors-connectivity-setup/#json-configuration). 
Insert what you see below to the configuration file. Write the full path to your database in the file.

Here we work with `datalog` field. It includes next lines:

- `suri` - a private key from robonomics parachain account; 
- `dump_interval` - specify a period of time for collecting log in seconds;
- `temporal_username`, `temporal_password` - Credentials to upload files to [Temporal.Cloud](https://temporal.cloud/) (Optional);
- `pinata_api`, `pinata_secret` - Credentials to upload files to [pinata service](https://docs.pinata.cloud#connecting-to-the-api)(Optional).

<robo-wiki-note type="warning">
You have to have XRT on your account!
</robo-wiki-note>

Insert what required to file:

```json
{
   "general": {
      "publish_interval": 30,
      "db_path": ""
   },
   "comstation":{
      "enable":false,
      "port":"/dev/ttyUSB0",
      "work_period":300,
      "geo":"59.944954,30.294534",
      "public_key":""
   },
   "httpstation": {
      "enable": true,
      "port": 8001
   },
   "mqttstation": {
      "enable": false,
      "host": "localhost",
      "port": 1883
   },
   "luftdaten": {
      "enable": false
   },
   "robonomics": {
      "enable": true,
      "ipfs_provider": "/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic": "airalab.lighthouse.5.robonomics.eth"
   },
   "datalog": {
      "enable": true,
      "suri": "<YOUR-SECRET-KEY>", 
      "dump_interval": 60,
      "temporal_username": "",
      "temporal_password": "",
      "pinata_api": "",
      "pinata_secret": ""
   },
   "dev": {
      "sentry": ""
   },
   "frontier": {
      "enable": true,
      "suri": ""
   },
   "trackagro": {
      "enable": false,
      "token": ""
   }
}
```

And start Sensors Connectivity module.