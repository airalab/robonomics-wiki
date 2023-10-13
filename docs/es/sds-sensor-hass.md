---
title: Cómo agregar el sensor SDS011 a Home Assistant

contributors: [tubleronchik]
---

Este artículo explica cómo conectar el sensor de calidad del aire SDS con el firmware [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) y [Robonomics](https://github.com/airalab/sensors-software) a Home Assistant.

## Instalación 
Hay dos opciones de instalación disponibles:

### Opción 1: HACS

La forma más fácil de agregar un sensor local de Luftdaten es a través de HACS. [Aquí](https://hacs.xyz/docs/setup/download/) puedes encontrar una breve explicación sobre cómo configurar HACS.

Una vez instalado HACS, ve a HACS -> Integraciones y busca la integración `Local Luftdaten Sensor`. Haz clic en el botón de descarga y reinicia Home Assistant una vez que se haya descargado la integración.
<robo-wiki-picture src="sds-hacs.png"/>

### Option 2: Manual Instalación

Bajo el usuario homeassistant, clona el repositorio del proyecto:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

Si ya tienes integraciones personalizadas, copia `custom_components/local_luftdaten/` en tu directorio `custom_components`, por ejemplo:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
Si no tienes integraciones personalizadas, copia todo el directorio `custom_components` en el directorio de configuración de Home Assistant, por ejemplo:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## Configuración

Crea una nueva entrada de sensor en tu `configuration.yaml` y ajusta el nombre del host o la dirección IP. Para encontrar la dirección IP local de tu sensor, puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). El nombre puede ser cualquier cosa.

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

> Puedes encontrar una lista de todos los sensores compatibles en el [repositorio](https://github.com/lichtteil/local_luftdaten).

Reinicia Home Assistant.
Después de eso, puedes agregar el sensor a tu panel de control. El nombre de la entidad será el nombre que agregaste en `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>