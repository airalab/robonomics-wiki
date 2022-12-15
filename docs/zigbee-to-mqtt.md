---
title: Zigbee Adapter with Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.28.2
---

**In this article you will set up your Zigbee adapter.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

**If you have the [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (which has all of the necessary firmware), you can simply proceed with these instructions. However, if you have another adapter, the first thing you need to do is to flash it with Zigbee2MQTT software. You can find instructions for your device [here](https://www.zigbee2mqtt.io/information/supported_adapters.html).**


## Software Install

<robo-wiki-note type="warning">

  If you use pre-installed image from Robonomics, this software already installed to your Raspberry Pi. Go to ["Configuration and Run"](/docs/zigbee-to-mqtt#config-and-run) section.

</robo-wiki-note>

Set up Node.js runtime environment repository and install it with required dependencies:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs git make g++ gcc
```

</code-helper>

Verify that the correct versions of Node.js (v14.X, V16.x, V17.x or V18.X) and package manager npm (6.X, 7.X or 8.X) automatically installed with Node.js, have been installed:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
node --version
npm --version
```

</code-helper>

Create a directory for Zigbee2MQTT and set your user as owner of it:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
```

</code-helper>

Clone Zigbee2MQTT repository:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone --depth 1 --branch 1.28.2 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
```

</code-helper>

Install dependencies (as user pi). Note that the npm ci could produce some warning which can be ignored.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd /opt/zigbee2mqtt
npm ci
```

</code-helper>

<robo-wiki-title :type="2" anchor="config-and-run">
Configuration and Run
</robo-wiki-title>

Connect the Zigbee adapter to Raspberry Pi.

<robo-wiki-picture src="home-assistant/connect-stick.gif" />

Then you need to find the location of the adapter. For this run the next command:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```bash
ls -l /dev/serial/by-id
```

</code-helper>

Output should look like:

<code-helper additionalLine="rasppi_username@rasppi_hostname">


```shell
$ ls -l /dev/serial/by-id
total 0
lrwxrwxrwx 1 root root 13 Oct 10 01:44 usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_0001-if00-port0 -> ../../ttyUSB0

```

</code-helper>

In this example device connection directory is `ttyUSB0`.

Before starting Zigbee2MQTT you need to edit the `configuration.yaml` file. This file contains the configuration which will be used by Zigbee2MQTT:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```bash
nano /opt/zigbee2mqtt/data/configuration.yaml
```

</code-helper>

The basic configuration needs a few adjustments. Change the following statements:
 - `homeassistant:` to `true`. It will automatically connect sensors to Home Assistant.
 - uncomment `user` and `password`statements under `mqtt` and enter your username and password (as a string, with quotes) from MQTT Broker.
 - change port in `serial`-> `port` to `/dev/DEVICE_CONNECTION_DIRECTORY>`. In this example — `/dev/ttyUSB0`.

Adjusted configuration file should look like:

<code-helper copy>

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

</code-helper>

<robo-wiki-note type="warning">

  If you already have an active Zigbee adapter or gateway in your home, and you are now configuring another adapter, then they will conflict with each other. To solve this problem you need to change the channel on the new device. For this add the following strings to the end of configuration file:

</robo-wiki-note>

<code-helper copy>

```shell
advanced:
  # Optional: ZigBee channel, changing requires re-pairing of all devices. (Note: use a ZLL channel: 11, 15, 20, or 25 to avoid Problems)
  # (default: 11)
  channel: 15
```

</code-helper>

Now you can start Zigbee2MQTT:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```bash
cd /opt/zigbee2mqtt
npm start
```

</code-helper>

If started successfully, you will see something like:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

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

</code-helper>

## Pairing Device

It's time to connect your smart device. The most common way to switch a device to connect mode is to hold its power button or switch them on/off 5 times. Make sure Zigbee2MQTT is running.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

When the device connects, you should see a message like:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```
Zigbee2MQTT:info  2022-07-29 14:44:39: Successfully interviewed '0x00158d0003eeeacf', device has successfully been paired
```
</code-helper>

Remember the ID of the sensor: in this example `0x00158d0003eeeacf`.

Now you should see this sensor with ID in your Home Assistant WebUI. Go to `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

After adding all the sensors, you can stop the program with `Ctrl+C`.

<robo-wiki-note type="note"> 

  If you don’t want to add any more devices, you can open the configuration file again and set `permit_join:` to `false`.
  
</robo-wiki-note>

To make the Zigbee2MQTT run after reboot, make a service. Create the file:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo nano /etc/systemd/system/zigbee2mqtt.service
```

</code-helper>

Add the following to this file:

<code-helper copy>

```shell
[Unit]
Description=zigbee2mqtt
After=network.target

[Service]
ExecStart=/usr/bin/npm start
WorkingDirectory=/opt/zigbee2mqtt
StandardOutput=inherit
StandardError=inherit
Restart=always
User=<YOUR_USER_HERE>

[Install]
WantedBy=multi-user.target
```

</code-helper>

<robo-wiki-note type="note">

If you don't know your username, use `whoami` command.

</robo-wiki-note>

Save file and verify that the configuration works:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo systemctl start zigbee2mqtt
systemctl status zigbee2mqtt.service
```

</code-helper>

Output should look like:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

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

</code-helper>

Enable the service to start Zigbee2MQTT automatically on boot:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo systemctl enable zigbee2mqtt.service
```

</code-helper>

Now you can go to the [**IoT Subscription**](/docs/sub-activate) section and start activating the Robonomics subscription.