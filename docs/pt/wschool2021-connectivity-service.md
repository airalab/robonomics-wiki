---
title: Lesson 5, Connectivity 
locale: 'pt' 
contributors: [vourhey]
translated: true
---

This lesson will show you how to build a large scale network of sensors using the `sensors-connectivity` module from Robonomics. The idea is that usually the devices are very low-powered and unable to send transactions to the blockchain on their own. It is not safe to use one central server due to failures and hacks, so we suggest using the module to create servers that maintain several hundred devices and exchange data through decentralized channels. This allows to achieve a balance between security and scalability of the network.

During the lesson, you will learn how to set up and connect a small sensor using this module.

## IoT as a Multiple Pie

* Device Software
    * FreeRTOS
    * ESP/Arduino
    * Single-board computers (RPi, LattePanda etc)
* Connectivity
    * IoT Hub
    * IoT Manager
* Analytics Services
    * AWS
    * Google Cloud IoT Core
    * ThingsBoard

As a rule, most are not interested in sensors and servers, but data analytics.
To get it, you need to decide which device to use, how to work with it and where to connect

## Device Software

Consider the example of a home weather station. It is necessary to collect data on air pollution (SDS011), temperature and humidity (BME). The ESP8266 microcontroller can handle this task.

Requirements:

* Correctly read data from sensors
* Have a unique identifier
* Transfer data to a known server
* Provide digital signature of data (optional)

