---
title: Offset-Service

contributors: [tubleronchik]
---

Beispiel für die Arbeit im Video:

https://youtu.be/Ha9wN6bjh64

Service zur Kompensation des CO2-Fußabdrucks durch Verbrennen von Token im Statemine-Netzwerk. Der produzierte CO2 wird wie folgt berechnet: Daten vom Gerät in Wh multipliziert mit Koeffizienten, die von der Region abhängen. 1 Tonne CO2 wird durch den Verbrauch von 1 Token abgedeckt. [Hier](/docs/carbon-footprint-sensor) finden Sie die Anweisungen zum Anschließen des Geräts.

## Szenario

1. Registrieren Sie ein neues Gerät im Digital Twin im Robonomics-Netzwerk.
2. Holen Sie in regelmäßigen Abständen die letzten Daten von allen Geräten ab und multiplizieren Sie sie mit dem Koeffizienten, der von der Region abhängt.
3. Summieren Sie die Daten und wandeln Sie sie in CO2-Tonnen um.
4. Ziehen Sie die Gesamtanzahl der verbrannten Token von den aktuellen Daten ab.
5. Verbrennen Sie eine ganze Anzahl von Token im Statemine-Netzwerk.
6. Speichern Sie die Gesamtanzahl der verbrannten Token in der lokalen Datenbank und im Datalog.

## Installation

Klonen Sie das Repository und bearbeiten Sie die Konfigurationsdatei.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Beschreibung der Konfiguration

Bearbeiten Sie nicht `config/config_template.yaml`!

```
robonomics:
  seed: <Seed für das Konto im Robonomics-Netzwerk, in dem der Digital Twin erstellt wird>
statemine:
  seed: <Seed für das Admin-Konto mit grünen Token im Statemine-Netzwerk>
  endpoint: <Statemine-Endpunkt>
  token_id: <ID des Tokens, der verbrannt wird>
  ss58_format: <Format der Adresse in Polkadot (für das Statemine-Netzwerk ist 2)>

service:
  interval: <Wie oft Daten von Geräten gesammelt werden>
```

Die Koeffizienten für nicht erneuerbare Energie stammen von [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) und sind in `utils/coefficients.py` gespeichert.

## Start

```
docker-compose up
```