---
title: Service de Compensation

contributors: [tubleronchik]
---

Exemple de travail dans la vidéo :

https://youtu.be/Ha9wN6bjh64

Service de compensation de l'empreinte carbone en brûlant des jetons dans le réseau Statemine. L'empreinte CO2 produite est calculée comme suit : les données provenant de l'appareil en Wh sont multipliées par des coefficients dépendant de la région. 1 tonne de CO2 est compensée par la consommation d'1 jeton. [Ici](/docs/carbon-footprint-sensor) se trouvent les instructions pour connecter l'appareil.

## Scénario

1. Enregistrer un nouvel appareil dans le jumeau numérique du réseau Robonomics
2. À intervalles réguliers, obtenir les dernières données de tous les appareils et les multiplier par le coefficient dépendant de la région
3. Additionner les données et les convertir en tonnes de CO2
4. Soustraire le nombre total de jetons brûlés des données actuelles
5. Brûler un nombre entier de jetons dans le réseau Statemine
6. Enregistrer le nombre total de jetons brûlés dans une base de données locale et dans Datalog

## Installation

Cloner le dépôt et éditer le fichier de configuration.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Description de la configuration

Ne pas éditer `config/config_template.yaml` !

```
robonomics:
  seed: <seed pour le compte dans le réseau Robonomics où le jumeau numérique sera créé>
statemine:
  seed: <seed pour le compte administrateur avec des jetons verts dans le réseau Statemine>
  endpoint: <point de terminaison de Statemine>
  token_id: <ID du jeton qui sera brûlé>
  ss58_format: <format d'adresse dans Polkadot (pour le réseau Statemine, c'est 2)>

service:
  interval: <à quelle fréquence les données des appareils seront collectées>
```
Les coefficients pour l'énergie non renouvelable ont été pris chez [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) et sont stockés dans `utils/coefficients.py`.

## Lancement

```
docker-compose up
```