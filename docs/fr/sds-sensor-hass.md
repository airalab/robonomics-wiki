---
title: Comment ajouter le capteur SDS011 à Home Assistant

contributors: [tubleronchik]
---

Cet article explique comment connecter le capteur de qualité de l'air SDS avec le micrologiciel [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) & [Robonomics](https://github.com/airalab/sensors-software) à Home Assistant.

## Installation 
Il existe deux options d'installation disponibles:

### Option 1: HACS

La manière la plus simple d'ajouter un capteur local Luftdaten est via HACS. [Ici](https://hacs.xyz/docs/setup/download/) vous pouvez trouver une brève explication sur la façon de configurer HACS.

Une fois HACS installé, accédez à HACS -> Intégrations et recherchez l'intégration `Local Luftdaten Sensor`. Cliquez sur le bouton de téléchargement et redémarrez Home Assistant une fois l'intégration téléchargée.
<robo-wiki-picture src="sds-hacs.png"/>

### Option 2: Installation manuelle

Sous l'utilisateur homeassistant, clonez le dépôt du projet:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

Si vous avez déjà des intégrations personnalisées, copiez le dossier `custom_components/local_luftdaten/` dans votre répertoire `custom_components`, par exemple:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
Si vous n'avez pas d'intégrations personnalisées, copiez tout le répertoire `custom_components` dans votre répertoire de configuration de Home Assistant, par exemple:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## Configuration

Créez une nouvelle entrée de capteur dans votre `configuration.yaml` et ajustez le nom d'hôte ou l'adresse IP. Pour trouver l'adresse IP locale de votre capteur, vous pouvez utiliser [l'application mobile Fing](https://www.fing.com/products) ou [l'outil de ligne de commande nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Le nom peut être n'importe lequel.

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

> La liste de tous les capteurs pris en charge peut être trouvée dans le [dépôt](https://github.com/lichtteil/local_luftdaten).

Redémarrez votre Home Assistant.
Après cela, vous pouvez ajouter le capteur à votre tableau de bord. Le nom de l'entité sera le nom que vous avez ajouté à `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>