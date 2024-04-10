---
title: How to Connect SDS011 Sensor

contributors: [tubleronchik]
---

** Here is a step-by-step guide on how to connect your sensor to the Robonomics Sensors Network And Home Assistant. 
Our sensors utilize the Robonomics firmware, which is an enhanced version of the sensor.community firmware. It includes additional sensors and has a modified data sending mechanism. **

<robo-wiki-note type="warning">  

All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).

</robo-wiki-note>

## Setup

1. Plug in the sensor into the socket to power it.
2. The board will create a Wi-Fi network named `RobonomicsSensor-xxxxxxxxx`. Connect to it from your phone or computer: you will see the authorization window (if not, open the browser and go to `192.168.4.1`).
3. Select your Wi-Fi network from the list (or write it yourself if it's not on the list) and fill in the password field.
<robo-wiki-note type="okay" title="INFO">
The sensor can only be connected to a 2.4GHz Wi-Fi network. 
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Write the coordinates of the place, where the sensor will be installed. You can obtain them from any maps or obtain it from the address using [this link.](https://www.latlong.net/convert-address-to-lat-long.html)
<robo-wiki-note type="warning" title="WARNING">
The sensor coordinates will then be displayed on a publicly available map. If you do not want to show your private information, write close, but not exact coordinates.
</robo-wiki-note> 
5. Click on `Save configuration and restart`. The board will reboot and connect to the specified Wi-Fi network.
6. Open [Robonomics sensors map](https://sensors.robonomics.network/#/) and find your place where you installed the sensor. In a couple of minutes you will be able to see your sensor with data on map.
<robo-wiki-picture src="sds-sensor-map.png"/>

## Home Assistant 

There are two installation options available:

### Option 1: HACS

The easiest way to add a Local Luftdaten Sensor is through HACS. [Here](https://hacs.xyz/docs/setup/download/) you can find a brief explanation on how to set up HACS.

Once HACS is installed, navigate to HACS -> Integrations and search for the `Local Luftdaten Sensor` integration. Click on the download button and restart Home Assistant once the integration is downloaded.
<robo-wiki-picture src="sds-hacs.png"/>

### Option 2: Manual Installation

Under the `homeassistant` user, clone the project repository:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

If you already have any custom integrations, copy the `custom_components/local_luftdaten/` to your `custom_components` directory, For example:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```

</code-helper>

If you don't have any custom integrations, copy the whole `custom_components` directory to your Home Assistant configuration directory. For example:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```

</code-helper>

## Configuration

Create a new sensor entry in your `configuration.yaml` and adjust the host name or the IP address. To find the local IP address of your sensor, you can use [Fing mobile app](https://www.fing.com/products) or [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Name can be any.

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors

<code-helper copy>

  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Air quality sensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```
</code-helper>

> A list of all supported sensors can be found in the [repository](https://github.com/lichtteil/local_luftdaten).

Restart your Home Assistant.
After that, you can add a sensor to your dashboard. The name of the entity will be the name you added to `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>