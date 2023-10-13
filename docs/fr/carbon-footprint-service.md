---
title: Service de compensation

contributors: [tubleronchik]
---

Un exemple de travail est dans la vidéo:

https://youtu.be/Ha9wN6bjh64

Service de compensation de l'empreinte CO2 en brûlant des jetons dans le réseau Statemine. 
Le CO2 produit est calculé comme suit : les données provenant de l'appareil en Wh sont multipliées par des coefficients qui dépendent de la région. 1 tonne de CO2 est compensée par la consommation d'1 jeton. [Voici](/docs/carbon-footprint-sensor) les instructions pour connecter l'appareil.

## Scénario

1. Enregistrez un nouvel appareil dans Digital Twin dans le réseau Robonomics
2. Une fois par intervalle, récupérez les dernières données de tous les appareils et multipliez par le coefficient en fonction de la région
3. Additionner les données et les convertir en tonnes de CO2
4. Soustraire le nombre total de jetons brûlés des données actuelles 
5. Brûler un nombre entier de jetons dans le réseau Statemine 
6. Enregistrer le nombre total de jetons brûlés dans la base de données locale et dans Datalogue 


## Installeration

Cloner le dépôt et modifier le fichier de configuration.

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Description de la configuration

Ne pas modifier `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network wici Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
Les coefficients pour l'énergie non renouvelable ont été pris à partir d'Lancement et stockés dans [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) et stocké dans `utils/coefficients.py`. 

## Lancement

```
docker-compose up
```