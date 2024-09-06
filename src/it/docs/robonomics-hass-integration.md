---
title: Configurazione dell'integrazione di Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In questo articolo, aggiungerai Robonomics a Home Assistant. Ciò consente a Home Assistant di registrare datalog con dati crittografati su Robonomics Parachain e di ascoltare i comandi di avvio dal parachain per controllare i dispositivi intelligenti. L'integrazione utilizza IPFS per memorizzare i dati e inviare gli hash IPFS alle funzioni di datalog o di avvio.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Nell'interfaccia web di Home Assistant vai su `Impostazioni` -> `Dispositivi e servizi` e premi `AGGIUNGI INTEGRAZIONE`. Cerca `Robonomics`.

2. Fai clic su Robonomics e compila la configurazione:

- Aggiungi il seed dell'account `SUB_CONTROLLER` al seed dell'account del controller.
- Aggiungi l'indirizzo pubblico dell'account `SUB_OWNER` all'indirizzo del proprietario della sottoscrizione.
- Imposta l'intervallo di invio dei dati (di default è di 10 minuti).
- (Opzionale) Puoi aggiungere credenziali per il servizio di pinning Pinata o altri gateway personalizzati per diffondere i tuoi dati su tutta la rete IPFS.

{% roboWikiNote {title:"Nota", type: "Nota"}%} Nella sezione [Configurazione di Pinata](/docs/pinata-setup) puoi trovare informazioni più dettagliate sull'uso di Pinata.{% endroboWikiNote %}

3. Premi `INVIA` dopo aver completato la configurazione. Se hai compilato tutto correttamente, vedrai la finestra di successo.

Questo è tutto! Hai configurato completamente l'Integrazione di Robonomics in Home Assistant. Ora puoi utilizzare tutti i Servizi Web di Robonomics. Per saperne di più su di essi, vai alla sezione ["Utilizzo"](/docs/add-user).