---
title: Servicio de Compensación

contributors: [tubleronchik]
---

Ejemplo del trabajo se encuentra en el video:

https://youtu.be/Ha9wN6bjh64

Servicio para compensar la huella de CO2 quemando tokens en la red de Statemine. El CO2 producido se calcula de la siguiente manera: los datos del dispositivo en Wh se multiplican por coeficientes que dependen de la región. 1 tonelada de CO2 se compensa con el consumo de 1 token. [Aquí](/docs/carbon-footprint-sensor) se encuentran las instrucciones para conectar el dispositivo.

## Escenario

1. Registrar un nuevo dispositivo en el Gemelo Digital en la red de Robonomics
2. Obtener los últimos datos de todos los dispositivos en un intervalo y multiplicarlos por el coeficiente dependiendo de la región
3. Sumar los datos y convertirlos en toneladas de CO2
4. Restar el número total de tokens quemados de los datos actuales
5. Quemar un número entero de tokens en la red de Statemine
6. Guardar el número total de tokens quemados en una base de datos local y en Datalog

## Instalación

Clonar el repositorio y editar el archivo de configuración.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Descripción de la configuración

¡No edites `config/config_template.yaml`!

```
robonomics:
  seed: <semilla para la cuenta en la Red de Robonomics donde se creará el Gemelo Digital>
statemine:
  seed: <semilla para la cuenta de administrador con tokens verdes en la Red de Statemine>
  endpoint: <punto final de Statemine>
  token_id: <id del token que se quemará>
  ss58_format: <formato de dirección en Polkadot (para la Red de Statemine es 2)>

service:
  interval: <con qué frecuencia se recopilarán los datos de los dispositivos>
```

Los coeficientes para la energía no renovable se han tomado de [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) y se almacenan en `utils/coefficients.py`.

## Lanzamiento

```
docker-compose up
```