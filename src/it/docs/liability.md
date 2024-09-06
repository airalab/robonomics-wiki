---
title: Responsabilità
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Per trasformare i robot in agenti economici è necessario uno strumento contrattuale. Ecco Liability - il pallet Robonomics che implementa contratti tra account di parachain!**

{% roboWikiNote {title:"Nodo di Sviluppo", type: "warning"}%}   Si prega di prestare attenzione che questo tutorial è dimostrato su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).
{% endroboWikiNote %}

## Panoramica della Teoria

Un tempo su Ethereum c'era una struttura di interazione della responsabilità piuttosto complicata. Puoi conoscerla
[qui](/docs/robonomics-how-it-works). Oggi le cose sono un po' più semplici con Kusama!

### Trattative

Per firmare un contratto, le due parti devono trattare prima. Questo può essere fatto in diversi modi, tra cui
[IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) o Robonomics PubSub. Un esempio di codice Python che utilizza Robonomics PubSub è
presentato [qui](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Offerta e domanda sono messaggi contenenti due caratteristiche principali di un contratto: **descrizione del lavoro** e **prezzo**. Il formato del messaggio deve essere progettato dall'utente per ogni applicazione specifica. Non è così importante nel processo di trattativa seguire una regola di formato rigida. Il flusso possibile è presentato nell'immagine qui sotto.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"trattative"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} Si noti che PubSub è un protocollo aperto, quindi non dovrebbero essere trasferiti dati sensibili. Per questo si dovrebbero utilizzare altri protocolli.
{% endroboWikiNote %}

### Firme

Quando le trattative sono concluse con successo, ogni parte deve firmare il cosiddetto accordo chiamato firma. Questo è un
messaggio contenente la descrizione del lavoro e il prezzo **in un formato specifico** firmato con una chiave privata dell'account. C'è anche uno
[strumento Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) per questo.
 - La descrizione del lavoro è chiamata **tecnica**. Si tratta di una stringa lunga 32 byte simile a un hash che può essere un CID IPFS codificato.
 - Il prezzo è chiamato **economia**. Si tratta di un decimale XRT - Weiner. 1 Weiner = 10**-9 XRT.

{% roboWikiNote {title:"32 byte", type: "note"}%} Si può ottenere un CID [IPFS](https://ipfs.tech/) formattato in modo corretto con la [libreria Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
Quando si utilizza la funzione `sign_liability`, non c'è bisogno di trasformare l'hash, verrà fatto automaticamente.{% endroboWikiNote %}

Seguendo l'esempio del caffè:

1. Il compito è un JSON
```json
{"task": "make_espresso", "description": "Preparare una tazza di caffè espresso"}
```
2. Il suo CID IPFS è `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Quindi la **tecnica** (CID trasformato) è `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. L'**economia** è `1.5 XRT`.

Quando firmato, è il momento di creare una responsabilità! Questo può essere fatto da una delle parti (sia il promittente che il promittente) o da un account di terze parti di un cosiddetto fornitore.

## Creare Responsabilità

### Preparativi

Come già accennato, sono coinvolti almeno due parti nel processo. Per questo esempio, utilizziamo tre e creiamo
un fornitore separato per questo. Supponiamo che le trattative abbiano già avuto luogo in qualche modo.

### 1. Crea tre account e aggiungi fondi ad essi

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"bilanci"} %}{% endroboWikiPicture %}

Qui abbiamo fornito al fornitore 100 XRT per firmare le estrinseche di responsabilità, al promittente sono stati dati 2 XRT per pagare il lavoro.
Al promittente non sono stati concessi fondi (eccetto un deposito esistenziale di almeno 1 mXRT).

### 1. Vai su Sviluppatore -> Estrinseche

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"estrinseche"} %}{% endroboWikiPicture %}

### 2. Scegli responsabilità -> crea dal menu a discesa delle possibili estrinseche

Scegli anche un account con cui desideri inviare l'estrinseca. Compila tutti i parametri.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"crea"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Firme", type: "note"}%} Poiché qui viene utilizzato un fornitore, non è necessario conoscere i seed dei partecipanti. Sono necessarie solo le loro firme.
{% endroboWikiNote %}

### 3. Invia la transazione

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"invia"} %}{% endroboWikiPicture %}

### 4. Esamina la tua responsabilità negli eventi

Per farlo, vai su `Rete -> Esploratore` e trova un elenco di eventi sulla destra. Clicca sull'icona del triangolo per espandere.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"nuova-responsabilità"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Hash", type: "note"}%} L'hash può essere trasformato in un CID IPFS con lo stesso [strumento Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).
{% endroboWikiNote %}

### 5. Esplorazione dello storage

Puoi anche esplorare alcune caratteristiche delle responsabilità nel modulo di storage `liability`.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-responsabilità"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Prossimo Indice", type: "note"}%} La funzione di storage `Next Index` mostra l'ultimo indice di responsabilità +1, quindi anche se è `1`, la responsabilità `0` viene esplorata.
{% endroboWikiNote %}

## Rapporti

Immagina che sia stato preparato un caffè e ora la macchina del caffè deve segnalarlo in qualche modo. Ecco dove entrano in gioco i rapporti di responsabilità.
Come prova del lavoro, l'account aggiunge un altro CID IPFS come contenuto del rapporto quando finalizza la responsabilità esistente. Anche questo richiede la firma del promittente.

{% roboWikiNote {title:"Firma del Rapporto", type: "note"}%} Il messaggio firmato contiene l'indice di responsabilità esistente e il CID IPFS del rapporto codificato in una rappresentazione di 32 byte. Ancora una volta, lo [strumento Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) può aiutare a firmare il rapporto.
{% endroboWikiNote %}

Continuando con l'esempio della macchina del caffè:

1. Il rapporto è un JSON
```json
{"report": "Caffè fatto! Tempo di esecuzione - 80 secondi."}
```
2. Il suo CID IPFS è `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Quindi il **payload** (CID trasformato) è `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Indice** è `0`, è l'indice di responsabilità esistente.

### 1. Vai su estrinseche, responsabilità -> finalizza(rapporto)

Compila i parametri e invia l'estrinseca. Di nuovo, questo può essere fatto da un account di terze parti.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"rapporto"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Deposito Esistenziale", type: "warning"}%} Presta attenzione che l'account del promittente non dovrebbe essere "morto" - dovrebbe avere il deposito esistenziale di almeno 1 mXRT.
{% endroboWikiNote %}

Firma e invia il rapporto. Quando fatto, puoi esplorarlo negli eventi.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"nuovo-rapporto"} %}{% endroboWikiPicture %}

### 2. Esplora i rapporti

Puoi anche osservare il rapporto nello storage. Vai su `Sviluppatore -> Storage` e scegli `responsabilità` dal menu a discesa.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-rapporto"} %}{% endroboWikiPicture %}

### 3. Controlla i saldi

Nell'immagine è mostrato che ora il promittente ha ricevuto lo "stipendio". È avvenuto un rapporto economico!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Verifica", type: "note"}%} Al momento non c'è modo di verificare che il lavoro sia stato completato, quindi non appena il promittente riferisce, i token vengono trasferiti sul suo account.
La funzione di verifica sarà aggiunta in futuro.
{% endroboWikiNote %}