You can find the current firmware [here](https://github.com/LoSk-p/sensors-software/tree/366b19bf447a5fc19220ef89eab0f2440f8db1c2)

## What is Connectivity? 

In the IoT world, connectivity refers to the connection of various IoT devices to the Internet to send data and / or control the device.

Well-known architectural solutions can be roughly divided into 3 groups:

* Fully decentralized. For example, devices are connected by a mesh network. Not suitable for wide area networks due to high hardware requirements
* Centralized. For example, AWS. Provides a single entry point and ease of connection, but there is a high risk of failure in case of server problems
* Hybrid. For example, [Robonomics Connectivity](https://github.com/airalab/sensors-connectivity). Provides an address for devices on a "local" network and publishes data to a distributed IPFS message channel

## Comparison of AWS and Robonomics Connectivity

| Management services 	| AWS                               	|               Robonomics              	|
|---------------------	|-----------------------------------	|---------------------------------------	|
| Transaction type    	| Technical                         	| Technical and economic                	|
| Security            	| IT-company cloud control          	| Polkadot and Ethereum                 	|
| Protocol            	| HTTPS, MQTT                       	| IPFS, Robonomics                      	|
| Ecosystem           	| Private                           	| Shared                                	|
| Access to DeFi      	| No                                	| Yes                                   	|
| Costs               	| Pushing data - $1-2 a sensor      	| Pushing data - $0                     	|
|                     	| Shadow         - from $10 a month 	| Digital Twin    - $0,01 a transaction 	|

## Installing Connectivity on Aira

https://www.youtube.com/watch?v=JbBNMHAzJKM

### Requirements

* [VirtualBox 6.1](https://www.virtualbox.org/wiki/Downloads) and above
* [Aira OS ova image](https://static.aira.life/ova/airaos-21.03_robonomics-winter-school.ova)

Import Aira image in VirtualBox as described [here](/docs/aira-installation-on-vb/)

Set up a connection over [SSH](/docs/aira-connecting-via-ssh/)

When everything is set and you successfully log in via SSH, let's clone the main package and build it 

```
git clone https://github.com/airalab/sensors-connectivity
cd sensors-connectivity
git checkout v0.9
nix build -f release.nix
```

Now let's create a copy of the default configuration file for later usage. 
To learn about all the options check [this article](/docs/configuration-options-description/) out.
Then launch the package with `roslaunch`

```
cp config/default.json config/my.json
source result/setup.zsh
roslaunch sensors_connectivity agent.launch config:=$PWD/config/my.json
```

## Connect Sensor to Connectivity

https://www.youtube.com/watch?v=yxqxBk-6bpI

### Requirements

* [Nova SDS011](https://aqicn.org/sensor/sds011) sensor 
* [Yarn Packet Manager](https://yarnpkg.com/getting-started/install)

Now let's connect a real sensor, forward USB port to the virtual machine, set up a map and look at our own measurements

First, stop the Aira OS if it was running and add a corresponding USB device

![VB USB Forwarding](../images/vb_forward_usb.jpg)

Start the VM, connect via SSH and set `comstation/port` option according to your USB device in the VM. Also enable `comstation` and set your latitude and longitude. In the end `config/my.json` should look like this:

```
{
   "general":{
      "publish_interval":30
   },
   "comstation":{
      "enable":true,
      "port":"/dev/ttyUSB0",
      "work_period":0,
      "geo":"59.944917,30.294558",
      "public_key":""
   },
   "httpstation":{
      "enable":false,
      "port":8001
   },
   "mqttstation": {
      "enable": false,
      "host": "connectivity.robonomics.network",
      "port": 1883
   },
   "luftdaten":{
      "enable":false
   },
   "robonomics":{
      "enable":true,
      "ipfs_provider":"/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic":"airalab.lighthouse.5.robonomics.eth"
   },
   "datalog":{
      "enable":false,
      "path":"",
      "suri":"",
      "remote":"wss://substrate.ipci.io",
      "dump_interval":3600,
      "temporal_username":"",
      "temporal_password":""
   },
   "dev":{
      "sentry":""
   }
}
```

> If you don't have a real sensor, you can use `sensors-connectivity/utils/virtual-sensor.py` script to emulate one
> 
> Enable `HTTPStation` and disable `COMStation` by changing the configuration file as:
> ```
> {
>    "general":{
>       "publish_interval":30
>    },
>    "comstation":{
>       "enable":false,
>       "port":"/dev/ttyUSB0",
>       "work_period":0,
>       "geo":"59.944917,30.294558",
>       "public_key":""
>    },
>    "httpstation":{
>       "enable":true,
>       "port":8001
>    },
>    ...
> }
> ```
>
> and launching `utils/virtual-sensor.py` in a dedicated terminal in the VM

Save the file and launch connectivity from `sensors-connectivity` folder:

```
source result/setup.zsh
roslaunch sensors_connectivity agent.launch config:=$PWD/config/my.json
```

You should see first measurements in the console output

Look for your IPFS ID in the VM. It appears right after booting the image or via `ipfs id` command. We will need it later.

Now let's set up our own instance of the map. On your laptop (not in the VM) clone [this](https://github.com/airalab/sensors.robonomics.network) repository and build the app:

```
git clone https://github.com/airalab/sensors.robonomics.network
cd sensors.robonomics.network
yarn install
```

Edit `src/agents.json` file and put your IPFS ID. For example:

```
[
  "12D3KooWSCFAD3Lpew1HijniE6oFTuo4jsMwHzF87wNnXkpCRYWn"
]
```

Launch the map:

```
yarn serve
```

Go to [http://localhost:8080/](http://localhost:8080/) or the address yarn gave you and look for the sensor.

## Practice

### Trajectory 1. Flash a sensor ESP + SDS011

Requirements:

* ESP8266
* At least one of sensors SDS011, BME280, HTU21D

Use the [instruction](https://wiki.robonomics.network/docs/connect-sensor-to-robonomics/) to connect a sensor to Robonomics Connectivity. 

Check that your sensor appears on our [map](https://sensors.robonomics.network/#/).

### Trajectory 2. Launch Connectivity

Requirements:

* ROS
* Python
* Nix (optional)

Build and launch [sensors-connectivity](https://github.com/airalab/sensors-connectivity#get-a-package-and-build)

> How it build, install [here](https://wiki.robonomics.network/docs/iot-sensors-connectivity/) and configure [here](https://wiki.robonomics.network/docs/configuration-options-description/)

General scheme of the package:

```
    station1 \                        / feeder1
    station2 -  sensors-connectivity  - feeder2
    station3 /                        \ feeder3
```

The choice is proposed to implement either a new station, for example, a random number generator, or a new feeder, for example, displaying a string on the screen.

Interface `IStation` [here](https://github.com/airalab/sensors-connectivity/blob/master/src/stations/istation.py#L73).

Interface `IFeeder` [here](https://github.com/airalab/sensors-connectivity/blob/master/src/feeders/ifeeder.py#L5)

