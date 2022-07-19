---
title: Connect an Amazon FreeRTOS Device to Robonomics by MQTT
locale: 'ko' 
contributors: [khssnv]
translated: false
---

Here's the demonstration of how a microcontroller running [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) may be connected to Robonomics Network via MQTT. Please check [this repository](http://github.com/khssnv/freertos_mqtt_robonomics_example) for the project source code.

We use [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) with FreeRTOS distribution and MQTT implementation provided by [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) while Espressif is a vendor of the microcontroller used.

Also there is a [PMS-3003](http://www.plantower.com/en/content/?107.html) sensor for demonstration purposes. Sensor measures presence of particulated matter in the air and one may use it to estimate air quality.

Air quality is not a topic of the article, you may find more about it at WHO's website: [Ambient (outdoor) air pollution](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). A goal of the system is to publish sensor measurements to Airalab's Robonomics network.

## Hardware setup

We connect PMS3003 TXD PIN5 to ESP32 DevKitC IO17 to transfer measurements by UART.
Also both devices require power and common ground.

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## Data Flow

In order to deliver sensor measurements to Robonomics network, on a firmware level our goal is to get data from a sensor by embedded communication protocol it supports (UART in our case) and pass it to AIRA instance by MQTT / TCP.

![Sending](../images/freertos-mqtt/send.svg)

In our example we use AIRA cloud deployment available by public IP address and domain name assigned.
On AIRA instance we setup `mosquitto` MQTT broker and subscribe to `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` topic to get messages from MQTT.

Then we pass messages to `robonomics io` writer by pipe.

![Receiving](../images/freertos-mqtt/recv.svg)

Now data available in Robonomics Network and we can be read it with `robonomics io` again.

## Firmware

We use [ESP-MQTT sample application with TCP transport](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) as a basis.

We only modify `main/app_main.c` for UART connection to the sensor, SNTP time synchronization and periodic MQTT publisher routine.

If you are trying to repeat the project, and it's your first ESP IDF based project, at first please follow [Espressif's ESP-IDF Programming guide](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) introduction in order to familiarize with firmware operations like configuration, build and upload with `idf.py` tool.

### Wi-Fi Configuration

In order to communicate with AIRA instance deployed in cloud, our microcontroller requires Internet connection.
We use ESP32's Wi-Fi for it.
Espressif provides utilities to configure on-board Wi-Fi.
In our example we use development environment with Ubuntu 20.04 GNU/Linux.
To configure Wi-Fi we go to project folder and run SDK configuration tool.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Then we set Wi-Fi access point SSID and password in `Example Connection Configuration` section.

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### MQTT Endpoint Configuration

There are two things to configure for MQTT.
The first is a MQTT broker address.
It is configurable with SDK configuration tool.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Set `Broker URL` in `Example Configuration` section.

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

The second thing is a MQTT topic.
We set it in the firmware with the project name prefix followed with our ESP32 MAC address.
It gives us `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` for our particular microchip.

## From MQTT to Robonomics

At first let's check we receive data by MQTT.
We can subscribe to our Mosquitto MQTT broker topic device publish to.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Here we bring `mosquitto` package into our environment to use `mosquitto_sub` utility.
Then we subscribe to the topic set in the firmware.
We got our measurements that means AIRA receives data by MQTT correctly.
Now let's pipe these messages to Robonomics Network.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Here we use `robonomics` utility to publish messages in pubsub channel `/freertos_mqtt_robonomics_example`.
We specify `bootnodes` to ensure at least one connection established.

Now we are read these messages from the same pubsub channel.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Original Resources Used

* ESP32 DevKitC pinout from GoJimmy's blog https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* PSM3003 data structure and decoder from OpenAirProject https://github.com/openairproject/sensor-esp32

**Thank you all!**
