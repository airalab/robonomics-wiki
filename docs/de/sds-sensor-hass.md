---
title: Wie man den SDS011-Sensor zu Home Assistant hinzufügt

contributors: [tubleronchik]
---

Dieser Artikel erklärt, wie man den SDS-Luftqualitätssensor mit der [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) & [Robonomics](https://github.com/airalab/sensors-software) Firmware mit Home Assistant verbindet.

## Installation 
Es gibt zwei Installationsmöglichkeiten:

### Option 1: HACS

Der einfachste Weg, einen lokalen Luftdaten-Sensor hinzuzufügen, ist über HACS. [Hier](https://hacs.xyz/docs/setup/download/) finden Sie eine kurze Erklärung, wie Sie HACS einrichten können.

Sobald HACS installiert ist, navigieren Sie zu HACS -> Integrationen und suchen Sie nach der Integration `Local Luftdaten Sensor`. Klicken Sie auf die Download-Schaltfläche und starten Sie Home Assistant neu, sobald die Integration heruntergeladen ist.
<robo-wiki-picture src="sds-hacs.png"/>

### Option 2: Manuelle Installation

Unter dem Benutzer homeassistant klonen Sie das Projekt-Repository:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

Wenn Sie bereits benutzerdefinierte Integrationen haben, kopieren Sie `custom_components/local_luftdaten/` in Ihr `custom_components`-Verzeichnis. Zum Beispiel:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
Wenn Sie keine benutzerdefinierten Integrationen haben, kopieren Sie das gesamte `custom_components`-Verzeichnis in Ihr Home Assistant-Konfigurationsverzeichnis. Zum Beispiel:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## Konfiguration

Erstellen Sie einen neuen Sensor-Eintrag in Ihrer `configuration.yaml` und passen Sie den Hostnamen oder die IP-Adresse an. Um die lokale IP-Adresse Ihres Sensors zu finden, können Sie die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden. Der Name kann beliebig sein.

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

> Eine Liste aller unterstützten Sensoren finden Sie im [Repository](https://github.com/lichtteil/local_luftdaten).

Starten Sie Home Assistant neu.
Danach können Sie den Sensor zu Ihrem Dashboard hinzufügen. Der Name der Entität entspricht dem Namen, den Sie in `configuration.yaml` hinzugefügt haben.
<robo-wiki-picture src="sds-configuration-card.png"/>