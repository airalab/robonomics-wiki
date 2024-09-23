---
title: Servizio di Compensazione

contributors: [tubleronchik]
---

Esempio di lavoro nel video:

https://youtu.be/Ha9wN6bjh64

Servizio per compensare l'impronta di CO2 bruciando token nella rete Statemine. La CO2 prodotta si calcola come segue: i dati provenienti dal dispositivo in Wh vengono moltiplicati per coefficienti che dipendono dalla regione. 1 tonnellata di CO2 è coperta dal consumo di 1 token. [Qui](/docs/carbon-footprint-sensor) ci sono le istruzioni per collegare il dispositivo.

## Scenario

1. Registrare un nuovo dispositivo nel Digital Twin nella rete Robonomics
2. A intervalli regolari, ottenere gli ultimi dati da tutti i dispositivi e moltiplicarli per il coefficiente relativo alla regione
3. Sommare i dati e convertirli in tonnellate di CO2
4. Sottrarre il numero totale di token bruciati dai dati attuali
5. Bruciare un numero intero di token nella rete Statemine
6. Salvare il numero totale di token bruciati nel database locale e in Datalog

## Installazione

Clonare il repository e modificare il file di configurazione.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Descrizione della configurazione

Non modificare `config/config_template.yaml`!

```
robonomics:
  seed: <seed per l'account nella Rete Robonomics dove verrà creato il Digital Twin>
statemine:
  seed: <seed per l'account amministrativo con token verdi nella Rete Statemine>
  endpoint: <endpoint di Statemine>
  token_id: <ID del token che verrà bruciato>
  ss58_format: <formato dell'indirizzo in Polkadot (per la Rete Statemine è 2)>

service:
  interval: <con quale frequenza verranno raccolti i dati dai dispositivi>
```

I coefficienti per l'energia non rinnovabile sono stati presi da [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) e sono memorizzati in `utils/coefficients.py`.

## Avvio

```
docker-compose up
```