---
title: Zigbee Adapter with Zigbee2MQTT for Pre-installed Image

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**In this article you will pair smart devices.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Open a web browser and go to `http://%RASPBERRY_IP_ADDRESS%:8099`. You can find the IP address of Raspberry Pi 
using [Fing mobile app](https://www.fing.com/products) or [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

You will see web-interface of Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




It's time to connect your smart device. 
First, press `Permit join (All)` button at the top of web-interface of Zigbee2MQTT. 

Then, start to pair devices. The most common way to switch a device to connect mode is to hold its power button or switch them on/off 5 times. Make sure Zigbee2MQTT is running.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

When the device connects, you will see them in web-interface:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Now you should see this sensor in your Home Assistant WebUI. Go to `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

After adding all the sensors, you can close web-interface of Zigbee2MQTT.
