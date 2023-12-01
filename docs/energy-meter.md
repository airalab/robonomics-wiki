---
title: Energy Monitoring
contributors: [nakata5321]
---

Congratulations on acquiring the innovative energy monitoring! We are pleased that you have chosen our device to 
enhance the comfort in your home. This device boasts a range of unique features, such as:

Features:
1. Monitor energy consumption, whether that's an individual estate or an entire building
2. The included software provides vital insight that can help to control and save energy in the future
3. Monitoring works on the local network and does not require access to the cloud
4. Support of Home Assistant via the MQTT protocol

## Hardware specification

- Input Voltage: AC 100-240V 50/60Hz
- Measuring Range: 0.1-80A
- Wireless Protocol: IEEE 802.11b/g/n (2.4 GHz Wi-Fi)
- CPU: ESP32-S3 MCU-based system on a chip (SoC) dual-core microprocessor (Xtensa 32-bit LX7), up to 240 MHz
- Memory: 448 KB ROM, 520 KB SRAM, 8 MB FLASH
- USB-C for development and updates

## How to setup

1) Take the device from the box and connect it to the computer. Then go the website [webflasher.robonomics.network](https://webflasher.robonomics.network/). You will see next:

<robo-wiki-picture src="ir-controller/web-interface.jpg" />

<robo-wiki-note type="warning"> Note! web flasher is working only with Google Chrome or Microsoft Edge browser.</robo-wiki-note>

In "Firmware" drop-box choose "ENERGY MONITOR" option and next in "SELECT CHIP" choose "ESP32-S3". Press "CONNECT" button.
A popup window will appear where you should select the serial port to which the device is connected. Then choose "INSTALL ENERGY-MONITOR_EN". 
On next window you can make "clear installation" by check "erase device". Next and install. Wait until firmware will be uploaded to the Energy Monitor.

## Configuration

After finishing the installation process Wi-Fi configuration popup will appear. Provide your wi-fi credentials, for connect the device to your wi-fi network. 

After setting up wi-fi you can visit device via "visit device" button. Later you can visit device via it's IP address in network. To find it you can use [Fing mobile app](https://www.fing.com/products) or 
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

<robo-wiki-picture src="energymeter/energymeter.jpg" />

Go to "Configuration"->"Configure other". In "Template" string insert next:

<code-helper copy>

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```
</code-helper>


Verify that checkbox "Activate" and "MQTT Enable" is enabled. If not, enable it and press Save button.

Return to "main menu" and go to "Configuration" -> "Configure MQTT".
Provide your MQTT credentials here:

<robo-wiki-picture src="ir-controller/mqtt.jpg" />

That's all with ESP for now. Next step is install Home Assistant integration.

## Integration setup

This article assumes that you have Home Assistant. To connect Energy Monitoring to Home Assistant, you need to install "Tasmota" integration.

Basically, Home Assistant will discover "Tasmota" integration automatically. But if not, add it manually.

<robo-wiki-picture src="energymeter/HA.jpg" />

That's all. Now you can add energy entities to dashboard.  