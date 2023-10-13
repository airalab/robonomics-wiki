---
title: Come aggiungere il sensore SDS011 a Home Assistant

contributors: [tubleronchik]
---

Questo articolo spiega come collegare il sensore di qualità dell'aria SDS con il firmware [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) e [Robonomics](https://github.com/airalab/sensors-software) a Home Assistant.

## Installazione 
Ci sono due opzioni di installazione disponibili:

### Opzione 1: HACS

Il modo più semplice per aggiungere un sensore Luftdaten locale è tramite HACS. [Qui](https://hacs.xyz/docs/setup/download/) puoi trovare una breve spiegazione su come configurare HACS.

Una volta installato HACS, vai su HACS -> Integrations e cerca l'integrazione `Local Luftdaten Sensor`. Fai clic sul pulsante di download e riavvia Home Assistant una volta scaricata l'integrazione.
<robo-wiki-picture src="sds-hacs.png"/>

### Opzione 2: Installazione manuale

Sotto l'utente homeassistant, clona il repository del progetto:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

Se hai già integrazioni personalizzate, copia la cartella `custom_components/local_luftdaten/` nella tua directory `custom_components`, ad esempio:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
Se non hai integrazioni personalizzate, copia l'intera directory `custom_components` nella directory di configurazione di Home Assistant, ad esempio:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## Configurazione

Crea una nuova voce del sensore nel tuo `configuration.yaml` e regola il nome host o l'indirizzo IP. Per trovare l'indirizzo IP locale del tuo sensore puoi utilizzare [l'app mobile Fing](https://www.fing.com/products) o lo strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Il nome può essere qualsiasi.

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

> L'elenco di tutti i sensori supportati può essere trovato nel [repository](https://github.com/lichtteil/local_luftdaten).

Riavvia Home Assistant.
Dopo di che puoi aggiungere il sensore al tuo cruscotto. Il nome dell'entità sarà il nome che hai aggiunto a `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>