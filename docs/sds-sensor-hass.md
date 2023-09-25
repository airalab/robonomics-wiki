---
title: Connect SDS011 Sensor to Home Assistant

contributors: [tubleronchik]
---

This arcticle explains, how to connect SDS Air Quality sensor with [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) & [Robonomics](https://github.com/airalab/sensors-software) Firmware to Home Assistant.

## Installation 
There are two installation options available:

### Option 1: HACS

The easiest way to add a Local Luftdaten Sensor is through HACS. [Here](https://hacs.xyz/docs/setup/download/) you can find a brief explanation on how to set up HACS.

Once HACS is installed, navigate to HACS -> Integrations and search for the `Local Luftdaten Sensor` integration. Click on the download button and restart Home Assistant once the integration is downloaded.
<robo-wiki-picture src="sds-hacs.png"/>

### Option 2: Manual Installation

Under the homeassistant user, clone the project repository:
```
git clone https://github.com/lichtteil/local_luftdaten.git
```
If you already have any custom integrations, copy the `custom_components/local_luftdaten/` to your `custom_components` directory, For example:
```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```
If you don't have any custom integrations, copy the whole `custom_components` directory to your Home Assistant configuration directory. For example:

```
cd local_luftdaten
mv custom_components/ ~/.homeassistant/
```

## Configuration

Create a new sensor entry in your `configuration.yaml` and adjust the host name or the ip address. To find the local ip address of you sensor you can use [Fing mobile app](https://www.fing.com/products) or [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Name can be any.

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors


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

> List of all supported sensors can be found in the [repository](https://github.com/lichtteil/local_luftdaten).

Restart you Home Assistant.
After that you can add sensor to your dashboard. Name of the entity will be the name you added to `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>