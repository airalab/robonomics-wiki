---
title: Configuration Options Description
locale: 'ja' 
contributors: [LoSk-p, Vourhey, tubleronchik]
translated: false
---

Basically, you can think of the package as a black box with one input (sensor data) and many outputs.
For now only SDS011 sensor is supported, but if you are familiar with Python it'd be easy to add other sensors as well.

Have a look at [configuration](https://github.com/airalab/sensors-connectivity/blob/master/config/default.json) file:

```json
{
   "general": {
      "publish_interval": 30,
      "db_path": ""
   },
   "comstation": {
      "enable": false,
      "port": "/dev/ttyUSB0",
      "work_period": 300,
      "geo": "",
      "public_key": ""
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
At the moment it's possible to publish data to [Luftdaten](https://luftdaten.info/), [Robonomics Network](https://robonomics.network/) and [Datalog](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer).
The last one is experimental!

> DO NOT edit `config/default.json` file. Instead make a copy

Play around with the configuration!

Explanation of options:

| Field                         | Description                                                                                                                                                                                                                                           |
|------------------------------    |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    |
| `general/publish_interval`         | integer number from 1 and above. Tells how often send measurements. Keep in mind that if measurements from sensors come less often than this number connectivity sends last data      |
| `general/db_path`                  |   path to the database (.db) file    |
| `comstation/enable`                | true/false. Enabling/disabling the station      |
| `comstation/port`                  | valid path to com port, for example `/dev/ttyUSB0`. It is where a sensor is connected to      |
| `comstation/work_period`           | integer from 0 to 1800. For SDS011 sensor 0 means continuous work. Recommended period is 300 seconds     |
| `comstation/geo`                   | `lat,lon` a string with two floats separated by a comma. It represents latitude and longitude of a sensor     |
| `comstation/public_key`            | Ed25519 verifying key in hex format. If not provided connectivity generates a new one      |
| `httpstation/enable`                | true/false. Enabling/disabling the station   |
| `httpstation/port`                  | what port listen to      |
| `mqttstation/enable`                | true/false. Enabling/disabling the station   |
|`mqttstation/host`                   | the hostname or IP address of the remote broker |
|`mqttstation/port`                   | the network port of the server host to connect to |
| `luftdaten/enable`                 | true/false. Whether or not publish data to [Luftdaten](https://devices.sensor.community/). Don't forget to register the sensor's mac address on the site         |
| `robonomics/enable`                | true/false. Whether or not publish data to IPFS topic according to Robonomics communication protocol      |
| `robonomics/ipfs_proveder`         | an endpoint for IPFS daemon. By default it's `/ip4/127.0.0.1/tcp/5001/http` that means local daemon. The endpoint must by in multiaddr format. For example for [Infura.io](https://infura.io/) it would be `/dns/ipfs.infura.io/tcp/5001/https`       |
| `robonomics/ipfs_topic`            | IPFS topic's name. If you want to use [DApp](https://sensors.robonomics.network) provided by Robonomics team leave it untouched                 |
| `datalog/enable`                   | true/false. Enable/Disable saving log to [Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer)    |
| `datalog/suri`                     | a private key from robonomics parachain account  |
| `datalog/dump_interval`            | specify a period of time for collecting log in seconds                                      |
| `datalog/temporal_username`        | set username to upload files to [Temporal.Cloud](https://temporal.cloud/) (Optional)                  |
| `detalog/temporal_password`        | set password to upload files to [Temporal.Cloud](https://temporal.cloud/) (Optional)                  |
| `datalog/pinata_api`                | your personal [pinata](https://docs.pinata.cloud#connecting-to-the-api) api key                      |
| `datalog/pinata_secret`            | your personal [pinata](https://docs.pinata.cloud#connecting-to-the-api) secret api key                |
| `dev/sentry`                       | for development purpose. If you have a [Sentry.io](https://sentry.io/) account you can put sentry's credentials in here   |
| `frontier/enable`                  | true/false. Whether or not publish telemetry to [Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer)   |
| `frontier/suri`                    | a private key from robonomics parachain account                                                       |
| `trackagro/enable`                 | true/false. Enabling/disabling the station from [TrackAgro](https://tmeteo.docs.apiary.io/#)          |
| `trackagro/token`                  | authorization token for [TrackAgro](https://tmeteo.docs.apiary.io/#)                                  |

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


