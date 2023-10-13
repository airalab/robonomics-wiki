---
title: Servizio di compensazione 

contributors: [tubleronchik]
---

L'esempio di lavoro è nel video:

https://youtu.be/Ha9wN6bjh64

Servizio per compensare l'impronta di CO2 bruciando token nella rete di Statemine. 
La CO2 prodotta viene calcolata come segue: i dati provenienti dal dispositivo in Wh vengono moltiplicati per coefficienti che dipendono dalla regione. 1 tonnellata di CO2 è coperta dal consumo di 1 token. [Qui](/docs/carbon-footprint-sensor) sono le istruzioni per collegare il dispositivo.

## Scenario

1. Registra un nuovo dispositivo in Digital Twin nella rete Robonomics
2. Una volta ogni intervallo, ottenere gli ultimi dati da tutti i dispositivi e moltiplicarli per il coefficiente che dipende dalla regione
3. Sommare i dati e convertirli in tonnellate di CO2
4. Sottrarre il numero totale di token bruciati dai dati attuali 
5. Bruciare un numero intero di token nella rete di Statemine 
6. Salvare il numero totale di token bruciati nel database locale e nel Datalog 


## Installaazione

Clonare il repository e modificare il file di configurazione.

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Configurazione description

Non modificare `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network wqui Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
I coefficienti per l'energia non rinnovabile sono stati presi da [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) e memorizzati in `utils/coefficients.py`. 

## Lancio

```
docker-compose up
```