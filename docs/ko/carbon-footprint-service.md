---
title: Offsetting Service 
locale: 'ko' 
contributors: [tubleronchik]
translated: false
---

Example of work is in the video:

https://youtu.be/Ha9wN6bjh64

Service to offset CO2 footprint by burning tokens in Statemine network. 
Produced CO2 calculates as follows: data from device in Wh multiply by  coeffcients depends on the region. 1 ton of C02 is covered by consuption of 1 token. [Here](/docs/carbon-footprint-sensor) is the unstructions for connecting device.

## Scenario

1. Register a new deivce in Digital Twin in Robonomics network 
2. Once in an interval getting last data from all device and multiply by the coefficient depending on the region
3. Sum data and convert them to CO2 tons
4. Subtract the total number of burning tokens from current data 
5. Burn integer number of tokens in Statemine network 
6. Saved total number of burning tokens in local DB and Datalog 


## Installing

Clone the repository and edit config file.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Configuration description

Do not edit `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network where Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
Coefficients for non-renewable energy have been taken from [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) and stored in `utils/coefficients.py`. 

## Launch

```
docker-compose up
```