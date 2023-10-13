---
title: Servicio de compensación

contributors: [tubleronchik]
---

Ejemplo de trabajo está en el video:

https://youtu.be/Ha9wN6bjh64

Servicio para compensar la huella de carbono CO2 quemando tokens en la red de Statemine. 
El CO2 producido se calcula de la siguiente manera: los datos del dispositivo en Wh se multiplican por coeficientes que dependen de la región. 1 tonelada de CO2 se cubre con el consumo de 1 token. [Aquí](/docs/carbon-footprint-sensor) están las instrucciones para conectar el dispositivo.

## Escenario

1. Register a new deivce in Digital Twin in Robonomics network 
2. Once in an interval getting last data from all device y multiply by the coefficient depending on the region
3. Sumar los datos y convertirlos a toneladas de CO2.
4. Restar el número total de tokens quemados de los datos actuales. 
5. Quemar un número entero de tokens en la red de Statemine. 
6. Guardar el número total de tokens quemados en la base de datos local y en Datalog. 


## Instalación

Clonar el repositorio y editar el archivo de configuración.

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Configuración description

No editar `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network waquí Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
Los coeficientes para la energía no renovable se han tomado de [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) y se almacenan en `utils/coefficients.py`. 

## Lanzamiento

```
docker-compose up
```