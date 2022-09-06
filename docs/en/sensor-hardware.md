---
title: Sensor Hardware

contributors: [nakata, Ludovich88]
translated: true
---

If you wish to participate in the  air monitoring with Robonomics Open Sensors Network you need to obtain an air pollution board with sensors. 
There are two ways to do it: 
- order all necessary parts and build your own  custom board. 
- order a ready-to-use board from Robonomics team.

## Manual board assembly

To build your own board, you need to buy next components:

 - Laser PM2.5 and PM10 Sensor [SDS011](https://cdn-reichelt.de/documents/datenblatt/X200/SDS011-DATASHEET.pdf)
 - ESP8266 [NodeMcu V3 CH340](https://aliexpress.ru/item/1005004230942266.html?item_id=1005004230942266&sku_id=12000028462056911&spm=a2g20.search.search_results.1.4724673bFJ7jEV)
 - 5A DC-DC mini560 [Convertor](https://aliexpress.ru/item/1005001837049300.html?spm=a2g2w.productlist.search_results.1.2fc47adbsM2Uam&sku_id=12000017801968733)
 - DC [Connector](https://aliexpress.ru/item/1005003324016159.html?businessType=ProductDetail&item_id=1005003324016159&sku_id=12000025352507410&spreadType=socialShare&srcSns=sns_Copy&tt=MG)
 - 12V/2А Power [Adapter](https://aliexpress.ru/item/32859196804.html?item_id=32859196804&sku_id=12000022808964683&spm=a2g2w.productlist.search_results.1.5add15feI8sGTf)
 - Mounting Box.

You can install additional sensors:
- I2C interface:
  - [BMP180](https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf) - temperature and humidity
  - [BME/P280](https://www.mouser.com/datasheet/2/783/BST-BME280-DS002-1509607.pdf) - temperature, humidity, atmospheric pressure
  - [HTU21D](https://eu.mouser.com/ProductDetail/Measurement-Specialties/HTU21D?qs=tx5doIiTu8oixw1WN5Uy8A%3D%3D) - temperature and humidity
  - [CCS811 VOC SENSOR](https://www.sciosense.com/wp-content/uploads/documents/Application-Note-Baseline-Save-and-Restore-on-CCS811.pdf) - volatile Organic Compounds, CO2 equivalent
- 1-Wire interface:
  - [DHT22(AM2302)](https://files.seeedstudio.com/wiki/Grove-Temperature_and_Humidity_Sensor_Pro/res/AM2302-EN.pdf) - temperature and humidity
  - [DS18B20](https://cdn.sparkfun.com/datasheets/Sensors/Temp/DS18B20.pdf) - temperature.

Assembly process you can find in the next video. Also, in this video is showing setup process, but we will talk about it in the next article.

https://www.youtube.com/watch?v=OdTd1sacCso

After assembling the sensor, all that remains is to flash and configure it. Go to [the next article](/docs/sensor-setup/) for it.

## Robonomics Board

Alternatively, you can request Robonomics Board. To do so, write to one of e-mail addresses: 
- [vm@multi-agent.io](mailto:vm@multi-agent.io)
- [ping@airalab.org](mailto:ping@airalab.org)

Also, you can check this [group.](https://vk.com/aira.monitoring)

Robonomics board for air quality sensor, based on ESP8266. The device is designed for 6 - 24 volt power supply, using DC-DC converter DC MINI560.

![plata](../images/sensors-connectivity/plata.png)

This board allows you to connect PM sensor:

- [SDS011](https://cdn-reichelt.de/documents/datenblatt/X200/SDS011-DATASHEET.pdf)

and additional sensors:

- Possibility of connection via I2C interface:
  - [BMP180](https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf) - temperature and humidity
  - [BME/P280](https://www.mouser.com/datasheet/2/783/BST-BME280-DS002-1509607.pdf) - temperature, humidity, atmospheric pressure
  - [HTU21D](https://eu.mouser.com/ProductDetail/Measurement-Specialties/HTU21D?qs=tx5doIiTu8oixw1WN5Uy8A%3D%3D) - temperature and humidity
  - [CCS811 VOC SENSOR](https://www.sciosense.com/wp-content/uploads/documents/Application-Note-Baseline-Save-and-Restore-on-CCS811.pdf) - volatile Organic Compounds, CO2 equivalent
- Possibility of connection via 1 Wire interface:
  - [DHT22(AM2302)](https://files.seeedstudio.com/wiki/Grove-Temperature_and_Humidity_Sensor_Pro/res/AM2302-EN.pdf) - temperature and humidity
  - [DS18B20](https://cdn.sparkfun.com/datasheets/Sensors/Temp/DS18B20.pdf) - temperature.

There is also a smaller MINI model with a trimmed down list of connectable devices. The source circuits for both models can be found at [full model](https://oshwlab.com/ludovich88/aira_sensor_rev0-1) and [MINI model](https://oshwlab.com/ludovich88/aira_sensor_d1_mini).

### Assembly

Let's take a closer look at the board: the board has several connectors for connection - they are highlighted 
in blue and green. Consider the blue block of terminal blocks.
![plata1](../images/sensors-connectivity/plata1.png)

From left to right (all terminals are signed):
- Terminal for connecting the power supply of the board. The recommended voltage is 12 volts.
- Ground (point of zero potential). Serves both for connection of zero potential of the power supply, and for connection of sensors.
- Supply of sensors. Configurable power output to which sensors are connected. The output can be set to 3.3 or 5 volts.
- SDA terminal. Serial data line, is used to connect sensors via the I2C interface.
- SCL/1-Wire terminal. Configurable terminal to which the serial clock line  is connected. Used to connect sensors via I2C or 1-Wire interface.

Setting the power output for the sensor and selecting the interface is done by setting the jumpers, marked yellow in the image.
The jumpers are installed horizontally, the places for installing the jumpers are signed.

***BE CAREFUL!!!*** You can choose the voltage for the power supply by setting only one jumper to 3.3 volts or 5 volts. Setting two jumpers to 3.3 and 5 volts will damage the device. The same rule works when choosing an interface for sensors, install only one jumper in place of I2C or 1-Wire. Installing two jumpers may damage the device.

There is also an additional block of Inputs In the image it is marked in green.

> There is a power switch on the left side of the blue box to force the board to reboot. It is in the ON position by default.


After receiving the sensor, all that remains is to flash and configure it. Go to [the next article](/docs/sensor-setup/) for it.
