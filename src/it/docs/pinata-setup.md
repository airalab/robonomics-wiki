---
title: Configurazione della Pinata

contributors: [tubleronchik, LoSk-p]
strumenti:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Integrazione Robonomics Home Assistant 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Questo articolo ti guida attraverso il processo di configurazione di [Pinata](https://www.pinata.cloud/) per fissare i file dall'integrazione Robonomics. Questo migliora l'accessibilità dei file di backup e telemetria.**

Per poter fissare i tuoi file su Pinata, prima devi creare un account. Successivamente, vai alla sezione `Chiavi API` e crea una nuova chiave con i seguenti permessi:

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

Successivamente, copia `Chiave API` e `Segreto API` e mantienili privati.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Se hai già configurato l'integrazione Robonomics, vai su `Impostazioni` -> `Dispositivi e Servizi` e premi `configura` nell'integrazione Robonomics. Inserisci le tue credenziali Pinata.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}