---
title: Energy Monitoring
contributors: [nakata5321]
---

This page describes the operating instructions for the Energy Monitoring device powered by Robonomics. Here you will find the hardware specification of the device and its basic configuration.

The device has a number of unique features such as:

1. Monitor energy consumption, whether that's an individual estate or an entire building.
2. The included software provides vital insight that can help to control and save energy in the future.
3. Monitoring works on the local network and does not require access to the cloud.
4. Support of Home Assistant via the MQTT protocol.

<robo-wiki-note type="warning">  

All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).

</robo-wiki-note>

## Installation Example

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type:'mp4'}]" />

## Hardware specification

- Input Voltage: AC 100-240V 50/60Hz
- Measuring Range: 0.1-80A
- Wireless Protocol: IEEE 802.11b/g/n (2.4 GHz Wi-Fi)
- CPU: ESP32-S3 MCU-based system on a chip (SoC) dual-core microprocessor (Xtensa 32-bit LX7), up to 240 MHz
- Memory: 448 KB ROM, 520 KB SRAM, 8 MB FLASH
- USB-C for development and updates

## How to setup

<robo-wiki-title :type="3" anchor="step1">
Step 1 — Flashing
</robo-wiki-title>

<robo-wiki-note type="warning">  

All devices from Robonomics come pre-flashed out of the box. However, since all devices are development kits, the instructions will cover the option of flashing the device from scratch. If you do not wish to do this now, proceed to [**Step 2 - Access Point**](/docs/ir-controller/#step2).

</robo-wiki-note>

Take the device from the box and connect it to the computer. Then go the website [webflasher.robonomics.network](https://webflasher.robonomics.network/). You will see next:

<robo-wiki-picture src="ir-controller/web-interface.jpg" />

<robo-wiki-note type="warning"> Note! Web flasher is working only with Google Chrome or Microsoft Edge browser.</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type:'mp4'}]" />

In "Firmware" drop-box choose **"ENERGY MONITOR"** option and next in "SELECT CHIP" choose **"ESP32-S3"**. Press **"CONNECT"** button.
A popup window will appear where you should select the serial port to which the device is connected (usually it's ttyUSBO). Then choose **"INSTALL ENERGY-MONITOR_EN"**. 
On next window you can make **CLEAR INSTALLATION** by check **ERASE DEVICE**. Press Next and then Install. Wait until firmware to upload to Energy Monitoring device.

After finishing the installation process Wi-Fi configuration popup will appear. Provide Wi-Fi credentials.

After setting up Wi-Fi you can visit device via **VISIT DEVICE** button. Later you can visit device via it's IP address in the network. To find it you can use [Fing mobile app](https://www.fing.com/products) or 
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Skip **Step 2 — Access Point** and go to [**Step 3 — Configuration**](/docs/ir-controller/#step3).

<robo-wiki-title :type="3" anchor="step2">
Step 2 — Access Point
</robo-wiki-title>

If you take Energy monitor from the box and connect it to the power supply, it will create hotspot with name "robonomics-XXXXXXX". Connect to it. Configuration window should open. If not, open web-browser and go to `192.168.4.1` page.

<robo-wiki-picture src="ir-controller/phone-wifi.jpg" />

Provide Wi-Fi credentials. After that the Energy Monitoring device will connect to Wi-Fi network. Check the device via it's IP address in the network. To find it you can use [Fing mobile app](https://www.fing.com/products) or 
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

<robo-wiki-title :type="3" anchor="step3">
Step 3 — Configuration
</robo-wiki-title>

The device's page will look similar to this:

<robo-wiki-picture src="energymeter/energymeter.jpg" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type:'mp4'}]" />

Go to **"Configuration"**->**"Configure other"**. In **"Template"** string insert next:

<code-helper copy>

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```
</code-helper>

Verify that checkbox **"Activate"** and **"MQTT Enable"** is enabled. If not, enable it and press Save button.

Return to "main menu" and go to **"Configuration"** -> **"Configure MQTT"**.
Provide your MQTT credentials here:

<robo-wiki-picture src="ir-controller/mqtt.jpg" />

That's all with ESP for now. Next step is install the Home Assistant integration.

<robo-wiki-title :type="3" anchor="step4">
Step 4 — Integration setup
</robo-wiki-title>

This article assumes, that you have Home Assistant. To connect Energy Monitoring device to Home Assistant, you need to install "Tasmota" integration.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type:'mp4'}]" />

Basically, Home Assistant will discover "Tasmota" integration automatically. But if not, add it manually.

<robo-wiki-picture src="energymeter/HA.jpg" />

That's all. Now you can add energy entities to the dashboard.

<robo-wiki-note type="warning">  

All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).

</robo-wiki-note>