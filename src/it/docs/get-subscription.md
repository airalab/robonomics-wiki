---
title: Come Acquistare una Sottoscrizione

contributors: [LoSk-p, PaTara43]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Pagar commissioni per le transazioni in blockchain è fastidioso. Immagina un dispositivo IoT che invia telemetria ogni 5-10 minuti. Questo ti farà pagare parecchio durante il mese. Una delle caratteristiche chiave della Rete Robonomics è la sottoscrizione al Servizio Web Robonomics (RWS). Paga mensilmente e dimentica il costo delle transazioni! Per approfondimenti teorici consulta [questo](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) articolo.**


{% roboWikiNote {title:"Parachain", type: "warning"}%}   Presta attenzione a questo tutorial che illustra l'acquisto di una sottoscrizione sulla parachain Robonomics Kusama. Puoi eseguire tutti gli stessi passaggi anche sul tuo [nodo locale](/docs/run-dev-node).
Un'altra cosa prima di iniziare. Questo è un modo "difficile" per acquistare una sottoscrizione. C'è un modo convenzionale per farlo tramite [Robonomics DApp](https://dapp.robonomics.network/#/).
{% endroboWikiNote %}

## Fare un'Offerta all'Asta

Le sottoscrizioni in Robonomics sono vendute con un modello di asta. Per ottenerne una, devi fare un'offerta all'asta e vincerla (non preoccuparti, è veloce).

In `Sviluppatore/Stato della catena` puoi vedere le aste disponibili.
Scegli `rws` e `auctionQueue` e premi il pulsante `+`, vedrai gli ID delle aste disponibili:

{% roboWikiPicture {src:"docs/rws/queue.png", alt:"queue"} %}{% endroboWikiPicture %}

Puoi vedere le informazioni su qualsiasi sottoscrizione con `rws` `auction` e l'ID dell'asta (l'ID dell'asta nella foto è 79):

{% roboWikiPicture {src:"docs/rws/auction.png", alt:"auction"} %}{% endroboWikiPicture %}

Nelle informazioni sull'asta puoi vedere il campo `winner`, al momento è `null` quindi nessuno ha questa sottoscrizione e puoi ottenerla. Per farlo vai su `Sviluppatore/Estrinseco`, scegli il tuo account e `rws -> bid`. Imposta anche l'ID dell'asta (79) e la quantità di unità da offrire (più di 1000000000 Wn):

{% roboWikiPicture {src:"docs/rws/bid.png", alt:"bid"} %}{% endroboWikiPicture %}

Invia la transazione e controlla le informazioni sull'asta con ID 79 (in `Stato della catena` scegli `rws -> auction` e ID 79):

{% roboWikiPicture {src:"docs/rws/auc_win.png", alt:"auc_win"} %}{% endroboWikiPicture %}

Ora nel campo `winner` vedrai l'indirizzo del tuo account, il che significa che questo account ha la sottoscrizione 79. Un'asta inizia con la prima offerta e dura alcuni blocchi, quindi se qualcuno offre più token di te nei prossimi blocchi, quello sarà il vincitore e otterrà la sottoscrizione.

Ora puoi aggiungere dispositivi. I dispositivi sono account che possono utilizzare questa sottoscrizione e inviare estrinseci senza commissioni.
Per testarlo, crea un nuovo account senza token e aggiungilo ai dispositivi.

Per aggiungere dispositivi scegli `rws -> setDevices` in `Sviluppatore/Estrinseco`. Poi premi il pulsante `Aggiungi elemento` e scegli l'account creato di recente senza token:

{% roboWikiPicture {src:"docs/rws/set_devices.png", alt:"set_devices"} %}{% endroboWikiPicture %}

Invia la transazione. Ora puoi controllare l'elenco dei dispositivi in `Stato della catena` con `rws -> devices`. Lì vedrai l'indirizzo del tuo account senza token. Scegli l'account che ha acquistato la sottoscrizione e premi `+`:

{% roboWikiPicture {src:"docs/rws/devices.png", alt:"devices"} %}{% endroboWikiPicture %}

Ora puoi provare a [inviare il lancio](/docs/subscription-launch) estrinseco utilizzando la sottoscrizione.