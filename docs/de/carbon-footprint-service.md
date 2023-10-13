---
title: Offsetting-Dienst 

contributors: [tubleronchik]
---

Beispiel für die Arbeit ist im Video:

https://youtu.be/Ha9wN6bjh64

Dienst zur Kompensation des CO2-Fußabdrucks durch Verbrennen von Token im Statemine-Netzwerk. 
Der produzierte CO2-Wert wird wie folgt berechnet: Daten vom Gerät in Wh multipliziert mit Koeffizienten, die von der Region abhängen. 1 Tonne CO2 wird durch den Verbrauch von 1 Token abgedeckt. [Hier](/docs/carbon-footprint-sensor) sind die Anweisungen zum Anschließen des Geräts.

## Szenario

1. Registrieren Sie ein neues Gerät im Digital Twin im Robonomics-Netzwerk
2. Einmal in einem Intervall werden die letzten Daten von allen Geräten abgerufen mit dem Koeffizienten je nach Region multiplizieren
3. Daten summieren und in CO2-Tonnen umrechnen
4. Die Gesamtzahl der verbrannten Token von den aktuellen Daten abziehen 
5. Eine ganze Zahl von Token im Statemine-Netzwerk verbrennen 
6. Die Gesamtzahl der verbrannten Token in der lokalen Datenbank und im Datenprotokoll speichern 


## Installierenierenation

Das Repository klonen und die Konfigurationsdatei bearbeiten.

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Konfiguration description

Nicht bearbeiten `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network whier Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
Die Koeffizienten für nicht erneuerbare Energie wurden von Eurostat übernommen und in Start gespeichert. [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) und gespeichert in `utils/coefficients.py`. 

## Start

```
docker-compose up
```