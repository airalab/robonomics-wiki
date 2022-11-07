---
title: Zigbee2MQTT Setup

contributors: [LoSk-p, dergudzon, Leemo94, PaTara43]
translated: true
tools:
  - Zigbee2MQTT 1.28.0
---

**After installing [MQTT broker](/docs/mqtt-broker/) to the Raspberry Pi, you can now set up your Zigbee2MQTT stick.
If you have the JetHome USB JetStick Z2 it has the necessary firmware. However, if you have another 
adapter the first thing you need to do is to flash it with Zigbee2MQTT software. You can find instructions for your 
device [here](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

## Software Install

Install necessary software for Zigbee2MQTT sticks:

```bash
# Set up Node.js repository and install Node.js + required dependencies
# NOTE: Older i386 hardware can work with [unofficial-builds.nodejs.org](https://unofficial-builds.nodejs.org/download/release/v16.15.0/ e.g. Version 16.15.0 should work.
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc

# Verify that the correct nodejs and npm (automatically installed with nodejs)
# version has been installed
node --version  # Should output v14.X, V16.x, V17.x or V18.X
npm --version  # Should output 6.X, 7.X or 8.X

# Create a directory for zigbee2mqtt and set your user as owner of it
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt

# Clone Zigbee2MQTT repository
git clone --depth 1 --branch 1.28.0 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt

# Install dependencies (as user "pi")
cd /opt/zigbee2mqtt
npm ci
```

Note that the `npm ci` could produce some `warning` which can be ignored.

## Configuration and Run

First, connect the adapter to Raspberry PI. Now you need to find the location of your stick. For this type in the next command.:

```bash
$ ls -l /dev/serial/by-id
```

Output should look like:

```shell
ubuntu@ubuntu:~$ ls -l /dev/serial/by-id
total 0
lrwxrwxrwx 1 root root 13 Oct 10 01:44 usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_0001-if00-port0 -> ../../ttyUSB0

```

In this case the device is `ttyUSB0`.

Then you need to configure it. Before starting Zigbee2MQTT you need to edit the `configuration.yaml` file. 
This file contains the configuration which will be used by Zigbee2MQTT.:

```bash
nano /opt/zigbee2mqtt/data/configuration.yaml
```

Basic configuration needs a few adjustments. Change the following statements:
 - `homeassistant:` to `true`. It will automatically connect sensors to Home Assistant.
 - uncomment `user` and `password`statements under `mqtt` and fill them with your username and password from MQTT Broker. (You created them in the previous [article.](/docs/mqtt-broker/))
 - change port in `serial`-> `port` to `/dev/stick_connection_place>`. In example `/dev/ttyUSB0`.

Adjusted configuration file should look like:

```shell
# Home Assistant integration (MQTT discovery)
homeassistant: true

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://localhost'
  # MQTT server authentication, uncomment if required:
  user: <YOUR_USERNAME>
  password: <YOUR_PASSWORD>

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/<YOUR_PORT> # /dev/ttyUSB0 for example
```

<robo-wiki-note type="warning">

  If you already have an active Zigbee2MQTT stick or a similar device in your home, 
  and you are now configuring another stick, then they will conflict with each other. 

</robo-wiki-note>

To solve this problem you need change channel on the new device. For this add the following strings to the end of configuration file:

```shell
advanced:
  # Optional: ZigBee channel, changing requires re-pairing of all devices. (Note: use a ZLL channel: 11, 15, 20, or 25 to avoid Problems)
  # (default: 11)
  channel: 15
```

Now you can run zigbee2mqtt:

```bash
cd /opt/zigbee2mqtt
npm start
```

If started successfully, you will see something like:
```shell
Building Zigbee2MQTT... (initial build), finished
Zigbee2MQTT:info  2022-07-29 14:36:36: Logging to console and directory: '/opt/zigbee2mqtt/data/log/2022-07-29.14-36-36' filename: log.txt
Zigbee2MQTT:info  2022-07-29 14:36:36: Starting Zigbee2MQTT version 1.26.0 (commit #bc4ffc0)
Zigbee2MQTT:info  2022-07-29 14:36:36: Starting zigbee-herdsman (0.14.40)
Zigbee2MQTT:info  2022-07-29 14:36:49: zigbee-herdsman started (resumed)
Zigbee2MQTT:info  2022-07-29 14:36:49: Coordinator firmware version: '{"meta":{"maintrel":1,"majorrel":2,"minorrel":7,"product":1,"revision":20211219,"transportrev":2},"type":"zStack3x0"}'
Zigbee2MQTT:info  2022-07-29 14:36:49: Currently 0 devices are joined:
Zigbee2MQTT:warn  2022-07-29 14:36:49: `permit_join` set to  `true` in configuration.yaml.
Zigbee2MQTT:warn  2022-07-29 14:36:49: Allowing new devices to join.
Zigbee2MQTT:warn  2022-07-29 14:36:49: Set `permit_join` to `false` once you joined all devices.
Zigbee2MQTT:info  2022-07-29 14:36:49: Zigbee: allowing new devices to join.
Zigbee2MQTT:info  2022-07-29 14:36:49: Connecting to MQTT server at mqtt://localhost
Zigbee2MQTT:info  2022-07-29 14:36:49: Connected to MQTT server
Zigbee2MQTT:info  2022-07-29 14:36:49: MQTT publish: topic 'zigbee2mqtt/bridge/state', payload 'online'
Zigbee2MQTT:info  2022-07-29 14:36:49: MQTT publish: topic 'zigbee2mqtt/bridge/config', payload '{"commit":"bc4ffc0","coordinator":{"meta":{"maintrel":1,"majorrel":2,"minorrel":7,"product":1,"revision":20211219,"transportrev":2},"type":"zStack3x0"},"log_level":"info","network":{"channel":11,"extendedPanID":"0x00124b0020cd133d","panID":6754},"permit_join":true,"version":"1.26.0"}'
Zigbee2MQTT:info  2022-07-29 14:36:49: MQTT publish: topic 'zigbee2mqtt/bridge/state', payload 'online
```

## Pairing Device

The most common way to switch a device to connect mode is to hold its power button. For lamps one may switch them on|off
for 5 times. The zigbee2MQTT should be launched. When a device connects, you should see a message like:

```
Zigbee2MQTT:info  2022-07-29 14:44:39: Successfully interviewed '0x00158d0003eeeacf', device has successfully been paired
```
And a lot of additional data about this sensor. Remember ID of the sensor - in this example `0x00158d0003eeeacf`.

Now you should see this sensor with ID in your Home Assistant WebUI. Go to `settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

After adding all the sensors, you stop program with `ctrl+C`.

> After adding all the sensors, you can open configuration file again to set and set `permit_join: false`, if you don’t want to add any more devices.

If needed, make a service. Create the file:

```bash
sudo nano /etc/systemd/system/zigbee2mqtt.service
```

Add the following to it:

```
[Unit]
Description=zigbee2mqtt
After=network.target

[Service]
ExecStart=/usr/bin/npm start
WorkingDirectory=/opt/zigbee2mqtt
StandardOutput=inherit
StandardError=inherit
Restart=always
User=ubuntu

[Install]
WantedBy=multi-user.target
```

Verify that the configuration works:

```bash
sudo systemctl start zigbee2mqtt
```

```bash
systemctl status zigbee2mqtt.service
```

Output should look like:
```
pi@raspberry:/opt/zigbee2mqtt $ systemctl status zigbee2mqtt.service
● zigbee2mqtt.service - zigbee2mqtt
   Loaded: loaded (/etc/systemd/system/zigbee2mqtt.service; disabled; vendor preset: enabled)
   Active: active (running) since Thu 2018-06-07 20:27:22 BST; 3s ago
 Main PID: 665 (npm)
   CGroup: /system.slice/zigbee2mqtt.service
           ├─665 npm
           ├─678 sh -c node index.js
           └─679 node index.js

Jun 07 20:27:22 raspberry systemd[1]: Started zigbee2mqtt.
Jun 07 20:27:23 raspberry npm[665]: > zigbee2mqtt@1.6.0 start /opt/zigbee2mqtt
Jun 07 20:27:23 raspberry npm[665]: > node index.js
Jun 07 20:27:24 raspberry npm[665]: Zigbee2MQTT:info  2019-11-09T13:04:01: Logging to directory: '/opt/zigbee2mqtt/data/log/2019-11-09.14-04-01'
Jun 07 20:27:25 raspberry npm[665]: Zigbee2MQTT:info  2019-11-09T13:04:01: Starting Zigbee2MQTT version 1.6.0 (commit #720e393)
```

Now that everything works, yao can use `systemctl` to start Zigbee2MQTT automatically on boot, this can be done by executing:

```bash
sudo systemctl enable zigbee2mqtt.service
```
That's all. Proceed to ["IOT subscription setup"](/docs/iot-sub-setup/) to create Robonomics Parachain accounts and 
activate subscription to use Robonomics integration.