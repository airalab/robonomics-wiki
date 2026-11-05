---
title: Altruist e sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist è un sensore ambientale open source. Le sue letture finiscono in un dataset aperto che chiunque può consultare su [sensors.social](https://sensors.social).

## Il sensore

- Esistono una versione da esterno (Urban), una da interno (Insight) e un kit.
- Il sensore firma ogni misura, quindi le letture non possono essere falsificate lungo il percorso.
- Le letture possono viaggiare via Wi-Fi oppure, dove il Wi-Fi manca, via radio LoRa e reti mesh Meshtastic.
- Il proprietario può scegliere di cifrare le letture. In quel caso solo lui può vederle su sensors.social, con la propria chiave.

I sensori Altruist sono prodotti da Pinout Limited. Puoi acquistarli su [cyberpunks.shop](https://cyberpunks.shop/) e su Amazon nell'UE. Per configurazione e assistenza consulta le pagine dei prodotti e [pinout.cloud](https://pinout.cloud).

## sensors.social

[sensors.social](https://sensors.social) è una mappa di sensori indipendenti per la qualità dell'aria. Mostra le letture di oltre 100 sensori e ha un proprio blog con le novità del progetto.

Per usare un sensore in Home Assistant sulla rete locale c'è l'[integrazione Altruist](https://github.com/airalab/altruist-homeassistant-integration).

## Codice sorgente

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): firmware.
- [airalab/webflasher](https://github.com/airalab/webflasher): installa il firmware dal browser.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): la mappa.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): il servizio che raccoglie le misure.
