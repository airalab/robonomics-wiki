---
title: Configurazione dell'integrazione di Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In questo articolo, aggiungerai Robonomics a Home Assistant. Ciò consente a Home Assistant di registrare i datalog con dati crittografati su Robonomics Parachain e di ascoltare i comandi di avvio dal parachain per controllare i dispositivi intelligenti. L'integrazione utilizza IPFS per archiviare i dati e inviare gli hash IPFS alle funzioni di datalog o avvio.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. Nell'interfaccia web di Home Assistant vai su `Settings` -> `Device & Services` e premi `ADD INTEGRATION`. Cerca `Robonomics`.

2. Fai clic su Robonomics e compila la configurazione: 

- Aggiungi il seed dall'account `SUB_CONTROLLER` al seed dell'account del controller.
- Aggiungi l'indirizzo pubblico dell'account `SUB_OWNER` all'indirizzo del proprietario della sottoscrizione.
- Imposta l'intervallo di invio dei dati (di default è di 10 minuti).
- (Opzionale) Puoi aggiungere le credenziali per il servizio di pinning Pinata o un altro gateway personalizzato per diffondere i tuoi dati in modo più ampio sulla rete IPFS.

3. Premi `SUBMIT` dopo aver completato la configurazione. Se hai compilato tutto correttamente, vedrai la finestra di successo.

Ecco tutto! Hai configurato completamente l'integrazione di Robonomics in Home Assistant. Ora puoi utilizzare tutti i 
Servizi Web di Robonomics. Per saperne di più su di essi, vai alla sezione ["Utilizzo"](/docs/global-administration).
