---
title: Air Quality Sensor
contributors: [nakata5321]
---

Join with this air quality sensor to the decentralized opensource [sensors map](https://sensors.robonomics.network/#/) which operates with the sole intent of serving the free will of individuals. This sensor is ready to install, you will need wi-fi and a power socket, it can be installed both indoor and outdoor. Includes PM2.5/PM10 sensor and temperature/humidity sensor, can be expanded with several types of additional sensors (VOC, CO2, atmospheric pressure).

<robo-wiki-note type="warning">  

All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).

</robo-wiki-note>

## Key features

- Type-c for open-source firmware Tasmota upgrading
- Measures PM2.5/PM10
- Can be added as a part of global sensor map or your own [fork](https://github.com/airalab/sensors.robonomics.network)
- Compatible with Luftdaten

## Hardware specification

- SDS011 laser PM2.5/PM10 sensor
- NodeMCU V3 CH340 based on ESP8266
- DHT22 (AM2302) temperature/humidity sensor
- 12V/2А power adapter
- 5A DC-DC mini560 convertor
- mounting box

## Software specification

- For upgrading ESP firmware, an open source flasher is provided by Robonomics called airrohr-flasher (available on [Github](https://github.com/airalab/sensors-connectivity/releases))

## Other tutorials
- [How to install sensor](https://wiki.robonomics.network/docs/sds-sensor-connect/)
- [How to add sensor to Home Assistant](https://wiki.robonomics.network/docs/sds-sensor-hass/#installation)
