---
title: Configuration Options Description 

contributors: [LoSk-p, Vourhey, tubleronchik]
translated: true
---

Basically, you can think of the Sensors Connectivity module as a black box with one input (sensor data) and many outputs.
For now only SDS011 sensor is supported, but if you are familiar with Python it'd be easy to add other sensors as well.

At the moment it's possible to publish data to [Luftdaten](https://luftdaten.info/), [Robonomics Network](https://robonomics.network/) and 
[Datalog](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). The last one is experimental! Robonomics team prepare some ready configuration files to use.

Full overview of configuration fields you can find [here](https://github.com/airalab/sensors-connectivity/tree/master/connectivity/config)

## Scenario #1: Connect SDS011 to serial port

The easiest and the most straightforward way to connect your sensor to the network is using the serial port

Connect you SDS011 sensor to a USB port, let's assume it got `/dev/ttyUSB0` address

```json
{
   "general": {
      "publish_interval": 30,
      "db_path": ""
   },
   "comstation":{
      "enable":true,
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
      "enable": true,
      "suri": ""
   },
   "trackagro": {
      "enable": false,
      "token": ""
   }
}
```

## Scenario #2: Connect SDS011 via HTTP

### Connectivity Configuration

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
      "enable": true,
      "suri": ""
   },
   "trackagro": {
      "enable": false,
      "token": ""
   }
}
```

> Do not forget to open the port in system firewall
>
> On NixOS you can do:
> ```
> networking.firewall.allowedTCPPorts = [ 31313 ];
> ```

## Scenario #3: Connect SDS011 via MQTT

### Connectivity Configuration

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
      "enable": true,
      "port": 8001
   },
   "mqttstation": {
      "enable": true,
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
      "enable": true,
      "suri": ""
   },
   "trackagro": {
      "enable": false,
      "token": ""
   }
}
```

## Scenario #4: Connect Multiple Sensors and Publish to Datalog

### Configuration

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
      "enable": true
   },
   "robonomics": {
      "enable": true,
      "ipfs_provider": "/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic": "airalab.lighthouse.5.robonomics.eth"
   },
   "datalog": {
      "enable": true,
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
      "enable": true,
      "suri": ""
   },
   "trackagro": {
      "enable": false,
      "token": ""
   }
}
```


