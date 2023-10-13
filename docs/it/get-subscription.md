---
title: Come acquistare una sottoscrizione

contributors: [LoSk-p, PaTara43]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Paghare commissioni per le transazioni sulla blockchain è fastidioso. Immagina un dispositivo IoT che invia telemetria ogni 5-10 minuti. Questo ti farà pagare parecchio durante il mese. Una delle caratteristiche principali di Robonomics Network è RWS - la sottoscrizione al servizio web di Robonomics. Paga mensilmente e dimentica i costi delle transazioni! Per informazioni teoriche consulta [questo](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) articolo.**

<robo-wiki-note type="warning" title="Parachain">

  Fai attenzione che questo tutorial illustra come acquistare una sottoscrizione su Robonomics Kusama parachain. Puoi eseguire tutti gli stessi passaggi anche sul tuo [nodo locale](/docs/run-dev-node).

  Un'altra cosa prima di iniziare. Questo è un modo "difficile" per acquistare una sottoscrizione. Esiste un modo convenzionale per farlo tramite [Robonomics DApp](https://dapp.robonomics.network/#/).

</robo-wiki-note>

## Fai un'offerta per un'asta

Le sottoscrizioni su Robonomics vengono vendute con un modello di asta. Per ottenerne una, devi fare un'offerta per un'asta e vincerla (non preoccuparti, è veloce).

In `Developer/Chain state` puoi vedere le aste disponibili. 
Scegli `rws` e `auctionQueue` e premi il pulsante `+`, vedrai gli ID delle aste disponibili:

![queue](../images/rws/queue.png)

Puoi vedere le informazioni su qualsiasi sottoscrizione con `rws` `auction` e l'ID dell'asta (l'ID dell'asta nell'immagine è 79):

![auction](../images/rws/auction.png)

Nelle informazioni sull'asta puoi vedere il campo `winner`, al momento è `null` quindi nessuno ha questa sottoscrizione e tu puoi ottenerla. Per farlo vai su `Developer/Extrinsic`, scegli il tuo account e `rws -> bid`. Imposta anche l'ID dell'asta (79) e la quantità di unità da offrire (più di 1000000000 Wn):

![bid](../images/rws/bid.png)

Invia la transazione e controlla le informazioni sull'asta con ID 79 (in `Chain state` scegli `rws -> auction` e ID 79):

![win](../images/rws/auc_win.png)

Ora nel campo `winner` vedrai l'indirizzo del tuo account, significa che questo account ha la sottoscrizione 79. Un'asta inizia con la prima offerta e dura alcuni blocchi, quindi se qualcuno offre più token di te nei prossimi blocchi, quella persona sarà il vincitore e otterrà la sottoscrizione.

Ora puoi aggiungere dispositivi. I dispositivi sono account che possono utilizzare questa sottoscrizione e inviare estrinseci senza commissioni.
Per testarlo crea un nuovo account senza token e aggiungilo ai dispositivi. 

Per aggiungere dispositivi scegli `rws -> setDevices` in `Developer/Extrinsic`. Quindi premi il pulsante `Aggiungi elemento` e scegli l'account creato di recente senza token:

![set_devices](../images/rws/set_devices.png)

Invia la transazione. Ora puoi controllare l'elenco dei dispositivi in `Chain state` con `rws -> devices`. Lì vedrai l'indirizzo del tuo account senza token. Scegli l'account che ha acquistato la sottoscrizione e premi `+`:

![devices](../images/rws/devices.png)

Ora puoi provare a [inviare un lancio](/docs/subscription-launch) estrinseco utilizzando la sottoscrizione.