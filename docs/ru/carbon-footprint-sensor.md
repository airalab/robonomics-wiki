---
title: Connect sensor
locale: 'ru' 
contributors: [LoSk-p, makyul]
translated: false
---

Example of work is in the video:

https://youtu.be/jsaFCVAx2sA

## Requirements

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (or one of [supported](https://www.zigbee2mqtt.io/information/supported_adapters.html))

Service is running on Raspberry Pi and contact the smart plug via zigbee protocol.

## Zigbee stick

If you have JetHome USB JetStick Z2 it already has necessary firmware so you don't need to flash it. But if you have another adapter firstly you need to flash it with zigbee2MQTT software. You can find instructions for you device [here](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Connect the adapter and verify the adapter address (it also may be `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

You might need to get access to the USB port first. Add your user to `dialout` group (it works for ubuntu, but the name of the group may be different on other OS).
For ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
For arch:
```bash
sudo usermod -a -G uucp $USER
```
Then logout and login or restart the computer.

## Installation

Clone the repository:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Configuration

Go to `data/configuration.yaml` and set `permit_join: true`:

```
# Home Assistant integration (MQTT discovery)
homeassistant: false

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://172.17.0.1'
  # MQTT server authentication, uncomment if required:
  # user: my_user
  # password: my_password

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/ttyUSB0
```
Also you might want to fill fields `server` and `port` with corresponding information. In `server` field use the IP of the `docker0` bridge to establish the connection: 

```bash
$ ip a                                                 127
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

...

5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:dff:feff:5fa3/64 scope link 
       valid_lft forever preferred_lft forever
```
Here your address is `172.17.0.1`.

Then create file config/config.yaml with following information and set your location (you can look up to https://countrycode.org/ for 3-letters ISO-code):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Connect Plug

First run:

```
docker-compose up     
```

To switch to the pairing mode on plug long press the power button for a few seconds until the light starts flashing blue rapidly. 

In logs you should see now your plug started publishing to mqtt. 


## After pairing

If you don't wont to let other devices to pair with your stick, now you should go to `data/configuration.yaml` and set `permit_join: false`. Restart service (use 'Ctrl+C' and 

```bash
docker-compose up     
```
once again to submit changes).

## Running
At first start the account for the plug will be created. 
> If you already have an account you should add its seed to `config.config.yaml` file in `device_seed` section:
>
> ```
> location: RUS
> service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
> twin_id: 5
> sending_timeout: 3600
> broker_address: "172.17.0.1"
> broker_port: 1883
> device_seed: <device_seed>
>```

After creating account you will see the address in logs (seed will be added to `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
You need to transfer some tokens to this account for transaction fees, you can do it on [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

Service will see that you have enough tokens, in logs you will see:
```
plug               | Balance is OK
```
Service will see mqtt messages from the plug and safe power usage. Every hour (you can change timeout in `config/config.yaml` in `sending_timeout` section, timeout is on seconds) it will create datalog with the following information:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
